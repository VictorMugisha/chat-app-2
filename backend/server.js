// server.js
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const httpServer = http.createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: "*",
  },
});

// Handle Socket connections
io.on('connection', (socket) => {
    console.log("A new Client is connected: ", socket.id)
})

const PORT = 5000
httpServer.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});