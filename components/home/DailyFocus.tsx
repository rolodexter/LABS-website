import React from 'react';

interface DailyFocusProps {
  title: string;
  description: string;
  date: string;
}

const DailyFocus: React.FC<DailyFocusProps> = ({ title, description, date }) => {
  // Format date to display as "Wednesday, April 2, 2025"
  const formattedDate = new Date(date).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <section className="py-12 border-b border-gray-200 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-4xl mx-auto">
          <div className="font-serif text-sm uppercase tracking-wider mb-2">{formattedDate}</div>
          <h1 className="font-serif text-4xl md:text-6xl font-bold mb-4">{title}</h1>
          <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto">{description}</p>
        </div>
      </div>
    </section>
  );
};

export default DailyFocus;
