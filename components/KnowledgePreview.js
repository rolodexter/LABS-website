import { useState, useEffect } from 'react';
import { serialize } from 'next-mdx-remote/serialize';
import { MDXRemote } from 'next-mdx-remote';
import matter from 'gray-matter';

export default function KnowledgePreview({ content }) {
  const [mdxSource, setMdxSource] = useState(null);
  const [metadata, setMetadata] = useState(null);

  useEffect(() => {
    const processMdx = async () => {
      try {
        // Parse frontmatter
        const { data, content: mdxContent } = matter(content);
        setMetadata(data);

        // Serialize MDX content
        const mdxSource = await serialize(mdxContent, {
          parseFrontmatter: false, // Already parsed above
          mdxOptions: {
            development: process.env.NODE_ENV === 'development'
          }
        });
        setMdxSource(mdxSource);
      } catch (error) {
        console.error('Error processing MDX:', error);
      }
    };

    if (content) {
      processMdx();
    }
  }, [content]);

  if (!mdxSource || !metadata) {
    return <div>Loading preview...</div>;
  }

  return (
    <div className="knowledge-preview">
      {/* Preview Banner */}
      <div className="bg-yellow-100 border-l-4 border-yellow-500 p-4 mb-4">
        <p className="text-yellow-700">
          <strong>Preview Mode</strong> - This is a draft knowledge module
        </p>
        <p className="text-sm text-yellow-600">
          Status: {metadata.status} | Version: {metadata.version} | Last Updated: {metadata.last_updated}
        </p>
      </div>

      {/* Metadata Section */}
      <div className="bg-gray-50 p-4 rounded-lg mb-6">
        <h1 className="text-2xl font-bold mb-2">{metadata.title}</h1>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <strong>Category:</strong> {metadata.category}
            {metadata.subcategory && ` / ${metadata.subcategory}`}
          </div>
          <div>
            <strong>Complexity:</strong> {metadata.complexity}
          </div>
          {metadata.tags && (
            <div className="col-span-2">
              <strong>Tags:</strong>{' '}
              {metadata.tags.map((tag) => (
                <span key={tag} className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm mr-2">
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="prose max-w-none">
        <MDXRemote {...mdxSource} />
      </div>
    </div>
  );
}
