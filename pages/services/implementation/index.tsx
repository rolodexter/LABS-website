import { Button, Card } from 'flowbite-react';
import Link from 'next/link';

export default function Implementation() {
  const services = [
    {
      title: 'System Integration',
      description: 'Seamless integration with existing infrastructure',
      icon: '🔄'
    },
    {
      title: 'Custom Development',
      description: 'Tailored AI solutions for your needs',
      icon: '💻'
    },
    {
      title: 'Deployment & Testing',
      description: 'Rigorous testing and smooth deployment',
      icon: '🚀'
    }
  ];

  const phases = [
    {
      phase: 'Planning',
      tasks: [
        'Requirements gathering',
        'Architecture design',
        'Timeline planning'
      ]
    },
    {
      phase: 'Development',
      tasks: [
        'Custom development',
        'Integration setup',
        'Quality assurance'
      ]
    },
    {
      phase: 'Deployment',
      tasks: [
        'System deployment',
        'Performance testing',
        'User training'
      ]
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8 mt-16">
      <div className="mb-8">
        <Link href="/services" className="text-gray-600 dark:text-gray-400 hover:underline">
          ← Back to Services
        </Link>
      </div>
      
      <h1 className="text-4xl font-bold mb-4 text-black dark:text-white">Implementation Services</h1>
      <p className="text-xl mb-8 text-gray-600 dark:text-gray-400">
        Full-service AI system rollout and integration
      </p>

      <div className="grid md:grid-cols-3 gap-6 mb-12">
        {services.map((service) => (
          <Card key={service.title} className="bg-white dark:bg-black border border-gray-200 dark:border-gray-800">
            <div className="text-4xl mb-4">{service.icon}</div>
            <h3 className="text-xl font-bold mb-2 text-black dark:text-white">{service.title}</h3>
            <p className="text-gray-600 dark:text-gray-400">{service.description}</p>
          </Card>
        ))}
      </div>

      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6 text-black dark:text-white">Implementation Phases</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {phases.map((phase) => (
            <div key={phase.phase} className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-4 text-black dark:text-white">{phase.phase}</h3>
              <ul className="space-y-2">
                {phase.tasks.map((task) => (
                  <li key={task} className="flex items-center text-gray-600 dark:text-gray-400">
                    <span className="mr-2">•</span>
                    {task}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-gray-50 dark:bg-gray-900 p-8 rounded-lg">
        <h2 className="text-2xl font-bold mb-4 text-black dark:text-white">Start Implementation</h2>
        <p className="mb-6 text-gray-600 dark:text-gray-400">
          Ready to implement AI in your organization? Let's discuss your project.
        </p>
        <div className="flex gap-4">
          <Button as={Link} href="/contact">
            Start Project
          </Button>
          <Button as={Link} href="/case-studies" color="light">
            View Case Studies
          </Button>
        </div>
      </div>
    </div>
  );
}
