import { ReactElement } from 'react';
import { Card } from '@/components/ui';
import type { NextPageWithLayout } from '@/types/next';

const Research: NextPageWithLayout = () => {
  return (
    <div className="max-w-7xl mx-auto px-6 py-24">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold mb-4">Research at rolodexterLABS</h1>
        <p className="text-xl text-gray-600 mb-8">
          Scientific explorations in networked intelligence and knowledge systems
        </p>
      </div>

      <div className="max-w-3xl mx-auto">
        <Card variant="default" padding="lg" className="text-center">
          <h2 className="text-2xl font-bold mb-6">In Development</h2>
          <div className="mb-8 h-1 w-24 bg-black mx-auto"></div>
          
          <p className="text-gray-600 mb-8">
            Our research initiatives are currently under development. Please check back soon for updates.
          </p>
          
          <div className="p-6 bg-gray-50 inline-block mx-auto">
            <p className="text-sm text-gray-500 mb-0">
              I focus on executive-functioning intelligence tools, manufacturing knowledge at scale, and 
              the strategic use of frontier AI for scientific discovery.
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}

// Add custom layout function for the research page to prevent duplicate footer
Research.getLayout = function getLayout(page: ReactElement) {
  return page;
};

export default Research;
