'use client'

import React, { useState, useRef, useEffect } from 'react';
import { X, MessageCircle, Send, SquarePen, Maximize2, Minimize2 } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { useLanguage } from '@/contexts/LanguageContext';

const API_URL = process.env.NODE_ENV === 'development' ? 'http://localhost:8000/api/chat' : '/api/chat';

const Chatbot: React.FC = () => {
  const { t, language } = useLanguage();

  // Create initial messages using translation
  const getInitialMessages = () => [
    { role: 'model', content: t('chatbot.greeting') }
  ];

  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState(getInitialMessages());
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [expanded, setExpanded] = useState(false);

  // Update greeting message when language changes
  useEffect(() => {
    setMessages(getInitialMessages());
  }, [language]);

  // Shift body when expanded
  useEffect(() => {
    if (expanded) {
      document.body.classList.add('chatbot-expanded');
    } else {
      document.body.classList.remove('chatbot-expanded');
    }
    return () => {
      document.body.classList.remove('chatbot-expanded');
    };
  }, [expanded]);

  useEffect(() => {
    if (open && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, open]);

  // Edit button: clears chat
  const handleEdit = () => {
    setMessages(getInitialMessages());
    setInput('');
  };

  const handleSend = async () => {
    if (!input.trim() || loading) return;
    const userMsg = { role: 'user', content: input };
    setMessages((msgs) => [...msgs, userMsg]);
    setInput('');
    setLoading(true);
    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: userMsg.content,
          message_history: messages.map(({ role, content }) => ({ role, content })),
        }),
      });
      const data = await res.json();
      const botMsg = { role: 'model', content: data.response };
      setMessages((msgs) => [...msgs, botMsg]);
    } catch (err) {
      setMessages((msgs) => [...msgs, { role: 'model', content: t('chatbot.error') }]);
    } finally {
      setLoading(false);
    }
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
        <div
          className={
            expanded
              ? "fixed top-0 right-0 z-50 h-full w-full sm:w-[380px] max-w-full bg-white rounded-none shadow-2xl border-l border-gray-200 flex flex-col overflow-hidden animate-fade-in pb-2"
              : "fixed bottom-12 right-12 z-50 w-80 max-w-[95vw] h-96 bg-white rounded-2xl shadow-2xl border border-gray-200 flex flex-col overflow-hidden animate-fade-in"
          }
        >
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
              AI Chatbot
            </span>
            {/* Expand/Collapse button */}
            <button
              onClick={() => setExpanded((e) => !e)}
              aria-label={expanded ? "Collapse" : "Expand"}
              className="absolute right-12 hover:bg-blue-700 rounded-full p-1 transition"
            >
              {expanded ? <Minimize2 className="h-5 w-5" /> : <Maximize2 className="h-5 w-5" />}
            </button>
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
          <div className={`flex-1 px-3 py-2 overflow-y-auto bg-gray-50 ${expanded ? '' : ''}`}>
            {messages.map((msg, idx) => (
              <div key={idx} className={`mb-2 flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`px-3 py-2 rounded-lg text-sm max-w-[80%] ${msg.role === 'user' ? 'bg-blue-600 text-white' : 'bg-white border border-gray-200 text-gray-800'}`}>
                  {msg.role === 'model'
                    ? <ReactMarkdown>{msg.content}</ReactMarkdown>
                    : msg.content}
                </div>
              </div>
            ))}
            {loading && (
              <div className="mb-2 flex justify-start">
                <div className="px-3 py-2 rounded-lg text-sm max-w-[80%] bg-white border border-gray-200 text-gray-400 animate-pulse">
                  Thinking...
                </div>
              </div>
            )}
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
              placeholder={t('chatbot.placeholder')}
              value={input}
              onChange={e => setInput(e.target.value)}
              autoFocus={open}
              disabled={loading}
            />
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white rounded-full p-2 transition disabled:opacity-50"
              disabled={!input.trim() || loading}
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