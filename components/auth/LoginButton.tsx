import { usePrivy } from '@privy-io/react-auth';
import { MouseEvent, useEffect, useState } from 'react';
import Link from 'next/link';

export function LoginButton() {
  // Default to not authenticated before Privy is ready
  const { login, logout, authenticated = false, ready } = usePrivy();
  const [isClient, setIsClient] = useState(false);

  // Use this to ensure we're rendering on client side
  useEffect(() => {
    setIsClient(true);
  }, []);

  // If not on client, show a default login button
  if (!isClient) {
    return (
      <button className="text-sm bg-white border border-gray-300 rounded-md px-4 py-2 text-gray-700 hover:text-black hover:border-black transition-colors">
        Login
      </button>
    );
  }

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (authenticated) {
      logout();
    } else {
      login();
    }
  };

  return (
    <button
      onClick={handleClick}
      className="text-sm bg-white border border-gray-300 rounded-md px-4 py-2 text-gray-700 hover:text-black hover:border-black transition-colors"
    >
      {authenticated ? 'Sign Out' : 'Login'}
    </button>
  );
}
