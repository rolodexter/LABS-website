import { Button, Card } from 'flowbite-react';
import Link from 'next/link';

export default function Products() {
  const products = [
    {
      title: 'Data Processing',
      description: 'Advanced ETL solutions for enterprise data',
      href: '/products/data-processing',
      icon: '🔄'
    },
    {
      title: 'AI Solutions',
      description: 'Custom machine learning models and tools',
      href: '/products/ai-solutions',
      icon: '🤖'
    },
    {
      title: 'Analytics Tools',
      description: 'Business intelligence and data visualization',
      href: '/products/analytics',
      icon: '📊'
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8 mt-16">
      <h1 className="text-4xl font-bold mb-8 text-black dark:text-white">Our Products</h1>
      <div className="grid md:grid-cols-3 gap-6">
        {products.map((product) => (
          <Card key={product.title} className="bg-white dark:bg-black border border-gray-200 dark:border-gray-800">
            <div className="text-4xl mb-4">{product.icon}</div>
            <h2 className="text-2xl font-bold mb-2 text-black dark:text-white">{product.title}</h2>
            <p className="mb-4 text-gray-600 dark:text-gray-400">{product.description}</p>
            <Button as={Link} href={product.href} className="w-full">
              Learn More
            </Button>
          </Card>
        ))}
      </div>
    </div>
  );
}
