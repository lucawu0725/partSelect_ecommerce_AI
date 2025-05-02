import React, { useState } from 'react';

export default function MessageInput({ onSend }) {
  const [input, setInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    onSend(input);
    setInput('');
  };

  return (
    <form onSubmit={handleSubmit} className="flex p-3 border-t bg-white">
      <input
        className="flex-1 border border-gray-300 rounded-l-full px-4 py-2 text-sm"
        placeholder="Type your message..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button type="submit" className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-r-full text-sm">
        ➤
      </button>
    </form>
  );
}
