import { usePrivy } from '@privy-io/react-auth';
import { useEffect } from 'react';
import Link from 'next/link';

export default function Login() {
  const { login, authenticated, user, logout, ready } = usePrivy();

  // Debug logs for Privy state
  useEffect(() => {
    if (ready) {
      console.log("Privy authenticated:", authenticated);
      if (authenticated && user) {
        console.log("User object:", user);
      }
    }
  }, [ready, authenticated, user]);

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      <div className="w-full max-w-md space-y-8 p-8">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-bold">rolodexterLABS</h2>
          <p className="mt-2 text-sm opacity-60">AI-Driven Intelligence & Automated Workflows</p>
        </div>

        {authenticated ? (
          <div className="mt-8 space-y-5">
            <div className="bg-white/5 p-4 rounded-lg">
              <h3 className="text-xl font-semibold mb-2">Logged In Successfully</h3>
              <p className="mb-2">Welcome, <strong>{getUserDisplayName(user)}</strong>!</p>
              <p className="text-sm opacity-70">
                Login method: {getLoginMethod(user)}
              </p>
            </div>
            
            <div className="flex flex-col items-center gap-3">
              <Link href="/dashboard" className="w-full flex items-center justify-center px-4 py-3 bg-white text-black hover:bg-white/90 transition-colors rounded-lg">
                Go to Dashboard
              </Link>
              <button
                onClick={logout}
                className="w-full flex items-center justify-center px-4 py-3 border border-white hover:bg-white hover:text-black transition-colors rounded-lg"
              >
                Sign Out
              </button>
            </div>
          </div>
        ) : (
          <div className="mt-8 space-y-3">
            <button
              onClick={login}
              className="w-full flex items-center justify-center px-4 py-3 bg-white text-black hover:bg-white/90 transition-colors rounded-lg"
            >
              Sign in with Privy
            </button>
            <Link href="/" className="w-full flex items-center justify-center px-4 py-3 border border-white hover:bg-white hover:text-black transition-colors rounded-lg">
              Back to Home
            </Link>
          </div>
        )}

        <div className="mt-8 text-center text-sm">
          <p className="opacity-60">
            By signing in, you agree to our Terms of Service and Privacy Policy
          </p>
        </div>
      </div>
    </div>
  );
}

function getUserDisplayName(user) {
  if (!user) return 'User';
  
  // Try to get the most user-friendly display name
  return user.email || 
         user.twitter?.username || 
         user.github?.username || 
         user.telegram?.username || 
         user.wallet?.address?.substring(0, 8) + '...' || 
         'User';
}

function getLoginMethod(user) {
  if (!user) return 'Unknown';
  if (user.email) return 'Email';
  if (user.google) return 'Google';
  if (user.github) return 'GitHub';
  if (user.twitter) return 'Twitter';
  if (user.telegram) return 'Telegram';
  if (user.wallet) return `Wallet (${user.wallet.walletClient || 'External'})`;
  return 'Other method';
}