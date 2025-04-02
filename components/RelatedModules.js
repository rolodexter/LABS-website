import { useState, useEffect } from 'react';
import Link from 'next/link';
import { format } from 'date-fns';

export default function RelatedModules({ slug, limit = 5 }) {
  const [related, setRelated] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!slug) return;

    fetch(`/api/knowledge/${slug}/related?limit=${limit}`)
      .then((res) => res.json())
      .then((data) => {
        setRelated(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [slug, limit]);

  if (loading) {
    return (
      <div className="animate-pulse space-y-4">
        <div className="h-4 bg-gray-200 rounded w-1/4"></div>
        <div className="space-y-3">
          <div className="h-4 bg-gray-200 rounded"></div>
          <div className="h-4 bg-gray-200 rounded w-5/6"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return null; // Silently fail for related modules
  }

  if (!related || (
    !related.dependencies.length &&
    !related.sameCategory.length &&
    !related.sharedTags.length
  )) {
    return null;
  }

  const renderModuleLink = (module) => (
    <Link
      key={module.slug}
      href={module.status === 'draft' ? `/knowledge/preview${module.slug}` : module.slug}
      className="block group"
    >
      <div className="p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors duration-200">
        <h3 className="text-lg font-medium text-gray-900 group-hover:text-blue-600">
          {module.title}
        </h3>
        <div className="mt-1 text-sm text-gray-500">
          {module.category}
          {module.subcategory && ` / ${module.subcategory}`}
        </div>
        <div className="mt-2 text-xs text-gray-400">
          Updated {format(new Date(module.last_updated), 'MMM d, yyyy')}
        </div>
      </div>
    </Link>
  );

  return (
    <div className="space-y-6">
      {related.dependencies.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Dependencies</h2>
          <div className="space-y-3">
            {related.dependencies.map(renderModuleLink)}
          </div>
        </div>
      )}

      {related.sameCategory.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">More in {related.sameCategory[0].category}</h2>
          <div className="space-y-3">
            {related.sameCategory.map(renderModuleLink)}
          </div>
        </div>
      )}

      {related.sharedTags.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Related by Tags</h2>
          <div className="space-y-3">
            {related.sharedTags.map(renderModuleLink)}
          </div>
        </div>
      )}
    </div>
  );
}
