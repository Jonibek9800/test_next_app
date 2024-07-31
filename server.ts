const express = require("express");
const next = require("next");
const { Server } = require("ws");

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  const wss = new Server({ noServer: true });

  server.get("/api/websocket", (req: any, res: any) => {
    wss.handleUpgrade(req, req.socket, Buffer.alloc(0), (ws: any) => {
      wss.emit("connection", ws, req);
    });
  });

  server.all("*", (req: any, res: any) => {
    return handle(req, res);
  });

  server.listen(3000, (err: Object) => {
    if (err) throw err;
    console.log("> Ready on http://localhost:3000");
  });
});
