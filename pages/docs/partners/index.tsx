import PlaceholderPage, { createPlaceholderLayout } from '@/components/shared/PlaceholderPage';

function PartnersDocsPlaceholder() {
  return (
    <PlaceholderPage
      title="Partners Documentation"
      description="Partners documentation coming soon"
      backLinkText="Documentation"
      backLinkHref="/docs"
    />
  );
}

export default createPlaceholderLayout(PartnersDocsPlaceholder);
