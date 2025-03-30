import { PrivyProvider } from '@privy-io/react-auth';
import { useRouter } from 'next/router';

const PrivyAuth = ({ children }) => {
  const router = useRouter();

  const handleLogin = (user) => {
    console.log("User logged in successfully:", user);
    router.push('/dashboard');
  };

  const handleLogout = () => {
    console.log("User logged out");
    router.push('/');
  };

  const config = {
    appId: process.env.NEXT_PUBLIC_PRIVY_APP_ID,
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

  return <PrivyProvider config={config}>{children}</PrivyProvider>;
};

export default PrivyAuth;