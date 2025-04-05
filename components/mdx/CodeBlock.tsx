import React from 'react';
import { useRouter } from 'next/router';

type CodeBlockProps = React.HTMLAttributes<HTMLPreElement> & {
  children: React.ReactNode;
};

const CodeBlock = ({ children, className, ...props }: CodeBlockProps) => {
  // Check if this has a language specified (className will be like "language-js")
  const language = className ? className.replace('language-', '') : '';
  const isLanguageSpecified = className?.startsWith('language-');

  if (isLanguageSpecified) {
    return (
      <pre 
        {...props}
        className="bg-gray-100 p-5 pt-8 rounded-lg overflow-x-auto my-6 text-black font-mono text-sm shadow-sm border border-gray-200"
      >
        <div className="relative">
          {language && (
            <div className="absolute right-2 top-2 text-xs text-gray-500 font-mono">
              {language}
            </div>
          )}
          <code className={className}>
            {children}
          </code>
        </div>
      </pre>
    );
  }

  // For inline code
  return (
    <code
      {...props}
      className="bg-gray-100 px-2 py-1 rounded text-black font-mono text-sm border border-gray-200"
    >
      {children}
    </code>
  );
};

export default CodeBlock;
