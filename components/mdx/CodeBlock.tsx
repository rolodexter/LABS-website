import React from 'react';
import { useRouter } from 'next/router';

interface CodeBlockProps {
  children: React.ReactNode;
  className?: string;
}

const CodeBlock: React.FC<CodeBlockProps> = ({ children, className, ...props }) => {
  // Check if this has a language specified (className will be like "language-js")
  const language = className ? className.replace('language-', '') : '';
  const isLanguageSpecified = className?.startsWith('language-');

  if (isLanguageSpecified) {
    return (
      <div className="relative">
        {language && (
          <div className="absolute right-2 top-2 text-xs text-gray-500 font-mono">
            {language}
          </div>
        )}
        <pre className="bg-gray-100 p-5 pt-8 rounded-lg overflow-x-auto my-6 text-black font-mono text-sm shadow-sm border border-gray-200">
          <code className={className} {...props}>
            {children}
          </code>
        </pre>
      </div>
    );
  }

  // For inline code
  return (
    <code
      className="bg-gray-100 px-2 py-1 rounded text-black font-mono text-sm border border-gray-200"
      {...props}
    >
      {children}
    </code>
  );
};

export default CodeBlock;
