import { Card  } from '@/components/ui';
import Link from 'next/link';

export default function DataProcessingDocs() {
  return (
    <div className="container mx-auto px-4 py-8 mt-16">
      <div className="mb-8">
        <Link href="/docs" className="text-gray-600 dark:text-gray-400 hover:underline">
          ← Back to Documentation
        </Link>
      </div>

      <h1 className="text-4xl font-bold mb-8 text-black dark:text-white">Data Processing Documentation</h1>
      
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
              <Link href="#installation" className="text-gray-600 dark:text-gray-400 hover:underline">Installation</Link>
            </li>
          </ul>
        </Card>

        <Card className="bg-white dark:bg-black border border-gray-200 dark:border-gray-800">
          <h2 className="text-2xl font-bold mb-4 text-black dark:text-white">Features</h2>
          <ul className="space-y-2">
            <li>
              <Link href="#etl" className="text-gray-600 dark:text-gray-400 hover:underline">ETL Pipeline</Link>
            </li>
            <li>
              <Link href="#validation" className="text-gray-600 dark:text-gray-400 hover:underline">Data Validation</Link>
            </li>
            <li>
              <Link href="#automation" className="text-gray-600 dark:text-gray-400 hover:underline">Automation</Link>
            </li>
          </ul>
        </Card>

        <Card className="bg-white dark:bg-black border border-gray-200 dark:border-gray-800">
          <h2 className="text-2xl font-bold mb-4 text-black dark:text-white">API Reference</h2>
          <ul className="space-y-2">
            <li>
              <Link href="#rest-api" className="text-gray-600 dark:text-gray-400 hover:underline">REST API</Link>
            </li>
            <li>
              <Link href="#sdk" className="text-gray-600 dark:text-gray-400 hover:underline">SDK Documentation</Link>
            </li>
            <li>
              <Link href="#examples" className="text-gray-600 dark:text-gray-400 hover:underline">Code Examples</Link>
            </li>
          </ul>
        </Card>
      </div>

      <div className="prose dark:prose-invert max-w-none">
        <section id="overview" className="mb-12">
          <h2 className="text-3xl font-bold mb-4">Overview</h2>
          <p className="text-gray-600 dark:text-gray-400">
            Our Data Processing solution provides enterprise-grade ETL capabilities with advanced validation and automation features.
          </p>
        </section>

        <section id="quickstart" className="mb-12">
          <h2 className="text-3xl font-bold mb-4">Quick Start Guide</h2>
          <p className="text-gray-600 dark:text-gray-400">
            Get started with our Data Processing solution in minutes. Follow our step-by-step guide to set up your first pipeline.
          </p>
        </section>

        {/* Add more documentation sections as needed */}
      </div>
    </div>
  );
}
