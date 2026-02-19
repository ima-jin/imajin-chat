import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen py-16 px-6">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-light tracking-tight mb-4">Imajin Chat</h1>
        <p className="text-xl text-gray-400 mb-8">
          Sovereign messaging for the trust network.
        </p>
        
        <div className="space-y-4 text-gray-300">
          <p>End-to-end encrypted. No data mining. Your conversations belong to you.</p>
          
          <div className="pt-8 space-y-2">
            <h2 className="text-lg font-medium text-white">Features</h2>
            <ul className="list-disc list-inside space-y-1 text-gray-400">
              <li>Direct messages between DIDs</li>
              <li>Group conversations with role-based permissions</li>
              <li>Cross-trust-graph collaboration spaces</li>
              <li>End-to-end encryption</li>
            </ul>
          </div>
          
          <div className="pt-8">
            <Link
              href="/new"
              className="inline-block px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-medium rounded-lg transition-colors"
            >
              Start a Conversation
            </Link>
          </div>
        </div>
        
        <p className="mt-16 text-sm text-gray-500">
          Part of the <a href="https://imajin.ai" className="text-orange-400 hover:text-orange-300">Imajin</a> sovereign network.
        </p>
      </div>
    </main>
  );
}
