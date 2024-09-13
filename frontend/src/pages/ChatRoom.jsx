import { useState, useEffect } from "react";
import io from "socket.io-client";
import { useSelector } from "react-redux"; // Assuming you're using Redux for state management

const socket = io.connect("http://localhost:5000"); // Update with your server URL

export default function ChatRoom () {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const user = useSelector((state) => state.user); // Update according to your state management

  useEffect(() => {
    socket.on("chatMessage", (msg) => {
      setMessages((prevMessages) => [...prevMessages, msg]);
    });
  }, []);

  const sendMessage = (e) => {
    e.preventDefault();
    socket.emit("chatMessage", { user: user.username, message });
    setMessage("");
  };

  return (
    <div className="flex flex-col h-screen">
      <div className="flex-1 overflow-auto p-4">
        {messages.map((msg, index) => (
          <div key={index} className="mb-2 p-2 bg-gray-100 rounded-md">
            <p>
              <strong>{msg.user}:</strong> {msg.message}
            </p>
          </div>
        ))}
      </div>
      <div className="p-4 bg-gray-200">
        <form onSubmit={sendMessage} className="flex">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="flex-1 border border-gray-300 rounded-md p-2"
            placeholder="Type a message..."
            required
          />
          <button
            type="submit"
            className="ml-2 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
};
