import { Button, Card  } from '@/components/ui';
import Link from 'next/link';
import { ReactElement } from 'react';
import type { NextPageWithLayout } from '@/types/next';

const PrivacyPolicy: NextPageWithLayout = () => {
  const sections = [
    {
      title: 'Information We Collect',
      list: [
        {
          type: 'Personal Information',
          description: 'Name, email address, and contact details you provide'
        },
        {
          type: 'Usage Data',
          description: 'Information about how you use our services'
        },
        {
          type: 'Technical Data',
          description: 'IP address, browser type, and device information'
        }
      ]
    },
    {
      title: 'How We Use Your Information',
      content: 'We use your information to provide and improve our services, communicate with you, and ensure the security of our platform. We do not sell your personal information to third parties.'
    },
    {
      title: 'Data Protection',
      content: 'We implement appropriate technical and organizational measures to ensure a level of security appropriate to the risk of processing your personal information.'
    },
    {
      title: 'Your Rights',
      list: [
        {
          type: 'Access',
          description: 'Request access to your personal data'
        },
        {
          type: 'Correction',
          description: 'Request correction of your personal data'
        },
        {
          type: 'Deletion',
          description: 'Request deletion of your personal data'
        }
      ]
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8 mt-16">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-black dark:text-white">Privacy Policy</h1>
        
        <div className="prose prose-lg dark:prose-invert mb-12">
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            Last updated: {new Date().toLocaleDateString()}
          </p>
          
          {sections.map((section) => (
            <div key={section.title} className="mb-12">
              <h2 className="text-2xl font-bold mb-4 text-black dark:text-white">{section.title}</h2>
              {section.content && (
                <p className="text-gray-600 dark:text-gray-400 mb-4">{section.content}</p>
              )}
              {section.list && (
                <div className="grid md:grid-cols-3 gap-6 mt-6">
                  {section.list.map((item) => (
                    <Card key={item.type} className="bg-white dark:bg-black border border-gray-200 dark:border-gray-800">
                      <h3 className="text-lg font-semibold mb-2 text-black dark:text-white">{item.type}</h3>
                      <p className="text-gray-600 dark:text-gray-400">{item.description}</p>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="bg-gray-50 dark:bg-gray-900 p-8 rounded-lg mb-12">
          <h2 className="text-2xl font-bold mb-4 text-black dark:text-white">Your Privacy Choices</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            You can control how we collect and use your data. Review your privacy settings or contact us for assistance.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button
              className="bg-black dark:bg-white text-white dark:text-black border border-black dark:border-white hover:bg-white hover:text-black dark:hover:bg-black dark:hover:text-white"
            >
              Privacy Settings
            </Button>
            <Button
              as={Link}
              href="/legal/cookies"
              className="bg-white dark:bg-black text-black dark:text-white border border-black dark:border-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black"
            >
              Cookie Settings
            </Button>
          </div>
        </div>

        <div className="prose prose-lg dark:prose-invert">
          <h2 className="text-2xl font-bold mb-4 text-black dark:text-white">Contact Us</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            If you have any questions about our Privacy Policy or how we handle your data, please contact our Data Protection Officer.
          </p>
          <div className="flex gap-4">
            <Button
              as={Link}
              href="/contact"
              className="bg-white dark:bg-black text-black dark:text-white border border-black dark:border-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black"
            >
              Contact DPO
            </Button>
            <Button
              as={Link}
              href="/legal/terms"
              className="bg-white dark:bg-black text-black dark:text-white border border-black dark:border-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black"
            >
              Terms of Service
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Add custom layout function to prevent duplicate footer
PrivacyPolicy.getLayout = function getLayout(page: ReactElement) {
  return page;
};

export default PrivacyPolicy;
