import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import type { NextPage } from 'next';

const Home: NextPage = () => {
  return (
    <div className="min-h-screen w-full bg-white">
      <Head>
        <title>rolodexterLABS | AI-Powered Solutions</title>
        <meta name="description" content="rolodexterLABS - Pioneering AI solutions for tomorrow's challenges" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      </Head>
      
      <main>
        {/* Hero Section */}
        <section className="relative py-20 md:py-32 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-gray-100 z-0"></div>
          <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10 z-0"></div>
          
          <div className="container mx-auto px-6 relative z-10">
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/2 md:pr-12">
                <h2 className="text-3xl font-bold tracking-tight text-gray-900 mb-8">
                  <span className="text-4xl font-black">rolodexterLABS</span>
                </h2>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900 mb-6">
                  Pioneering the Future of AI
                </h1>
                <p className="text-lg md:text-xl text-gray-700 mb-8 leading-relaxed">
                  Creating intelligent solutions that transform industries and enhance human capabilities through cutting-edge artificial intelligence.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link 
                    href="/products" 
                    className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-black hover:bg-gray-800 transition-colors duration-200"
                  >
                    Explore Solutions
                  </Link>
                  <Link 
                    href="/research" 
                    className="inline-flex items-center justify-center px-6 py-3 border border-black text-base font-medium rounded-md text-black bg-transparent hover:bg-gray-50 transition-colors duration-200"
                  >
                    View Research
                  </Link>
                </div>
              </div>

              {/* Keep the rest of the hero section with the animated element */}
              <div className="mt-12 md:mt-0 md:w-1/2">
                <div className="relative w-full h-[400px] md:h-[500px]">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-2xl overflow-hidden shadow-xl">
                    <div className="absolute inset-0 bg-white/40 backdrop-blur-sm"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-6xl md:text-7xl lg:text-8xl font-black text-black/5">rolodexterLABS</span>
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      {/* Placeholder for future 3D model or animation */}
                      <div className="w-64 h-64 relative">
                        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-400/20 to-indigo-600/20 animate-pulse"></div>
                        <div className="absolute inset-4 rounded-full bg-gradient-to-br from-blue-400/40 to-indigo-600/40 animate-pulse" style={{ animationDelay: '0.5s' }}></div>
                        <div className="absolute inset-8 rounded-full bg-gradient-to-br from-blue-400/60 to-indigo-600/60 animate-pulse" style={{ animationDelay: '1s' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 md:py-24 bg-white">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Transformative AI Solutions</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Our cutting-edge technologies enable businesses to innovate faster and solve complex problems with unprecedented efficiency.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: 'Data Processing',
                  description: 'Advanced ETL solutions for enterprise data processing with AI-powered optimization.',
                  icon: (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
                    </svg>
                  ),
                },
                {
                  title: 'AI Solutions',
                  description: 'Custom machine learning models tailored to your specific business challenges and opportunities.',
                  icon: (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  ),
                },
                {
                  title: 'Analytics Tools',
                  description: 'Powerful business intelligence and data visualization to extract actionable insights.',
                  icon: (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  ),
                },
              ].map((feature, index) => (
                <div key={index} className="bg-gray-50 rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow duration-300">
                  <div className="bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 md:py-24 bg-gray-50">
          <div className="container mx-auto px-6">
            <div className="max-w-5xl mx-auto bg-gradient-to-r from-gray-900 to-black rounded-2xl overflow-hidden shadow-xl">
              <div className="p-8 md:p-12 lg:p-16">
                <div className="md:flex items-center justify-between">
                  <div className="mb-8 md:mb-0 md:mr-8 md:max-w-lg">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Ready to transform your business with AI?</h2>
                    <p className="text-gray-300 text-lg">
                      Join forward-thinking organizations already using rolodexterLABS technology to gain competitive advantages.
                    </p>
                  </div>
                  <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                    <Link 
                      href="/contact" 
                      className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-black bg-white hover:bg-gray-100 transition-colors duration-200"
                    >
                      Contact Us
                    </Link>
                    <Link 
                      href="/demo" 
                      className="inline-flex items-center justify-center px-6 py-3 border border-white text-base font-medium rounded-md text-white bg-transparent hover:bg-white/10 transition-colors duration-200"
                    >
                      Request Demo
                    </Link>
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

export default Home;
