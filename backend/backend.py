import hmac
import hashlib
import flask
from flask import render_template, abort, request
import subprocess
import os
from dotenv import load_dotenv
import requests
import time

load_dotenv(os.path.abspath("") + "/.env")

staticFolder = os.path.abspath("") + "/static"
templateFolder = os.path.abspath("") + "/pages"

production = True if os.getenv("ENV") == "production" else False
development = True if os.getenv("ENV") == "development" else False

app = flask.Flask(__name__, static_folder=staticFolder, template_folder=templateFolder)
script_path = os.path.abspath("") + "/src/backend/update.sh"
WEBHOOK_KEY = os.getenv("WEBHOOK_KEY")
PORT = os.getenv("PORT")

if development:
    from livereload import Server # type: ignore

##########################################
########## Webhook Handler ###############
##########################################

GITHUB_META_URL = "https://api.github.com/meta"
GITHUB_HOOKS_CIDRS = []
GITHUB_CIDRS_LAST_FETCHED = 0
CIDR_CACHE_DURATION = 60 * 60  # 1 hour

def fetch_github_hook_ips():
    global GITHUB_HOOKS_CIDRS, GITHUB_CIDRS_LAST_FETCHED

    current_time = time.time()
    if current_time - GITHUB_CIDRS_LAST_FETCHED > CIDR_CACHE_DURATION:
        try:
            response = requests.get(GITHUB_META_URL, timeout=5)
            if response.status_code == 200:
                data = response.json()
                GITHUB_HOOKS_CIDRS = [ip_network(cidr) for cidr in data.get("hooks", [])]
                GITHUB_CIDRS_LAST_FETCHED = current_time
        except Exception as e:
            print(f"Failed to fetch GitHub IP ranges: {e}")

def is_ip_from_github(ip):
    fetch_github_hook_ips()
    request_ip = ip_address(ip)
    return any(request_ip in cidr for cidr in GITHUB_HOOKS_CIDRS)


def verify_signature(payload, signature):
    """
    Verifies the GitHub webhook signature using the shared secret.
    """
    computed_signature = 'sha256=' + hmac.new(
        WEBHOOK_KEY.encode(), payload, hashlib.sha256
    ).hexdigest()
    
    return hmac.compare_digest(computed_signature, signature)

@app.route("/webhook", methods=['POST'])
def webhook():
    signature = request.headers.get('X-Hub-Signature-256')
    if not signature:
        abort(400, description="Bad Request: No signature provided")
    
    # IP Check
    ip = request.remote_addr
    if not is_ip_from_github(ip):
        abort(403, description="Forbidden: IP not in GitHub range")
    
    payload = request.get_data()
    if not verify_signature(payload, signature):
        abort(403, description="Forbidden: Invalid webhook signature")
    
    try:
        if production:
            subprocess.run(f"sh {script_path}", check=True, shell=True)
            return {"status": "success", "message": "Shell script executed successfully."}
        else:
            print("Whoh!, I executed the github pull script")
            return {"status": "Failed", "message": "Server is not in production mode."}
    except subprocess.CalledProcessError as e:
        return {"status": "error", "message": f"Error executing script: {e}"}

##########################################
############## Website ###################
##########################################

def fetch_user_info():
    """
    Fetch user information from a local service.
    """
    try:
        response = requests.get("http://localhost:5001/user-info")
        if response.status_code == 200:
            return response.json()
        print(f"Error: {response.json().get('error', 'Unknown error')}")
    except Exception as e:
        print(f"Exception occurred while fetching user info: {e}")
    return {"username": "Unknown User"}  # Default value


@app.route("/")
def start():
    """
    Render the homepage with user information.
    """
    user_info = fetch_user_info()
    username = user_info.get("display_name", "Revilo")
    status = user_info.get("status", "offline")  # Default to offline if not available
    return render_template("index.html", username=username, user_info={"status": status})

##########################################
############### RUN APP ##################
##########################################

if __name__ == "__main__":
    app.debug = development
    if development:
        server = Server(app.wsgi_app)

        server.watch(f"{templateFolder}/**/*")
        server.watch(f"{staticFolder}/**/*")

        server.serve(port=PORT)
    else: 
        app.run(port=PORT)
        