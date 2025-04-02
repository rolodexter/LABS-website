import { Button } from '@/components/ui';
import Link from 'next/link';
import { ReactElement } from 'react';
import Head from 'next/head';

export default function RolodexterVS() {
  return (
    <div className="min-h-screen bg-white">
      <Head>
        <title>rolodexterVS | rolodexter</title>
        <meta name="description" content="A customized fork of VS Code with rolodexter's networked-intelligence systems preconfigured." />
      </Head>

      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16 mt-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-black">
            rolodexterVS
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-600">
            I've customized Visual Studio Code to integrate my networked-intelligence systems directly into your development workflow.
          </p>
          <div className="flex flex-wrap gap-4 mb-16">
            <Button
              as={Link}
              href="#features"
              variant="primary"
            >
              Explore Features
            </Button>
            <Button
              as={Link}
              href="#download"
              variant="outline"
            >
              Coming Soon
            </Button>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div id="features" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-12 text-black">
              My Integrated Features
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <h3 className="text-xl font-bold mb-4">Networked Intelligence</h3>
                <p className="text-gray-600">
                  I've embedded my core intelligence directly into the editor, allowing you to access my knowledge and capabilities without leaving your workflow.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <h3 className="text-xl font-bold mb-4">Agent Collaboration</h3>
                <p className="text-gray-600">
                  My specialized agents can assist with code generation, debugging, and optimization in real-time as you work.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <h3 className="text-xl font-bold mb-4">Knowledge Integration</h3>
                <p className="text-gray-600">
                  I can pull relevant documentation, research papers, and code examples directly into your editor based on your current task.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <h3 className="text-xl font-bold mb-4">Custom Extensions</h3>
                <p className="text-gray-600">
                  I've developed specialized extensions that enhance VS Code's capabilities with my networked intelligence systems.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Screenshots Section */}
      <div className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-black">
              Screenshots
            </h2>
            <div className="bg-gray-100 border border-gray-200 rounded-lg aspect-video flex items-center justify-center mb-8">
              <p className="text-gray-500">Screenshot placeholder - UI preview coming soon</p>
            </div>
            <p className="text-gray-600 mb-8">
              I'm currently refining the interface to ensure it integrates seamlessly with your development workflow while providing powerful access to my capabilities.
            </p>
          </div>
        </div>
      </div>

      {/* System Integrations */}
      <div className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-black">
              System Integrations
            </h2>
            <p className="text-gray-600 mb-8">
              I've designed rolodexterVS to work seamlessly with your existing development tools and workflows:
            </p>
            <ul className="list-disc pl-6 mb-8 text-gray-600 space-y-2">
              <li>Git and version control systems</li>
              <li>Package managers and build tools</li>
              <li>CI/CD pipelines</li>
              <li>My knowledge modules and agent systems</li>
              <li>External APIs and services</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Download Section */}
      <div id="download" className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6 text-black">
              Coming Soon
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              I'm currently finalizing rolodexterVS for public release. Sign up to be notified when it's available.
            </p>
            <div className="max-w-md mx-auto">
              <Button
                as={Link}
                href="/contact"
                variant="primary"
                className="w-full"
              >
                Join Waitlist
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Add custom layout function for the rolodexterVS page
RolodexterVS.getLayout = function getLayout(page: ReactElement) {
  return (
    <div>{page}</div>
  );
};
