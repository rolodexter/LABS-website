import { Button, Card } from 'flowbite-react';
import Link from 'next/link';

export default function Applications() {
  const applications = [
    {
      name: 'Data Processing Suite',
      description: 'Enterprise-grade ETL and data processing solutions',
      features: [
        'Advanced ETL Pipeline',
        'Real-time Data Processing',
        'Data Quality Management',
        'Automated Workflows'
      ]
    },
    {
      name: 'Analytics Platform',
      description: 'Business intelligence and analytics tools',
      features: [
        'Interactive Dashboards',
        'Predictive Analytics',
        'Custom Reports',
        'Data Visualization'
      ]
    },
    {
      name: 'AI Integration Tools',
      description: 'Tools for integrating AI into existing systems',
      features: [
        'API Integration',
        'Model Deployment',
        'Performance Monitoring',
        'Scalability Management'
      ]
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8 mt-16">
      <div className="mb-8">
        <Link href="/products" className="text-gray-600 dark:text-gray-400 hover:underline">
          ← Back to Products
        </Link>
      </div>
      
      <h1 className="text-4xl font-bold mb-4 text-black dark:text-white">Enterprise Applications</h1>
      <p className="text-xl mb-8 text-gray-600 dark:text-gray-400">
        Powerful software solutions for modern businesses
      </p>

      <div className="grid md:grid-cols-3 gap-6 mb-12">
        {applications.map((app) => (
          <Card key={app.name} className="bg-white dark:bg-black border border-gray-200 dark:border-gray-800">
            <h3 className="text-2xl font-bold mb-4 text-black dark:text-white">{app.name}</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">{app.description}</p>
            <ul className="space-y-2">
              {app.features.map((feature) => (
                <li key={feature} className="flex items-center text-gray-600 dark:text-gray-400">
                  <span className="mr-2">•</span>
                  {feature}
                </li>
              ))}
            </ul>
          </Card>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-gray-50 dark:bg-gray-900 p-8 rounded-lg">
          <h2 className="text-2xl font-bold mb-4 text-black dark:text-white">Request Demo</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            See our applications in action with a personalized demo.
          </p>
          <Button as={Link} href="/contact">
            Schedule Demo
          </Button>
        </div>

        <div className="bg-gray-50 dark:bg-gray-900 p-8 rounded-lg">
          <h2 className="text-2xl font-bold mb-4 text-black dark:text-white">Documentation</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Access detailed guides and API documentation.
          </p>
          <Button as={Link} href="/docs/applications" color="light">
            View Documentation
          </Button>
        </div>
      </div>
    </div>
  );
}
