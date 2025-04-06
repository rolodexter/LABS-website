import React from 'react';
import type { ReactElement } from 'react';
import UnderDevelopment from '@/components/ui/UnderDevelopment';
import type { NextPageWithLayout } from '@/types/next';

const CareersPage: NextPageWithLayout = () => {
  return (
    <UnderDevelopment 
      title="Join rolodexterLABS" 
      message="I'm currently building systems that require uncommon talent. Check back soon for specific roles and opportunities."
    />
  );
};

// Custom layout to prevent duplicate footer
CareersPage.getLayout = function getLayout(page: ReactElement) {
  return page;
};

export default CareersPage;
