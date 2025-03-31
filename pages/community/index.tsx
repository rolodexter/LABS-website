import { Card, Button } from 'flowbite-react';

export default function Community() {
  const events = [
    {
      title: 'AI Ethics Workshop',
      date: 'April 15, 2025',
      location: 'Virtual',
      type: 'Workshop'
    },
    {
      title: 'Machine Learning Hackathon',
      date: 'May 1-3, 2025',
      location: 'San Francisco',
      type: 'Hackathon'
    },
    {
      title: 'Data Science Conference',
      date: 'June 10, 2025',
      location: 'New York',
      type: 'Conference'
    }
  ];

  const resources = [
    {
      title: 'AI Learning Path',
      description: 'Comprehensive guide to AI development',
      type: 'Guide'
    },
    {
      title: 'Ethics Framework',
      description: 'Best practices for ethical AI development',
      type: 'Framework'
    },
    {
      title: 'Developer Forum',
      description: 'Connect with other AI developers',
      type: 'Community'
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8 mt-16">
      <h1 className="text-4xl font-bold mb-8 text-black dark:text-white">Community</h1>
      
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6 text-black dark:text-white">Upcoming Events</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {events.map((event) => (
            <Card key={event.title} className="bg-white dark:bg-black border border-gray-200 dark:border-gray-800">
              <h3 className="text-xl font-bold mb-2 text-black dark:text-white">{event.title}</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                <span className="block">📅 {event.date}</span>
                <span className="block">📍 {event.location}</span>
              </p>
              <div className="mt-auto">
                <span className="px-3 py-1 text-sm rounded-full bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200">
                  {event.type}
                </span>
              </div>
            </Card>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-6 text-black dark:text-white">Resources</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {resources.map((resource) => (
            <Card key={resource.title} className="bg-white dark:bg-black border border-gray-200 dark:border-gray-800">
              <h3 className="text-xl font-bold mb-2 text-black dark:text-white">{resource.title}</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">{resource.description}</p>
              <div className="mt-auto flex justify-between items-center">
                <span className="px-3 py-1 text-sm rounded-full bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200">
                  {resource.type}
                </span>
                <Button size="sm">Access</Button>
              </div>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
