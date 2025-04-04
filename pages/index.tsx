import Head from 'next/head';
import type { NextPage } from 'next';
import { ReactElement } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePrivy } from '@privy-io/react-auth';

interface HomePageProps {}

// Feature section item type
type FeatureItem = {
  title: string;
  description: string;
  icon: string;
  link: string;
};

// Core system features
const features: FeatureItem[] = [
  {
    title: 'Agent Network',
    description: 'Specialized AI agents working together to provide comprehensive intelligence services across domains.',
    icon: '/icons/agent.svg',
    link: '/agents'
  },
  {
    title: 'Knowledge System',
    description: 'Curated documentation, research findings, and structured knowledge modules.',
    icon: '/icons/knowledge.svg',
    link: '/docs'
  },
  {
    title: 'Project Ecosystem',
    description: 'Interconnected tools and applications built on the rolodexterLABS infrastructure.',
    icon: '/icons/projects.svg',
    link: '/projects'
  },
  {
    title: 'Interactive Console',
    description: 'Direct interface for interacting with the rolodexterLABS intelligence systems.',
    icon: '/icons/console.svg',
    link: '/console'
  }
];

const Home: NextPage<HomePageProps> & {
  getLayout?: (page: ReactElement) => ReactElement;
} = () => {
  const { ready, authenticated, login } = usePrivy();

  return (
    <div className="min-h-screen w-full bg-white text-black">
      <Head>
        <title>rolodexterLABS | Frontier AI for Executive Intelligence</title>
        <meta name="description" content="Advanced AI systems for research, knowledge management, and executive intelligence." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Source+Serif+Pro:wght@400;600;700&display=swap" rel="stylesheet" />
      </Head>
      
      <main className="overflow-hidden">
        {/* Hero Section */}
        <section className="min-h-[80vh] flex items-center justify-center border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-6 py-24 text-center">
            <h1 className="text-6xl md:text-7xl font-bold mb-6 tracking-tight">rolodexterLABS</h1>
            <p className="text-xl md:text-2xl text-gray-700 mb-12 max-w-3xl mx-auto font-serif">
              Frontier AI systems for executive intelligence, knowledge management, and research synthesis
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              {ready && !authenticated ? (
                <button 
                  onClick={() => login()}
                  className="px-8 py-4 bg-black text-white rounded-md font-medium text-lg hover:bg-gray-800 transition-colors"
                >
                  Get Started
                </button>
              ) : (
                <Link 
                  href="/dashboard" 
                  className="px-8 py-4 bg-black text-white rounded-md font-medium text-lg hover:bg-gray-800 transition-colors"
                >
                  Go to Dashboard
                </Link>
              )}
              <Link 
                href="/docs" 
                className="px-8 py-4 bg-white border border-black text-black rounded-md font-medium text-lg hover:bg-gray-50 transition-colors"
              >
                Explore Documentation
              </Link>
            </div>
          </div>
        </section>

        {/* System Structure Section */}
        <section className="py-24 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4">System Structure</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                The rolodexterLABS ecosystem is composed of specialized components working together to provide a comprehensive intelligence platform.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <Link 
                  key={index}
                  href={feature.link}
                  className="bg-white border border-gray-200 rounded-lg p-6 hover:border-black transition-colors"
                >
                  <div className="h-12 w-12 mb-6 bg-gray-100 rounded-full flex items-center justify-center">
                    {/* Fallback icon if SVG doesn't exist */}
                    <span className="text-2xl font-bold text-gray-400">{feature.title.charAt(0)}</span>
                  </div>
                  <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                  <p className="text-gray-600 mb-4">{feature.description}</p>
                  <span className="text-black font-medium">Learn more &rarr;</span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Agent Highlight Section */}
        <section className="py-24 px-6 bg-gray-50 border-y border-gray-200">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4">Meet Our Agents</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Specialized AI agents with distinct capabilities and areas of expertise, working together in the rolodexterLABS ecosystem.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <div className="bg-white p-8 border border-gray-200 rounded-lg">
                <h3 className="text-2xl font-bold mb-4">rolodexterGPT</h3>
                <p className="text-gray-700 mb-6">
                  Our knowledge navigator agent specialized in research, information retrieval, and knowledge synthesis across multiple domains.
                </p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-start">
                    <span className="text-black mr-2">•</span>
                    <span>Advanced research synthesis</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-black mr-2">•</span>
                    <span>Multi-source knowledge integration</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-black mr-2">•</span>
                    <span>Complex reasoning chains</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white p-8 border border-gray-200 rounded-lg">
                <h3 className="text-2xl font-bold mb-4">rolodexterVS</h3>
                <p className="text-gray-700 mb-6">
                  Our development agent responsible for managing source code, scripts, configuration files, and build automation.
                </p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-start">
                    <span className="text-black mr-2">•</span>
                    <span>Code management and optimization</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-black mr-2">•</span>
                    <span>Web development expertise</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-black mr-2">•</span>
                    <span>Build process automation</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="text-center">
              <Link 
                href="/agents" 
                className="px-6 py-3 bg-white border border-black text-black rounded-md font-medium hover:bg-black hover:text-white transition-colors"
              >
                View All Agents
              </Link>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-24 px-6">
          <div className="max-w-5xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-6">Ready to get started?</h2>
            <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto">
              Sign up for rolodexterLABS to access our AI agents, knowledge base, 
              and specialized tools for research and information management.
            </p>
            
            {ready && !authenticated ? (
              <button 
                onClick={() => login()}
                className="px-8 py-4 bg-black text-white rounded-md font-medium text-lg hover:bg-gray-800 transition-colors"
              >
                Sign Up Now
              </button>
            ) : (
              <Link 
                href="/dashboard" 
                className="px-8 py-4 bg-black text-white rounded-md font-medium text-lg hover:bg-gray-800 transition-colors"
              >
                Go to Dashboard
              </Link>
            )}
          </div>
        </section>
      </main>
    </div>
  );
};

Home.getLayout = function getLayout(page: ReactElement) {
  return <div>{page}</div>;
};

export default Home;
