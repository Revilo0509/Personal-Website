import hmac
import hashlib
import flask
from flask import send_file, abort, request
import subprocess
import os
from dotenv import load_dotenv

load_dotenv(os.path.abspath("") + "/.env")

app = flask.Flask(__name__, static_folder=os.path.abspath("") + "/src/static", template_folder=os.path.abspath("") + "/src/template")
production = True if os.getenv("ENV") == "production" else False
script_path = os.path.abspath("") + "/src/backend/update.sh"
WEBHOOK_KEY = os.getenv("WEBHOOK_KEY")

@app.route("/")
def start():
    return send_file(os.path.abspath("") + "/src/pages/index.html")

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

@app.route("/pages/<path:filename>")
def serve_template(filename):
    template_path = os.path.abspath("") + "/src/pages/" + filename
    if os.path.exists(template_path):
        return send_file(template_path)
    else:
        abort(404, description="File not found")
