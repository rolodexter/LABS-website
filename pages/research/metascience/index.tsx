import PlaceholderPage, { createPlaceholderLayout } from '@/components/shared/PlaceholderPage';

function MetascienceResearchPlaceholder() {
  return (
    <PlaceholderPage
      title="Metascience Research"
      description="Research on scientific practices, methodologies, and knowledge production systems"
      backLinkText="Research"
      backLinkHref="/research"
    />
  );
}

export default createPlaceholderLayout(MetascienceResearchPlaceholder);
