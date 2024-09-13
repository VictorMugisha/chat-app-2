/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import io from "socket.io-client";
import { getChatMessages, sendMessage } from "../services/api";
import ChatMessage from "../components/ChatMessage";

const socket = io("http://localhost:5000"); // Replace with your backend URL

export default function ChatRoom() {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    } else {
      getChatMessages(token).then((data) => {
        if (data.success) {
          setMessages(data.messages);
        } else {
          setError(data.message);
        }
      });
    }

    socket.on("message", (msg) => {
      setMessages((prevMessages) => [...prevMessages, msg]);
    });

    return () => {
      socket.off("message");
    };
  }, [navigate]);

  const handleSendMessage = () => {
    const token = localStorage.getItem("token");
    sendMessage({ message }, token).then((response) => {
      if (response.success) {
        setMessage("");
      } else {
        setError(response.message);
      }
    });
  };

  return (
    <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Chat Room</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <div className="h-60 overflow-y-scroll mb-4">
        {messages.map((msg, index) => (
          <ChatMessage key={index} user={msg.user} message={msg.message} />
        ))}
      </div>
      <div className="flex">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="form-input mt-1 block flex-grow"
        />
        <button
          onClick={handleSendMessage}
          className="bg-blue-500 text-white py-2 px-4 rounded-md ml-2 hover:bg-blue-600"
        >
          Send
        </button>
      </div>
    </div>
  );
}
