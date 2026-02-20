/**
 * Conversation List
 * /conversations
 */

import Link from 'next/link';

// Mock data - will be replaced with real API calls
const mockConversations = [
  {
    id: 'conv_1',
    name: 'Jin Launch Planning',
    isGroup: true,
    participants: ['@ryan', '@kirstie', '@jin'],
    lastMessage: {
      sender: '@ryan',
      text: 'Let\'s finalize the venue decision by Friday',
      timestamp: new Date('2026-02-20T10:30:00'),
    },
    unread: 2,
  },
  {
    id: 'conv_2',
    name: null,
    isGroup: false,
    participants: ['@debbie'],
    lastMessage: {
      sender: '@debbie',
      text: 'Sounds good! See you tonight 💕',
      timestamp: new Date('2026-02-20T09:15:00'),
    },
    unread: 0,
  },
  {
    id: 'conv_3',
    name: 'Imajin Dev',
    isGroup: true,
    participants: ['@ryan', '@jin', '@codex'],
    lastMessage: {
      sender: '@jin',
      text: 'Deployed the nav bar to all services',
      timestamp: new Date('2026-02-20T14:10:00'),
    },
    unread: 0,
  },
];

function formatTime(date: Date): string {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);
  
  if (diffMins < 1) return 'now';
  if (diffMins < 60) return `${diffMins}m`;
  if (diffHours < 24) return `${diffHours}h`;
  if (diffDays < 7) return `${diffDays}d`;
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

function getDisplayName(conv: typeof mockConversations[0]): string {
  if (conv.name) return conv.name;
  // For DMs, show the other participant
  return conv.participants[0];
}

export default function ConversationsPage() {
  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Messages</h1>
        <button className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition text-sm font-medium">
          New Chat
        </button>
      </div>
      
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
        {mockConversations.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            <p className="mb-4">No conversations yet.</p>
            <button className="text-orange-500 hover:underline">
              Start a new chat
            </button>
          </div>
        ) : (
          <div className="divide-y divide-gray-100 dark:divide-gray-700">
            {mockConversations.map((conv) => (
              <Link
                key={conv.id}
                href={`/conversations/${conv.id}`}
                className="flex items-center gap-4 p-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition"
              >
                {/* Avatar */}
                <div className={`w-12 h-12 rounded-full flex items-center justify-center text-lg font-semibold ${
                  conv.isGroup 
                    ? 'bg-orange-100 dark:bg-orange-900/30 text-orange-600' 
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
                }`}>
                  {conv.isGroup ? '👥' : conv.participants[0].slice(1, 2).toUpperCase()}
                </div>
                
                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className={`font-medium truncate ${conv.unread > 0 ? 'text-gray-900 dark:text-white' : 'text-gray-700 dark:text-gray-300'}`}>
                      {getDisplayName(conv)}
                    </span>
                    <span className="text-xs text-gray-500 ml-2 flex-shrink-0">
                      {formatTime(conv.lastMessage.timestamp)}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <p className={`text-sm truncate ${conv.unread > 0 ? 'text-gray-900 dark:text-gray-200 font-medium' : 'text-gray-500'}`}>
                      {conv.isGroup && (
                        <span className="text-gray-400">{conv.lastMessage.sender}: </span>
                      )}
                      {conv.lastMessage.text}
                    </p>
                    {conv.unread > 0 && (
                      <span className="flex-shrink-0 w-5 h-5 bg-orange-500 text-white text-xs rounded-full flex items-center justify-center font-medium">
                        {conv.unread}
                      </span>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
      
      {/* Encryption notice */}
      <p className="text-center text-sm text-gray-500 mt-6">
        🔒 All messages are end-to-end encrypted
      </p>
    </div>
  );
}
