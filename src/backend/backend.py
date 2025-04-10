import hmac
import hashlib
import os
import subprocess
import requests
from flask import Flask, abort, request, render_template, jsonify
from dotenv import load_dotenv
import discord
from discord.ext import commands
import asyncio
from hypercorn.asyncio import serve
from hypercorn.config import Config

version = "0.1.0"

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
CLIENT_ID = os.getenv("CLIENT_ID")
CLIENT_SECRET = os.getenv("CLIENT_SECRET")
REDIRECT_URI = "http://localhost:5000/callback"
DISCORD_TOKEN_URL = "https://discord.com/api/oauth2/token"
DISCORD_API_URL = "https://discord.com/api/users/@me"
DISCORD_TOKEN = os.getenv("TOKEN")
USER_ID = os.getenv("USER_ID")

# Discord bot setup
intents = discord.Intents.default()
intents.presences = True
intents.members = True

bot = commands.Bot(command_prefix="!", intents=intents)
user_info = {
    "username": "Revilo",
    "status": "offline",
}

@bot.event
async def on_ready():
    print(f"Logged in as {bot.user}")

    # Fetch the user data at startup
    global user_info
    guilds = bot.guilds  # Get all guilds the bot is in
    for guild in guilds:
        member = guild.get_member(int(USER_ID))  # Fetch the member by USER_ID
        if member:
            user_info = {
                "username": member.name,
                "display_name": member.display_name,
                "status": str(member.status),
            }
            print(f"Fetched initial presence for {member.name}: {member.status}")
            break
    else:
        print(f"User with ID {USER_ID} not found in any guilds.")

@bot.event
async def on_presence_update(before, after):
    global user_info
    if str(after.id) == USER_ID:
        user_info = {
            "username": after.name,
            "display_name": after.display_name,
            "status": str(after.status),
        }
        print(f"Updated presence for {after.name}: {after.status}")

@app.route("/")
def start():
    l_user_info = user_info
    username = l_user_info.get("display_name")
    status = l_user_info.get("status")
    return render_template("index.html", username=username, user_info={"status": status}, version=version)

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

@app.route("/callback")
def discord_callback():
    """
    Handle the Discord OAuth2 callback.
    """
    code = request.args.get("code")
    if not code:
        return jsonify({"error": "No code provided"}), 400

    # Exchange the code for an access token
    data = {
        "client_id": CLIENT_ID,
        "client_secret": CLIENT_SECRET,
        "grant_type": "authorization_code",
        "code": code,
        "redirect_uri": REDIRECT_URI,
    }
    headers = {"Content-Type": "application/x-www-form-urlencoded"}

    try:
        response = requests.post(DISCORD_TOKEN_URL, data=data, headers=headers)
        response.raise_for_status()
        tokens = response.json()
        access_token = tokens.get("access_token")

        # Use the access token to fetch user information
        user_response = requests.get(
            DISCORD_API_URL, headers={"Authorization": f"Bearer {access_token}"}
        )
        user_response.raise_for_status()
        user_data = user_response.json()

        return jsonify({"status": "success", "user": user_data})
    except requests.exceptions.RequestException as e:
        return jsonify({"status": "error", "message": str(e)}), 500

async def run_flask_app():
    """
    Run the Flask app using Hypercorn.
    """
    config = Config()
    config.bind = ["127.0.0.1:5000"]
    await serve(app, config)

async def main():
    """
    Run both the Discord bot and Flask app in the same asyncio event loop.
    """
    # Run the Discord bot and Flask app concurrently
    await asyncio.gather(
        bot.start(DISCORD_TOKEN),  # Start the Discord bot
        run_flask_app(),          # Start the Flask app
    )

if __name__ == "__main__":
    asyncio.run(main())