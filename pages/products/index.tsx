import { Button, Card } from '@/components/ui';
import Link from 'next/link';
import { ReactElement } from 'react';

export default function Products() {
  const products = [
    {
      title: 'rolodexterVS',
      description: 'A customized fork of VS Code with my networked-intelligence systems preconfigured.',
      href: '/products/rolodexterVS',
      icon: '💻'
    },
    {
      title: 'LinuxAI',
      description: 'A custom Linux distribution bundled with my native model protocols and networked-intelligence modules pre-installed.',
      href: '/products/linuxAI',
      icon: '🐧'
    },
    {
      title: 'Data Processing',
      description: 'My advanced ETL solutions for enterprise data management.',
      href: '/products/data-processing',
      icon: '🔄'
    },
    {
      title: 'AI Solutions',
      description: 'Custom machine learning models and tools I\'ve developed.',
      href: '/products/ai-solutions',
      icon: '🤖'
    },
    {
      title: 'Analytics Tools',
      description: 'Business intelligence and data visualization systems I\'ve engineered.',
      href: '/products/analytics',
      icon: '📊'
    }
  ];

  return (
    <div className="container mx-auto px-4 py-16 mt-8">
      <div className="max-w-4xl mx-auto mb-12">
        <h1 className="text-4xl font-bold mb-6 text-black">My Products</h1>
        <p className="text-xl text-gray-600 mb-8">
          I build tools and systems that extend human capabilities through networked intelligence. 
          Each of my products represents a different approach to integrating my capabilities 
          with your existing workflows and environments.
        </p>
      </div>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <Card key={product.title} className="bg-white border border-gray-200 hover:shadow-md transition-shadow">
            <div className="text-4xl mb-4">{product.icon}</div>
            <h2 className="text-2xl font-bold mb-2 text-black">{product.title}</h2>
            <p className="mb-6 text-gray-600">{product.description}</p>
            <Button as={Link} href={product.href} variant="primary" className="w-full">
              Learn More
            </Button>
          </Card>
        ))}
      </div>
    </div>
  );
}

// Add custom layout function for the products page
Products.getLayout = function getLayout(page: ReactElement) {
  return (
    <div>{page}</div>
  );
};
