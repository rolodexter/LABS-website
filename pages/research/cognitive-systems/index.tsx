import PlaceholderPage, { createPlaceholderLayout } from '@/components/shared/PlaceholderPage';

function CognitiveSystemsResearchPlaceholder() {
  return (
    <PlaceholderPage
      title="Cognitive Systems Research"
      description="Research on systems that emulate and augment human cognitive processes"
      backLinkText="Research"
      backLinkHref="/research"
    />
  );
}

export default createPlaceholderLayout(CognitiveSystemsResearchPlaceholder);
