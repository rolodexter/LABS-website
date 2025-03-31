import { Button, Card } from 'flowbite-react';
import Link from 'next/link';

export default function Careers() {
  const departments = [
    {
      name: 'Engineering',
      openings: [
        {
          title: 'Senior AI Engineer',
          location: 'Remote',
          type: 'Full-time'
        },
        {
          title: 'Full Stack Developer',
          location: 'San Francisco',
          type: 'Full-time'
        }
      ]
    },
    {
      name: 'Research',
      openings: [
        {
          title: 'Research Scientist',
          location: 'Remote',
          type: 'Full-time'
        },
        {
          title: 'ML Research Engineer',
          location: 'London',
          type: 'Full-time'
        }
      ]
    },
    {
      name: 'Product',
      openings: [
        {
          title: 'Product Manager',
          location: 'New York',
          type: 'Full-time'
        },
        {
          title: 'UX Designer',
          location: 'Remote',
          type: 'Contract'
        }
      ]
    }
  ];

  const benefits = [
    'Remote-first culture',
    'Competitive salary',
    'Health insurance',
    'Learning budget',
    'Flexible hours',
    'Stock options'
  ];

  return (
    <div className="container mx-auto px-4 py-8 mt-16">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold mb-4 text-black dark:text-white">Join Our Team</h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
          Help us shape the future of AI technology
        </p>
        <Button
          as={Link}
          href="#openings"
          className="bg-black dark:bg-white text-white dark:text-black border border-black dark:border-white hover:bg-white hover:text-black dark:hover:bg-black dark:hover:text-white"
        >
          View Open Positions
        </Button>
      </div>

      <div className="grid md:grid-cols-2 gap-8 mb-16">
        <div>
          <h2 className="text-2xl font-bold mb-4 text-black dark:text-white">Why rolodexter?</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Join a team of passionate individuals working on cutting-edge AI technology.
            We offer a supportive environment where innovation thrives and your growth
            is prioritized.
          </p>
        </div>
        <div className="bg-gray-50 dark:bg-gray-900 p-8 rounded-lg">
          <h2 className="text-2xl font-bold mb-4 text-black dark:text-white">Benefits</h2>
          <ul className="grid grid-cols-2 gap-4">
            {benefits.map((benefit) => (
              <li key={benefit} className="flex items-center text-gray-600 dark:text-gray-400">
                <span className="mr-2">•</span>
                {benefit}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div id="openings" className="mb-16">
        <h2 className="text-2xl font-bold mb-8 text-black dark:text-white">Open Positions</h2>
        <div className="space-y-8">
          {departments.map((dept) => (
            <div key={dept.name}>
              <h3 className="text-xl font-bold mb-4 text-black dark:text-white">{dept.name}</h3>
              <div className="grid md:grid-cols-2 gap-4">
                {dept.openings.map((job) => (
                  <Card key={job.title} className="bg-white dark:bg-black border border-gray-200 dark:border-gray-800">
                    <h4 className="text-lg font-bold mb-2 text-black dark:text-white">{job.title}</h4>
                    <div className="flex items-center space-x-4 mb-4">
                      <span className="text-sm text-gray-600 dark:text-gray-400">{job.location}</span>
                      <span className="text-sm text-gray-600 dark:text-gray-400">{job.type}</span>
                    </div>
                    <Button
                      as={Link}
                      href={`/careers/apply?position=${encodeURIComponent(job.title)}`}
                      className="w-full bg-white dark:bg-black text-black dark:text-white border border-black dark:border-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black"
                    >
                      Apply Now
                    </Button>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="text-center">
        <h2 className="text-2xl font-bold mb-4 text-black dark:text-white">Don't see a perfect fit?</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          We're always looking for talented individuals. Send us your resume and we'll keep you in mind
          for future opportunities.
        </p>
        <Button
          as={Link}
          href="/careers/general"
          className="bg-white dark:bg-black text-black dark:text-white border border-black dark:border-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black"
        >
          Submit General Application
        </Button>
      </div>
    </div>
  );
}
