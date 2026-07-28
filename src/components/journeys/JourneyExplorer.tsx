import React, { useState } from 'react';
import { Journey, JOURNEYS_DATA } from '../../data/journeysData';
import { JourneyCard } from './JourneyCard';
import { Search, Sparkles, Compass, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { Reveal } from '../common/Reveal';

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
        padding: 'clamp(64px, 8vw, 128px) 24px',
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
        {/* 1. FEATURED EXPEDITIONS HERO BANNER WITH RICH IMAGERY & INFO BADGES */}
        <Reveal>
          <div
            style={{
              position: 'relative',
              borderRadius: '24px',
              overflow: 'hidden',
              marginBottom: '64px',
              boxShadow: '0 20px 48px rgba(26, 27, 24, 0.1)',
              border: '1px solid #E4DCC8',
              backgroundColor: '#1A1B18',
              color: '#FAF7F1',
            }}
          >
            {/* Background Image */}
            <img
              src="https://images.unsplash.com/photo-1506929562872-bb421503ef21?q=80&w=1600&auto=format&fit=crop"
              alt="Curated Luxury Expedition"
              style={{
                position: 'absolute',
                inset: 0,
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                opacity: 0.42,
              }}
            />

            {/* Gradient Scrim */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(135deg, rgba(26, 27, 24, 0.92) 0%, rgba(23, 61, 58, 0.85) 55%, rgba(26, 27, 24, 0.92) 100%)',
              }}
            />

            <div
              style={{
                position: 'relative',
                zIndex: 10,
                padding: 'clamp(32px, 5vw, 64px)',
                display: 'grid',
                gridTemplateColumns: '1.2fr 0.8fr',
                gap: '40px',
                alignItems: 'center',
              }}
              className="journeys-hero-grid"
            >
              {/* Left Column: Headline & Narrative */}
              <div>
                <div
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    backgroundColor: 'rgba(255, 255, 255, 0.15)',
                    border: '1px solid rgba(255, 255, 255, 0.3)',
                    padding: '6px 16px',
                    borderRadius: '999px',
                    marginBottom: '18px',
                    backdropFilter: 'blur(12px)',
                  }}
                >
                  <Sparkles size={14} color="#FFB067" />
                  <span
                    style={{
                      fontFamily: 'Inter, sans-serif',
                      fontSize: '11px',
                      fontWeight: 700,
                      letterSpacing: '0.14em',
                      textTransform: 'uppercase',
                      color: '#FFF8F0',
                    }}
                  >
                    Curated Expeditions Portfolio
                  </span>
                </div>

                <h1
                  className="display-lg"
                  style={{
                    color: '#FFFFFF',
                    marginBottom: '16px',
                    fontSize: 'clamp(32px, 4.5vw, 52px)',
                    lineHeight: 1.1,
                  }}
                >
                  Hand-Crafted Tour Packages & Private Expeditions
                </h1>

                <p
                  className="body-lg"
                  style={{
                    color: 'rgba(250, 247, 241, 0.88)',
                    marginBottom: '28px',
                    maxWidth: '580px',
                    fontSize: '16px',
                    lineHeight: 1.6,
                  }}
                >
                  Every tour package in our portfolio is designed by certified travel curators. Enjoy private chauffeured transfers, 5-star resort stays, and exclusive access permits.
                </p>

                {/* 3 Key Benefit Chips */}
                <div
                  style={{
                    display: 'flex',
                    gap: '16px',
                    flexWrap: 'wrap',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#FAF7F1', fontWeight: 600 }}>
                    <CheckCircle2 size={16} color="#B5643D" />
                    <span>100% Tailored Itineraries</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#FAF7F1', fontWeight: 600 }}>
                    <CheckCircle2 size={16} color="#B5643D" />
                    <span>Best Price Guarantee</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#FAF7F1', fontWeight: 600 }}>
                    <CheckCircle2 size={16} color="#B5643D" />
                    <span>24/7 Dedicated Support</span>
                  </div>
                </div>
              </div>

              {/* Right Column: Glassmorphism Info Card */}
              <div
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  backdropFilter: 'blur(20px)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  borderRadius: '20px',
                  padding: '28px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '20px',
                  boxShadow: '0 12px 32px rgba(0,0,0,0.3)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div
                    style={{
                      width: '44px',
                      height: '44px',
                      borderRadius: '12px',
                      backgroundColor: '#B5643D',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#FAF7F1',
                    }}
                  >
                    <Compass size={22} />
                  </div>
                  <div>
                    <span style={{ fontFamily: 'Fraunces, serif', fontSize: '20px', color: '#FFFFFF', fontWeight: 500, display: 'block' }}>
                      Expedition Guarantee
                    </span>
                    <span style={{ fontSize: '12px', color: '#C9A15E', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                      Certified Travel Agency
                    </span>
                  </div>
                </div>

                <hr style={{ border: 'none', height: '1px', backgroundColor: 'rgba(255, 255, 255, 0.15)' }} />

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div>
                    <span style={{ fontSize: '11px', color: 'rgba(250, 247, 241, 0.7)', textTransform: 'uppercase', letterSpacing: '0.08em', display: 'block' }}>
                      Curated Destinations
                    </span>
                    <span style={{ fontFamily: 'Fraunces, serif', fontSize: '24px', fontWeight: 600, color: '#FFFFFF' }}>
                      180+
                    </span>
                  </div>
                  <div>
                    <span style={{ fontSize: '11px', color: 'rgba(250, 247, 241, 0.7)', textTransform: 'uppercase', letterSpacing: '0.08em', display: 'block' }}>
                      Customer Rating
                    </span>
                    <span style={{ fontFamily: 'Fraunces, serif', fontSize: '24px', fontWeight: 600, color: '#C9A15E', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      ★ 4.9 <span style={{ fontSize: '12px', color: '#FAF7F1', fontWeight: 400 }}>(10k+)</span>
                    </span>
                  </div>
                </div>

                <div
                  style={{
                    backgroundColor: 'rgba(250, 247, 241, 0.12)',
                    padding: '12px 16px',
                    borderRadius: '10px',
                    fontSize: '12px',
                    color: 'rgba(250, 247, 241, 0.9)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                  }}
                >
                  <ShieldCheck size={16} color="#4A7A5F" />
                  <span>100% Financial Protection & Escrow Security</span>
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        {/* 2. Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 40px' }}>
          <span className="label-eyebrow">BROWSE TOUR PACKAGES BY STYLE & REGION</span>
          <h2 className="display-lg" style={{ color: '#1A1B18', marginBottom: '16px' }}>
            Explore Popular Tour Packages
          </h2>
          <p className="body-lg">
            Filter by trip style, destination region, or keyword to find your perfect holiday itinerary.
          </p>
        </div>

        {/* 3. Category Tabs & Search Bar */}
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
                  fontWeight: 600,
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

        {/* 4. Journeys Grid */}
        {filteredJourneys.length > 0 ? (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
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
              border: '1px solid #E4DCC8',
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

      <style>{`
        @media (max-width: 960px) {
          .journeys-hero-grid {
            grid-template-columns: 1fr !important;
            gap: 32px !important;
          }
        }
      `}</style>
    </section>
  );
};

export default JourneyExplorer;
