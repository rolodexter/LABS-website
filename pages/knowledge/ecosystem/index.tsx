import { ReactElement } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { Button } from '@/components/ui';

export default function KnowledgeEcosystem() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-4xl">
      <Head>
        <title>Knowledge Ecosystem | rolodexterLABS</title>
        <meta name="description" content="The rolodexterLABS Knowledge Ecosystem: An integrated framework for manufacturing knowledge at scale." />
      </Head>

      <div className="mb-8">
        <Link href="/knowledge" className="text-gray-600 dark:text-gray-400 hover:underline">
          ← Back to Knowledge
        </Link>
      </div>
      
      {/* Hero Section */}
      <div className="mb-16 text-center">
        <h1 className="text-4xl sm:text-5xl font-bold mb-6 text-black dark:text-white">Knowledge Ecosystem</h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
          An integrated framework for manufacturing knowledge at scale through interconnected systems, models, and protocols.
        </p>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-16">
        <div className="lg:col-span-2">
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">Architecture Overview</h2>
            <p className="mb-4">
              The rolodexterLABS Knowledge Ecosystem is built on a modular architecture that enables the efficient creation, organization, and distribution of knowledge assets. Unlike traditional knowledge management systems that rely on rigid hierarchies, our ecosystem employs a flexible, interconnected approach that mirrors the natural growth of human understanding.
            </p>
            <p className="mb-4">
              At its core, the ecosystem consists of three fundamental layers:
            </p>
            <ul className="list-disc pl-6 mb-6 space-y-2">
              <li><span className="font-medium">Knowledge Units</span> — Atomic, self-contained information elements with clear semantic relationships</li>
              <li><span className="font-medium">Knowledge Graphs</span> — Networked structures that map relationships between knowledge units</li>
              <li><span className="font-medium">Knowledge Interfaces</span> — Adaptive systems that mediate how knowledge is presented and consumed</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">Technical Implementation</h2>
            <p className="mb-4">
              Our ecosystem employs a JSON/Markdown modular architecture, allowing for both machine-readable structure and human-readable content. This approach enables:
            </p>
            <ul className="list-disc pl-6 mb-6 space-y-2">
              <li>Programmatic access to knowledge via API endpoints</li>
              <li>Version control and distributed collaboration through Git workflows</li>
              <li>Automated validation through schema enforcement</li>
              <li>Bidirectional linking between knowledge assets</li>
            </ul>
            <p>
              The ecosystem is designed to be self-healing, with built-in mechanisms for detecting inconsistencies, resolving conflicts, and integrating new information as it becomes available.
            </p>
          </section>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-6 sticky top-24">
            <h3 className="text-lg font-bold mb-4 border-b pb-2">Schema Example</h3>
            <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded text-sm overflow-x-auto">
              {`{
  "id": "KU-A12C4D",
  "type": "knowledge_unit",
  "title": "Vector Database Integration",
  "content": "path/to/content.md",
  "relations": [
    {
      "target": "KU-B78E3F",
      "type": "prerequisite"
    },
    {
      "target": "KU-G45H2J",
      "type": "extension"
    }
  ],
  "metadata": {
    "domain": "infrastructure",
    "complexity": 3,
    "lastUpdated": "2025-03-15"
  }
}`}
            </pre>
            <div className="mt-6">
              <Button as={Link} href="https://github.com/rolodexter/knowledge-schema" size="small">
                View Full Schema
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Applications Section */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold mb-6 text-center">Practical Applications</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="border border-gray-200 dark:border-gray-800 rounded-lg p-6">
            <h3 className="text-xl font-bold mb-3">Scientific Discovery</h3>
            <p className="mb-4">
              Accelerate research by automatically identifying patterns, gaps, and opportunities across disparate knowledge domains.
            </p>
          </div>
          <div className="border border-gray-200 dark:border-gray-800 rounded-lg p-6">
            <h3 className="text-xl font-bold mb-3">Executive Intelligence</h3>
            <p className="mb-4">
              Enable decision-makers to access precisely the right knowledge at the right time, contextualized to their specific needs.
            </p>
          </div>
          <div className="border border-gray-200 dark:border-gray-800 rounded-lg p-6">
            <h3 className="text-xl font-bold mb-3">Knowledge Manufacturing</h3>
            <p className="mb-4">
              Transform raw data into structured, actionable knowledge through automated synthesis and validation processes.
            </p>
          </div>
          <div className="border border-gray-200 dark:border-gray-800 rounded-lg p-6">
            <h3 className="text-xl font-bold mb-3">Learning Systems</h3>
            <p className="mb-4">
              Create personalized learning experiences that adapt to individual knowledge profiles and learning trajectories.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-6">Begin Integrating with the Knowledge Ecosystem</h2>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button as={Link} href="/contact">
            Request Access
          </Button>
          <Button as={Link} href="/docs/api" color="light">
            View API Documentation
          </Button>
        </div>
      </div>
    </div>
  );
}

// Define a custom layout to prevent duplicate footer issues
KnowledgeEcosystem.getLayout = function getLayout(page: ReactElement) {
  return (
    <div>{page}</div>
  );
};
