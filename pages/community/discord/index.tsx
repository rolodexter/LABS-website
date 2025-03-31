import { Button, Card } from 'flowbite-react';
import Link from 'next/link';

export default function Discord() {
  const features = [
    {
      title: 'Live Chat',
      description: 'Real-time discussions with community members and developers'
    },
    {
      title: 'Voice Channels',
      description: 'Voice chat rooms for collaborative discussions and events'
    },
    {
      title: 'Private Groups',
      description: 'Dedicated spaces for project teams and special interest groups'
    }
  ];

  const channels = [
    {
      name: '# general',
      description: 'General discussions and community updates'
    },
    {
      name: '# support',
      description: 'Technical support and troubleshooting'
    },
    {
      name: '# showcase',
      description: 'Share your projects and get feedback'
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8 mt-16">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold mb-4 text-black dark:text-white">Join Our Discord Community</h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
          Connect with developers, researchers, and enthusiasts
        </p>
        <Button
          as="a"
          href="https://discord.gg/N9V7N3sNwg"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-black dark:bg-white text-white dark:text-black border border-black dark:border-white hover:bg-white hover:text-black dark:hover:bg-black dark:hover:text-white"
        >
          Join Discord Server
        </Button>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mb-16">
        {features.map((feature) => (
          <Card key={feature.title} className="bg-white dark:bg-black border border-gray-200 dark:border-gray-800">
            <h3 className="text-xl font-bold mb-2 text-black dark:text-white">{feature.title}</h3>
            <p className="text-gray-600 dark:text-gray-400">{feature.description}</p>
          </Card>
        ))}
      </div>

      <div className="mb-16">
        <h2 className="text-2xl font-bold mb-8 text-black dark:text-white">Featured Channels</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {channels.map((channel) => (
            <div
              key={channel.name}
              className="p-6 bg-gray-50 dark:bg-gray-900 rounded-lg"
            >
              <h3 className="text-xl font-bold mb-2 text-black dark:text-white">{channel.name}</h3>
              <p className="text-gray-600 dark:text-gray-400">{channel.description}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-gray-50 dark:bg-gray-900 p-8 rounded-lg text-center">
        <h2 className="text-2xl font-bold mb-4 text-black dark:text-white">Community Guidelines</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Please review our community guidelines before joining the server.
        </p>
        <Button
          as={Link}
          href="/community/guidelines"
          className="bg-white dark:bg-black text-black dark:text-white border border-black dark:border-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black"
        >
          View Guidelines
        </Button>
      </div>
    </div>
  );
}
