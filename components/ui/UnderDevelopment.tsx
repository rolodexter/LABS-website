import React from 'react';
import Link from 'next/link';

type UnderDevelopmentProps = {
  title?: string;
  message?: string;
};

const UnderDevelopment: React.FC<UnderDevelopmentProps> = ({
  title = 'Page Under Development',
  message = 'I\'m currently building this part of the system. Check back soon for updates.'
}) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white text-black">
      <div className="text-center p-10 max-w-lg border border-gray-300 rounded-lg shadow-sm">
        <h1 className="text-2xl font-bold mb-4">{title}</h1>
        <p className="text-gray-600">{message}</p>
        <div className="mt-6 pt-6 border-t border-gray-200">
          <Link href="/">
            <a className="inline-block px-6 py-2 border border-black hover:bg-black hover:text-white transition-colors duration-200">
              Return Home
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default UnderDevelopment;
