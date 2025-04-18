// Import Tailwind first to ensure base layer is available
import '../src/styles/globals.css';
import type { AppProps } from 'next/app';
// Navigation components removed
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
  () => Promise.resolve(({ children }: { children: ReactNode }) => {
    const appId = process.env.NEXT_PUBLIC_PRIVY_APP_ID;
    
    // Debug log
    console.log('Environment variables:', {
      NEXT_PUBLIC_PRIVY_APP_ID: process.env.NEXT_PUBLIC_PRIVY_APP_ID,
      NODE_ENV: process.env.NODE_ENV
    });
    
    if (!appId) {
      console.error('NEXT_PUBLIC_PRIVY_APP_ID is not defined');
      // Return layout without Privy
      return (
        <div>
          <main>{children}</main>
        </div>
      );
    }

    return (
      <PrivyProvider
        appId={appId}
        config={{
          loginMethods: ['email', 'google'],
          appearance: {
            theme: 'light',
            accentColor: '#000000'
          },
          embeddedWallets: {
            noPromptOnSignature: true
          }
        }}
        onSuccess={(user) => {
          console.log('Successfully authenticated:', user);
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

function Layout({ children }: LayoutProps): ReactElement {
  return (
    <div>
      <main>{children}</main>
    </div>
  );
}

export default function AppWithLayout({ Component, pageProps }: AppPropsWithLayout): ReactElement {
  // If the page has a getLayout function, use it, otherwise use the default layout
  const getLayout = Component.getLayout ?? ((page) => <Layout>{page}</Layout>);

  return (
    <ErrorBoundary fallback={
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
    }>
      <ClientPrivyProvider>
        {getLayout(<Component {...pageProps} />)}
      </ClientPrivyProvider>
    </ErrorBoundary>
  );
}
