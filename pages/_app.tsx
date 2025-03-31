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
  () => Promise.resolve(({ children }: { children: ReactNode }) => {
    const appId = process.env.NEXT_PUBLIC_PRIVY_APP_ID;
    return (
      <PrivyProvider
        appId={appId!}
        config={{
          loginMethods: ['email', 'google'],
          appearance: {
            theme: 'light',
            accentColor: '#000000',
            showModalNavigation: true,
            modal: {
              welcomeMessage: 'Welcome to rolodexterLABS',
              loginButtonText: 'Sign in',
              signupButtonText: 'Create account',
              createAccountButtonText: 'Sign up',
              forgotPasswordButtonText: 'Reset password'
            }
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
}

function Layout({ children }: LayoutProps): ReactElement {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
}

export default function AppWithLayout({ Component, pageProps }: AppPropsWithLayout): ReactElement {
  const getLayout = Component.getLayout ?? ((page) => <Layout>{page}</Layout>);

  return (
    <ErrorBoundary>
      <ClientPrivyProvider>
        {getLayout(<Component {...pageProps} />)}
      </ClientPrivyProvider>
    </ErrorBoundary>
  );
}
