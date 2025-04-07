import { ReactElement } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { Button } from '@/components/ui';

export default function ModelsDocumentation() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-4xl">
      <Head>
        <title>Models Documentation | rolodexterLABS</title>
        <meta name="description" content="Documentation for rolodexterLABS modular model development and integration." />
      </Head>

      <div className="mb-8">
        <Link href="/docs" className="text-gray-600 dark:text-gray-400 hover:underline">
          ← Back to Documentation
        </Link>
      </div>
      
      {/* Hero Section */}
      <div className="mb-16 text-center">
        <h1 className="text-4xl sm:text-5xl font-bold mb-6 text-black dark:text-white">Model Architecture</h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
          A modular approach to cognitive architecture and knowledge representation.
        </p>
      </div>

      {/* Introduction */}
      <section className="mb-16">
        <div className="prose prose-lg max-w-none dark:prose-invert">
          <p>
            rolodexterLABS models are designed as a composition of interoperable modules rather than monolithic structures. This approach enables precise control over cognitive capabilities, efficient knowledge transfer, and rapid experimentation across domains.
          </p>

          <p>
            Unlike conventional large language models that rely solely on parameter scaling, our architecture emphasizes structured knowledge representation, causal reasoning, and verifiable computation paths.
          </p>
        </div>
      </section>

      {/* Architecture Diagram */}
      <section className="mb-16 bg-gray-50 dark:bg-gray-900 p-8 rounded-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">Core Architecture</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div className="border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-800 rounded-lg p-6 flex flex-col">
            <h3 className="text-xl font-bold mb-3">Knowledge Modules</h3>
            <div className="flex-grow">
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Domain-specific knowledge representation</li>
                <li>Episodic memory structures</li>
                <li>Ontological frameworks</li>
                <li>Knowledge graph integration</li>
              </ul>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-auto">
                <span className="font-semibold">Format:</span> Structured schemas with validation rules
              </p>
            </div>
          </div>

          <div className="border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-800 rounded-lg p-6 flex flex-col">
            <h3 className="text-xl font-bold mb-3">Reasoning Engine</h3>
            <div className="flex-grow">
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Multi-step reasoning pathways</li>
                <li>Constraint satisfaction solvers</li>
                <li>Causal inference mechanisms</li>
                <li>Uncertainty representation</li>
              </ul>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-auto">
                <span className="font-semibold">Format:</span> State-action graphs with verification
              </p>
            </div>
          </div>

          <div className="border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-800 rounded-lg p-6 flex flex-col">
            <h3 className="text-xl font-bold mb-3">Executive Controller</h3>
            <div className="flex-grow">
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Task decomposition</li>
                <li>Resource allocation</li>
                <li>Self-monitoring</li>
                <li>Goal alignment</li>
              </ul>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-auto">
                <span className="font-semibold">Format:</span> Hierarchical planning structures
              </p>
            </div>
          </div>
        </div>

        <p className="text-center text-sm text-gray-600 dark:text-gray-400">
          All modules interact through standardized APIs and state representation protocols.
        </p>
      </section>

      {/* Key Differentiators */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold mb-6">Key Differentiators</h2>
        
        <div className="space-y-6">
          <div className="flex flex-col md:flex-row gap-6 items-start">
            <div className="bg-black text-white font-mono rounded-full w-10 h-10 flex-shrink-0 flex items-center justify-center">
              01
            </div>
            <div>
              <h3 className="text-xl font-bold mb-2">Compositional Architecture</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Models are composed of interchangeable cognitive modules that can be combined, replaced, or extended without retraining the entire system.
              </p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-6 items-start">
            <div className="bg-black text-white font-mono rounded-full w-10 h-10 flex-shrink-0 flex items-center justify-center">
              02
            </div>
            <div>
              <h3 className="text-xl font-bold mb-2">Explicit Knowledge Representation</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Knowledge is stored in structured, interpretable formats rather than distributed across neural network parameters, enabling verification and updating.
              </p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-6 items-start">
            <div className="bg-black text-white font-mono rounded-full w-10 h-10 flex-shrink-0 flex items-center justify-center">
              03
            </div>
            <div>
              <h3 className="text-xl font-bold mb-2">Transparent Reasoning</h3>
              <p className="text-gray-600 dark:text-gray-400">
                All inference steps are explicitly represented and can be inspected, validated, and modified, eliminating black-box decision processes.
              </p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-6 items-start">
            <div className="bg-black text-white font-mono rounded-full w-10 h-10 flex-shrink-0 flex items-center justify-center">
              04
            </div>
            <div>
              <h3 className="text-xl font-bold mb-2">Domain-Specific Adaptation</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Systems can be rapidly adapted to new domains without extensive retraining by updating knowledge modules while preserving core reasoning capabilities.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Integration Options */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold mb-6">Integration Options</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="border border-gray-200 dark:border-gray-800 rounded-lg p-6">
            <h3 className="text-xl font-bold mb-3">API Access</h3>
            <p className="mb-4">
              REST and GraphQL endpoints for model capabilities, with standardized request/response formats and authentication.
            </p>
            <Button as={Link} href="/docs/api" size="sm">
              API Documentation
            </Button>
          </div>

          <div className="border border-gray-200 dark:border-gray-800 rounded-lg p-6">
            <h3 className="text-xl font-bold mb-3">Local Deployment</h3>
            <p className="mb-4">
              Containerized deployment options for on-premises infrastructure with configuration for security and resource requirements.
            </p>
            <Button as={Link} href="/docs/infrastructure" size="sm">
              Deployment Guide
            </Button>
          </div>

          <div className="border border-gray-200 dark:border-gray-800 rounded-lg p-6">
            <h3 className="text-xl font-bold mb-3">Model Customization</h3>
            <p className="mb-4">
              Framework for domain adaptation through knowledge refinement and module configuration without full retraining.
            </p>
            <Button as={Link} href="/contact" size="sm">
              Request Customization
            </Button>
          </div>

          <div className="border border-gray-200 dark:border-gray-800 rounded-lg p-6">
            <h3 className="text-xl font-bold mb-3">Workflow Integration</h3>
            <p className="mb-4">
              Tools for integrating model capabilities into existing enterprise workflows and decision processes.
            </p>
            <Button as={Link} href="/docs/applications" size="sm">
              Integration Patterns
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <div className="text-center bg-gray-50 dark:bg-gray-900 p-8 rounded-lg">
        <h2 className="text-2xl font-bold mb-4">Ready to Explore Our Models?</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-2xl mx-auto">
          Request documentation access or schedule a technical demonstration with our team.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button as={Link} href="/contact">
            Request Documentation
          </Button>
          <Button as={Link} href="https://github.com/rolodexter/model-examples" color="light">
            View Code Examples
          </Button>
        </div>
      </div>
    </div>
  );
}

// Define a custom layout to prevent duplicate footer issues
ModelsDocumentation.getLayout = function getLayout(page: ReactElement) {
  return (
    <div>{page}</div>
  );
};
