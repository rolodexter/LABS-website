import { Button, Card } from '@/components/ui';
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
    <div className="max-w-7xl mx-auto px-6 py-24">
      <div className="text-center mb-24">
        <h1 className="text-4xl font-bold mb-4">Join Our Team</h1>
        <p className="text-xl text-gray-600 mb-8">
          Help us shape the future of AI technology
        </p>
        <Button href="#openings" variant="outline">
          View Open Positions
        </Button>
      </div>

      <div className="grid md:grid-cols-2 gap-16 mb-24">
        <div className="space-y-6">
          <h2 className="text-2xl font-bold">Why rolodexterLABS?</h2>
          <p className="text-gray-600">
            Join a team of passionate individuals working on cutting-edge AI technology.
            We offer a supportive environment where innovation thrives and your growth
            is prioritized.
          </p>
        </div>
        <Card variant="default" padding="lg">
          <h2 className="text-2xl font-bold mb-6">Benefits</h2>
          <ul className="grid grid-cols-2 gap-4">
            {benefits.map((benefit) => (
              <li key={benefit} className="flex items-center text-gray-600">
                <span className="mr-2">•</span>
                {benefit}
              </li>
            ))}
          </ul>
        </Card>
      </div>

      <div id="openings" className="mb-24">
        <h2 className="text-2xl font-bold mb-12">Open Positions</h2>
        <div className="space-y-16">
          {departments.map((dept) => (
            <div key={dept.name}>
              <h3 className="text-xl font-bold mb-6">{dept.name}</h3>
              <div className="grid md:grid-cols-2 gap-8">
                {dept.openings.map((job) => (
                  <Card key={job.title} variant="hover" padding="lg">
                    <h4 className="text-lg font-bold mb-2">{job.title}</h4>
                    <div className="flex items-center space-x-4 mb-6">
                      <span className="text-sm text-gray-600">{job.location}</span>
                      <span className="text-sm text-gray-600">{job.type}</span>
                    </div>
                    <Button
                      href={`/careers/apply?position=${encodeURIComponent(job.title)}`}
                      variant="outline"
                      fullWidth
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
        <h2 className="text-2xl font-bold mb-4">Don't see a perfect fit?</h2>
        <p className="text-gray-600 mb-8">
          We're always looking for talented individuals. Send us your resume and we'll keep you in mind
          for future opportunities.
        </p>
        <Button
          href="/careers/general"
          variant="outline"
        >
          Submit General Application
        </Button>
      </div>
    </div>
  );
}
