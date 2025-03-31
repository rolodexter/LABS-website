import { Button, Card } from '@/components/ui';
import Link from 'next/link';

// Discord community page component
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

  // Channel definitions
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
    <div className="max-w-7xl mx-auto px-6 py-24">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold mb-4">Join Our Discord Community</h1>
        <p className="text-xl text-gray-600 mb-8">
          Connect with developers, researchers, and enthusiasts
        </p>
        <a
          href="https://discord.gg/N9V7N3sNwg"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Button variant="primary">
            Join Discord Server
          </Button>
        </a>
      </div>

      <div className="grid md:grid-cols-2 gap-12 mb-16">
        <div>
          <h2 className="text-2xl font-bold mb-8">Community Features</h2>
          <div className="space-y-8">
            {features.map((feature) => (
              <Card key={feature.title} variant="hover" padding="lg">
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-8">Active Channels</h2>
          <div className="space-y-8">
            {channels.map((channel) => (
              <Card key={channel.name} variant="hover" padding="lg">
                <h3 className="text-xl font-bold mb-2">{channel.name}</h3>
                <p className="text-gray-600">{channel.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
