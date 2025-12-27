// src/components/ChatBot.jsx
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMessageCircle, FiSend, FiX, FiMinimize, FiMaximize } from 'react-icons/fi';
import './ChatBot.css';

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, text: "Hello! I'm your AI assistant. How can I help you today?", isBot: true }
  ]);
  const [input, setInput] = useState('');

  const toggleChat = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setIsMinimized(false);
    }
  };

  const minimizeChat = () => {
    setIsMinimized(!isMinimized);
  };

  const closeChat = () => {
    setIsOpen(false);
    setIsMinimized(false);
  };

  const sendMessage = () => {
    if (!input.trim()) return;
    
    // Add user message
    const userMessage = { 
      id: Date.now(), 
      text: input, 
      isBot: false 
    };
    setMessages(prev => [...prev, userMessage]);
    
    // Clear input
    setInput('');
    
    // Scroll to bottom of messages
    setTimeout(() => {
      const messagesContainer = document.querySelector('.chatbot-messages');
      if (messagesContainer) {
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
      }
    }, 50);
    
    // Simulate bot response
    setTimeout(() => {
      const responses = [
        "Thanks for your message! I'm an AI assistant. You can ask me about projects, skills, or contact information.",
        "I can help you learn more about this portfolio! What would you like to know?",
        "Feel free to ask me anything about the developer's experience, projects, or technical skills.",
        "I'm here to assist you! You can ask about work experience, education, or specific technologies."
      ];
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      
      setMessages(prev => [...prev, { 
        id: Date.now() + 1, 
        text: randomResponse, 
        isBot: true 
      }]);
    }, 1000);
  };

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    if (messages.length > 1) {
      const messagesContainer = document.querySelector('.chatbot-messages');
      if (messagesContainer) {
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
      }
    }
  }, [messages]);

  return (
    <>
      {/* Chat Icon Button */}
      <motion.button
        className="chatbot-icon-btn"
        onClick={toggleChat}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <FiMessageCircle className="chat-icon" />
        {isOpen && (
          <span className="chat-notification-dot"></span>
        )}
      </motion.button>

      {/* Chatbot Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className={`chatbot-container ${isMinimized ? 'minimized' : ''}`}
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ 
              opacity: 1, 
              scale: 1, 
              y: 0,
              height: isMinimized ? '60px' : '500px'
            }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ type: "spring", damping: 25 }}
          >
            <div className="chatbot-header">
              <div className="chatbot-title">
                <FiMessageCircle />
                <span>AI Assistant</span>
                {messages.length > 1 && (
                  <span className="message-count">{messages.filter(m => !m.isBot).length}</span>
                )}
              </div>
              <div className="chatbot-controls">
                <button 
                  className="chatbot-minimize" 
                  onClick={minimizeChat}
                  aria-label={isMinimized ? "Maximize chat" : "Minimize chat"}
                >
                  {isMinimized ? <FiMaximize /> : <FiMinimize />}
                </button>
                <button 
                  className="chatbot-close" 
                  onClick={closeChat}
                  aria-label="Close chat"
                >
                  <FiX />
                </button>
              </div>
            </div>

            {!isMinimized && (
              <>
                <div className="chatbot-messages">
                  {messages.map(msg => (
                    <motion.div
                      key={msg.id}
                      className={`message ${msg.isBot ? 'bot' : 'user'}`}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="message-content">
                        {msg.text}
                      </div>
                      <div className="message-time">
                        {msg.isBot ? 'AI Assistant' : 'You'}
                      </div>
                    </motion.div>
                  ))}
                </div>

                <div className="chatbot-input">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Type your message..."
                    onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                    autoFocus
                  />
                  <button 
                    className="send-btn" 
                    onClick={sendMessage}
                    disabled={!input.trim()}
                  >
                    <FiSend />
                  </button>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatBot;