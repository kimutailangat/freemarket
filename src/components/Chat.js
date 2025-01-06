import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";
import axios from "../services/axios";

const socket = io("http://localhost:5000"); // Update URL in production

const Chat = ({ senderId, receiverId }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  // Fetch messages from server
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get(`/messages/${senderId}/${receiverId}`);
        setMessages(response.data);
      } catch (error) {
        console.error("Error fetching messages", error);
      }
    };
    fetchMessages();
  }, [senderId, receiverId]);

  // Listen for real-time messages
  useEffect(() => {
    socket.on("receiveMessage", (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });
    return () => socket.off("receiveMessage");
  }, []);

  // Send message
  const handleSendMessage = () => {
    const message = { senderId, receiverId, content: newMessage };
    socket.emit("sendMessage", message);
    axios.post("/messages", message); // Save message to database
    setMessages((prevMessages) => [...prevMessages, message]);
    setNewMessage("");
  };

  return (
    <div>
      <div>
        <h2>Chat</h2>
        <div>
          {messages.map((msg, index) => (
            <p key={index}>
              <strong>{msg.senderId === senderId ? "You" : "Other"}:</strong> {msg.content}
            </p>
          ))}
        </div>
      </div>
      <div>
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type your message"
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  );
};

export default Chat;
