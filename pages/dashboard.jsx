import { usePrivy } from '@privy-io/react-auth';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

// Prevent server-side rendering issues with Privy
export const config = {
  unstable_runtimeJS: true
};

export default function Dashboard() {
  const [isPrivyAvailable, setIsPrivyAvailable] = useState(true);
  const router = useRouter();
  
  // Default empty state for Privy hooks
  let privyHook = { 
    ready: false, 
    authenticated: false, 
    user: null, 
    logout: () => {}, 
    connectWallet: () => {}, 
    linkWallet: () => {}, 
    unlinkWallet: () => {} 
  };
  
  try {
    privyHook = usePrivy();
  } catch (error) {
    if (isPrivyAvailable) {
      console.error("Privy hook unavailable:", error);
      setIsPrivyAvailable(false);
    }
  }
  
  const { ready, authenticated, user, logout, connectWallet, linkWallet, unlinkWallet } = privyHook;

  // Redirect to login if not authenticated
  useEffect(() => {
    if (ready && !authenticated) {
      router.push('/login');
    }
  }, [ready, authenticated, router]);

  // Handle loading state for both server-rendering and client-side
  if (!isPrivyAvailable || !ready || !authenticated) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  const wallets = user?.linkedAccounts?.filter((account) => account.type === 'wallet') || [];

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <header className="border-b border-white/20 p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold">rolodexterLABS Dashboard</h1>
          <button
            onClick={logout}
            className="px-4 py-2 border border-white hover:bg-white hover:text-black transition-colors rounded-lg"
          >
            Logout
          </button>
        </div>
      </header>

      <main className="flex-1 container mx-auto p-6">
        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4">Welcome to rolodexterLABS</h2>
          <div className="bg-white/5 p-4 rounded-lg">
            <p className="text-lg mb-2">
              <strong>User:</strong> {user?.email || user?.wallet?.address || 'Anonymous'}
            </p>
            <p className="text-sm opacity-70 mb-4">
              You're logged in with: {getLoginMethod(user)}
            </p>
          </div>
        </section>

        <section className="mb-10">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">Connected Wallets</h2>
            <button
              onClick={connectWallet}
              className="px-4 py-2 bg-white text-black hover:bg-white/90 transition-colors rounded-lg"
            >
              Connect Wallet
            </button>
          </div>

          {wallets.length === 0 ? (
            <div className="bg-white/5 p-6 rounded-lg text-center">
              <p className="text-gray-400">No wallets connected yet</p>
              <button
                onClick={connectWallet}
                className="mt-4 px-4 py-2 border border-white hover:bg-white hover:text-black transition-colors rounded-lg"
              >
                Connect a Wallet
              </button>
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2">
              {wallets.map((wallet) => (
                <div key={wallet.address} className="bg-white/5 p-4 rounded-lg">
                  <div className="flex justify-between items-start mb-2">
                    <p className="font-semibold">
                      {wallet.walletClient || 'External Wallet'}
                    </p>
                    <button
                      onClick={() => unlinkWallet(wallet.address)}
                      className="text-sm text-red-400 hover:text-red-300"
                    >
                      Disconnect
                    </button>
                  </div>
                  <p className="text-sm font-mono bg-black/30 p-2 rounded overflow-auto">
                    {wallet.address}
                  </p>
                </div>
              ))}
            </div>
          )}
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">Account Settings</h2>
          <div className="bg-white/5 p-6 rounded-lg">
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2">Login Methods</h3>
              <p className="text-sm opacity-70 mb-4">
                You can link multiple login methods to your account for easier access.
              </p>
              
              <div className="grid gap-3 md:grid-cols-2">
                <button
                  onClick={() => linkWallet('google')}
                  className="px-4 py-3 border border-white hover:bg-white hover:text-black transition-colors rounded-lg"
                >
                  Link Google Account
                </button>
                <button
                  onClick={() => linkWallet('github')}
                  className="px-4 py-3 border border-white hover:bg-white hover:text-black transition-colors rounded-lg"
                >
                  Link GitHub Account
                </button>
                <button
                  onClick={() => linkWallet('twitter')}
                  className="px-4 py-3 border border-white hover:bg-white hover:text-black transition-colors rounded-lg"
                >
                  Link Twitter Account
                </button>
                <button
                  onClick={connectWallet}
                  className="px-4 py-3 border border-white hover:bg-white hover:text-black transition-colors rounded-lg"
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

function getLoginMethod(user) {
  if (user?.email) return 'Email';
  if (user?.wallet) return `Wallet (${user.wallet.walletClient || 'External'})`;
  if (user?.google) return 'Google';
  if (user?.github) return 'GitHub';
  if (user?.twitter) return 'Twitter';
  if (user?.telegram) return 'Telegram';
  return 'Unknown method';
}