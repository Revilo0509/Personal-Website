import hmac
import hashlib
import os
import subprocess
import requests
from flask import Flask, abort, request, render_template
from dotenv import load_dotenv

# Load environment variables
load_dotenv(dotenv_path=os.path.join(os.path.abspath(""), ".env"))

# Flask app configuration
app = Flask(
    __name__,
    static_folder=os.path.join(os.path.abspath(""), "src/static"),
    template_folder=os.path.join(os.path.abspath(""), "src/pages"),
)

# Environment and constants
production = os.getenv("ENV") == "production"
script_path = os.path.join(os.path.abspath(""), "src/backend/update.sh")
WEBHOOK_KEY = os.getenv("WEBHOOK_KEY")


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


def verify_signature(payload, signature):
    """
    Verify the GitHub webhook signature using the shared secret.
    """
    computed_signature = "sha256=" + hmac.new(
        WEBHOOK_KEY.encode(), payload, hashlib.sha256
    ).hexdigest()
    return hmac.compare_digest(computed_signature, signature)


@app.route("/webhook", methods=["POST"])
def webhook():
    """
    Handle GitHub webhook requests.
    """
    signature = request.headers.get("X-Hub-Signature-256")
    if not signature:
        abort(400, description="Bad Request: No signature provided")

    payload = request.get_data()

    if not verify_signature(payload, signature):
        abort(403, description="Forbidden: Invalid webhook signature")

    try:
        if production:
            subprocess.run(f"sh {script_path}", check=True, shell=True)
            return {"status": "success", "message": "Shell script executed successfully."}
        print("Whoh!, I executed the GitHub pull script")
        return {"status": "failed", "message": "Server is not in production mode."}
    except subprocess.CalledProcessError as e:
        return {"status": "error", "message": f"Error executing script: {e}"}
