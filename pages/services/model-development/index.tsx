import { Button, Card } from 'flowbite-react';
import Link from 'next/link';

export default function ModelDevelopment() {
  const services = [
    {
      name: 'Custom Model Architecture',
      description: 'Design and development of custom AI model architectures',
      features: [
        'Architecture Design',
        'Model Implementation',
        'Performance Optimization',
        'Scalability Planning'
      ]
    },
    {
      name: 'Transfer Learning',
      description: 'Adapt pre-trained models for specific use cases',
      features: [
        'Model Selection',
        'Fine-tuning',
        'Domain Adaptation',
        'Performance Validation'
      ]
    },
    {
      name: 'Model Deployment',
      description: 'Production-ready model deployment services',
      features: [
        'Infrastructure Setup',
        'API Development',
        'Monitoring Integration',
        'Scaling Solutions'
      ]
    }
  ];

  const process = [
    {
      step: 1,
      title: 'Requirements Analysis',
      description: 'Understanding your specific needs and use cases'
    },
    {
      step: 2,
      title: 'Architecture Design',
      description: 'Designing the optimal model architecture'
    },
    {
      step: 3,
      title: 'Development & Training',
      description: 'Implementing and training the model'
    },
    {
      step: 4,
      title: 'Deployment & Integration',
      description: 'Deploying the model to production'
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8 mt-16">
      <div className="mb-8">
        <Link href="/services" className="text-gray-600 dark:text-gray-400 hover:underline">
          ← Back to Services
        </Link>
      </div>
      
      <h1 className="text-4xl font-bold mb-4 text-black dark:text-white">Model Development</h1>
      <p className="text-xl mb-8 text-gray-600 dark:text-gray-400">
        Custom AI model development services for your specific needs
      </p>

      <div className="grid md:grid-cols-3 gap-6 mb-12">
        {services.map((service) => (
          <Card key={service.name} className="bg-white dark:bg-black border border-gray-200 dark:border-gray-800">
            <h3 className="text-2xl font-bold mb-4 text-black dark:text-white">{service.name}</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">{service.description}</p>
            <ul className="space-y-2">
              {service.features.map((feature) => (
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
        <h2 className="text-2xl font-bold mb-6 text-black dark:text-white">Development Process</h2>
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

      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-gray-50 dark:bg-gray-900 p-8 rounded-lg">
          <h2 className="text-2xl font-bold mb-4 text-black dark:text-white">Start Development</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Ready to develop your custom AI model? Let's discuss your requirements.
          </p>
          <Button as={Link} href="/contact">
            Contact Us
          </Button>
        </div>

        <div className="bg-gray-50 dark:bg-gray-900 p-8 rounded-lg">
          <h2 className="text-2xl font-bold mb-4 text-black dark:text-white">View Case Studies</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            See how we've helped others with model development.
          </p>
          <Button as={Link} href="/case-studies" color="light">
            View Cases
          </Button>
        </div>
      </div>
    </div>
  );
}
