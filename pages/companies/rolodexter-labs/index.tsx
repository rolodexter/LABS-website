import { Button, Card  } from '@/components/ui';
import Link from 'next/link';

export default function RolodexterLabs() {
  const highlights = [
    {
      title: 'Research & Development',
      description: 'Pioneering AI research and innovative solutions',
      achievements: [
        'State-of-the-art ML models',
        'Published research papers',
        'Industry collaborations',
        'Open-source contributions'
      ]
    },
    {
      title: 'Products & Services',
      description: 'Enterprise AI solutions and services',
      achievements: [
        'Custom AI models',
        'Data processing tools',
        'Analytics platforms',
        'Professional services'
      ]
    },
    {
      title: 'Innovation',
      description: 'Pushing the boundaries of AI technology',
      achievements: [
        'Patent portfolio',
        'Research partnerships',
        'Technology breakthroughs',
        'Industry standards'
      ]
    }
  ];

  const stats = [
    { number: '50+', label: 'Research Papers' },
    { number: '100+', label: 'Enterprise Clients' },
    { number: '25+', label: 'AI Patents' },
    { number: '1000+', label: 'Model Deployments' }
  ];

  return (
    <div className="container mx-auto px-4 py-8 mt-16">
      <div className="mb-8">
        <Link href="/companies" className="text-gray-600 dark:text-gray-400 hover:underline">
          ← Back to Companies
        </Link>
      </div>
      
      <h1 className="text-4xl font-bold mb-4 text-black dark:text-white">rolodexterLABS</h1>
      <p className="text-xl mb-8 text-gray-600 dark:text-gray-400">
        Leading the future of AI research and development
      </p>

      <div className="grid md:grid-cols-4 gap-6 mb-12">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg text-center">
            <div className="text-3xl font-bold mb-2 text-black dark:text-white">{stat.number}</div>
            <div className="text-gray-600 dark:text-gray-400">{stat.label}</div>
          </div>
        ))}
      </div>

      <div className="grid md:grid-cols-3 gap-6 mb-12">
        {highlights.map((highlight) => (
          <Card key={highlight.title} className="bg-white dark:bg-black border border-gray-200 dark:border-gray-800">
            <h3 className="text-2xl font-bold mb-4 text-black dark:text-white">{highlight.title}</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">{highlight.description}</p>
            <ul className="space-y-2">
              {highlight.achievements.map((achievement) => (
                <li key={achievement} className="flex items-center text-gray-600 dark:text-gray-400">
                  <span className="mr-2">•</span>
                  {achievement}
                </li>
              ))}
            </ul>
          </Card>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-gray-50 dark:bg-gray-900 p-8 rounded-lg">
          <h2 className="text-2xl font-bold mb-4 text-black dark:text-white">Work With Us</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Interested in collaborating on AI research or development?
          </p>
          <Link href="/contact">
            <Button>
              Contact Us
            </Button>
          </Link>
        </div>

        <div className="bg-gray-50 dark:bg-gray-900 p-8 rounded-lg">
          <h2 className="text-2xl font-bold mb-4 text-black dark:text-white">Research</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Explore our latest research papers and publications.
          </p>
          <Link href="/research">
            <Button color="light">
              View Research
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
