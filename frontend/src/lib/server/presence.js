import "dotenv/config";
import WebSocket, { WebSocketServer } from "ws";

const wssKey = Symbol.for("sveltekit.wss");
let presence = null; // Cache last known presence
let seq = null;
let sessionId = null;

const token = process.env.DISCORD_BOT_TOKEN;
const userId = process.env.USER_ID;

// Ensure this code only runs once, even during HMR
if (!globalThis[wssKey]) {
    const wss = new WebSocketServer({ noServer: true });
    const discordWs = new WebSocket("wss://gateway.discord.gg/?v=10&encoding=json");

    console.log("Token:", token ? "Loaded" : "Missing");
    console.log("User ID:", userId);

    discordWs.on("open", () => {
        console.log("Connected to Discord Gateway");
    });

    discordWs.on("message", (msg) => {
        const payload = JSON.parse(msg);
        const { t, s, op, d } = payload;

        if (s) seq = s;

        switch (op) {
            case 10: {
                const { heartbeat_interval } = d;
                setInterval(() => {
                    discordWs.send(JSON.stringify({ op: 1, d: seq }));
                }, heartbeat_interval);

                discordWs.send(JSON.stringify({
                    op: 2,
                    d: {
                        token,
                        intents: (1 << 8) | (1 << 9),
                        properties: { os: "linux", browser: "custom", device: "custom" }
                    }
                }));
                break;
            }
            case 0: {
                if (t === "READY") {
                    sessionId = d.session_id;
                    console.log("Gateway READY");
                    if (d.guilds) {
                        d.guilds.forEach(guild => {
                            discordWs.send(JSON.stringify({
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

    wss.on("connection", (socket) => {
        console.log("Client connected to presence WS");

        const status = presence && presence.status ? presence.status : "offline";
        socket.send(JSON.stringify({ status }));

        socket.on("close", () => {
            console.log("Client disconnected from presence WS");
        });
    });

    globalThis[wssKey] = { wss };
}

export const wss = globalThis[wssKey].wss;