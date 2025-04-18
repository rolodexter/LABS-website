// Import Tailwind first to ensure base layer is available
import '../src/styles/globals.css';
import type { AppProps } from 'next/app';
import Header from '@/components/navigation/Header';
import Footer from '@/components/navigation/Footer';
import { PrivyProvider } from '@privy-io/react-auth';
import dynamic from 'next/dynamic';
import type { ReactElement, ReactNode } from 'react';
import type { NextPage } from 'next';
import { ErrorBoundary } from '@/components/error/ErrorBoundary';

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

// Create a client-side only wrapper for Privy
const ClientPrivyProvider = dynamic(
  () =>
    Promise.resolve(({ children }: { children: ReactNode }) => {
      const appId = process.env.NEXT_PUBLIC_PRIVY_APP_ID;

      // Debug log
      console.log('Environment variables:', {
        NEXT_PUBLIC_PRIVY_APP_ID: process.env.NEXT_PUBLIC_PRIVY_APP_ID,
        NODE_ENV: process.env.NODE_ENV,
      });

      if (!appId) {
        console.error('NEXT_PUBLIC_PRIVY_APP_ID is not defined');
        // Return layout without Privy
        return (
          <div className="min-h-screen flex flex-col bg-white">
            <Header />
            <main className="flex-grow">{children}</main>
            <Footer />
          </div>
        );
      }

      // Define the wallet config outside the provider to ensure it's fully initialized
      // Use explicit type casting to match Privy's expected types
      const privyConfig = {
        loginMethods: ['email', 'wallet', 'google', 'github', 'twitter'] as const,
        supportedChains: [
          { id: 1, name: 'Ethereum' },
          { id: 137, name: 'Polygon' },
          { id: 42161, name: 'Arbitrum' },
          { id: 10, name: 'Optimism' },
          { id: 8453, name: 'Base' },
        ],
        appearance: {
          theme: 'light' as const,
          accentColor: '#000000' as `#${string}`,
          logo: '/logos/logotype-black.png',
          showWalletLoginFirst: false,
        },
        embeddedWallets: {
          createOnLogin: 'users-without-wallets' as const,
          noPromptOnSignature: true,
        },
        // Important: Define the wallet array with a clear, complete structure
        wallets: [
          {
            name: 'embedded',
            showOnDesktop: true,
            showOnMobile: true,
            privyWalletConfig: { // Fixed from privyWalletOverride to match Privy's expected API
              displayName: 'RolodexterWallet',
              iconUrl: '/logos/symbol-black.png',
            },
            // Add fallback for privyWalletOverride to ensure backward compatibility
            privyWalletOverride: {},
          },
          {
            provider: 'wallet-connect',
            privyWalletOverride: {}
          }
        ],
      };

      // Debug the config to help diagnose
      console.log('Privy configuration:', JSON.stringify(privyConfig, null, 2));

      return (
        <PrivyProvider
          appId={appId}
          config={privyConfig}
          onSuccess={async user => {
            console.log('Successfully authenticated:', user);
            // Save user data to database
            try {
              const response = await fetch('/api/users/sync', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  privyId: user.id,
                  email: user.email?.address,
                  walletAddress: user.wallet?.address,
                  linkedAccounts: user.linkedAccounts,
                }),
              });

              if (!response.ok) {
                console.error('Failed to sync user data with database');
              }
            } catch (error) {
              console.error('Error syncing user with database:', error);
            }
          }}
        >
          {children}
        </PrivyProvider>
      );
    }),
  { ssr: false }
);

interface LayoutProps {
  children: ReactNode;
  includeFooter?: boolean;
}

function Layout({ children, includeFooter = true }: LayoutProps): ReactElement {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <main className="flex-grow">{children}</main>
      {includeFooter && <Footer />}
    </div>
  );
}

export default function AppWithLayout({ Component, pageProps }: AppPropsWithLayout): ReactElement {
  // If the page has a getLayout function, use it, otherwise use the default layout
  const getLayout = Component.getLayout ?? (page => <Layout includeFooter={true}>{page}</Layout>);

  return (
    <ErrorBoundary
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-white">
          <div className="max-w-md w-full px-6 py-8 text-center">
            <h1 className="text-2xl font-bold mb-4">Something went wrong</h1>
            <p className="text-gray-600 mb-6">
              Please try again later or contact support if the issue persists.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 border border-black text-black hover:bg-black hover:text-white transition-colors duration-200"
            >
              Refresh page
            </button>
          </div>
        </div>
      }
    >
      <ClientPrivyProvider>{getLayout(<Component {...pageProps} />)}</ClientPrivyProvider>
    </ErrorBoundary>
  );
}
