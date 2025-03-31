import { Button, Card  } from '@/components/ui';
import Link from 'next/link';

export default function Models() {
  const models = [
    {
      name: 'NLP Models',
      description: 'Advanced language processing and understanding models',
      features: [
        'Text Classification',
        'Named Entity Recognition',
        'Sentiment Analysis',
        'Language Translation'
      ]
    },
    {
      name: 'Computer Vision',
      description: 'State-of-the-art image and video processing models',
      features: [
        'Object Detection',
        'Image Classification',
        'Facial Recognition',
        'Scene Understanding'
      ]
    },
    {
      name: 'Predictive Models',
      description: 'Machine learning models for forecasting and prediction',
      features: [
        'Time Series Analysis',
        'Regression Models',
        'Classification Models',
        'Anomaly Detection'
      ]
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8 mt-16">
      <div className="mb-8">
        <Link href="/products" className="text-gray-600 dark:text-gray-400 hover:underline">
          ← Back to Products
        </Link>
      </div>
      
      <h1 className="text-4xl font-bold mb-4 text-black dark:text-white">AI Models</h1>
      <p className="text-xl mb-8 text-gray-600 dark:text-gray-400">
        State-of-the-art machine learning models for enterprise applications
      </p>

      <div className="grid md:grid-cols-3 gap-6 mb-12">
        {models.map((model) => (
          <Card key={model.name} className="bg-white dark:bg-black border border-gray-200 dark:border-gray-800">
            <h3 className="text-2xl font-bold mb-4 text-black dark:text-white">{model.name}</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">{model.description}</p>
            <ul className="space-y-2">
              {model.features.map((feature) => (
                <li key={feature} className="flex items-center text-gray-600 dark:text-gray-400">
                  <span className="mr-2">•</span>
                  {feature}
                </li>
              ))}
            </ul>
          </Card>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-gray-50 dark:bg-gray-900 p-8 rounded-lg">
          <h2 className="text-2xl font-bold mb-4 text-black dark:text-white">Custom Models</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Need a specialized model for your use case? Our team can develop custom models tailored to your needs.
          </p>
          <Button as={Link} href="/contact">
            Contact Us
          </Button>
        </div>

        <div className="bg-gray-50 dark:bg-gray-900 p-8 rounded-lg">
          <h2 className="text-2xl font-bold mb-4 text-black dark:text-white">Model Documentation</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Access detailed documentation and examples for our pre-trained models.
          </p>
          <Button as={Link} href="/docs/models" color="light">
            View Documentation
          </Button>
        </div>
      </div>
    </div>
  );
}
