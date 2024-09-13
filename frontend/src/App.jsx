import { useEffect, useState } from "react";
import io from "socket.io-client";

import "./App.css";

// Connect to Socket.IO server
const socket = io("http://localhost:5000");
export default function App() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [joined, setJoined] = useState(false);

  useEffect(() => {
    // Listen for incoming messages from the server
    socket.on("message", (msg) => {
      setMessages((prevMessages) => [...prevMessages, msg]);
    });

    // Clean up on component unmount
    return () => {
      socket.off("message");
    };
  }, []);

  // Handle joining a room
  const joinRoom = () => {
    if (username.trim() && room.trim()) {
      socket.emit("joinRoom", { username, room });
      setJoined(true);
    }
  };

  // Handle sending a message
  const sendMessage = () => {
    if (message.trim()) {
      socket.emit("chatMessage", message);
      setMessage("");
    }
  };

  if (!joined) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
        <h1 className="text-3xl font-bold mb-6">Join Chat Room</h1>
        <div className="flex flex-col space-y-4">
          <input
            type="text"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="p-2 border border-gray-300 rounded"
          />
          <input
            type="text"
            placeholder="Enter room name"
            value={room}
            onChange={(e) => setRoom(e.target.value)}
            className="p-2 border border-gray-300 rounded"
          />
          <button
            onClick={joinRoom}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Join Room
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">Room: {room}</h1>

      <div className="w-full max-w-md bg-white p-4 shadow-md rounded-lg">
        <div className="mb-4 h-64 overflow-y-auto bg-gray-100 p-2 rounded">
          {messages.map((msg, index) => (
            <div key={index} className="mb-2">
              <span className="text-gray-800">{msg}</span>
            </div>
          ))}
        </div>

        <div className="flex items-center space-x-2">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="Type a message..."
          />
          <button
            onClick={sendMessage}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
