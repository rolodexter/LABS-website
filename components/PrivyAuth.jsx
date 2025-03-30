import { PrivyProvider } from '@privy-io/react-auth';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';

const PrivyAuth = ({ children }) => {
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);
  
  // Make sure we only run this on the client side
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Skip Privy initialization entirely on server
  if (!isClient) {
    return <>{children}</>;
  }
  
  // Get appId from environment (client-side only)
  const appId = process.env.NEXT_PUBLIC_PRIVY_APP_ID;

  const handleLogin = (user) => {
    console.log("User logged in successfully:", user);
    router.push('/dashboard');
  };

  const handleLogout = () => {
    console.log("User logged out");
    router.push('/');
  };

  // If no app ID is provided, just render children without Privy
  if (!appId) {
    console.warn("No Privy App ID found in environment variables. Skipping Privy authentication.");
    return <>{children}</>;
  }

  const config = {
    appId: appId,
    onSuccess: handleLogin,
    onLogout: handleLogout,
    loginMethods: [
      'email',
      'google',
      'github',
      'twitter',
      'telegram',
      'wallet',
      'discord',
    ],
    appearance: {
      theme: 'dark',
      accentColor: '#ffffff',
      logo: '/logos/logotype-white.png', // Update this path if needed
      showWalletLoginFirst: false,
    },
    // Error handling
    onError: (error) => {
      console.error("Privy authentication error:", error);
    },
  };

  try {
    return <PrivyProvider config={config}>{children}</PrivyProvider>;
  } catch (error) {
    console.error("Error initializing PrivyProvider:", error);
    return <>{children}</>;
  }
};

export default PrivyAuth;