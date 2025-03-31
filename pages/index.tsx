import Head from 'next/head';
import Link from 'next/link';
import type { NextPage } from 'next';
import { PresentationChartBarIcon, Cog6ToothIcon, CommandLineIcon } from '@heroicons/react/24/outline';
import { usePrivy } from '@privy-io/react-auth';
import Login from '@/components/auth/Login';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const Home: NextPage = () => {
  const { ready, authenticated } = usePrivy();
  const router = useRouter();

  // Redirect to dashboard if authenticated
  useEffect(() => {
    if (ready && authenticated) {
      router.push('/dashboard');
    }
  }, [ready, authenticated, router]);

  const executiveFunctions = [
    {
      title: 'Expertise Amplification',
      icon: PresentationChartBarIcon,
      description: 'Transform individual and organizational expertise into scalable, actionable systems.'
    },
    {
      title: 'Knowledge Integration',
      icon: Cog6ToothIcon,
      description: 'Seamlessly combine domain expertise with cutting-edge science and technology.'
    },
    {
      title: 'Intelligent Orchestration',
      icon: CommandLineIcon,
      description: 'Coordinate and leverage diverse expertise to solve complex challenges efficiently.'
    }
  ];

  if (!ready || !authenticated) {
    return (
      <div>
        <Login />
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-white text-black">
      <Head>
        <title>AI as the New Personal Computing | rolodexterLABS</title>
        <meta name="description" content="Large language models and frontier AI aren't the end—they're the beginning. At rolodexterLABS, we build the next generation of intelligent systems and technologies on this foundational computing layer." />
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
            <div className="max-w-4xl">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-8 text-black">
                Expertise is the New Computing Layer
              </h1>
              <p className="text-lg md:text-xl text-gray-600 mb-12 leading-relaxed">
                Everyone's an expert at something. At rolodexterLABS, we build systems and technologies that enable individuals and organizations to fully leverage their expertise—combining the breadth of science, technology, and human knowledge to amplify what people do best.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link 
                  href="/about" 
                  className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-black hover:bg-gray-900 transition-colors duration-200"
                >
                  Discover Our Vision
                </Link>
                <Link 
                  href="/products" 
                  className="inline-flex items-center justify-center px-6 py-3 border border-black text-base font-medium rounded-md text-black bg-transparent hover:bg-black hover:text-white transition-colors duration-200"
                >
                  Explore Innovations
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Executive Functioning Intelligence Section */}
        <section className="py-24 md:py-32 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-black">
                Expertise at Scale
              </h2>
              <p className="text-lg text-gray-600">
                Transform how your organization harnesses and deploys expertise across every domain.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-12">
              {executiveFunctions.map((item) => (
                <div key={item.title} className="flex flex-col items-start space-y-4">
                  <div className="p-3 rounded-lg bg-gray-50">
                    <item.icon className="w-6 h-6 text-black" />
                  </div>
                  <h3 className="text-xl font-bold text-black">{item.title}</h3>
                  <p className="text-gray-600">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Home;
