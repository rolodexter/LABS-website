import { Card } from '@/components/ui';
import { ReactElement } from 'react';
import type { NextPageWithLayout } from '@/types/next';

const InvestorRelations: NextPageWithLayout = () => {
  return (
    <div className="max-w-7xl mx-auto px-6 py-24">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold mb-4">Investors</h1>
        <p className="text-xl text-gray-600 mb-8">
          Information for current and potential investors
        </p>
      </div>

      <div className="max-w-3xl mx-auto">
        <Card variant="default" padding="lg" className="text-center">
          <h2 className="text-2xl font-bold mb-6">Under Development</h2>
          <div className="mb-8 h-1 w-24 bg-black mx-auto"></div>
          
          <p className="text-gray-600 mb-8">
            Our investor relations page is currently under development. Please check back soon for updates.
          </p>
          
          <div className="p-6 bg-gray-50 inline-block mx-auto">
            <p className="text-sm text-gray-500 mb-0">
              For immediate inquiries regarding investment opportunities, please 
              <a href="/contact" className="underline hover:text-black transition-colors"> contact us</a>.
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}

// Add custom layout function to prevent duplicate footer
InvestorRelations.getLayout = function getLayout(page: ReactElement) {
  return page;
};

export default InvestorRelations;
