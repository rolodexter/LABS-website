import { Card } from 'flowbite-react';
import Link from 'next/link';

export default function Documentation() {
  const sections = [
    {
      title: 'Products',
      items: [
        { title: 'Data Processing', href: '/docs/data-processing' },
        { title: 'AI Solutions', href: '/docs/ai-solutions' },
        { title: 'Analytics Tools', href: '/docs/analytics' }
      ]
    },
    {
      title: 'API Reference',
      items: [
        { title: 'REST API', href: '/docs/api/rest' },
        { title: 'GraphQL API', href: '/docs/api/graphql' },
        { title: 'WebSocket API', href: '/docs/api/websocket' }
      ]
    },
    {
      title: 'Guides',
      items: [
        { title: 'Getting Started', href: '/docs/guides/getting-started' },
        { title: 'Integration', href: '/docs/guides/integration' },
        { title: 'Best Practices', href: '/docs/guides/best-practices' }
      ]
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8 mt-16">
      <h1 className="text-4xl font-bold mb-8 text-black dark:text-white">Documentation</h1>
      
      <div className="grid md:grid-cols-3 gap-8">
        {sections.map((section) => (
          <Card key={section.title} className="bg-white dark:bg-black border border-gray-200 dark:border-gray-800">
            <h2 className="text-2xl font-bold mb-4 text-black dark:text-white">{section.title}</h2>
            <ul className="space-y-2">
              {section.items.map((item) => (
                <li key={item.title}>
                  <Link 
                    href={item.href}
                    className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white"
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </Card>
        ))}
      </div>

      <div className="mt-12 bg-gray-50 dark:bg-gray-900 p-8 rounded-lg">
        <h2 className="text-2xl font-bold mb-4 text-black dark:text-white">Need Help?</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          Can't find what you're looking for? Our support team is here to help.
        </p>
        <Link 
          href="/contact"
          className="text-black dark:text-white hover:underline"
        >
          Contact Support →
        </Link>
      </div>
    </div>
  );
}
