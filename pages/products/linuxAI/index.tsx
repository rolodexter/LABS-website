import { Button } from '@/components/ui';
import Link from 'next/link';
import { ReactElement } from 'react';
import Head from 'next/head';

export default function LinuxAI() {
  return (
    <div className="min-h-screen bg-white">
      <Head>
        <title>LinuxAI | rolodexter</title>
        <meta name="description" content="A custom Linux distribution bundled with rolodexter's native model protocols and networked-intelligence modules pre-installed." />
      </Head>

      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16 mt-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-black">
            LinuxAI
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-600">
            I've created a custom Linux distribution with my native model protocols and networked-intelligence modules pre-installed.
          </p>
          <div className="flex flex-wrap gap-4 mb-16">
            <Button
              as={Link}
              href="#architecture"
              variant="primary"
            >
              Technical Architecture
            </Button>
            <Button
              as={Link}
              href="#agents"
              variant="outline"
            >
              Bundled Agents
            </Button>
          </div>
        </div>
      </div>

      {/* System Requirements */}
      <div className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-black">
              System Requirements
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <h3 className="text-xl font-bold mb-4">Minimum Requirements</h3>
                <ul className="list-disc pl-6 text-gray-600 space-y-2">
                  <li>CPU: 4-core processor (x86_64 architecture)</li>
                  <li>RAM: 8GB</li>
                  <li>Storage: 50GB SSD</li>
                  <li>GPU: Optional, but recommended for model acceleration</li>
                  <li>Network: Broadband internet connection</li>
                </ul>
              </div>
              
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <h3 className="text-xl font-bold mb-4">Recommended Specifications</h3>
                <ul className="list-disc pl-6 text-gray-600 space-y-2">
                  <li>CPU: 8+ core processor</li>
                  <li>RAM: 16GB+</li>
                  <li>Storage: 100GB+ NVMe SSD</li>
                  <li>GPU: CUDA-compatible with 8GB+ VRAM</li>
                  <li>Network: High-speed, low-latency connection</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bundled Agents */}
      <div id="agents" className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-black">
              Bundled Agents
            </h2>
            <p className="text-gray-600 mb-8">
              I've included several of my specialized agents with LinuxAI to provide intelligent assistance across various domains:
            </p>
            
            <div className="space-y-6 mb-8">
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <h3 className="text-xl font-bold mb-2">System Agent</h3>
                <p className="text-gray-600">
                  Monitors system health, optimizes performance, and manages resources based on your usage patterns.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <h3 className="text-xl font-bold mb-2">Development Agent</h3>
                <p className="text-gray-600">
                  Assists with coding, debugging, and software development tasks across multiple programming languages.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <h3 className="text-xl font-bold mb-2">Research Agent</h3>
                <p className="text-gray-600">
                  Helps gather, analyze, and synthesize information from my knowledge modules and external sources.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <h3 className="text-xl font-bold mb-2">Automation Agent</h3>
                <p className="text-gray-600">
                  Creates and manages automated workflows for repetitive tasks and system processes.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Technical Architecture */}
      <div id="architecture" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-black">
              Technical Architecture
            </h2>
            
            <div className="bg-white p-6 rounded-lg border border-gray-200 mb-8">
              <h3 className="text-xl font-bold mb-4">Core Components</h3>
              <ul className="list-disc pl-6 text-gray-600 space-y-2">
                <li><strong>Base System:</strong> Modified Debian-based distribution with custom kernel optimizations</li>
                <li><strong>Intelligence Layer:</strong> My networked intelligence framework integrated at the system level</li>
                <li><strong>Agent Runtime:</strong> Distributed agent execution environment with resource management</li>
                <li><strong>Knowledge Modules:</strong> Pre-installed domain-specific knowledge bases</li>
                <li><strong>Model Engine:</strong> Optimized inference engine for running my AI models locally</li>
              </ul>
            </div>
            
            <div className="bg-gray-100 border border-gray-200 rounded-lg aspect-video flex items-center justify-center mb-8">
              <p className="text-gray-500">Architecture diagram placeholder - Technical schematics coming soon</p>
            </div>
            
            <p className="text-gray-600">
              I've designed LinuxAI to balance performance, security, and usability while providing deep integration with my networked intelligence capabilities. The system architecture prioritizes modularity and extensibility, allowing for customization to specific use cases.
            </p>
          </div>
        </div>
      </div>

      {/* Coming Soon */}
      <div className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6 text-black">
              Development in Progress
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              I'm currently developing LinuxAI for public release. Join the waitlist to receive updates and early access opportunities.
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

// Add custom layout function for the LinuxAI page
LinuxAI.getLayout = function getLayout(page: ReactElement) {
  return (
    <div>{page}</div>
  );
};
