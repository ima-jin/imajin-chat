/**
 * Message Thread
 * /conversations/[id]
 */

'use client';

import { useState } from 'react';
import Link from 'next/link';

interface Message {
  id: string;
  sender: string;
  text: string;
  timestamp: Date;
  isOwn: boolean;
}

// Mock data
const mockConversation = {
  id: 'conv_1',
  name: 'Jin Launch Planning',
  isGroup: true,
  participants: ['@ryan', '@kirstie', '@jin'],
};

const mockMessages: Message[] = [
  {
    id: 'msg_1',
    sender: '@ryan',
    text: 'Hey team! Let\'s start planning the launch party details.',
    timestamp: new Date('2026-02-20T09:00:00'),
    isOwn: false,
  },
  {
    id: 'msg_2',
    sender: '@kirstie',
    text: 'Sounds good! What\'s the capacity we\'re looking at?',
    timestamp: new Date('2026-02-20T09:05:00'),
    isOwn: false,
  },
  {
    id: 'msg_3',
    sender: '@jin',
    text: 'Based on the ticket tiers: unlimited virtual, 500 physical. But we only book a venue if we hit 40+ physical tickets.',
    timestamp: new Date('2026-02-20T09:10:00'),
    isOwn: true,
  },
  {
    id: 'msg_4',
    sender: '@ryan',
    text: 'Perfect. Let\'s finalize the venue decision by Friday',
    timestamp: new Date('2026-02-20T10:30:00'),
    isOwn: false,
  },
];

function formatMessageTime(date: Date): string {
  return date.toLocaleTimeString('en-US', { 
    hour: 'numeric', 
    minute: '2-digit',
  });
}

function formatDateDivider(date: Date): string {
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  
  if (date.toDateString() === today.toDateString()) return 'Today';
  if (date.toDateString() === yesterday.toDateString()) return 'Yesterday';
  return date.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' });
}

export default function MessageThreadPage({ params }: { params: { id: string } }) {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState(mockMessages);
  
  const handleSend = () => {
    if (!message.trim()) return;
    
    const newMessage: Message = {
      id: `msg_${Date.now()}`,
      sender: '@you',
      text: message,
      timestamp: new Date(),
      isOwn: true,
    };
    
    setMessages([...messages, newMessage]);
    setMessage('');
  };
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };
  
  return (
    <div className="max-w-2xl mx-auto flex flex-col h-[calc(100vh-200px)]">
      {/* Header */}
      <div className="flex items-center gap-4 pb-4 border-b border-gray-200 dark:border-gray-700">
        <Link 
          href="/conversations" 
          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition"
        >
          ← Back
        </Link>
        <div className="flex-1">
          <h1 className="font-semibold">{mockConversation.name || 'Direct Message'}</h1>
          <p className="text-sm text-gray-500">
            {mockConversation.participants.join(', ')}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition" title="Search">
            🔍
          </button>
          <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition" title="Info">
            ℹ️
          </button>
        </div>
      </div>
      
      {/* Messages */}
      <div className="flex-1 overflow-y-auto py-4 space-y-4">
        {messages.map((msg, index) => {
          // Check if we need a date divider
          const prevMsg = messages[index - 1];
          const showDateDivider = !prevMsg || 
            msg.timestamp.toDateString() !== prevMsg.timestamp.toDateString();
          
          return (
            <div key={msg.id}>
              {showDateDivider && (
                <div className="flex items-center justify-center my-4">
                  <span className="px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded-full text-xs text-gray-500">
                    {formatDateDivider(msg.timestamp)}
                  </span>
                </div>
              )}
              
              <div className={`flex ${msg.isOwn ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[70%] ${msg.isOwn ? 'order-1' : ''}`}>
                  {/* Sender name (for group chats, not own messages) */}
                  {mockConversation.isGroup && !msg.isOwn && (
                    <p className="text-xs text-gray-500 mb-1 ml-3">{msg.sender}</p>
                  )}
                  
                  <div className={`px-4 py-2 rounded-2xl ${
                    msg.isOwn
                      ? 'bg-orange-500 text-white rounded-br-md'
                      : 'bg-gray-100 dark:bg-gray-800 rounded-bl-md'
                  }`}>
                    <p className="text-sm whitespace-pre-wrap">{msg.text}</p>
                  </div>
                  
                  <p className={`text-xs text-gray-400 mt-1 ${msg.isOwn ? 'text-right mr-1' : 'ml-3'}`}>
                    {formatMessageTime(msg.timestamp)}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      
      {/* Input */}
      <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
        <div className="flex items-end gap-2">
          <div className="flex-1 bg-gray-100 dark:bg-gray-800 rounded-2xl px-4 py-2">
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type a message..."
              className="w-full bg-transparent resize-none outline-none text-sm max-h-32"
              rows={1}
            />
          </div>
          <button
            onClick={handleSend}
            disabled={!message.trim()}
            className={`p-3 rounded-full transition ${
              message.trim()
                ? 'bg-orange-500 text-white hover:bg-orange-600'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-400'
            }`}
          >
            ➤
          </button>
        </div>
        <p className="text-xs text-gray-400 text-center mt-2">
          🔒 End-to-end encrypted
        </p>
      </div>
    </div>
  );
}
