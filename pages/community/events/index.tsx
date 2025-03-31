import { Button, Card, Badge } from 'flowbite-react';
import Link from 'next/link';

export default function Events() {
  const upcomingEvents = [
    {
      title: 'AI Developer Conference 2025',
      date: 'April 15-17, 2025',
      location: 'San Francisco, CA',
      type: 'Conference',
      description: 'Join us for three days of AI development insights and networking.',
      status: 'Registration Open'
    },
    {
      title: 'rolodexterLARP Spring Festival',
      date: 'April 22-23, 2025',
      location: 'Virtual Event',
      type: 'Virtual',
      description: 'Experience the future of LARP with our latest AI integrations.',
      status: 'Early Bird'
    },
    {
      title: 'AI Ethics Workshop',
      date: 'May 5, 2025',
      location: 'London, UK',
      type: 'Workshop',
      description: 'Exploring ethical considerations in AI development.',
      status: 'Coming Soon'
    }
  ];

  const pastEvents = [
    {
      title: 'Machine Learning Bootcamp',
      date: 'March 20, 2025',
      location: 'New York, NY',
      type: 'Training',
      recordings: true
    },
    {
      title: 'rolodexter Community Meetup',
      date: 'March 15, 2025',
      location: 'Virtual Event',
      type: 'Meetup',
      recordings: true
    }
  ];

  const eventTypes = [
    'All Events',
    'Conferences',
    'Workshops',
    'Meetups',
    'Training',
    'Virtual Events'
  ];

  return (
    <div className="container mx-auto px-4 py-8 mt-16">
      <div className="mb-12">
        <h1 className="text-4xl font-bold mb-4 text-black dark:text-white">Community Events</h1>
        <p className="text-xl text-gray-600 dark:text-gray-400">
          Connect, learn, and grow with the rolodexter community
        </p>
      </div>

      <div className="mb-8">
        <div className="flex flex-wrap gap-2">
          {eventTypes.map((type) => (
            <Button
              key={type}
              className="bg-white dark:bg-black text-black dark:text-white border border-black dark:border-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black"
            >
              {type}
            </Button>
          ))}
        </div>
      </div>

      <div className="mb-16">
        <h2 className="text-2xl font-bold mb-8 text-black dark:text-white">Upcoming Events</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {upcomingEvents.map((event) => (
            <Card key={event.title} className="bg-white dark:bg-black border border-gray-200 dark:border-gray-800">
              <div className="flex flex-col h-full">
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <Badge className="bg-black dark:bg-white text-white dark:text-black">
                      {event.type}
                    </Badge>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {event.status}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-black dark:text-white">
                    {event.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    {event.description}
                  </p>
                </div>
                <div className="mt-auto">
                  <div className="mb-4">
                    <p className="text-gray-600 dark:text-gray-400">
                      <strong>Date:</strong> {event.date}
                    </p>
                    <p className="text-gray-600 dark:text-gray-400">
                      <strong>Location:</strong> {event.location}
                    </p>
                  </div>
                  <Button
                    as={Link}
                    href={`/community/events/${event.title.toLowerCase().replace(/ /g, '-')}`}
                    className="w-full bg-black dark:bg-white text-white dark:text-black border border-black dark:border-white hover:bg-white hover:text-black dark:hover:bg-black dark:hover:text-white"
                  >
                    Register Now
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      <div className="mb-16">
        <h2 className="text-2xl font-bold mb-8 text-black dark:text-white">Past Events</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pastEvents.map((event) => (
            <Card key={event.title} className="bg-white dark:bg-black border border-gray-200 dark:border-gray-800">
              <div className="flex flex-col h-full">
                <div>
                  <Badge className="mb-4 bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200">
                    {event.type}
                  </Badge>
                  <h3 className="text-xl font-bold mb-2 text-black dark:text-white">
                    {event.title}
                  </h3>
                  <div className="mb-4">
                    <p className="text-gray-600 dark:text-gray-400">
                      <strong>Date:</strong> {event.date}
                    </p>
                    <p className="text-gray-600 dark:text-gray-400">
                      <strong>Location:</strong> {event.location}
                    </p>
                  </div>
                </div>
                {event.recordings && (
                  <div className="mt-auto">
                    <Button
                      as={Link}
                      href={`/community/events/${event.title.toLowerCase().replace(/ /g, '-')}/recordings`}
                      className="w-full bg-white dark:bg-black text-black dark:text-white border border-black dark:border-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black"
                    >
                      View Recordings
                    </Button>
                  </div>
                )}
              </div>
            </Card>
          ))}
        </div>
      </div>

      <div className="bg-gray-50 dark:bg-gray-900 p-8 rounded-lg text-center">
        <h2 className="text-2xl font-bold mb-4 text-black dark:text-white">Host Your Own Event</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Interested in organizing a community event? We'd love to help!
        </p>
        <Button
          as={Link}
          href="/community/events/host"
          className="bg-black dark:bg-white text-white dark:text-black border border-black dark:border-white hover:bg-white hover:text-black dark:hover:bg-black dark:hover:text-white"
        >
          Learn More
        </Button>
      </div>
    </div>
  );
}
