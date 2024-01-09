import React, { useState } from 'react';
// import axios from 'axios';
import './Chatbot.css';
import FileUploadButton from './FileUploadButton';

const Chatbot = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);


  return (
    <div className="chatbot-container">
      <div className="chatbot-messages">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`message ${message.user ? 'user-message' : 'ai-message'}`}
          >
            {message.text}
          </div>
        ))}
      </div>
      <div>
        <FileUploadButton/>
        <form className="chatbot-input-form" > 
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
        />
        <button type="submit">Send</button>
        </form>
      </div>
      
      
    </div>
  );
};
export default Chatbot;