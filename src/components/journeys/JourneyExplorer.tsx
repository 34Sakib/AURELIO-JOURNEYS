import React, { useState } from 'react';
import { Journey, JOURNEYS_DATA } from '../../data/journeysData';
import { JourneyCard } from './JourneyCard';
import { Search, Sparkles } from 'lucide-react';

interface JourneyExplorerProps {
  shortlist: Journey[];
  onToggleShortlist: (journey: Journey) => void;
  onOpenDetail: (journey: Journey) => void;
  selectedRegionFilter?: string;
}

export const JourneyExplorer: React.FC<JourneyExplorerProps> = ({
  shortlist,
  onToggleShortlist,
  onOpenDetail,
  selectedRegionFilter = 'All Regions',
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = [
    'All',
    'Cultural Expeditions',
    'Private Yachting',
    'Wildlife Safari',
    'Alpine & Wilderness',
  ];

  const filteredJourneys = JOURNEYS_DATA.filter((j) => {
    const matchesCategory = activeCategory === 'All' || j.style === activeCategory;
    const matchesRegion =
      selectedRegionFilter === 'All Regions' || j.region === selectedRegionFilter;
    const matchesSearch =
      searchQuery === '' ||
      j.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      j.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      j.overview.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesRegion && matchesSearch;
  });

  return (
    <section
      id="journeys"
      style={{
        padding: '128px 24px',
        backgroundColor: '#F1ECE1',
        position: 'relative',
      }}
    >
      <div
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
        }}
      >
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 48px' }}>
          <span className="label-eyebrow">FEATURED TOUR PACKAGES & VACATIONS</span>
          <h2 className="display-lg" style={{ color: '#1A1B18', marginBottom: '16px' }}>
            Explore Popular Tour Packages
          </h2>
          <p className="body-lg">
            Hand-crafted tour packages designed by expert travel advisors. Filter by destination, category, or duration to find your dream vacation.
          </p>
        </div>

        {/* Category Tabs & Search Bar */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
            marginBottom: '48px',
          }}
        >
          {/* Category Filter Pills */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '12px',
              flexWrap: 'wrap',
            }}
          >
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                style={{
                  background: activeCategory === cat ? '#B5643D' : '#FAF7F1',
                  color: activeCategory === cat ? '#FAF7F1' : '#33342F',
                  border: activeCategory === cat ? 'none' : '1px solid #E4DCC8',
                  padding: '10px 20px',
                  borderRadius: '999px',
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '13px',
                  fontWeight: 500,
                  cursor: 'pointer',
                  transition: 'all 200ms ease',
                  boxShadow: activeCategory === cat ? '0 4px 12px rgba(181, 100, 61, 0.3)' : 'none',
                }}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Inline Search Filter Input */}
          <div
            style={{
              maxWidth: '480px',
              margin: '0 auto',
              width: '100%',
              position: 'relative',
            }}
          >
            <Search
              size={16}
              color="#8C8D80"
              style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)' }}
            />
            <input
              type="text"
              placeholder="Search by keyword, temple, lodge, or country..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                padding: '12px 16px 12px 44px',
                borderRadius: '999px',
                border: '1px solid #E4DCC8',
                backgroundColor: '#FAF7F1',
                fontFamily: 'Inter, sans-serif',
                fontSize: '14px',
                color: '#1A1B18',
                outline: 'none',
              }}
            />
          </div>
        </div>

        {/* Journeys Grid */}
        {filteredJourneys.length > 0 ? (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(290px, 1fr))',
              gap: '24px',
            }}
          >
            {filteredJourneys.map((j) => (
              <JourneyCard
                key={j.id}
                journey={j}
                isShortlisted={shortlist.some((s) => s.id === j.id)}
                onToggleShortlist={onToggleShortlist}
                onOpenDetail={onOpenDetail}
              />
            ))}
          </div>
        ) : (
          <div
            style={{
              textAlign: 'center',
              padding: '64px 24px',
              backgroundColor: '#FAF7F1',
              borderRadius: '16px',
              border: '1px border #E4DCC8',
            }}
          >
            <Sparkles size={32} color="#B5643D" style={{ margin: '0 auto 16px' }} />
            <h3 className="heading-lg" style={{ marginBottom: '8px' }}>
              No Journeys Match Your Search
            </h3>
            <p className="body-md" style={{ marginBottom: '24px' }}>
              We design custom expeditions anywhere on earth. Speak directly with a Travel Designer to build your dream itinerary.
            </p>
            <button
              onClick={() => {
                setActiveCategory('All');
                setSearchQuery('');
              }}
              className="btn-secondary"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
