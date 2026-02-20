export default function Home() {
  return (
    <div className="max-w-2xl mx-auto text-center">
      <h1 className="text-4xl font-bold mb-4">
        chat.imajin.ai
      </h1>
      
      <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
        Sovereign messaging for the trust network.
        <br />
        End-to-end encrypted. Your conversations belong to you.
      </p>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 mb-8">
        <h2 className="text-2xl font-semibold mb-4">API Endpoints</h2>
        
        <div className="text-left space-y-3 font-mono text-sm">
          <div className="p-3 bg-gray-50 dark:bg-gray-900 rounded">
            <span className="text-green-600 font-bold">POST</span> /api/conversations
            <span className="text-gray-500 ml-2">— Create conversation</span>
          </div>
          
          <div className="p-3 bg-gray-50 dark:bg-gray-900 rounded">
            <span className="text-blue-600 font-bold">GET</span> /api/conversations/:id
            <span className="text-gray-500 ml-2">— Get conversation</span>
          </div>
          
          <div className="p-3 bg-gray-50 dark:bg-gray-900 rounded">
            <span className="text-green-600 font-bold">POST</span> /api/conversations/:id/messages
            <span className="text-gray-500 ml-2">— Send message</span>
          </div>
          
          <div className="p-3 bg-gray-50 dark:bg-gray-900 rounded">
            <span className="text-blue-600 font-bold">GET</span> /api/conversations/:id/messages
            <span className="text-gray-500 ml-2">— Get messages</span>
          </div>
          
          <div className="p-3 bg-gray-50 dark:bg-gray-900 rounded">
            <span className="text-green-600 font-bold">POST</span> /api/invites
            <span className="text-gray-500 ml-2">— Create invite</span>
          </div>
          
          <div className="p-3 bg-gray-50 dark:bg-gray-900 rounded">
            <span className="text-green-600 font-bold">POST</span> /api/keys
            <span className="text-gray-500 ml-2">— Register E2EE key</span>
          </div>
          
          <div className="p-3 bg-gray-50 dark:bg-gray-900 rounded">
            <span className="text-blue-600 font-bold">GET</span> /api/keys/:did
            <span className="text-gray-500 ml-2">— Get user&apos;s public key</span>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 mb-8">
        <h2 className="text-2xl font-semibold mb-4">Features</h2>
        
        <ul className="text-left space-y-2 text-gray-600 dark:text-gray-400">
          <li>✓ Direct messages between DIDs</li>
          <li>✓ Group conversations with role-based permissions</li>
          <li>✓ Cross-trust-graph collaboration spaces</li>
          <li>✓ End-to-end encryption (X25519 + XChaCha20-Poly1305)</li>
        </ul>
      </div>

      <div className="text-gray-500 text-sm">
        <p>Part of the <a href="https://imajin.ai" className="text-orange-500 hover:underline">Imajin</a> sovereign stack</p>
        <p className="mt-2">
          <a href="https://github.com/ima-jin/imajin-chat" className="hover:underline">GitHub</a>
          {' · '}
          <a href="https://docs.imajin.ai" className="hover:underline">Docs</a>
        </p>
      </div>
    </div>
  );
}
