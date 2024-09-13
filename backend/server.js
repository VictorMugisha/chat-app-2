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

// Store users and rooms
let users = {};

// Handle Socket connections
io.on('connection', (socket) => {
  console.log("A new Client is connected: ", socket.id);

  socket.on("chatMessage", (message) => {
    console.log(`Received message: ${message} from client ${socket.id}`);

    // When a user joins a chat (we'll send room and username from the client)
    socket.on("joinRoom", ({ username, room }) => {
      // Save the user in the room
      users[socket.id] = { username, room };

      // Join the user to the specific room
      socket.join(room);

      console.log(`${username} has joined room ${room}`);

      // Send a welcome message to the user
      socket.emit("message", `Welcome to room ${room}, ${username}`);

      // Notify others in the room
      socket.to(room).emit("message", `${username} has joined the room`);
    });

    // Broadcast the message to all connected clients (optional)
    io.emit("chatMessage", message);
  });

  // Handle message sending in a room
  socket.on("chatMessage", (message) => {
    const user = users[socket.id];
    if (user && user.room) {
      // Broadcast the message to the specific room
      io.to(user.room).emit("message", `${user.username}: ${message}`);
    }
  });

  // When a client disconnects
  socket.on("disconnect", () => {
    console.log("Client disconnected: ", socket.id);

    const user = users[socket.id];
    if (user && user.room) {
      console.log(`${user.username} has left room ${user.room}`);
      socket
        .to(user.room)
        .emit("message", `${user.username} has left the room`);
    }
    delete users[socket.id]; // Clean up user
  });
})

const PORT = 5000
httpServer.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});