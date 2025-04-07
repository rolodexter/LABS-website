import PlaceholderPage, { createPlaceholderLayout } from '@/components/shared/PlaceholderPage';

function EconomicSimulationResearchPlaceholder() {
  return (
    <PlaceholderPage
      title="Economic Simulation Research"
      description="Research on computational models and simulations of economic systems and market behaviors"
      backLinkText="Research"
      backLinkHref="/research"
    />
  );
}

export default createPlaceholderLayout(EconomicSimulationResearchPlaceholder);
