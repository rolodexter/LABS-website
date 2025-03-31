import { Button, Card } from 'flowbite-react';
import Link from 'next/link';

export default function AISolutions() {
  const solutions = [
    {
      title: 'Custom ML Models',
      description: 'Tailored machine learning models for your specific needs',
      icon: '🧠'
    },
    {
      title: 'NLP Services',
      description: 'Advanced natural language processing capabilities',
      icon: '💬'
    },
    {
      title: 'Computer Vision',
      description: 'State-of-the-art image and video analysis',
      icon: '👁️'
    }
  ];

  const benefits = [
    'Improved decision making',
    'Automated processes',
    'Enhanced customer experience',
    'Reduced operational costs'
  ];

  return (
    <div className="container mx-auto px-4 py-8 mt-16">
      <div className="mb-8">
        <Link href="/products" className="text-gray-600 dark:text-gray-400 hover:underline">
          ← Back to Products
        </Link>
      </div>
      
      <h1 className="text-4xl font-bold mb-4 text-black dark:text-white">AI Solutions</h1>
      <p className="text-xl mb-8 text-gray-600 dark:text-gray-400">
        Custom machine learning models and tools for your business
      </p>

      <div className="grid md:grid-cols-3 gap-6 mb-12">
        {solutions.map((solution) => (
          <Card key={solution.title} className="bg-white dark:bg-black border border-gray-200 dark:border-gray-800">
            <div className="text-4xl mb-4">{solution.icon}</div>
            <h3 className="text-xl font-bold mb-2 text-black dark:text-white">{solution.title}</h3>
            <p className="text-gray-600 dark:text-gray-400">{solution.description}</p>
          </Card>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-8 mb-12">
        <div>
          <h2 className="text-2xl font-bold mb-4 text-black dark:text-white">Key Benefits</h2>
          <ul className="space-y-3">
            {benefits.map((benefit) => (
              <li key={benefit} className="flex items-center text-gray-600 dark:text-gray-400">
                <span className="mr-2">✓</span>
                {benefit}
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-gray-50 dark:bg-gray-900 p-8 rounded-lg">
          <h2 className="text-2xl font-bold mb-4 text-black dark:text-white">Get Started</h2>
          <p className="mb-6 text-gray-600 dark:text-gray-400">
            Ready to transform your business with AI? Contact us to discuss your needs.
          </p>
          <div className="flex gap-4">
            <Button as={Link} href="/contact">
              Contact Sales
            </Button>
            <Button as={Link} href="/docs/ai-solutions" color="light">
              View Documentation
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
