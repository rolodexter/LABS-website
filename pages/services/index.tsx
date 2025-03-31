import { Button, Card  } from '@/components/ui';
import Link from 'next/link';

export default function Services() {
  const services = [
    {
      title: 'Consulting',
      description: 'Strategic AI implementation advice',
      href: '/services/consulting',
      icon: '💡'
    },
    {
      title: 'Implementation',
      description: 'Full-service rollout and integration',
      href: '/services/implementation',
      icon: '⚙️'
    },
    {
      title: 'Training',
      description: 'Team development and upskilling programs',
      href: '/services/training',
      icon: '📚'
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8 mt-16">
      <h1 className="text-4xl font-bold mb-8 text-black dark:text-white">Our Services</h1>
      <div className="grid md:grid-cols-3 gap-6">
        {services.map((service) => (
          <Card key={service.title} className="bg-white dark:bg-black border border-gray-200 dark:border-gray-800">
            <div className="text-4xl mb-4">{service.icon}</div>
            <h2 className="text-2xl font-bold mb-2 text-black dark:text-white">{service.title}</h2>
            <p className="mb-4 text-gray-600 dark:text-gray-400">{service.description}</p>
            <Link href={service.href}>
              <Button className="w-full">
                Learn More
              </Button>
            </Link>
          </Card>
        ))}
      </div>
    </div>
  );
}
