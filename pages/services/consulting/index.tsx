import { Button, Card } from 'flowbite-react';
import Link from 'next/link';

export default function Consulting() {
  const services = [
    {
      title: 'AI Strategy',
      description: 'Develop a comprehensive AI implementation roadmap',
      icon: '🎯'
    },
    {
      title: 'Technology Assessment',
      description: 'Evaluate and recommend optimal AI solutions',
      icon: '📋'
    },
    {
      title: 'Risk Management',
      description: 'Identify and mitigate AI-related risks',
      icon: '🛡️'
    }
  ];

  const process = [
    {
      step: 1,
      title: 'Discovery',
      description: 'Understanding your business needs and objectives'
    },
    {
      step: 2,
      title: 'Analysis',
      description: 'Evaluating current systems and opportunities'
    },
    {
      step: 3,
      title: 'Strategy',
      description: 'Developing a tailored implementation plan'
    },
    {
      step: 4,
      title: 'Support',
      description: 'Ongoing guidance and optimization'
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8 mt-16">
      <div className="mb-8">
        <Link href="/services" className="text-gray-600 dark:text-gray-400 hover:underline">
          ← Back to Services
        </Link>
      </div>
      
      <h1 className="text-4xl font-bold mb-4 text-black dark:text-white">AI Consulting</h1>
      <p className="text-xl mb-8 text-gray-600 dark:text-gray-400">
        Strategic AI implementation advice for your business
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
        <h2 className="text-2xl font-bold mb-6 text-black dark:text-white">Our Process</h2>
        <div className="grid md:grid-cols-4 gap-6">
          {process.map((step) => (
            <div key={step.step} className="relative">
              <div className="absolute -left-4 top-0 w-8 h-8 bg-black dark:bg-white text-white dark:text-black rounded-full flex items-center justify-center font-bold">
                {step.step}
              </div>
              <div className="pl-8">
                <h3 className="text-xl font-bold mb-2 text-black dark:text-white">{step.title}</h3>
                <p className="text-gray-600 dark:text-gray-400">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-gray-50 dark:bg-gray-900 p-8 rounded-lg">
        <h2 className="text-2xl font-bold mb-4 text-black dark:text-white">Get Expert Advice</h2>
        <p className="mb-6 text-gray-600 dark:text-gray-400">
          Ready to start your AI journey? Schedule a consultation with our experts.
        </p>
        <div className="flex gap-4">
          <Button as={Link} href="/contact">
            Schedule Consultation
          </Button>
          <Button as={Link} href="/case-studies" color="light">
            View Case Studies
          </Button>
        </div>
      </div>
    </div>
  );
}
