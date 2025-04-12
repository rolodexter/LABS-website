import { usePrivy } from '@privy-io/react-auth';
import Button from '@/components/ui/Button';
import { MouseEvent } from 'react';

interface LoginButtonProps {
  className?: string;
}

export function LoginButton({ className }: LoginButtonProps) {
  const { login, logout, authenticated, ready } = usePrivy();

  if (!ready) {
    return null;
  }

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    if (authenticated) {
      logout();
    } else {
      login();
    }
  };

  return (
    <Button
      variant={authenticated ? 'outline' : 'primary'}
      onClick={handleClick}
      className={className}
    >
      {authenticated ? 'Sign Out' : 'Sign In'}
    </Button>
  );
}
