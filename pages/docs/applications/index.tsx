import PlaceholderPage, { createPlaceholderLayout } from '@/components/shared/PlaceholderPage';

function ApplicationsDocsPlaceholder() {
  return (
    <PlaceholderPage
      title="Applications Documentation"
      description="Applications documentation coming soon"
      backLinkText="Documentation"
      backLinkHref="/docs"
    />
  );
}

export default createPlaceholderLayout(ApplicationsDocsPlaceholder);
