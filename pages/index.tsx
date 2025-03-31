import Head from 'next/head';
import type { NextPage } from 'next';

const Home: NextPage = () => {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-white">
      <Head>
        <title>rolodexterLABS</title>
        <meta name="description" content="rolodexterLABS - Site undergoing maintenance" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      
      <main className="flex flex-col items-center justify-center">
        <div className="text-black">
          <div>rolodexterLABS</div>
          <div>(site undergoing maintenance)</div>
        </div>
      </main>
    </div>
  );
};

export default Home;
