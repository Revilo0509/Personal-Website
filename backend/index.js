import "dotenv/config";
import WebSocket, { WebSocketServer } from "ws";
import express from "express";

const app = express();
let presence = null; // Cache last known presence
let seq = null;
let sessionId = null;

const token = process.env.DISCORD_BOT_TOKEN;
const userId = process.env.USER_ID;
const guildId = process.env.GUILD_ID; // Add this to your .env

const ws = new WebSocket("wss://gateway.discord.gg/?v=10&encoding=json");

console.log("Token:", token ? "Loaded" : "Missing");
console.log("User ID:", userId);
console.log("Guild ID:", guildId);

ws.on("open", () => {
    console.log("Connected to Discord Gateway");
});

ws.on("message", (msg) => {
    const payload = JSON.parse(msg);
    const { t, s, op, d } = payload;

    if (s) seq = s;

    switch (op) {
        case 10: {
            // Hello: start heartbeating
            const { heartbeat_interval } = d;
            setInterval(() => {
                ws.send(JSON.stringify({ op: 1, d: seq }));
            }, heartbeat_interval);

            // Identify
            ws.send(JSON.stringify({
                op: 2,
                d: {
                    token,
                    intents: (1 << 8) | (1 << 9), // GUILD_PRESENCES and GUILD_MEMBERS
                    properties: { os: "linux", browser: "custom", device: "custom" }
                }
            }));
            break;
        }
        case 0: {
            // Dispatch event
            if (t === "READY") {
                sessionId = d.session_id;
                console.log("Gateway READY");
                if (d.guilds) {
                    d.guilds.forEach(guild => {
                        ws.send(JSON.stringify({
                            op: 8,
                            d: {
                                guild_id: guild.id,
                                user_ids: [userId],
                                presences: true
                            }
                        }));
                    });
                }
            }

            if (t === "PRESENCE_UPDATE" && d.user && d.user.id === userId) {
                presence = d;
                console.log("Presence update for user:", presence.status);

                // Broadcast to all connected clients
                wss.clients.forEach(client => {
                    if (client.readyState === WebSocket.OPEN) {
                        client.send(JSON.stringify({ status: presence.status }));
                    }
                });
            }
            break;
        }
        default:
            console.log("Unhandled op:", op, "event:", t);
    }
});

// Start Express server
const server = app.listen(3000, () => console.log("Backend running on http://localhost:3000"));

// WebSocket server for /presence
const wss = new WebSocketServer({ server, path: "/presence" });

wss.on("connection", (socket) => {
    console.log("Client connected to presence WS");

    // Send initial presence immediately
    const status = presence && presence.status ? presence.status : "offline";
    socket.send(JSON.stringify({ status }));

    socket.on("close", () => {
        console.log("Client disconnected from presence WS");
    });
});
