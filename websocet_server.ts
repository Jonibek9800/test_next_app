import { NextRequest } from "next/server";

const WebSocket = require("ws");
const http = require("http");
const server = http.createServer();
const wss = new WebSocket.Server({ server });

wss.on("connection", (ws: any, req: NextRequest) => {
  console.log("Client connected");

  const url = new URL(req.url, `http://${req.headers.host}`);
  const key = url.searchParams.get("key");

  if (!key) {
    ws.close(1008, "Key parameter is missing");
    return;
  }

  const intervalId = setInterval(() => {
    if (ws.readyState === WebSocket.OPEN) {
      ws.send(JSON.stringify({ key }));
    }
  }, 5000);

  ws.on("close", () => {
    console.log("Client disconnected");
    clearInterval(intervalId);
  });

  ws.on("error", (error: Object) => {
    console.error("WebSocket error:", error);
  });
});

server.listen(8080, () => {
  console.log("WebSocket server listening on port 8080");
});
