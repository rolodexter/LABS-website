import React from 'react';

type InlineCodeProps = React.HTMLAttributes<HTMLElement> & {
  children: React.ReactNode;
};

const InlineCode: React.FC<InlineCodeProps> = ({ children, ...props }) => {
  return (
    <code
      className="bg-gray-100 px-2 py-1 rounded text-black font-mono text-sm border border-gray-200"
      {...props}
    >
      {children}
    </code>
  );
};

export default InlineCode;
