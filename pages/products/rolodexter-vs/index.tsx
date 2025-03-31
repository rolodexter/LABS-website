import { Button } from 'flowbite-react';
import Link from 'next/link';
import DiscoverySection from '../../../components/sections/DiscoverySection';

export default function RolodexterVS() {
  return (
    <div className="min-h-screen bg-white dark:bg-black">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16 mt-16">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-black dark:text-white">
            rolodexterVS
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-600 dark:text-gray-400">
            Advanced AI-powered research and discovery platform
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button
              as={Link}
              href="#features"
              className="bg-black dark:bg-white text-white dark:text-black border border-black dark:border-white hover:bg-white hover:text-black dark:hover:bg-black dark:hover:text-white"
            >
              Explore Features
            </Button>
            <Button
              as={Link}
              href="/contact"
              className="bg-white dark:bg-black text-black dark:text-white border border-black dark:border-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black"
            >
              Request Demo
            </Button>
          </div>
        </div>
      </div>

      {/* Discovery Section */}
      <DiscoverySection />

      {/* Integration Section */}
      <div className="bg-gray-50 dark:bg-gray-900 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-8 text-black dark:text-white">
              Seamless Integration
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-12">
              Integrate with your existing tools and workflows for a streamlined research experience.
            </p>
            <div className="flex justify-center gap-4">
              <Button
                as={Link}
                href="/docs/api"
                className="bg-black dark:bg-white text-white dark:text-black border border-black dark:border-white hover:bg-white hover:text-black dark:hover:bg-black dark:hover:text-white"
              >
                View Documentation
              </Button>
              <Button
                as={Link}
                href="/contact"
                className="bg-white dark:bg-black text-black dark:text-white border border-black dark:border-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black"
              >
                Contact Sales
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
