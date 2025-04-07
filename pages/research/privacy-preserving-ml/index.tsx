import PlaceholderPage, { createPlaceholderLayout } from '@/components/shared/PlaceholderPage';

function PrivacyPreservingMLResearchPlaceholder() {
  return (
    <PlaceholderPage
      title="Privacy-Preserving Machine Learning Research"
      description="Research on techniques for machine learning that maintain data privacy and confidentiality"
      backLinkText="Research"
      backLinkHref="/research"
    />
  );
}

export default createPlaceholderLayout(PrivacyPreservingMLResearchPlaceholder);
