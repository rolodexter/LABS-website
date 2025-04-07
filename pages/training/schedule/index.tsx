import { Button, Card  } from '@/components/ui';
import Link from 'next/link';

export default function TrainingSchedule() {
  const upcomingTraining = [
    {
      title: 'AI Fundamentals Workshop',
      date: 'April 15, 2025',
      time: '9:00 AM - 5:00 PM PST',
      location: 'Virtual',
      price: '$499',
      spots: 20
    },
    {
      title: 'Machine Learning Bootcamp',
      date: 'May 1-3, 2025',
      time: '9:00 AM - 4:00 PM PST',
      location: 'San Francisco',
      price: '$1,499',
      spots: 15
    },
    {
      title: 'AI Leadership Summit',
      date: 'May 15, 2025',
      time: '10:00 AM - 6:00 PM PST',
      location: 'New York',
      price: '$999',
      spots: 30
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8 mt-16">
      <div className="mb-8">
        <Link href="/services" className="text-gray-600 dark:text-gray-400 hover:underline">
          ← Back to Services
        </Link>
      </div>

      <h1 className="text-4xl font-bold mb-8 text-black dark:text-white">Training Schedule</h1>
      
      <div className="space-y-6">
        {upcomingTraining.map((training) => (
          <Card key={training.title} className="bg-white dark:bg-black border border-gray-200 dark:border-gray-800">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h2 className="text-2xl font-bold mb-2 text-black dark:text-white">{training.title}</h2>
                <div className="space-y-2 mb-4">
                  <p className="text-gray-600 dark:text-gray-400">
                    <span className="font-semibold">Date:</span> {training.date}
                  </p>
                  <p className="text-gray-600 dark:text-gray-400">
                    <span className="font-semibold">Time:</span> {training.time}
                  </p>
                  <p className="text-gray-600 dark:text-gray-400">
                    <span className="font-semibold">Location:</span> {training.location}
                  </p>
                </div>
              </div>
              
              <div className="flex flex-col justify-between">
                <div>
                  <p className="text-2xl font-bold text-black dark:text-white mb-2">
                    {training.price}
                  </p>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    {training.spots} spots available
                  </p>
                </div>
                <div className="flex gap-4">
                  <Button as={Link} href={`/training/register?course=${training.title}`}>
                    Register Now
                  </Button>
                  <Button as={Link} href={`/training/details?course=${training.title}`} color="light">
                    Learn More
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="mt-12 bg-gray-50 dark:bg-gray-900 p-8 rounded-lg">
        <h2 className="text-2xl font-bold mb-4 text-black dark:text-white">Custom Training</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Looking for private or custom training for your team? We offer tailored programs to meet your organization's needs.
        </p>
        <Button as={Link} href="/contact">
          Request Custom Training
        </Button>
      </div>
    </div>
  );
}
