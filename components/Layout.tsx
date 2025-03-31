import { ReactNode } from 'react';
import Header from './navigation/Header';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow mt-16">
        {children}
      </main>
    </div>
  );
};

export default Layout;
