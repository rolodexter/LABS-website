import PlaceholderPage, { createPlaceholderLayout } from '@/components/shared/PlaceholderPage';

function ModelsDocsPlaceholder() {
  return (
    <PlaceholderPage
      title="Models Documentation"
      description="Models documentation coming soon"
      backLinkText="Documentation"
      backLinkHref="/docs"
    />
  );
}

export default createPlaceholderLayout(ModelsDocsPlaceholder);
