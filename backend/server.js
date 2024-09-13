const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
const httpServer = http.createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: "*",
  },
});

connectDB(); // Connect to MongoDB

app.use(express.json()); // Middleware for parsing JSON
app.use("/api/auth", authRoutes); // Authentication routes


// Socket.IO setup
io.use((socket, next) => {
  const token = socket.handshake.auth.token;
  if (!token) return next(new Error("Authentication error"));

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return next(new Error("Authentication error"));
    socket.user = user;
    next();
  });
});

// Store users and rooms
let users = {};

// Handle Socket connections
io.on("connection", (socket) => {
  console.log("A new client is connected: ", socket.id);

  // When a user joins a room
  socket.on("joinRoom", ({ username, room }) => {
    users[socket.id] = { username, room };
    socket.join(room);
    socket.emit("message", `Welcome to room ${room}, ${username}`);
    socket.to(room).emit("message", `${username} has joined the room`);
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
});

const PORT = 5000;
httpServer.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
