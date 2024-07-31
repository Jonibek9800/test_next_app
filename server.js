let WebSocket = require("ws");

const wss = new WebSocket.Server({ port: 3001 });
wss.on("connection", (ws) => {
  const interval = setInterval(() => {
    ws.on("message", (key) => {
      wss.clients.forEach((client) => {
        if (client.readyState === wss.OPEN) {
          setInterval(() => {
            ws.send(key);
          }, 5000);
        }
      });
    });
  }, 5000);
});
