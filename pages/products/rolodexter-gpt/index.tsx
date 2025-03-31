import { Button, Card } from 'flowbite-react';
import Link from 'next/link';

export default function RolodexterGPT() {
  const features = [
    {
      title: 'Advanced Language Understanding',
      description: 'State-of-the-art natural language processing for human-like comprehension and response generation'
    },
    {
      title: 'Context-Aware Responses',
      description: 'Maintains conversation history and context for more relevant and coherent interactions'
    },
    {
      title: 'Multi-Modal Capabilities',
      description: 'Process and generate text, code, and structured data with equal proficiency'
    },
    {
      title: 'Enterprise Security',
      description: 'Built-in security features with data encryption and privacy controls'
    },
    {
      title: 'Custom Training',
      description: 'Train on your domain-specific data for specialized applications'
    },
    {
      title: 'API Integration',
      description: 'Easy integration with RESTful APIs and WebSocket support'
    }
  ];

  const pricingTiers = [
    {
      name: 'Developer',
      price: '$49',
      period: 'per month',
      features: [
        '1M tokens per month',
        'REST API access',
        'Basic support',
        'Community access'
      ],
      href: '/contact'
    },
    {
      name: 'Business',
      price: '$199',
      period: 'per month',
      features: [
        '5M tokens per month',
        'Priority API access',
        'Premium support',
        'Custom models'
      ],
      href: '/contact',
      featured: true
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      period: 'per month',
      features: [
        'Unlimited tokens',
        'Dedicated infrastructure',
        '24/7 support',
        'On-premise deployment'
      ],
      href: '/contact'
    }
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-black">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16 mt-16">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-black dark:text-white">
            rolodexterGPT
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-600 dark:text-gray-400">
            Advanced language model for enterprise applications
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button
              as={Link}
              href="#pricing"
              className="bg-black dark:bg-white text-white dark:text-black border border-black dark:border-white hover:bg-white hover:text-black dark:hover:bg-black dark:hover:text-white"
            >
              View Pricing
            </Button>
            <Button
              as={Link}
              href="/docs/api"
              className="bg-white dark:bg-black text-black dark:text-white border border-black dark:border-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black"
            >
              API Documentation
            </Button>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-gray-50 dark:bg-gray-900 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-black dark:text-white">
            Features
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature) => (
              <Card key={feature.title} className="bg-white dark:bg-black border border-gray-200 dark:border-gray-800">
                <h3 className="text-xl font-bold mb-2 text-black dark:text-white">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {feature.description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Pricing Section */}
      <div id="pricing" className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12 text-black dark:text-white">
          Pricing Plans
        </h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {pricingTiers.map((tier) => (
            <div
              key={tier.name}
              className={`p-8 rounded-lg ${
                tier.featured
                  ? 'bg-black dark:bg-white text-white dark:text-black border-2 border-black dark:border-white transform scale-105'
                  : 'bg-white dark:bg-black text-black dark:text-white border border-gray-200 dark:border-gray-800'
              }`}
            >
              <h3 className="text-2xl font-bold mb-4">{tier.name}</h3>
              <div className="mb-6">
                <span className="text-4xl font-bold">{tier.price}</span>
                <span className="text-gray-500 dark:text-gray-400">
                  {tier.period}
                </span>
              </div>
              <ul className="mb-8 space-y-4">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-center">
                    <svg
                      className="w-5 h-5 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
              <Button
                as={Link}
                href={tier.href}
                className={`w-full ${
                  tier.featured
                    ? 'bg-white dark:bg-black text-black dark:text-white border border-black dark:border-white hover:bg-gray-100 dark:hover:bg-gray-900'
                    : 'bg-black dark:bg-white text-white dark:text-black border border-black dark:border-white hover:bg-white hover:text-black dark:hover:bg-black dark:hover:text-white'
                }`}
              >
                Get Started
              </Button>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gray-50 dark:bg-gray-900 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-8 text-black dark:text-white">
            Ready to get started?
          </h2>
          <p className="text-xl mb-8 text-gray-600 dark:text-gray-400">
            Contact us to learn more about rolodexterGPT and how it can help your business.
          </p>
          <div className="flex justify-center gap-4">
            <Button
              as={Link}
              href="/contact"
              className="bg-black dark:bg-white text-white dark:text-black border border-black dark:border-white hover:bg-white hover:text-black dark:hover:bg-black dark:hover:text-white"
            >
              Contact Sales
            </Button>
            <Button
              as={Link}
              href="/docs"
              className="bg-white dark:bg-black text-black dark:text-white border border-black dark:border-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black"
            >
              View Documentation
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
