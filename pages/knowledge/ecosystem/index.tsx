import PlaceholderPage, { createPlaceholderLayout } from '@/components/shared/PlaceholderPage';

function EcosystemKnowledgePlaceholder() {
  return (
    <PlaceholderPage
      title="AI Ecosystem Knowledge"
      description="AI Ecosystem knowledge resources coming soon"
      backLinkText="Knowledge"
      backLinkHref="/knowledge"
    />
  );
}

export default createPlaceholderLayout(EcosystemKnowledgePlaceholder);
