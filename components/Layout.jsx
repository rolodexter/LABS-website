import Header from './navigation/Header';

const Layout = ({ children }) => {
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
