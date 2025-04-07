import PlaceholderPage, { createPlaceholderLayout } from '@/components/shared/PlaceholderPage';

function ApiDocsPlaceholder() {
  return (
    <PlaceholderPage
      title="API Documentation"
      description="API documentation coming soon"
      backLinkText="Documentation"
      backLinkHref="/docs"
    />
  );
}

export default createPlaceholderLayout(ApiDocsPlaceholder);
