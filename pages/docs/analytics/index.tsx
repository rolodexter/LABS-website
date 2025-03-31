import { Card  } from '@/components/ui';
import Link from 'next/link';

export default function AnalyticsDocs() {
  return (
    <div className="container mx-auto px-4 py-8 mt-16">
      <div className="mb-8">
        <Link href="/docs" className="text-gray-600 dark:text-gray-400 hover:underline">
          ← Back to Documentation
        </Link>
      </div>

      <h1 className="text-4xl font-bold mb-8 text-black dark:text-white">Analytics Tools Documentation</h1>
      
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
              <Link href="#dashboard" className="text-gray-600 dark:text-gray-400 hover:underline">Dashboard Setup</Link>
            </li>
          </ul>
        </Card>

        <Card className="bg-white dark:bg-black border border-gray-200 dark:border-gray-800">
          <h2 className="text-2xl font-bold mb-4 text-black dark:text-white">Features</h2>
          <ul className="space-y-2">
            <li>
              <Link href="#bi" className="text-gray-600 dark:text-gray-400 hover:underline">Business Intelligence</Link>
            </li>
            <li>
              <Link href="#visualization" className="text-gray-600 dark:text-gray-400 hover:underline">Data Visualization</Link>
            </li>
            <li>
              <Link href="#predictive" className="text-gray-600 dark:text-gray-400 hover:underline">Predictive Analytics</Link>
            </li>
          </ul>
        </Card>

        <Card className="bg-white dark:bg-black border border-gray-200 dark:border-gray-800">
          <h2 className="text-2xl font-bold mb-4 text-black dark:text-white">Integration</h2>
          <ul className="space-y-2">
            <li>
              <Link href="#data-sources" className="text-gray-600 dark:text-gray-400 hover:underline">Data Sources</Link>
            </li>
            <li>
              <Link href="#api" className="text-gray-600 dark:text-gray-400 hover:underline">API Reference</Link>
            </li>
            <li>
              <Link href="#examples" className="text-gray-600 dark:text-gray-400 hover:underline">Example Reports</Link>
            </li>
          </ul>
        </Card>
      </div>

      <div className="prose dark:prose-invert max-w-none">
        <section id="overview" className="mb-12">
          <h2 className="text-3xl font-bold mb-4">Overview</h2>
          <p className="text-gray-600 dark:text-gray-400">
            Our Analytics Tools provide comprehensive business intelligence and data visualization capabilities.
          </p>
        </section>

        <section id="quickstart" className="mb-12">
          <h2 className="text-3xl font-bold mb-4">Quick Start Guide</h2>
          <p className="text-gray-600 dark:text-gray-400">
            Learn how to create your first dashboard and generate insights from your data.
          </p>
        </section>

        {/* Add more documentation sections as needed */}
      </div>
    </div>
  );
}
