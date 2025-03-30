import { useRouter } from 'next/router';
import { useEffect } from 'react';

// Prevent server-side rendering issues with Privy
export const config = {
  unstable_runtimeJS: true
};

export default function Dashboard() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <header className="border-b border-white/20 p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold">rolodexterLABS Dashboard</h1>
          <button
            onClick={() => router.push('/')}
            className="px-4 py-2 border border-white hover:bg-white hover:text-black transition-colors rounded-lg"
          >
            Back to Home
          </button>
        </div>
      </header>

      <main className="flex-1 container mx-auto p-6">
        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4">Welcome to rolodexterLABS</h2>
          <div className="bg-white/5 p-4 rounded-lg">
            <p className="text-lg mb-2">
              <strong>Note:</strong> Authentication is temporarily disabled for maintenance.
            </p>
            <p className="text-sm opacity-70 mb-4">
              We're currently working on improving our authentication system.
            </p>
          </div>
        </section>

        <section className="mb-10">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">Connected Wallets</h2>
            <button
              className="px-4 py-2 bg-white text-black hover:bg-white/90 transition-colors rounded-lg"
              disabled
            >
              Connect Wallet (Unavailable)
            </button>
          </div>

          <div className="bg-white/5 p-6 rounded-lg text-center">
            <p className="text-gray-400">Wallet functionality is temporarily unavailable</p>
            <p className="mt-2 text-sm text-gray-500">
              Please check back later when our authentication system has been updated.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">Account Settings</h2>
          <div className="bg-white/5 p-6 rounded-lg">
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2">Login Methods</h3>
              <p className="text-sm opacity-70 mb-4">
                All login methods are temporarily disabled for maintenance.
              </p>
              
              <div className="grid gap-3 md:grid-cols-2">
                <button
                  disabled
                  className="px-4 py-3 border border-gray-600 text-gray-400 rounded-lg cursor-not-allowed"
                >
                  Link Google Account
                </button>
                <button
                  disabled
                  className="px-4 py-3 border border-gray-600 text-gray-400 rounded-lg cursor-not-allowed"
                >
                  Link GitHub Account
                </button>
                <button
                  disabled
                  className="px-4 py-3 border border-gray-600 text-gray-400 rounded-lg cursor-not-allowed"
                >
                  Link Twitter Account
                </button>
                <button
                  disabled
                  className="px-4 py-3 border border-gray-600 text-gray-400 rounded-lg cursor-not-allowed"
                >
                  Link Wallet
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/20 p-4 text-center text-sm opacity-70">
        <p>&copy; 2025 rolodexterLABS. All rights reserved.</p>
      </footer>
    </div>
  );
}