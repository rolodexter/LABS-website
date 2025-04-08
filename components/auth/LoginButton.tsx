import { usePrivy } from '@privy-io/react-auth';
import { MouseEvent, useEffect, useState } from 'react';
import Link from 'next/link';

export function LoginButton() {
  // Default to not authenticated before Privy is ready
  const { login, logout, authenticated = false, ready } = usePrivy();
  const [isClient, setIsClient] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  // Use this to ensure we're rendering on client side
  useEffect(() => {
    try {
      // Check if we're in an iframe (cross-origin context)
      if (typeof window !== 'undefined' && window.top !== window.self) {
        console.warn('LoginButton is running inside an iframe. Some wallet features may be limited.');
        return;
      }

      setIsClient(true);

      // Safe wallet detection
      if (typeof window !== 'undefined') {
        try {
          // Safely check for ethereum provider
          const hasEthereum = Boolean(window.ethereum);
          console.log('Ethereum provider detected:', hasEthereum);
        } catch (err) {
          console.warn('Error detecting ethereum provider:', err);
          // Continue without ethereum - will fall back to other login methods
        }
      }

      // Debug Privy setup
      console.log('Privy ready:', ready);
      console.log('Login function available:', !!login);
      console.log('Authenticated state:', authenticated);
      console.log('Privy App ID:', process.env.NEXT_PUBLIC_PRIVY_APP_ID);
    } catch (error) {
      console.error('Error initializing wallet connection:', error);
      setHasError(true);
    }
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
      // Reset error state on new attempt
      setHasError(false);
      setIsLoading(true);

      // Check for cross-origin context
      if (typeof window !== 'undefined' && window.top !== window.self) {
        throw new Error('Cannot initialize wallet in an iframe due to security restrictions');
      }

      if (authenticated) {
        console.log('Attempting to log out...');
        await logout?.();
      } else {
        console.log('Attempting to log in...', login);
        // Check if login function exists
        if (typeof login !== 'function') {
          console.error('Login function not available');
          throw new Error('Login functionality not available');
        }

        // Try to initialize wallet connection safely
        await login();
      }
    } catch (error) {
      console.error('Authentication error:', error);
      setHasError(true);
      
      // Don't show alert in production to maintain minimalist UX
      if (process.env.NODE_ENV !== 'production') {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error during authentication';
        console.warn(`Authentication failed: ${errorMessage}`);
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Show error state if needed
  if (hasError) {
    return (
      <button
        onClick={() => setHasError(false)} // Allow retry
        className="text-sm bg-white border border-gray-300 rounded-md px-4 py-2 text-gray-700 hover:text-black hover:border-black transition-colors"
      >
        Try Again
      </button>
    );
  }

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
