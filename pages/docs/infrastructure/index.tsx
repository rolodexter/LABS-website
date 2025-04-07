import PlaceholderPage, { createPlaceholderLayout } from '@/components/shared/PlaceholderPage';

function InfrastructureDocsPlaceholder() {
  return (
    <PlaceholderPage
      title="Infrastructure Documentation"
      description="Infrastructure documentation coming soon"
      backLinkText="Documentation"
      backLinkHref="/docs"
    />
  );
}

export default createPlaceholderLayout(InfrastructureDocsPlaceholder);
