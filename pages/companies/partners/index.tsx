import { Button, Card  } from '@/components/ui';
import Link from 'next/link';

export default function Partners() {
  const partnerCategories = [
    {
      title: 'Technology Partners',
      description: 'Leading technology providers and platform partners',
      partners: [
        {
          name: 'Cloud Providers',
          examples: ['AWS', 'Google Cloud', 'Microsoft Azure']
        },
        {
          name: 'Hardware Manufacturers',
          examples: ['NVIDIA', 'Intel', 'AMD']
        },
        {
          name: 'Software Platforms',
          examples: ['Docker', 'Kubernetes', 'TensorFlow']
        }
      ]
    },
    {
      title: 'Research Partners',
      description: 'Academic and research institution collaborations',
      partners: [
        {
          name: 'Universities',
          examples: ['Stanford', 'MIT', 'Berkeley']
        },
        {
          name: 'Research Labs',
          examples: ['OpenAI', 'DeepMind', 'AI2']
        },
        {
          name: 'Think Tanks',
          examples: ['Future of Humanity Institute', 'AI Now', 'MIRI']
        }
      ]
    },
    {
      title: 'Industry Partners',
      description: 'Domain experts and industry collaborators',
      partners: [
        {
          name: 'Healthcare',
          examples: ['Hospitals', 'Research Centers', 'Biotech']
        },
        {
          name: 'Finance',
          examples: ['Banks', 'Investment Firms', 'Insurance']
        },
        {
          name: 'Manufacturing',
          examples: ['Automotive', 'Electronics', 'Aerospace']
        }
      ]
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8 mt-16">
      <div className="mb-8">
        <Link href="/companies" className="text-gray-600 dark:text-gray-400 hover:underline">
          ← Back to Companies
        </Link>
      </div>
      
      <h1 className="text-4xl font-bold mb-4 text-black dark:text-white">Strategic Partners</h1>
      <p className="text-xl mb-8 text-gray-600 dark:text-gray-400">
        Collaborating with industry leaders to drive innovation
      </p>

      <div className="grid md:grid-cols-3 gap-6 mb-12">
        {partnerCategories.map((category) => (
          <Card key={category.title} className="bg-white dark:bg-black border border-gray-200 dark:border-gray-800">
            <h3 className="text-2xl font-bold mb-4 text-black dark:text-white">{category.title}</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">{category.description}</p>
            <div className="space-y-4">
              {category.partners.map((partner) => (
                <div key={partner.name} className="border-t border-gray-200 dark:border-gray-800 pt-4">
                  <h4 className="font-semibold mb-2 text-black dark:text-white">{partner.name}</h4>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    {partner.examples.join(' • ')}
                  </p>
                </div>
              ))}
            </div>
          </Card>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-gray-50 dark:bg-gray-900 p-8 rounded-lg">
          <h2 className="text-2xl font-bold mb-4 text-black dark:text-white">Become a Partner</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Interested in partnering with us? Let's explore collaboration opportunities.
          </p>
          <Link href="/contact">
            <Button>
              Contact Us
            </Button>
          </Link>
        </div>

        <div className="bg-gray-50 dark:bg-gray-900 p-8 rounded-lg">
          <h2 className="text-2xl font-bold mb-4 text-black dark:text-white">Partner Resources</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Access documentation and resources for our partners.
          </p>
          <Link href="/docs/partners">
            <Button color="light">
              View Resources
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
