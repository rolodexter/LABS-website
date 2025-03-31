import { Button, Card  } from '@/components/ui';
import Link from 'next/link';

export default function Press() {
  const pressReleases = [
    {
      title: 'rolodexter Announces New AI Development Platform',
      date: 'March 25, 2025',
      excerpt: 'Revolutionary platform aims to streamline AI development process.',
      category: 'Product Launch'
    },
    {
      title: 'rolodexterLARP Secures Major Partnership',
      date: 'March 20, 2025',
      excerpt: 'Strategic collaboration to enhance live action role-playing experiences.',
      category: 'Partnership'
    },
    {
      title: 'Q1 2025 Research Milestones Achieved',
      date: 'March 15, 2025',
      excerpt: 'Breakthrough achievements in AI research and development.',
      category: 'Research'
    }
  ];

  const mediaContacts = [
    {
      name: 'Sarah Johnson',
      role: 'Head of Communications',
      email: 'press@rolodexter.com',
      phone: '+1 (555) 123-4567'
    }
  ];

  const mediaResources = [
    {
      title: 'Press Kit',
      description: 'Logos, brand guidelines, and media assets.',
      href: '/press/kit'
    },
    {
      title: 'Fact Sheet',
      description: 'Company overview and key statistics.',
      href: '/press/facts'
    },
    {
      title: 'Executive Bios',
      description: 'Leadership team profiles and photos.',
      href: '/press/team'
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8 mt-16">
      <div className="mb-16">
        <h1 className="text-4xl font-bold mb-4 text-black dark:text-white">Press Room</h1>
        <p className="text-xl text-gray-600 dark:text-gray-400">
          Latest news and media resources from rolodexter
        </p>
      </div>

      <div className="mb-16">
        <h2 className="text-2xl font-bold mb-8 text-black dark:text-white">Recent Press Releases</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {pressReleases.map((release) => (
            <Card key={release.title} className="bg-white dark:bg-black border border-gray-200 dark:border-gray-800">
              <span className="text-sm text-gray-500 dark:text-gray-400">{release.date}</span>
              <h3 className="text-xl font-bold mb-2 text-black dark:text-white">{release.title}</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">{release.excerpt}</p>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500 dark:text-gray-400">{release.category}</span>
                <Button
                  as={Link}
                  href={`/press/releases/${release.title.toLowerCase().replace(/ /g, '-')}`}
                  className="bg-white dark:bg-black text-black dark:text-white border border-black dark:border-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black"
                >
                  Read More
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8 mb-16">
        <div className="bg-gray-50 dark:bg-gray-900 p-8 rounded-lg">
          <h2 className="text-2xl font-bold mb-6 text-black dark:text-white">Media Contacts</h2>
          {mediaContacts.map((contact) => (
            <div key={contact.name} className="space-y-2">
              <h3 className="font-bold text-black dark:text-white">{contact.name}</h3>
              <p className="text-gray-600 dark:text-gray-400">{contact.role}</p>
              <p className="text-gray-600 dark:text-gray-400">Email: {contact.email}</p>
              <p className="text-gray-600 dark:text-gray-400">Phone: {contact.phone}</p>
            </div>
          ))}
        </div>

        <div className="bg-gray-50 dark:bg-gray-900 p-8 rounded-lg">
          <h2 className="text-2xl font-bold mb-6 text-black dark:text-white">Media Resources</h2>
          <div className="space-y-4">
            {mediaResources.map((resource) => (
              <div key={resource.title}>
                <h3 className="font-bold mb-1 text-black dark:text-white">{resource.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-2">{resource.description}</p>
                <Button
                  as={Link}
                  href={resource.href}
                  className="w-full bg-white dark:bg-black text-black dark:text-white border border-black dark:border-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black"
                >
                  Download
                </Button>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="text-center">
        <h2 className="text-2xl font-bold mb-4 text-black dark:text-white">Media Inquiries</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          For additional information or to schedule an interview, please contact our press team.
        </p>
        <Button
          as={Link}
          href="/contact?department=press"
          className="bg-black dark:bg-white text-white dark:text-black border border-black dark:border-white hover:bg-white hover:text-black dark:hover:bg-black dark:hover:text-white"
        >
          Contact Press Team
        </Button>
      </div>
    </div>
  );
}
