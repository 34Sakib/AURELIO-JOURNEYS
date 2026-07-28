import React, { useState } from 'react';
import { DESTINATIONS_DATA } from '../data/journeysData';
import { Reveal } from '../components/common/Reveal';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Search, Sparkles, ShieldCheck, Globe, MapPin, Compass } from 'lucide-react';

export const DestinationsIndexPage: React.FC = () => {
  const [regionFilter, setRegionFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredDestinations = DESTINATIONS_DATA.filter((d) => {
    const matchesRegion = regionFilter === 'All' || d.region === regionFilter;
    const matchesSearch =
      searchQuery === '' ||
      d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.country.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.hook.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesRegion && matchesSearch;
  });

  return (
    <div style={{ paddingTop: '120px', paddingBottom: '96px', backgroundColor: '#FAF7F1' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>
        {/* Page Title & Intro */}
        <Reveal>
          <div style={{ textAlign: 'center', maxWidth: '760px', margin: '0 auto 48px' }}>
            <span className="label-eyebrow">WORLDWIDE TRAVEL DESTINATIONS</span>
            <h1 className="display-lg" style={{ color: '#1A1B18', marginBottom: '16px' }}>
              Explore Top Vacation Spots & Island Getaways
            </h1>
            <p className="body-lg" style={{ color: '#5C5D54' }}>
              Browse handpicked tour destinations across Asia, Europe, Africa, and South America curated by our travel agency specialists.
            </p>
          </div>
        </Reveal>

        {/* SECTION 1: FEATURED DESTINATION SPOTLIGHT & AGENCY INFO BANNER */}
        <Reveal delay={0.1}>
          <div
            style={{
              position: 'relative',
              borderRadius: '24px',
              overflow: 'hidden',
              marginBottom: '64px',
              boxShadow: '0 20px 48px rgba(26, 27, 24, 0.08)',
              border: '1px solid #E4DCC8',
              backgroundColor: '#FFFFFF',
            }}
          >
            <div className="dest-spotlight-grid">
              {/* Left Column: Rich Travel Agency Information */}
              <div
                style={{
                  padding: 'clamp(20px, 4vw, 48px)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                }}
              >
                <div
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    backgroundColor: 'rgba(181, 100, 61, 0.12)',
                    padding: '6px 14px',
                    borderRadius: '999px',
                    width: 'fit-content',
                    marginBottom: '16px',
                  }}
                >
                  <Sparkles size={14} color="#B5643D" />
                  <span
                    style={{
                      fontFamily: 'Inter, sans-serif',
                      fontSize: '11px',
                      fontWeight: 700,
                      letterSpacing: '0.12em',
                      textTransform: 'uppercase',
                      color: '#B5643D',
                    }}
                  >
                    Featured Destination Spotlight
                  </span>
                </div>

                <h2
                  className="display-md"
                  style={{ color: '#1A1B18', marginBottom: '16px', fontSize: '32px', lineHeight: 1.2 }}
                >
                  Hand-Crafted Tour Packages & Vacation Planning
                </h2>

                <p
                  className="body-md"
                  style={{ color: '#5C5D54', marginBottom: '28px', lineHeight: 1.7, fontSize: '15px' }}
                >
                  Every destination in our agency portfolio is personally vetted by certified travel advisors. We handle all flight arrangements, luxury resort bookings, private transfers, and guided excursions to ensure a completely stress-free holiday experience.
                </p>

                {/* 3 Key Benefit Highlights */}
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                    gap: '16px',
                    marginBottom: '32px',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      backgroundColor: '#FAF7F1',
                      padding: '12px 16px',
                      borderRadius: '12px',
                      border: '1px solid #E4DCC8',
                    }}
                  >
                    <Compass size={18} color="#B5643D" />
                    <div>
                      <span style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#1A1B18' }}>100% Customized</span>
                      <span style={{ fontSize: '11px', color: '#8C8D80' }}>Tailored to Your Budget</span>
                    </div>
                  </div>

                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      backgroundColor: '#FAF7F1',
                      padding: '12px 16px',
                      borderRadius: '12px',
                      border: '1px solid #E4DCC8',
                    }}
                  >
                    <ShieldCheck size={18} color="#4A7A5F" />
                    <div>
                      <span style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#1A1B18' }}>Best Price Guarantee</span>
                      <span style={{ fontSize: '11px', color: '#8C8D80' }}>Zero Hidden Fees</span>
                    </div>
                  </div>

                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      backgroundColor: '#FAF7F1',
                      padding: '12px 16px',
                      borderRadius: '12px',
                      border: '1px solid #E4DCC8',
                    }}
                  >
                    <Globe size={18} color="#B5643D" />
                    <div>
                      <span style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#1A1B18' }}>24/7 Support</span>
                      <span style={{ fontSize: '11px', color: '#8C8D80' }}>Dedicated On-Trip Care</span>
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <Link
                    to="/enquire"
                    className="btn-primary"
                    style={{
                      padding: '14px 28px',
                      fontSize: '14px',
                    }}
                  >
                    <span>Request Custom Itinerary</span>
                    <ArrowUpRight size={16} />
                  </Link>
                </div>
              </div>

              {/* Right Column: High Quality Destination Feature Image Card */}
              <div
                style={{
                  position: 'relative',
                  minHeight: '380px',
                  height: '100%',
                }}
              >
                <img
                  src="https://images.unsplash.com/photo-1506929562872-bb421503ef21?q=80&w=1400&auto=format&fit=crop"
                  alt="Tropical Destination Resort"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                  }}
                />
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(180deg, rgba(0,0,0,0.1) 0%, rgba(26,27,24,0.65) 100%)',
                  }}
                />

                {/* Floating Rating & Location Pill Badge */}
                <div
                  style={{
                    position: 'absolute',
                    bottom: '24px',
                    left: '24px',
                    right: '24px',
                    backgroundColor: 'rgba(255, 255, 255, 0.92)',
                    backdropFilter: 'blur(12px)',
                    padding: '16px 20px',
                    borderRadius: '16px',
                    boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <MapPin size={20} color="#B5643D" />
                    <div>
                      <span style={{ display: 'block', fontSize: '14px', fontWeight: 700, color: '#1A1B18' }}>Maldives & Capri Excursions</span>
                      <span style={{ fontSize: '11px', color: '#5C5D54' }}>Top Customer Rated Destination 2026</span>
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <span style={{ fontSize: '14px', fontWeight: 800, color: '#B5643D', display: 'block' }}>★ 4.9 / 5</span>
                    <span style={{ fontSize: '10px', color: '#8C8D80', textTransform: 'uppercase', letterSpacing: '0.05em' }}>10k+ Reviews</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        {/* SECTION 2: SEARCH & FILTERABLE DESTINATION GRID */}
        <div>
          {/* Region Filter Pills & Search Input Bar */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px', flexWrap: 'wrap', gap: '20px' }}>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {['All', 'Asia', 'Europe', 'Africa', 'South America'].map((reg) => (
                <button
                  key={reg}
                  onClick={() => setRegionFilter(reg)}
                  style={{
                    padding: '10px 22px',
                    borderRadius: '999px',
                    border: regionFilter === reg ? 'none' : '1px solid #E4DCC8',
                    backgroundColor: regionFilter === reg ? '#B5643D' : '#FFFFFF',
                    color: regionFilter === reg ? '#FAF7F1' : '#33342F',
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '13px',
                    fontWeight: 600,
                    cursor: 'pointer',
                    transition: 'all 200ms ease',
                    boxShadow: regionFilter === reg ? '0 4px 14px rgba(181, 100, 61, 0.3)' : 'none',
                  }}
                >
                  {reg}
                </button>
              ))}
            </div>

            <div style={{ position: 'relative', width: '280px' }}>
              <Search size={15} color="#8C8D80" style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)' }} />
              <input
                type="text"
                placeholder="Search destination or country..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px 16px 12px 42px',
                  borderRadius: '999px',
                  border: '1px solid #E4DCC8',
                  backgroundColor: '#FFFFFF',
                  fontSize: '13px',
                  fontFamily: 'Inter, sans-serif',
                  outline: 'none',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
                }}
              />
            </div>
          </div>

          {/* Full Filterable Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '32px' }}>
            {filteredDestinations.map((dest, idx) => (
              <Reveal key={dest.slug} delay={idx * 0.06}>
                <Link to={`/destinations/${dest.slug}`} style={{ textDecoration: 'none' }} data-cursor="View">
                  <div
                    style={{
                      backgroundColor: '#FFFFFF',
                      borderRadius: '20px',
                      overflow: 'hidden',
                      boxShadow: '0 4px 20px rgba(26, 27, 24, 0.05)',
                      border: '1px solid #E4DCC8',
                      transition: 'all 400ms cubic-bezier(0.22, 1, 0.36, 1)',
                    }}
                    className="dest-card-item"
                  >
                    <div style={{ height: '260px', overflow: 'hidden', position: 'relative' }}>
                      <img
                        src={dest.heroImage}
                        alt={dest.name}
                        style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 600ms ease' }}
                        className="dest-img"
                      />
                      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, transparent 40%, rgba(26,27,24,0.7) 100%)' }} />
                      <span
                        style={{
                          position: 'absolute',
                          top: '16px',
                          left: '16px',
                          backgroundColor: 'rgba(250, 247, 241, 0.92)',
                          backdropFilter: 'blur(8px)',
                          color: '#B5643D',
                          padding: '4px 14px',
                          borderRadius: '999px',
                          fontSize: '11px',
                          fontWeight: 700,
                          textTransform: 'uppercase',
                          letterSpacing: '0.05em',
                        }}
                      >
                        {dest.region}
                      </span>
                    </div>

                    <div style={{ padding: '24px' }}>
                      <span style={{ fontSize: '12px', color: '#8C8D80', display: 'block', marginBottom: '4px', textTransform: 'uppercase', fontWeight: 600 }}>
                        {dest.country} • {dest.durationRange}
                      </span>
                      <h3 style={{ fontFamily: 'Fraunces, serif', fontSize: '24px', color: '#1A1B18', marginBottom: '8px' }}>
                        {dest.name}
                      </h3>
                      <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px', color: '#5C5D54', lineHeight: 1.5, marginBottom: '20px' }}>
                        {dest.hook}
                      </p>

                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid #F1ECE1', paddingTop: '16px' }}>
                        <span style={{ fontSize: '13px', color: '#B5643D', fontWeight: 600 }}>Explore Destination</span>
                        <ArrowUpRight size={16} color="#B5643D" />
                      </div>
                    </div>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .dest-spotlight-grid {
          display: grid;
          grid-template-columns: 1.1fr 0.9fr;
        }
        @media (max-width: 900px) {
          .dest-spotlight-grid {
            grid-template-columns: 1fr !important;
          }
        }
        .dest-card-item:hover {
          transform: translateY(-6px);
          border-color: #B5643D;
          box-shadow: 0 16px 40px rgba(26, 27, 24, 0.12);
        }
        .dest-card-item:hover .dest-img {
          transform: scale(1.06);
        }
      `}</style>
    </div>
  );
};

export default DestinationsIndexPage;
