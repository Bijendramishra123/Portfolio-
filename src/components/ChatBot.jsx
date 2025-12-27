// src/components/ChatBot.jsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMessageCircle, FiSend, FiX } from 'react-icons/fi';
import './ChatBot.css';

const ChatBot = ({ onClose }) => {
  const [messages, setMessages] = useState([
    { id: 1, text: "Hello! I'm your AI assistant. How can I help you today?", isBot: true }
  ]);
  const [input, setInput] = useState('');

  const sendMessage = () => {
    if (!input.trim()) return;
    
    // Add user message
    setMessages(prev => [...prev, { 
      id: Date.now(), 
      text: input, 
      isBot: false 
    }]);
    
    // Simulate bot response
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        id: Date.now() + 1, 
        text: "Thanks for your message! I'm an AI assistant. You can ask me about projects, skills, or contact information.", 
        isBot: true 
      }]);
    }, 1000);
    
    setInput('');
  };

  return (
    <motion.div
      className="chatbot-container"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
    >
      <div className="chatbot-header">
        <div className="chatbot-title">
          <FiMessageCircle />
          <span>AI Assistant</span>
        </div>
        <button className="chatbot-close" onClick={onClose}>
          <FiX />
        </button>
      </div>

      <div className="chatbot-messages">
        {messages.map(msg => (
          <div
            key={msg.id}
            className={`message ${msg.isBot ? 'bot' : 'user'}`}
          >
            {msg.text}
          </div>
        ))}
      </div>

      <div className="chatbot-input">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
          onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
        />
        <button className="send-btn" onClick={sendMessage}>
          <FiSend />
        </button>
      </div>
    </motion.div>
  );
};

export default ChatBot;