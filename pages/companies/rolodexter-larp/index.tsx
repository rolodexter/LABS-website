import { Button, Card } from 'flowbite-react';
import Link from 'next/link';

export default function RolodexterLarp() {
  const solutions = [
    {
      title: 'AI-Enhanced LARP',
      description: 'Next-generation live action role-playing experiences',
      features: [
        'Dynamic storylines',
        'Real-time NPC interactions',
        'AI-driven quests',
        'Adaptive gameplay'
      ]
    },
    {
      title: 'Smart Props',
      description: 'Interactive props and equipment for immersive gameplay',
      features: [
        'IoT integration',
        'Real-time tracking',
        'Environmental effects',
        'Smart wearables'
      ]
    },
    {
      title: 'Game Management',
      description: 'Advanced tools for LARP organizers and game masters',
      features: [
        'Event planning',
        'Character management',
        'Story generation',
        'Analytics dashboard'
      ]
    }
  ];

  const experiences = [
    {
      title: 'Fantasy Realms',
      participants: '50-200',
      duration: '2-3 days',
      description: 'Medieval fantasy adventures with AI-driven storylines'
    },
    {
      title: 'Sci-Fi Missions',
      participants: '20-100',
      duration: '1-2 days',
      description: 'Futuristic scenarios with advanced technology integration'
    },
    {
      title: 'Urban Mysteries',
      participants: '10-50',
      duration: '4-8 hours',
      description: 'Modern-day investigations with real-time AI interactions'
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8 mt-16">
      <div className="mb-8">
        <Link href="/companies" className="text-gray-600 dark:text-gray-400 hover:underline">
          ← Back to Companies
        </Link>
      </div>
      
      <h1 className="text-4xl font-bold mb-4 text-black dark:text-white">rolodexterLARP</h1>
      <p className="text-xl mb-8 text-gray-600 dark:text-gray-400">
        Revolutionary AI-enhanced live action role-playing experiences
      </p>

      <div className="grid md:grid-cols-3 gap-6 mb-12">
        {solutions.map((solution) => (
          <Card key={solution.title} className="bg-white dark:bg-black border border-gray-200 dark:border-gray-800">
            <h3 className="text-2xl font-bold mb-4 text-black dark:text-white">{solution.title}</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">{solution.description}</p>
            <ul className="space-y-2">
              {solution.features.map((feature) => (
                <li key={feature} className="flex items-center text-gray-600 dark:text-gray-400">
                  <span className="mr-2">•</span>
                  {feature}
                </li>
              ))}
            </ul>
          </Card>
        ))}
      </div>

      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6 text-black dark:text-white">LARP Experiences</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {experiences.map((exp) => (
            <div key={exp.title} className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-2 text-black dark:text-white">{exp.title}</h3>
              <div className="mb-4">
                <p className="text-sm text-gray-500 dark:text-gray-400">Participants: {exp.participants}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">Duration: {exp.duration}</p>
              </div>
              <p className="text-gray-600 dark:text-gray-400">{exp.description}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-gray-50 dark:bg-gray-900 p-8 rounded-lg">
          <h2 className="text-2xl font-bold mb-4 text-black dark:text-white">Organize an Event</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Ready to create an unforgettable LARP experience?
          </p>
          <Button as={Link} href="/contact">
            Get Started
          </Button>
        </div>

        <div className="bg-gray-50 dark:bg-gray-900 p-8 rounded-lg">
          <h2 className="text-2xl font-bold mb-4 text-black dark:text-white">Join Events</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Find upcoming LARP events in your area.
          </p>
          <Button as={Link} href="/events" color="light">
            View Events
          </Button>
        </div>
      </div>
    </div>
  );
}
