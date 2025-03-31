import { Button, Card } from '@/components/ui';
import Badge from '../../../components/ui/Badge';
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
    <div className="max-w-7xl mx-auto px-6 py-24">
      <div className="mb-16">
        <h1 className="text-4xl font-bold mb-4">Community Events</h1>
        <p className="text-xl text-gray-600">
          Connect, learn, and grow with the rolodexter community
        </p>
      </div>

      <div className="mb-12">
        <div className="flex flex-wrap gap-2">
          {eventTypes.map((type) => (
            <Button
              key={type}
              variant="outline"
            >
              {type}
            </Button>
          ))}
        </div>
      </div>

      <div className="mb-24">
        <h2 className="text-2xl font-bold mb-8">Upcoming Events</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {upcomingEvents.map((event) => (
            <Card key={event.title} variant="hover" padding="lg">
              <div className="flex flex-col h-full">
                <div>
                  <div className="flex justify-between items-start mb-6">
                    <Badge variant="default" size="md">
                      {event.type}
                    </Badge>
                    <Badge variant="outline" size="sm">
                      {event.status}
                    </Badge>
                  </div>
                  <h3 className="text-xl font-bold mb-2">
                    {event.title}
                  </h3>
                  <p className="text-gray-600 mb-6">
                    {event.description}
                  </p>
                </div>
                <div className="mt-auto">
                  <div className="mb-6 space-y-2">
                    <p className="text-gray-600">
                      <strong>Date:</strong> {event.date}
                    </p>
                    <p className="text-gray-600">
                      <strong>Location:</strong> {event.location}
                    </p>
                  </div>
                  <Button
                    href={`/community/events/${event.title.toLowerCase().replace(/ /g, '-')}`}
                    variant="primary"
                    fullWidth
                  >
                    Register Now
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      <div className="mb-24">
        <h2 className="text-2xl font-bold mb-8">Past Events</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {pastEvents.map((event) => (
            <Card key={event.title} variant="hover" padding="lg">
              <div className="flex flex-col h-full">
                <div>
                  <Badge variant="outline" size="md" className="mb-6">
                    {event.type}
                  </Badge>
                  <h3 className="text-xl font-bold mb-2">
                    {event.title}
                  </h3>
                  <div className="mb-6 space-y-2">
                    <p className="text-gray-600">
                      <strong>Date:</strong> {event.date}
                    </p>
                    <p className="text-gray-600">
                      <strong>Location:</strong> {event.location}
                    </p>
                  </div>
                </div>
                {event.recordings && (
                  <div className="mt-auto">
                    <Button
                      href={`/community/events/${event.title.toLowerCase().replace(/ /g, '-')}/recordings`}
                      variant="outline"
                      fullWidth
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

      <Card variant="hover" padding="lg" className="text-center">
        <h2 className="text-2xl font-bold mb-4">Host Your Own Event</h2>
        <p className="text-gray-600 mb-8">
          Interested in organizing a community event? We'd love to help!
        </p>
        <Button
          href="/community/events/host"
          variant="primary"
        >
          Learn More
        </Button>
      </Card>
    </div>
  );
}
