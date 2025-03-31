import { Button, Card } from 'flowbite-react';
import Link from 'next/link';

export default function TermsOfService() {
  const sections = [
    {
      title: 'Terms of Use',
      content: 'These Terms of Service ("Terms") govern your access to and use of rolodexterLABS services, including our website, APIs, and developer tools. By using our services, you agree to be bound by these terms.'
    },
    {
      title: 'User Responsibilities',
      list: [
        {
          title: 'Account Security',
          description: 'You are responsible for maintaining the security of your account and credentials'
        },
        {
          title: 'Acceptable Use',
          description: 'You agree to use our services only for lawful purposes and in accordance with these Terms'
        },
        {
          title: 'API Usage',
          description: 'You must comply with our API rate limits and usage guidelines'
        }
      ]
    },
    {
      title: 'Intellectual Property',
      content: 'All content, features, and functionality of our services are owned by rolodexterLABS and are protected by international copyright, trademark, and other intellectual property laws.'
    },
    {
      title: 'Service Modifications',
      content: 'We reserve the right to modify or discontinue, temporarily or permanently, our services with or without notice.'
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8 mt-16">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-black dark:text-white">Terms of Service</h1>
        
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
                    <Card key={item.title} className="bg-white dark:bg-black border border-gray-200 dark:border-gray-800">
                      <h3 className="text-lg font-semibold mb-2 text-black dark:text-white">{item.title}</h3>
                      <p className="text-gray-600 dark:text-gray-400">{item.description}</p>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="bg-gray-50 dark:bg-gray-900 p-8 rounded-lg mb-12">
          <h2 className="text-2xl font-bold mb-4 text-black dark:text-white">Additional Policies</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Please review our other policies that govern your use of our services.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button
              as={Link}
              href="/legal/privacy"
              className="bg-white dark:bg-black text-black dark:text-white border border-black dark:border-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black"
            >
              Privacy Policy
            </Button>
            <Button
              as={Link}
              href="/legal/cookies"
              className="bg-white dark:bg-black text-black dark:text-white border border-black dark:border-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black"
            >
              Cookie Policy
            </Button>
            <Button
              as={Link}
              href="/legal/security"
              className="bg-white dark:bg-black text-black dark:text-white border border-black dark:border-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black"
            >
              Security Policy
            </Button>
          </div>
        </div>

        <div className="prose prose-lg dark:prose-invert">
          <h2 className="text-2xl font-bold mb-4 text-black dark:text-white">Questions?</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            If you have any questions about our Terms of Service, please contact us.
          </p>
          <Button
            as={Link}
            href="/contact"
            className="bg-black dark:bg-white text-white dark:text-black border border-black dark:border-white hover:bg-white hover:text-black dark:hover:bg-black dark:hover:text-white"
          >
            Contact Us
          </Button>
        </div>
      </div>
    </div>
  );
}
