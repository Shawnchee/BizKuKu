'use client'

import React, { useState, useRef, useEffect } from 'react';
import { X, MessageCircle, Send, SquarePen } from 'lucide-react';

const initialMessages = [
  { from: 'bot', text: 'Hi! 👋 How can I help you with your business support today?' }
];

const Chatbot: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, open]);

  // Edit button: for demo, just clears chat (like new chat)
  const handleEdit = () => {
    setMessages(initialMessages);
    setInput('');
  };

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages((msgs) => [
      ...msgs,
      { from: 'user', text: input }
    ]);
    setTimeout(() => {
      setMessages((msgs) => [
        ...msgs,
        { from: 'bot', text: "I'm just a demo chatbot for now! Please contact our support for more help." }
      ]);
    }, 800);
    setInput('');
  };

  return (
    <>
      {/* Floating Button */}
      {!open && (
        <button
          className="fixed bottom-12 right-12 z-50 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg p-4 flex items-center justify-center transition"
          onClick={() => setOpen(true)}
          aria-label="Open chatbot"
        >
          <MessageCircle className="h-6 w-6" />
        </button>
      )}
      {/* Chat Window */}
      {open && (
        <div className="fixed bottom-12 right-12 z-50 w-80 max-w-[95vw] h-96 bg-white rounded-2xl shadow-2xl border border-gray-200 flex flex-col overflow-hidden animate-fade-in">
          {/* Header */}
          <div className="relative flex items-center justify-center bg-blue-600 text-white px-4 py-3">
            {/* Edit button (left) */}
            <button
              onClick={handleEdit}
              aria-label="Edit chat"
              title="Edit chat session"
              className="absolute left-4 hover:bg-blue-700 rounded-full p-1 transition"
            >
              <SquarePen className="h-5 w-5" />
            </button>
            {/* Title (centered) */}
            <span className="font-semibold text-base flex items-center gap-2">
              BizzKu AI
            </span>
            {/* Close button (right) */}
            <button
              onClick={() => setOpen(false)}
              aria-label="Close chatbot"
              className="absolute right-4"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          {/* Messages */}
          <div className="flex-1 px-3 py-2 overflow-y-auto bg-gray-50" style={{ maxHeight: 'calc(24rem - 56px - 48px)' }}>
            {messages.map((msg, idx) => (
              <div key={idx} className={`mb-2 flex ${msg.from === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`px-3 py-2 rounded-lg text-sm max-w-[80%] ${msg.from === 'user' ? 'bg-blue-600 text-white' : 'bg-white border border-gray-200 text-gray-800'}`}>
                  {msg.text}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          {/* Input */}
          <form
            className="flex items-center gap-2 border-t border-gray-200 bg-white px-3 py-2"
            onSubmit={e => { e.preventDefault(); handleSend(); }}
          >
            <input
              className="flex-1 rounded-full border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="text"
              placeholder="Type your message..."
              value={input}
              onChange={e => setInput(e.target.value)}
              autoFocus={open}
            />
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white rounded-full p-2 transition disabled:opacity-50"
              disabled={!input.trim()}
              aria-label="Send message"
            >
              <Send className="h-4 w-4" />
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default Chatbot; 