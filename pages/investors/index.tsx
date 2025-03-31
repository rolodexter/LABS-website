import { Button, Card } from 'flowbite-react';
import Link from 'next/link';
import { ChartBarIcon, DocumentTextIcon, GlobeAltIcon, UserGroupIcon } from '@heroicons/react/24/outline';

export default function InvestorRelations() {
  const highlights = [
    {
      title: 'Market Leadership',
      value: '#1',
      description: 'In AI research & development'
    },
    {
      title: 'Global Reach',
      value: '150+',
      description: 'Countries with active users'
    },
    {
      title: 'Enterprise Clients',
      value: '500+',
      description: 'Major corporations served'
    },
    {
      title: 'Research Publications',
      value: '200+',
      description: 'Peer-reviewed papers'
    }
  ];

  const reports = [
    {
      title: 'Q4 2024 Earnings',
      date: 'December 31, 2024',
      type: 'Quarterly Report'
    },
    {
      title: 'Q3 2024 Earnings',
      date: 'September 30, 2024',
      type: 'Quarterly Report'
    },
    {
      title: 'Annual Report 2024',
      date: 'December 31, 2024',
      type: 'Annual Report'
    },
    {
      title: 'ESG Report 2024',
      date: 'December 31, 2024',
      type: 'Sustainability'
    }
  ];

  const resources = [
    {
      title: 'Financial Reports',
      description: 'Access quarterly and annual financial statements',
      icon: ChartBarIcon
    },
    {
      title: 'SEC Filings',
      description: 'View our regulatory filings and documents',
      icon: DocumentTextIcon
    },
    {
      title: 'Global Impact',
      description: 'Learn about our worldwide presence and impact',
      icon: GlobeAltIcon
    },
    {
      title: 'Corporate Governance',
      description: 'Understand our leadership and governance structure',
      icon: UserGroupIcon
    }
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-black">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16 mt-16">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-black dark:text-white">
            Investor Relations
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-600 dark:text-gray-400">
            Driving innovation and value through AI-powered solutions
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button
              as={Link}
              href="#financials"
              className="bg-black dark:bg-white text-white dark:text-black border border-black dark:border-white hover:bg-white hover:text-black dark:hover:bg-black dark:hover:text-white"
            >
              View Financials
            </Button>
            <Button
              as={Link}
              href="/contact"
              className="bg-white dark:bg-black text-black dark:text-white border border-black dark:border-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black"
            >
              Contact IR Team
            </Button>
          </div>
        </div>
      </div>

      {/* Highlights Section */}
      <div className="bg-gray-50 dark:bg-gray-900 py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            {highlights.map((highlight) => (
              <Card key={highlight.title} className="text-center bg-white dark:bg-black border border-gray-200 dark:border-gray-800">
                <h3 className="text-4xl font-bold mb-2 text-black dark:text-white">
                  {highlight.value}
                </h3>
                <p className="text-lg font-semibold mb-2 text-black dark:text-white">
                  {highlight.title}
                </p>
                <p className="text-gray-600 dark:text-gray-400">
                  {highlight.description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Latest Reports Section */}
      <div id="financials" className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12 text-black dark:text-white">
          Latest Financial Reports
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {reports.map((report) => (
            <Card key={report.title} className="bg-white dark:bg-black border border-gray-200 dark:border-gray-800">
              <h3 className="text-xl font-bold mb-2 text-black dark:text-white">
                {report.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-2">
                {report.date}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                {report.type}
              </p>
              <Button
                as="a"
                href="#"
                className="w-full bg-white dark:bg-black text-black dark:text-white border border-black dark:border-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black"
              >
                Download PDF
              </Button>
            </Card>
          ))}
        </div>
      </div>

      {/* Resources Section */}
      <div className="bg-gray-50 dark:bg-gray-900 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-black dark:text-white">
            Investor Resources
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {resources.map((resource) => (
              <Card key={resource.title} className="bg-white dark:bg-black border border-gray-200 dark:border-gray-800">
                <div className="flex flex-col items-center text-center">
                  <resource.icon className="w-12 h-12 mb-4 text-black dark:text-white" />
                  <h3 className="text-xl font-bold mb-2 text-black dark:text-white">
                    {resource.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    {resource.description}
                  </p>
                  <Button
                    as={Link}
                    href="#"
                    className="w-full bg-white dark:bg-black text-black dark:text-white border border-black dark:border-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black"
                  >
                    Learn More
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8 text-black dark:text-white">
            Contact Investor Relations
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
            For investor inquiries, please reach out to our dedicated IR team.
          </p>
          <div className="flex justify-center gap-4">
            <Button
              as={Link}
              href="/contact"
              className="bg-black dark:bg-white text-white dark:text-black border border-black dark:border-white hover:bg-white hover:text-black dark:hover:bg-black dark:hover:text-white"
            >
              Contact IR Team
            </Button>
            <Button
              as={Link}
              href="/investors/faq"
              className="bg-white dark:bg-black text-black dark:text-white border border-black dark:border-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black"
            >
              IR FAQ
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
