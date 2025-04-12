import React from 'react';
import Link from 'next/link';

const MinimalHeader: React.FC = () => {
  return (
    <header className="py-6 border-b border-gray-200">
      <div className="container mx-auto px-4">
        <Link href="/" className="text-2xl font-mono hover:underline">
          rolodexterLABS
        </Link>
      </div>
    </header>
  );
};

export default MinimalHeader;
