
import React, { useState, useEffect } from 'react';
import MessageList from './MessageList';
import MessageInput from './MessageInput';
import axios from 'axios';

export default function ChatWindow({ onClose }) {
  const [messages, setMessages] = useState([]);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem('chatHistory');
    const savedHistory = localStorage.getItem('chatMemory');
    if (saved) setMessages(JSON.parse(saved));
    if (savedHistory) setHistory(JSON.parse(savedHistory));
  }, []);

  const handleSend = async (userMessage) => {
    const newMessages = [...messages, { from: 'user', text: userMessage }];
    setMessages(newMessages);

    try {
      const res = await axios.post('http://localhost:3001/api/ask', {
        question: userMessage,
        history: history,
      });

      console.log("🧠 AI Full Response:", res.data); // <== LOG IT HERE

      const finalMessages = [
        ...newMessages,
        { from: 'bot', text: res.data.reply, product: res.data.product }
      ];

      setMessages(finalMessages);
      setHistory(res.data.history);
      localStorage.setItem('chatHistory', JSON.stringify(finalMessages));
      localStorage.setItem('chatMemory', JSON.stringify(res.data.history));
    } catch (e) {
      const errorMessages = [...newMessages, { from: 'bot', text: 'Something went wrong 😢' }];
      setMessages(errorMessages);
      localStorage.setItem('chatHistory', JSON.stringify(errorMessages));
    }
  };

  const handleClear = () => {
    setMessages([]);
    setHistory([]);
    localStorage.removeItem('chatHistory');
    localStorage.removeItem('chatMemory');
  };

  return (
    <div
      className="relative flex flex-col shadow-2xl border-4 rounded-2xl"
      style={{
        width: '430px',
        height: '630px',
        backgroundColor: '#e6f0ff',
        borderColor: '#007bff',
        overflow: 'hidden',
      }}
    >
      {/* Header */}
      <div
        className="flex justify-between items-center px-4 py-3 text-white font-semibold rounded-t-2xl"
        style={{ background: 'linear-gradient(to right, #0056b3, #3399ff)' }}
      >
        <span>💬 PartSelect Assistant</span>
        <div className="space-x-2 text-xs rounded-2xl">
          <button onClick={handleClear} className="hover:underline text-white opacity-80">🧹 Clear</button>
          <button onClick={onClose} className="hover:text-blue-200 font-bold text-lg">×</button>
        </div>
      </div>
  
      {/* Scrollable message list */}
      <div
        className="flex-1 px-4 py-3"
        style={{
        overflowY: 'auto',
        height: '90%',
        maxHeight: '90%',
        }}
      >
        <MessageList messages={messages} />
      </div>
  
      {/* Fixed input at bottom inside the window */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          padding: '10px 12px',
          backgroundColor: '#e6f0ff', // match chat window background
          borderTop: '1px solid #ccc',
        }}
      >
        <MessageInput onSend={handleSend} />
      </div>
    </div>
  );
  
}

