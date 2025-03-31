import { Button, Timeline } from 'flowbite-react';
import Link from 'next/link';

export default function About() {
  const milestones = [
    {
      date: '2023',
      title: 'Foundation',
      description: 'rolodexterLABS was established with a vision to revolutionize AI development.'
    },
    {
      date: '2024',
      title: 'Product Launch',
      description: 'Released our first suite of AI products and development tools.'
    },
    {
      date: '2025',
      title: 'Global Expansion',
      description: 'Expanded operations globally and launched rolodexterLARP division.'
    }
  ];

  const values = [
    {
      title: 'Innovation',
      description: 'Pushing the boundaries of AI technology and research.'
    },
    {
      title: 'Excellence',
      description: 'Commitment to delivering high-quality solutions.'
    },
    {
      title: 'Collaboration',
      description: 'Working together with partners and communities.'
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8 mt-16">
      <h1 className="text-4xl font-bold mb-8 text-black dark:text-white">About rolodexter</h1>
      
      <div className="grid md:grid-cols-2 gap-12 mb-16">
        <div>
          <h2 className="text-2xl font-bold mb-4 text-black dark:text-white">Our Mission</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            At rolodexter, we're dedicated to advancing AI technology through innovative research,
            development, and practical applications. Our mission is to make AI accessible,
            ethical, and beneficial for everyone.
          </p>
          <Button
            as={Link}
            href="/contact"
            className="bg-white dark:bg-black text-black dark:text-white border border-black dark:border-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black"
          >
            Get in Touch
          </Button>
        </div>
        <div className="bg-gray-50 dark:bg-gray-900 p-8 rounded-lg">
          <h2 className="text-2xl font-bold mb-4 text-black dark:text-white">Quick Facts</h2>
          <ul className="space-y-4">
            <li className="flex items-center text-gray-600 dark:text-gray-400">
              <span className="mr-2">•</span>
              Founded in 2023
            </li>
            <li className="flex items-center text-gray-600 dark:text-gray-400">
              <span className="mr-2">•</span>
              Global presence in 5 countries
            </li>
            <li className="flex items-center text-gray-600 dark:text-gray-400">
              <span className="mr-2">•</span>
              100+ team members worldwide
            </li>
          </ul>
        </div>
      </div>

      <div className="mb-16">
        <h2 className="text-2xl font-bold mb-8 text-black dark:text-white">Our Journey</h2>
        <Timeline>
          {milestones.map((milestone) => (
            <Timeline.Item key={milestone.date}>
              <Timeline.Point />
              <Timeline.Content>
                <Timeline.Time className="text-black dark:text-white">
                  {milestone.date}
                </Timeline.Time>
                <Timeline.Title className="text-black dark:text-white">
                  {milestone.title}
                </Timeline.Title>
                <Timeline.Body className="text-gray-600 dark:text-gray-400">
                  {milestone.description}
                </Timeline.Body>
              </Timeline.Content>
            </Timeline.Item>
          ))}
        </Timeline>
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-8 text-black dark:text-white">Our Values</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {values.map((value) => (
            <div
              key={value.title}
              className="p-6 bg-gray-50 dark:bg-gray-900 rounded-lg"
            >
              <h3 className="text-xl font-bold mb-2 text-black dark:text-white">
                {value.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">{value.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
