import hmac
import hashlib
import flask
from flask import abort, request, render_template
import subprocess
import os
from dotenv import load_dotenv
import requests
from flask_socketio import SocketIO

load_dotenv(dotenv_path=os.path.abspath("") + "/.env")

app = flask.Flask(__name__, static_folder=os.path.abspath("") + "/src/static", template_folder=os.path.abspath("") + "/src/pages")
production = True if os.getenv("ENV") == "production" else False
script_path = os.path.abspath("") + "/src/backend/update.sh"
WEBHOOK_KEY = os.getenv("WEBHOOK_KEY")

def fetch_user_info():
    try:
        response = requests.get("http://localhost:5001/user-info")
        if response.status_code == 200:
            return response.json()
        else:
            print(f"Error: {response.json().get('error', 'Unknown error')}")
            return {"username": "Unknown User"}  # Default value
    except Exception as e:
        print(f"Exception occurred while fetching user info: {e}")
        return {"username": "Unknown User"}  # Default value

@app.route("/")
def start():
    user_info = fetch_user_info()
    username = user_info.get("display_name", "Revilo")
    status = user_info.get("status", "offline")  # Default to offline if status is not available
    return render_template("index.html", username=username, user_info={"status": status})

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
    # Get the signature from the headers (GitHub sends it as X-Hub-Signature-256)
    signature = request.headers.get('X-Hub-Signature-256')
    if not signature:
        abort(400, description="Bad Request: No signature provided")
    
    # Get the raw payload
    payload = request.get_data()
    
    # Validate the signature
    if not verify_signature(payload, signature):
        abort(403, description="Forbidden: Invalid webhook signature")
    
    # If the signature is valid, proceed with the script execution
    try:
        if production:
            subprocess.run(f"sh {script_path}", check=True, shell=True)
            return {"status": "success", "message": "Shell script executed successfully."}
        else:
            print("Whoh!, I executed the github pull script")
            return {"status": "Failed", "message": "Server is not in production mode."}
    
    except subprocess.CalledProcessError as e:
        return {"status": "error", "message": f"Error executing script: {e}"}
