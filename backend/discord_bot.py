import os
import threading
import requests
from flask import Flask, request, jsonify, redirect
from dotenv import load_dotenv
import discord
from discord.ext import commands

# Load environment variables
load_dotenv(dotenv_path=os.path.abspath("") + "/.env")

# Discord bot setup
intents = discord.Intents.default()
intents.presences = True
intents.members = True

bot = commands.Bot(command_prefix="!", intents=intents)
user_data = {}

@bot.event
async def on_ready():
    print(f"Logged in as {bot.user}")

@bot.event
async def on_presence_update(before, after):
    user_data[after.name] = {
        "username": after.name,
        "status": str(after.status)
    }
    print(f"Updated presence for {after.name}: {after.status}")

# Flask server setup
app = Flask(__name__)

CLIENT_ID = os.getenv("CLIENT_ID")
CLIENT_SECRET = os.getenv("CLIENT_SECRET")
REDIRECT_URI = "http://localhost:5001/callback"
DISCORD_TOKEN_URL = "https://discord.com/api/oauth2/token"
DISCORD_API_URL = "https://discord.com/api/users/@me"

@app.route('/login')
def login():
    auth_url = (
        f"https://discord.com/api/oauth2/authorize?client_id={CLIENT_ID}"
        f"&redirect_uri={REDIRECT_URI}&response_type=code&scope=identify"
    )
    return redirect(auth_url)

@app.route('/callback')
def oauth_callback():
    code = request.args.get('code')
    if not code:
        return "No authorization code received.", 400

    data = {
        "client_id": CLIENT_ID,
        "client_secret": CLIENT_SECRET,
        "grant_type": "authorization_code",
        "code": code,
        "redirect_uri": REDIRECT_URI,
    }
    headers = {"Content-Type": "application/x-www-form-urlencoded"}
    response = requests.post(DISCORD_TOKEN_URL, data=data, headers=headers)

    if response.status_code != 200:
        return f"Failed to get access token: {response.text}", 400

    access_token = response.json().get("access_token")
    headers = {"Authorization": f"Bearer {access_token}"}
    user_response = requests.get(DISCORD_API_URL, headers=headers)

    if user_response.status_code != 200:
        return f"Failed to fetch user info: {user_response.text}", 400

    return jsonify(user_response.json())

@app.route('/user-info', methods=['GET'])
def get_user_info():
    user_id = os.getenv("USER_ID")
    for guild in bot.guilds:
        member = guild.get_member(int(user_id))
        if member:
            return jsonify({
                "username": member.name,
                "display_name": member.display_name,
                "status": str(member.status)
            })
    return jsonify({"error": "User not found in any guilds the bot is in."}), 404

def run_flask():
    app.run(port=5001)

def run_discord_bot():
    bot.run(os.getenv("TOKEN"))

if __name__ == "__main__":
    threading.Thread(target=run_flask).start()
    run_discord_bot()
