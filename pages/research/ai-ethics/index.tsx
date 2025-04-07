import PlaceholderPage, { createPlaceholderLayout } from '@/components/shared/PlaceholderPage';

function AIEthicsResearchPlaceholder() {
  return (
    <PlaceholderPage
      title="AI Ethics Research"
      description="Research on ethical considerations in AI development and deployment"
      backLinkText="Research"
      backLinkHref="/research"
    />
  );
}

export default createPlaceholderLayout(AIEthicsResearchPlaceholder);
