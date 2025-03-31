import { Button, Card  } from '@/components/ui';
import Link from 'next/link';

export default function CookiePolicy() {
  const sections = [
    {
      title: 'What Are Cookies',
      content: 'Cookies are small text files that are placed on your device when you visit our website. They help us provide you with a better experience by remembering your preferences and understanding how you use our site.'
    },
    {
      title: 'How We Use Cookies',
      content: 'We use cookies for essential website functionality, analytics, and to enhance your user experience. These include session cookies for maintaining your login state and preference cookies for remembering your settings.'
    },
    {
      title: 'Types of Cookies We Use',
      list: [
        {
          type: 'Essential Cookies',
          description: 'Required for basic website functionality'
        },
        {
          type: 'Analytics Cookies',
          description: 'Help us understand how visitors interact with our website'
        },
        {
          type: 'Preference Cookies',
          description: 'Remember your settings and preferences'
        }
      ]
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8 mt-16">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-black dark:text-white">Cookie Policy</h1>
        
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
          <h2 className="text-2xl font-bold mb-4 text-black dark:text-white">Cookie Preferences</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            You can manage your cookie preferences at any time. Essential cookies cannot be disabled as they are required for the website to function properly.
          </p>
          <Button
            className="bg-black dark:bg-white text-white dark:text-black border border-black dark:border-white hover:bg-white hover:text-black dark:hover:bg-black dark:hover:text-white"
          >
            Manage Cookie Settings
          </Button>
        </div>

        <div className="prose prose-lg dark:prose-invert">
          <h2 className="text-2xl font-bold mb-4 text-black dark:text-white">Questions?</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            If you have any questions about our Cookie Policy, please contact us.
          </p>
          <div className="flex gap-4">
            <Link href="/contact">
              <Button
                className="bg-white dark:bg-black text-black dark:text-white border border-black dark:border-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black"
              >
                Contact Us
              </Button>
            </Link>
            <Link href="/legal/privacy">
              <Button
                className="bg-white dark:bg-black text-black dark:text-white border border-black dark:border-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black"
              >
                Privacy Policy
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
