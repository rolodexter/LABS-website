import { Button, Card  } from '@/components/ui';
import Link from 'next/link';

export default function ModelTraining() {
  const services = [
    {
      name: 'Data Preparation',
      description: 'Comprehensive data preparation and preprocessing',
      features: [
        'Data Cleaning',
        'Feature Engineering',
        'Data Augmentation',
        'Quality Validation'
      ]
    },
    {
      name: 'Model Training',
      description: 'Advanced model training and optimization',
      features: [
        'Hyperparameter Tuning',
        'Cross-validation',
        'Performance Metrics',
        'Error Analysis'
      ]
    },
    {
      name: 'Training Infrastructure',
      description: 'Scalable infrastructure for model training',
      features: [
        'GPU Clusters',
        'Distributed Training',
        'Resource Management',
        'Cost Optimization'
      ]
    }
  ];

  const capabilities = [
    {
      title: 'Supervised Learning',
      description: 'Training models with labeled datasets for classification and regression tasks'
    },
    {
      title: 'Unsupervised Learning',
      description: 'Discovering patterns and structures in unlabeled data'
    },
    {
      title: 'Reinforcement Learning',
      description: 'Training agents through interaction with environments'
    },
    {
      title: 'Transfer Learning',
      description: 'Leveraging pre-trained models for new tasks'
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8 mt-16">
      <div className="mb-8">
        <Link href="/services" className="text-gray-600 dark:text-gray-400 hover:underline">
          ← Back to Services
        </Link>
      </div>
      
      <h1 className="text-4xl font-bold mb-4 text-black dark:text-white">Model Training</h1>
      <p className="text-xl mb-8 text-gray-600 dark:text-gray-400">
        Professional model training services with state-of-the-art infrastructure
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
        <h2 className="text-2xl font-bold mb-6 text-black dark:text-white">Training Capabilities</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {capabilities.map((capability) => (
            <div key={capability.title} className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-2 text-black dark:text-white">{capability.title}</h3>
              <p className="text-gray-600 dark:text-gray-400">{capability.description}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-gray-50 dark:bg-gray-900 p-8 rounded-lg">
          <h2 className="text-2xl font-bold mb-4 text-black dark:text-white">Start Training</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Ready to train your model? Let's discuss your requirements.
          </p>
          <Button as={Link} href="/contact">
            Contact Us
          </Button>
        </div>

        <div className="bg-gray-50 dark:bg-gray-900 p-8 rounded-lg">
          <h2 className="text-2xl font-bold mb-4 text-black dark:text-white">Infrastructure Details</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Learn more about our training infrastructure and capabilities.
          </p>
          <Button as={Link} href="/docs/infrastructure" color="light">
            View Details
          </Button>
        </div>
      </div>
    </div>
  );
}
