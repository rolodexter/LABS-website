import { PrivyProvider } from '@privy-io/react-auth';
import { useRouter } from 'next/router';

// This component will only be rendered on the client side
// thanks to dynamic import with ssr:false
const PrivyAuth = ({ children }) => {
  const router = useRouter();
  
  // Get appId from environment
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
      logo: '/logos/logotype-white.png',
      showWalletLoginFirst: false,
    },
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