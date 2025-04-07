import { usePrivy } from '@privy-io/react-auth';
import { MouseEvent, useEffect, useState } from 'react';
import Link from 'next/link';

export function LoginButton() {
  // Default to not authenticated before Privy is ready
  const { login, logout, authenticated = false, ready } = usePrivy();
  const [isClient, setIsClient] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Use this to ensure we're rendering on client side
  useEffect(() => {
    setIsClient(true);

    // Debug Privy setup
    console.log('Privy ready:', ready);
    console.log('Login function available:', !!login);
    console.log('Authenticated state:', authenticated);
    console.log('Privy App ID:', process.env.NEXT_PUBLIC_PRIVY_APP_ID);
  }, [ready, login, authenticated]);

  // If not on client, show a default login button
  if (!isClient) {
    return (
      <button className="text-sm bg-white border border-gray-300 rounded-md px-4 py-2 text-gray-700 hover:text-black hover:border-black transition-colors">
        Login
      </button>
    );
  }

  // If Privy is not ready yet, show a loading state
  if (!ready) {
    return (
      <button
        disabled
        className="text-sm bg-gray-100 border border-gray-300 rounded-md px-4 py-2 text-gray-500 cursor-not-allowed"
      >
        Loading...
      </button>
    );
  }

  const handleClick = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    console.log('Login button clicked');

    try {
      setIsLoading(true);

      if (authenticated) {
        console.log('Attempting to log out...');
        await logout?.();
      } else {
        console.log('Attempting to log in...', login);
        // Check if login function exists
        if (typeof login !== 'function') {
          console.error('Login function not available');
          alert('Login functionality not available. Please check console for details.');
          return;
        }
        await login();
      }
    } catch (error) {
      console.error('Authentication error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={isLoading}
      className={`text-sm bg-white border border-gray-300 rounded-md px-4 py-2 text-gray-700 hover:text-black hover:border-black transition-colors ${isLoading ? 'opacity-75 cursor-wait' : ''} ${!login ? 'cursor-not-allowed opacity-60' : 'hover:bg-gray-100'}`}
    >
      {isLoading ? 'Processing...' : authenticated ? 'Sign Out' : 'Login'}
    </button>
  );
}
