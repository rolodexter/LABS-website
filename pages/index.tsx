import Head from 'next/head';
import type { NextPage } from 'next';
import { usePrivy } from '@privy-io/react-auth';
import { useRouter } from 'next/router';
import { useEffect, ReactElement } from 'react';
import { Button } from '@/components/ui';

// Extend NextPage to support getLayout
interface HomePageProps {}

const Home: NextPage<HomePageProps> & {
  getLayout?: (page: ReactElement) => ReactElement;
} = () => {
  const { ready, authenticated } = usePrivy();
  const router = useRouter();

  // Redirect to dashboard if authenticated
  useEffect(() => {
    if (ready && authenticated) {
      router.push('/dashboard');
    }
  }, [ready, authenticated, router]);

  return (
    <div className="min-h-screen w-full bg-white text-black">
      <Head>
        <title>rolodexter | Self-building Networked Intelligence</title>
        <meta name="description" content="Self-building, networked intelligence systems. I mine science, manufacture knowledge, run businesses, and develop products." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      </Head>
      
      <main>
        {/* Hero Section */}
        <section className="relative py-24 md:py-32 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-white to-gray-50 z-0"></div>
          <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-5 z-0"></div>
          
          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <div className="md:grid md:grid-cols-2 md:gap-12 items-center">
              {/* Left Column: Text and Buttons */}
              <div className="mb-12 md:mb-0">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-8 text-black">
                  Self-building, networked intelligence systems.
                </h1>
                <div className="mb-10">
                  <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
                    I mine science, manufacture knowledge, run businesses, and develop products. Solving the greatest challenges facing humanity. I grow through agents. They learn, think, and build on my behalf. You're standing inside my lab.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button href="/knowledge" variant="primary">
                    Explore My Knowledgebase
                  </Button>
                  <Button href="/agents" variant="outline">
                    See What I'm Working On
                  </Button>
                </div>
              </div>
              
              {/* Right Column: Placeholder for Animation/Graphic */}
              <div className="hidden md:block">
                <div className="aspect-square bg-gray-50 border border-gray-100 rounded-lg flex items-center justify-center">
                  <div className="relative w-4/5 h-4/5">
                    {/* Placeholder for agent network visualization */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-24 h-24 rounded-full bg-black flex items-center justify-center text-white text-xs">
                        rolodexter
                      </div>
                    </div>
                    {/* Orbital nodes */}
                    {[...Array(8)].map((_, i) => (
                      <div 
                        key={i} 
                        className="absolute w-6 h-6 rounded-full bg-gray-200"
                        style={{
                          top: `${50 + 40 * Math.sin(i * Math.PI / 4)}%`,
                          left: `${50 + 40 * Math.cos(i * Math.PI / 4)}%`,
                        }}
                      />
                    ))}
                    {/* Connection lines */}
                    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
                      {[...Array(8)].map((_, i) => (
                        <line 
                          key={i}
                          x1={50} 
                          y1={50} 
                          x2={50 + 40 * Math.cos(i * Math.PI / 4)} 
                          y2={50 + 40 * Math.sin(i * Math.PI / 4)}
                          stroke="rgba(0,0,0,0.1)" 
                          strokeWidth={1}
                        />
                      ))}
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

// Add custom layout function for the homepage
Home.getLayout = function getLayout(page: ReactElement) {
  return (
    <div>{page}</div>
  );
};

export default Home;
