import { Button, Card } from 'flowbite-react';
import Link from 'next/link';

export default function DataProcessing() {
  const features = [
    {
      title: 'ETL Pipeline Management',
      description: 'Build and manage complex data pipelines with ease',
      icon: '🔄'
    },
    {
      title: 'Real-time Processing',
      description: 'Process and analyze data in real-time',
      icon: '⚡'
    },
    {
      title: 'Data Quality Control',
      description: 'Ensure data accuracy and consistency',
      icon: '✅'
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8 mt-16">
      <div className="mb-8">
        <Link href="/products" className="text-gray-600 dark:text-gray-400 hover:underline">
          ← Back to Products
        </Link>
      </div>
      
      <h1 className="text-4xl font-bold mb-4 text-black dark:text-white">Data Processing</h1>
      <p className="text-xl mb-8 text-gray-600 dark:text-gray-400">
        Advanced ETL solutions for enterprise data management
      </p>

      <div className="grid md:grid-cols-3 gap-6 mb-12">
        {features.map((feature) => (
          <Card key={feature.title} className="bg-white dark:bg-black border border-gray-200 dark:border-gray-800">
            <div className="text-4xl mb-4">{feature.icon}</div>
            <h3 className="text-xl font-bold mb-2 text-black dark:text-white">{feature.title}</h3>
            <p className="text-gray-600 dark:text-gray-400">{feature.description}</p>
          </Card>
        ))}
      </div>

      <div className="bg-gray-50 dark:bg-gray-900 p-8 rounded-lg">
        <h2 className="text-2xl font-bold mb-4 text-black dark:text-white">Get Started</h2>
        <p className="mb-6 text-gray-600 dark:text-gray-400">
          Ready to transform your data processing? Contact us to learn more about our solutions.
        </p>
        <div className="flex gap-4">
          <Button as={Link} href="/contact">
            Contact Sales
          </Button>
          <Button as={Link} href="/docs/data-processing" color="light">
            View Documentation
          </Button>
        </div>
      </div>
    </div>
  );
}
