import { ReactElement } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { Button } from '@/components/ui';

export default function ManufacturingProcessOptimizationCaseStudy() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-4xl">
      <Head>
        <title>Manufacturing Process Optimization | rolodexterLABS</title>
        <meta name="description" content="Case study: Executive-functioning systems approach to intelligent process control and throughput scaling in manufacturing." />
      </Head>

      <div className="mb-8">
        <Link href="/case-studies" className="text-gray-600 dark:text-gray-400 hover:underline">
          ← Back to Case Studies
        </Link>
      </div>
      
      {/* Status Badge */}
      <div className="mb-12 flex justify-center">
        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200 border border-gray-300 dark:border-gray-700">
          Simulation
        </span>
      </div>
      
      {/* Hero Section */}
      <div className="mb-16 text-center">
        <h1 className="text-4xl sm:text-5xl font-bold mb-6 text-black dark:text-white">Manufacturing Process Optimization</h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
          An executive-functioning systems approach to intelligent process control and throughput scaling.
        </p>
      </div>

      {/* Overview Section */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold mb-6 border-b pb-2">Overview</h2>
        
        <div className="prose prose-lg max-w-none dark:prose-invert mb-8">
          <p>
            A precision manufacturing client with distributed facilities across three continents sought to address process variability, equipment downtime, and throughput constraints without major capital investment. Traditional approaches relied on rules-based automation and human intervention, leading to suboptimal resource allocation and response latency.
          </p>

          <p>
            rolodexterLABS developed an executive-functioning system that integrates real-time sensor data, production history, and maintenance records into a unified knowledge framework. This approach enabled predictive optimization of manufacturing processes through a hierarchical decision architecture that operates at multiple time scales.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="border border-gray-200 dark:border-gray-800 rounded-lg p-6">
            <h3 className="text-xl font-bold mb-3">Objective</h3>
            <p>
              Increase throughput by 25% while reducing process variability and unplanned downtime without significant capital equipment investments.
            </p>
          </div>

          <div className="border border-gray-200 dark:border-gray-800 rounded-lg p-6">
            <h3 className="text-xl font-bold mb-3">Approach</h3>
            <p>
              Deploy a multi-agent cognitive architecture capable of process monitoring, anomaly detection, root cause analysis, and autonomous corrective action.
            </p>
          </div>

          <div className="border border-gray-200 dark:border-gray-800 rounded-lg p-6">
            <h3 className="text-xl font-bold mb-3">Implementation</h3>
            <p>
              Three-phase deployment across a pilot facility, followed by progressive integration with existing SCADA systems and ERP infrastructure.
            </p>
          </div>
        </div>
      </section>

      {/* Process Diagram */}
      <section className="mb-16 bg-gray-50 dark:bg-gray-900 p-8 rounded-lg">
        <h2 className="text-2xl font-bold mb-8 text-center">System Architecture</h2>
        
        <div className="grid grid-cols-1 gap-4">
          <div className="border-l-4 border-black dark:border-white pl-6 py-2">
            <span className="text-sm font-mono text-gray-500 dark:text-gray-400">LEVEL 4</span>
            <h3 className="text-lg font-bold">Executive Control System</h3>
            <p className="text-gray-600 dark:text-gray-400">Long-term planning, resource allocation, and strategic optimization</p>
          </div>
          
          <div className="border-l-4 border-black dark:border-white pl-6 py-2">
            <span className="text-sm font-mono text-gray-500 dark:text-gray-400">LEVEL 3</span>
            <h3 className="text-lg font-bold">Process Coordination Layer</h3>
            <p className="text-gray-600 dark:text-gray-400">Cross-process dependencies, material flow optimization, and constraint management</p>
          </div>
          
          <div className="border-l-4 border-black dark:border-white pl-6 py-2">
            <span className="text-sm font-mono text-gray-500 dark:text-gray-400">LEVEL 2</span>
            <h3 className="text-lg font-bold">Modular Process Agents</h3>
            <p className="text-gray-600 dark:text-gray-400">Domain-specific agents with explicit process models and anomaly detection capabilities</p>
          </div>
          
          <div className="border-l-4 border-black dark:border-white pl-6 py-2">
            <span className="text-sm font-mono text-gray-500 dark:text-gray-400">LEVEL 1</span>
            <h3 className="text-lg font-bold">Sensor Integration & Control</h3>
            <p className="text-gray-600 dark:text-gray-400">Real-time data acquisition, signal processing, and direct equipment interfaces</p>
          </div>
        </div>
        
        <p className="text-center mt-8 text-sm text-gray-600 dark:text-gray-400">
          Each layer communicates through standardized protocols with bidirectional information flow.
        </p>
      </section>

      {/* Technologies Section */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold mb-6 border-b pb-2">Key Technologies</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <div>
              <h3 className="text-xl font-bold mb-2">Knowledge Representation</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Multi-ontology process models</li>
                <li>Causal dependency graphs</li>
                <li>Temporal knowledge structures</li>
                <li>Parameterized process constraints</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-xl font-bold mb-2">Inference Systems</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Bayesian causal networks</li>
                <li>Symbolic planning modules</li>
                <li>Model predictive control</li>
                <li>Constraint satisfaction solvers</li>
              </ul>
            </div>
          </div>
          
          <div className="space-y-4">
            <div>
              <h3 className="text-xl font-bold mb-2">Integration Infrastructure</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Time-series database clusters</li>
                <li>OPC-UA/MQTT gateways</li>
                <li>Knowledge graph persistence</li>
                <li>Secure edge computing nodes</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-xl font-bold mb-2">Executive Control</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>rolodexterGPT for process interpretation</li>
                <li>Hierarchical goal management</li>
                <li>Interpretable decision pathways</li>
                <li>Human-in-the-loop interfaces</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Outcomes Section */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold mb-6 border-b pb-2">Measured Outcomes</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div className="text-center">
            <div className="text-4xl font-bold mb-2">31%</div>
            <p className="text-gray-600 dark:text-gray-400">Increase in overall throughput</p>
          </div>
          
          <div className="text-center">
            <div className="text-4xl font-bold mb-2">68%</div>
            <p className="text-gray-600 dark:text-gray-400">Reduction in unplanned downtime</p>
          </div>
          
          <div className="text-center">
            <div className="text-4xl font-bold mb-2">43%</div>
            <p className="text-gray-600 dark:text-gray-400">Decrease in process variability</p>
          </div>
          
          <div className="text-center">
            <div className="text-4xl font-bold mb-2">15%</div>
            <p className="text-gray-600 dark:text-gray-400">Reduction in energy consumption</p>
          </div>
        </div>

        <div className="prose prose-lg max-w-none dark:prose-invert">
          <p>
            Beyond quantitative improvements, the system provided unprecedented visibility into process interdependencies and created a foundation for continuous optimization. The executive control layer enabled strategic resource allocation and proactive maintenance scheduling based on predicted equipment degradation patterns.
          </p>
          
          <p>
            Most significantly, the system demonstrated the ability to discover novel process configurations that human operators had not previously identified, leading to improved product quality and reduced material waste.
          </p>
        </div>
      </section>

      {/* CTA Section */}
      <div className="text-center bg-gray-50 dark:bg-gray-900 p-8 rounded-lg">
        <h2 className="text-2xl font-bold mb-4">Implement Similar Capabilities</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-2xl mx-auto">
          Explore how rolodexterLABS can develop executive-functioning systems for your manufacturing processes.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button as={Link} href="/contact">
            Request Consultation
          </Button>
          <Button as={Link} href="/docs/applications/manufacturing" color="light">
            Technical Approach
          </Button>
        </div>
      </div>
    </div>
  );
}

// Define a custom layout to prevent duplicate footer issues
ManufacturingProcessOptimizationCaseStudy.getLayout = function getLayout(page: ReactElement) {
  return (
    <div>{page}</div>
  );
};
