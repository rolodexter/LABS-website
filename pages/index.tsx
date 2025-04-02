import Head from 'next/head';
import type { NextPage } from 'next';
import { usePrivy } from '@privy-io/react-auth';
import { useRouter } from 'next/router';
import { useEffect, ReactElement, useState } from 'react';
import { Button, Card } from '@/components/ui';
import Link from 'next/link';

interface HomePageProps {}

const Home: NextPage<HomePageProps> & {
  getLayout?: (page: ReactElement) => ReactElement;
} = () => {
  const { ready, authenticated } = usePrivy();
  const router = useRouter();
  const [activeIndex, setActiveIndex] = useState(0);

  const capabilities = [
    {
      title: 'Self-Learning AI',
      description: 'Autonomous systems that continuously evolve and improve through self-directed learning',
      icon: '🧠',
      color: 'from-blue-500 to-purple-500'
    },
    {
      title: 'Network Intelligence',
      description: 'Distributed AI systems working together to solve complex problems',
      icon: '🌐',
      color: 'from-green-500 to-teal-500'
    },
    {
      title: 'Knowledge Manufacturing',
      description: 'Automated systems for generating and synthesizing knowledge',
      icon: '⚡',
      color: 'from-orange-500 to-red-500'
    }
  ];

  const projects = [
    {
      title: 'rolodexter GPT',
      description: 'Advanced language model with enhanced reasoning capabilities',
      status: 'Live',
      progress: 100,
      link: '/products/rolodexter-gpt'
    },
    {
      title: 'Neural Network Infrastructure',
      description: 'Scalable architecture for distributed AI systems',
      status: 'In Development',
      progress: 75,
      link: '/research/infrastructure'
    },
    {
      title: 'Autonomous Agents',
      description: 'Self-directed AI agents for complex problem solving',
      status: 'Research',
      progress: 60,
      link: '/research/agents'
    }
  ];

  const stats = [
    { number: '1M+', label: 'Model Parameters' },
    { number: '500+', label: 'Research Papers' },
    { number: '50+', label: 'Active Projects' },
    { number: '24/7', label: 'Continuous Learning' }
  ];

  useEffect(() => {
    if (ready && authenticated) {
      router.push('/dashboard');
    }

    // Rotate through capabilities
    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % capabilities.length);
    }, 5000);

    return () => clearInterval(interval);
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
      
      <main className="overflow-hidden">
        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center py-24 md:py-32">
          <div className="absolute inset-0 bg-gradient-to-br from-white to-gray-50 z-0"></div>
          <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-5 z-0"></div>
          
          <div className="max-w-7xl mx-auto px-6 relative z-10 w-full">
            <div className="md:grid md:grid-cols-2 md:gap-12 items-center">
              {/* Left Column: Text and Buttons */}
              <div className="mb-12 md:mb-0">
                <div className="inline-block mb-4 px-4 py-2 bg-black/5 rounded-full">
                  <span className="text-sm font-medium">Version 2.0 Now Live</span>
                </div>
                <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold tracking-tight mb-8 text-black">
                  Self-building,{' '}
                  <span className="relative">
                    <span className="relative z-10">networked</span>
                    <span className="absolute bottom-0 left-0 w-full h-3 bg-blue-200/50 -z-10"></span>
                  </span>{' '}
                  intelligence systems.
                </h1>
                <div className="mb-10">
                  <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
                    I <Link href="/research" className="text-black hover:underline">mine science</Link>, 
                    manufacture knowledge, run businesses, and develop products. 
                    <span className="block mt-4">
                      Solving the greatest challenges facing humanity. I grow through agents. 
                      They learn, think, and build on my behalf.
                    </span>
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link href="/knowledge">
                    <Button className="bg-black text-white hover:bg-black/90 px-8 py-4 text-lg">
                      Explore My Knowledge
                    </Button>
                  </Link>
                  <Link href="/agents">
                    <Button className="border-2 border-black text-black hover:bg-black hover:text-white px-8 py-4 text-lg">
                      Meet My Agents
                    </Button>
                  </Link>
                </div>
              </div>
              
              {/* Right Column: Interactive Visualization */}
              <div className="hidden md:block">
                <div className="aspect-square bg-gradient-to-br from-gray-50 to-white border border-gray-100 rounded-2xl shadow-xl flex items-center justify-center p-8">
                  <div className="relative w-full h-full">
                    {/* Central node */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-32 h-32 rounded-full bg-black flex items-center justify-center text-white text-lg font-medium transform hover:scale-110 transition-transform duration-300">
                        rolodexter
                      </div>
                    </div>
                    {/* Orbital nodes with pulsing animation */}
                    {[...Array(8)].map((_, i) => (
                      <div 
                        key={i} 
                        className="absolute w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 transform hover:scale-125 transition-transform duration-300 animate-pulse"
                        style={{
                          top: `${50 + 40 * Math.sin(i * Math.PI / 4)}%`,
                          left: `${50 + 40 * Math.cos(i * Math.PI / 4)}%`,
                          animationDelay: `${i * 0.2}s`
                        }}
                      />
                    ))}
                    {/* Dynamic connection lines */}
                    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
                      {[...Array(8)].map((_, i) => (
                        <line 
                          key={i}
                          x1={50} 
                          y1={50} 
                          x2={50 + 40 * Math.cos(i * Math.PI / 4)} 
                          y2={50 + 40 * Math.sin(i * Math.PI / 4)}
                          stroke="url(#gradient)" 
                          strokeWidth={2}
                          className="animate-dash"
                        >
                          <animate
                            attributeName="stroke-dashoffset"
                            from="100"
                            to="0"
                            dur="2s"
                            repeatCount="indefinite"
                          />
                        </line>
                      ))}
                      <defs>
                        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#3B82F6" />
                          <stop offset="100%" stopColor="#A855F7" />
                        </linearGradient>
                      </defs>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Scroll indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </section>

        {/* Capabilities Section */}
        <section className="py-24 bg-gray-50">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Core Capabilities</h2>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                Leveraging cutting-edge AI technologies to push the boundaries of what's possible
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {capabilities.map((capability, index) => (
                <Card 
                  key={capability.title}
                  className={`p-8 transform hover:-translate-y-2 transition-transform duration-300 bg-gradient-to-br ${capability.color} text-white`}
                >
                  <div className="text-4xl mb-4">{capability.icon}</div>
                  <h3 className="text-2xl font-bold mb-4">{capability.title}</h3>
                  <p className="text-white/90">{capability.description}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section className="py-24">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Latest Projects</h2>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                Exploring the frontiers of AI technology through innovative research and development
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {projects.map((project) => (
                <Link key={project.title} href={project.link}>
                  <Card className="p-8 hover:shadow-lg transition-shadow duration-300">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-xl font-bold">{project.title}</h3>
                      <span className={`px-3 py-1 rounded-full text-sm ${
                        project.status === 'Live' ? 'bg-green-100 text-green-800' :
                        project.status === 'In Development' ? 'bg-blue-100 text-blue-800' :
                        'bg-purple-100 text-purple-800'
                      }`}>
                        {project.status}
                      </span>
                    </div>
                    <p className="text-gray-600 mb-4">{project.description}</p>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-black h-2 rounded-full transition-all duration-500"
                        style={{ width: `${project.progress}%` }}
                      />
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-24 bg-black text-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid md:grid-cols-4 gap-8">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-4xl md:text-5xl font-bold mb-2">{stat.number}</div>
                  <div className="text-gray-400">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24">
          <div className="max-w-7xl mx-auto px-6">
            <div className="bg-gradient-to-r from-gray-900 to-black rounded-2xl p-12 text-white text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to explore the future?</h2>
              <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
                Join me in pushing the boundaries of artificial intelligence and shaping the future of technology.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/contact">
                  <Button className="bg-white text-black hover:bg-gray-100 px-8 py-4 text-lg">
                    Get Started
                  </Button>
                </Link>
                <Link href="/docs">
                  <Button className="border-2 border-white text-white hover:bg-white hover:text-black px-8 py-4 text-lg">
                    Read Documentation
                  </Button>
                </Link>
              </div>
            </div>
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
