import { Card } from 'flowbite-react';
import Link from 'next/link';

export default function AISolutionsDocs() {
  return (
    <div className="container mx-auto px-4 py-8 mt-16">
      <div className="mb-8">
        <Link href="/docs" className="text-gray-600 dark:text-gray-400 hover:underline">
          ← Back to Documentation
        </Link>
      </div>

      <h1 className="text-4xl font-bold mb-8 text-black dark:text-white">AI Solutions Documentation</h1>
      
      <div className="grid md:grid-cols-3 gap-8 mb-12">
        <Card className="bg-white dark:bg-black border border-gray-200 dark:border-gray-800">
          <h2 className="text-2xl font-bold mb-4 text-black dark:text-white">Getting Started</h2>
          <ul className="space-y-2">
            <li>
              <Link href="#overview" className="text-gray-600 dark:text-gray-400 hover:underline">Overview</Link>
            </li>
            <li>
              <Link href="#quickstart" className="text-gray-600 dark:text-gray-400 hover:underline">Quick Start Guide</Link>
            </li>
            <li>
              <Link href="#models" className="text-gray-600 dark:text-gray-400 hover:underline">Available Models</Link>
            </li>
          </ul>
        </Card>

        <Card className="bg-white dark:bg-black border border-gray-200 dark:border-gray-800">
          <h2 className="text-2xl font-bold mb-4 text-black dark:text-white">Features</h2>
          <ul className="space-y-2">
            <li>
              <Link href="#custom-ml" className="text-gray-600 dark:text-gray-400 hover:underline">Custom ML Models</Link>
            </li>
            <li>
              <Link href="#nlp" className="text-gray-600 dark:text-gray-400 hover:underline">NLP Services</Link>
            </li>
            <li>
              <Link href="#vision" className="text-gray-600 dark:text-gray-400 hover:underline">Computer Vision</Link>
            </li>
          </ul>
        </Card>

        <Card className="bg-white dark:bg-black border border-gray-200 dark:border-gray-800">
          <h2 className="text-2xl font-bold mb-4 text-black dark:text-white">Integration</h2>
          <ul className="space-y-2">
            <li>
              <Link href="#api" className="text-gray-600 dark:text-gray-400 hover:underline">API Reference</Link>
            </li>
            <li>
              <Link href="#sdk" className="text-gray-600 dark:text-gray-400 hover:underline">SDK Guide</Link>
            </li>
            <li>
              <Link href="#examples" className="text-gray-600 dark:text-gray-400 hover:underline">Example Projects</Link>
            </li>
          </ul>
        </Card>
      </div>

      <div className="prose dark:prose-invert max-w-none">
        <section id="overview" className="mb-12">
          <h2 className="text-3xl font-bold mb-4">Overview</h2>
          <p className="text-gray-600 dark:text-gray-400">
            Our AI Solutions provide state-of-the-art machine learning capabilities through easy-to-use APIs and SDKs.
          </p>
        </section>

        <section id="quickstart" className="mb-12">
          <h2 className="text-3xl font-bold mb-4">Quick Start Guide</h2>
          <p className="text-gray-600 dark:text-gray-400">
            Start implementing AI in your applications with our comprehensive quick start guide.
          </p>
        </section>

        {/* Add more documentation sections as needed */}
      </div>
    </div>
  );
}
