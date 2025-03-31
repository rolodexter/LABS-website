import { Button, Card } from 'flowbite-react';
import Link from 'next/link';

export default function Analytics() {
  const features = [
    {
      title: 'Business Intelligence',
      description: 'Transform data into actionable insights',
      icon: '📊'
    },
    {
      title: 'Data Visualization',
      description: 'Interactive dashboards and reports',
      icon: '📈'
    },
    {
      title: 'Predictive Analytics',
      description: 'Forecast trends and make data-driven decisions',
      icon: '🎯'
    }
  ];

  const useCases = [
    {
      title: 'Financial Analysis',
      description: 'Track KPIs and financial performance'
    },
    {
      title: 'Customer Insights',
      description: 'Understand customer behavior and preferences'
    },
    {
      title: 'Market Research',
      description: 'Analyze market trends and competition'
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8 mt-16">
      <div className="mb-8">
        <Link href="/products" className="text-gray-600 dark:text-gray-400 hover:underline">
          ← Back to Products
        </Link>
      </div>
      
      <h1 className="text-4xl font-bold mb-4 text-black dark:text-white">Analytics Tools</h1>
      <p className="text-xl mb-8 text-gray-600 dark:text-gray-400">
        Business intelligence and data visualization solutions
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

      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6 text-black dark:text-white">Use Cases</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {useCases.map((useCase) => (
            <div key={useCase.title} className="p-6 bg-gray-50 dark:bg-gray-900 rounded-lg">
              <h3 className="text-xl font-bold mb-2 text-black dark:text-white">{useCase.title}</h3>
              <p className="text-gray-600 dark:text-gray-400">{useCase.description}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-gray-50 dark:bg-gray-900 p-8 rounded-lg">
        <h2 className="text-2xl font-bold mb-4 text-black dark:text-white">Start Analyzing</h2>
        <p className="mb-6 text-gray-600 dark:text-gray-400">
          Ready to unlock insights from your data? Get started with our analytics tools.
        </p>
        <div className="flex gap-4">
          <Button as={Link} href="/contact">
            Contact Sales
          </Button>
          <Button as={Link} href="/docs/analytics" color="light">
            View Documentation
          </Button>
        </div>
      </div>
    </div>
  );
}
