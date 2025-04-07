import { ReactElement, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { Button } from '@/components/ui';
import type { NextPageWithLayout } from '@/types/next';

const InvestorRelations: NextPageWithLayout = () => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    investorType: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real implementation, this would connect to a backend API
    // For now, we'll just simulate a successful submission
    setTimeout(() => {
      setFormSubmitted(true);
    }, 500);
  };

  return (
    <div className="container mx-auto px-4 py-16 max-w-4xl">
      <Head>
        <title>Investor Relations | rolodexterLABS</title>
        <meta name="description" content="Investment opportunities and information for rolodexterLABS' frontier AI research and development." />
      </Head>

      <div className="mb-8">
        <Link href="/" className="text-gray-600 dark:text-gray-400 hover:underline">
          ← Back to Home
        </Link>
      </div>
      
      {/* Hero Section */}
      <div className="mb-16 text-center">
        <h1 className="text-4xl sm:text-5xl font-bold mb-6 text-black dark:text-white">Investor Relations</h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
          Strategic partnership opportunities in frontier AI and knowledge systems.
        </p>
      </div>

      {/* Overview Section */}
      <section className="mb-16">
        <div className="prose prose-lg max-w-none dark:prose-invert mb-8">
          <p>
            rolodexterLABS is developing the next generation of executive-functioning intelligence tools focused on manufacturing knowledge at scale and enabling scientific discovery. Our modular approach to cognitive architecture creates strategic advantages across multiple domains:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="border border-gray-200 dark:border-gray-800 rounded-lg p-6">
            <h3 className="text-xl font-bold mb-3">Proprietary Architecture</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Compositional, modular systems with explicit knowledge representation and transparent reasoning processes.
            </p>
          </div>

          <div className="border border-gray-200 dark:border-gray-800 rounded-lg p-6">
            <h3 className="text-xl font-bold mb-3">Knowledge Manufacturing</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Unprecedented capabilities for transforming raw data into structured, actionable knowledge through automated synthesis.
            </p>
          </div>

          <div className="border border-gray-200 dark:border-gray-800 rounded-lg p-6">
            <h3 className="text-xl font-bold mb-3">Strategic Partnerships</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Targeted industry collaborations with organizations aligned on transformative applications of executive intelligence.
            </p>
          </div>

          <div className="border border-gray-200 dark:border-gray-800 rounded-lg p-6">
            <h3 className="text-xl font-bold mb-3">Research Advantage</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Cross-disciplinary research initiatives bridging cognitive science, knowledge engineering, and machine learning.
            </p>
          </div>
        </div>
      </section>

      {/* Request Deck Section */}
      <section className="mb-16 bg-gray-50 dark:bg-gray-900 p-8 rounded-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">Request Investor Information</h2>

        {formSubmitted ? (
          <div className="text-center p-8">
            <div className="text-2xl font-bold mb-4">Thank You</div>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Your request has been received. A member of our team will contact you shortly with the requested investor materials.
            </p>
            <Button onClick={() => setFormSubmitted(false)}>
              Submit Another Request
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
            <div className="grid grid-cols-1 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white bg-white dark:bg-gray-800"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white bg-white dark:bg-gray-800"
                />
              </div>

              <div>
                <label htmlFor="company" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Organization
                </label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white bg-white dark:bg-gray-800"
                />
              </div>

              <div>
                <label htmlFor="investorType" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Investor Profile
                </label>
                <select
                  id="investorType"
                  name="investorType"
                  value={formData.investorType}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white bg-white dark:bg-gray-800"
                >
                  <option value="">Select investor type</option>
                  <option value="vc">Venture Capital</option>
                  <option value="pe">Private Equity</option>
                  <option value="angel">Angel Investor</option>
                  <option value="corporate">Corporate Investor</option>
                  <option value="institutional">Institutional Investor</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div className="text-center mt-4">
                <Button type="submit">
                  Request Investor Deck
                </Button>
              </div>
            </div>
          </form>
        )}
      </section>

      {/* Contact Section */}
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-4">Direct Contact</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          For immediate inquiries regarding investment opportunities, please contact our team directly.
        </p>
        <Button as={Link} href="mailto:investors@rolodexterlabs.com">
          investors@rolodexterlabs.com
        </Button>
      </div>
    </div>
  );
};

// Add custom layout function to prevent duplicate footer
InvestorRelations.getLayout = function getLayout(page: ReactElement) {
  return page;
};

export default InvestorRelations;
