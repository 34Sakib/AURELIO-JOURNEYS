import React from 'react';
import { Hero } from '../components/hero/Hero';
import { DestinationCarousel } from '../components/destinations/DestinationCarousel';
import { DestinationGrid } from '../components/destinations/DestinationGrid';
import { JourneyExplorer } from '../components/journeys/JourneyExplorer';
import { PhilosophySection } from '../components/philosophy/PhilosophySection';
import { StampImpactSection } from '../components/philosophy/StampImpactSection';
import { JournalSection } from '../components/journal/JournalSection';
import { Journey } from '../data/journeysData';
import { useNavigate } from 'react-router-dom';

interface HomePageProps {
  shortlist?: Journey[];
  onToggleShortlist?: (journey: Journey) => void;
  onOpenConcierge?: (journeyTitle?: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  shortlist = [],
  onToggleShortlist = () => {},
  onOpenConcierge = () => {},
}) => {
  const navigate = useNavigate();

  const handleHeroSearch = (filters: { destination: string; style: string; travelers: number }) => {
    navigate(`/journeys?destination=${encodeURIComponent(filters.destination)}&style=${encodeURIComponent(filters.style)}`);
  };

  const handleSelectRegionFromGrid = (region: string) => {
    navigate(`/journeys?region=${encodeURIComponent(region)}`);
  };

  return (
    <div>
      {/* Hero Section */}
      <Hero
        onSearch={handleHeroSearch}
        onOpenConcierge={() => {
          onOpenConcierge();
          navigate('/enquire');
        }}
        onScrollNext={() => {
          const el = document.getElementById('signature-carousel');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      {/* Signature Destination Carousel */}
      <div id="signature-carousel" style={{ position: 'relative', zIndex: 1 }}>
        <DestinationCarousel />
      </div>

      {/* Asymmetric Destination Grid */}
      <DestinationGrid onSelectRegion={handleSelectRegionFromGrid} />

      {/* Journeys Collection Explorer */}
      <JourneyExplorer
        shortlist={shortlist}
        onToggleShortlist={onToggleShortlist}
        onOpenDetail={(journey) => navigate(`/journeys/${journey.slug || journey.id}`)}
      />

      {/* Live Animated Stamp Impact Section (Refinement from reference) */}
      <StampImpactSection onOpenConcierge={() => onOpenConcierge()} />

      {/* Brand Philosophy */}
      <PhilosophySection />

      {/* Editorial Journal */}
      <JournalSection />
    </div>
  );
};

export default HomePage;
