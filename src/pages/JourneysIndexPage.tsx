import React from 'react';
import { JourneyExplorer } from '../components/journeys/JourneyExplorer';
import { Journey } from '../data/journeysData';
import { useNavigate, useSearchParams } from 'react-router-dom';

interface JourneysIndexPageProps {
  shortlist?: Journey[];
  onToggleShortlist?: (journey: Journey) => void;
}

export const JourneysIndexPage: React.FC<JourneysIndexPageProps> = ({
  shortlist = [],
  onToggleShortlist = () => {},
}) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const regionParam = searchParams.get('region') || searchParams.get('destination') || 'All Regions';

  return (
    <div style={{ paddingTop: '100px' }}>
      <JourneyExplorer
        shortlist={shortlist}
        onToggleShortlist={onToggleShortlist}
        onOpenDetail={(journey) => navigate(`/journeys/${journey.slug || journey.id}`)}
        selectedRegionFilter={regionParam}
      />
    </div>
  );
};

export default JourneysIndexPage;
