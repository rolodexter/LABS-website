import { usePrivy } from '@privy-io/react-auth';
import { MouseEvent } from 'react';
import Link from 'next/link';

export function LoginButton() {
  const { login, logout, authenticated, ready } = usePrivy();

  if (!ready) {
    return null;
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
      className="text-sm text-gray-400 hover:text-black transition-colors"
    >
      {authenticated ? 'Sign Out' : 'Login'}
    </button>
  );
}
