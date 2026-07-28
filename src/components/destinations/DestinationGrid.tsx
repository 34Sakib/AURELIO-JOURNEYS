import React, { useState } from 'react';
import { ArrowUpRight, Compass, Sparkles, MapPin } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Reveal } from '../common/Reveal';

interface DestinationGridProps {
  onSelectRegion: (region: string) => void;
}

interface DestinationCardData {
  id: string;
  name: string;
  country: string;
  region: string;
  image: string;
  tag: string;
  specs: string;
  aspect: 'large' | 'medium';
}

const DESTINATIONS: DestinationCardData[] = [
  {
    id: 'kyoto',
    name: 'Kyoto Sanctuary',
    country: 'Japan',
    region: 'Asia',
    image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=1200&auto=format&fit=crop',
    tag: 'Zen Temples & Ryokan Tour',
    specs: '7 Days • Guided Cultural Tour',
    aspect: 'large',
  },
  {
    id: 'amalfi',
    name: 'Amalfi Coast',
    country: 'Italy',
    region: 'Europe',
    image: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?q=80&w=1200&auto=format&fit=crop',
    tag: 'Coastal Yacht & Island Tour',
    specs: '5 Days • Luxury Resort & Yachting',
    aspect: 'medium',
  },
  {
    id: 'serengeti',
    name: 'Serengeti Plains',
    country: 'Tanzania',
    region: 'Africa',
    image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?q=80&w=1200&auto=format&fit=crop',
    tag: 'Big Five Wildlife Safari',
    specs: '6 Days • Helicopter Safari Tour',
    aspect: 'medium',
  },
  {
    id: 'patagonia',
    name: 'Patagonian Fjords',
    country: 'Chile & Argentina',
    region: 'South America',
    image: 'https://images.unsplash.com/photo-1527004013197-933c4bb611b3?q=80&w=1200&auto=format&fit=crop',
    tag: 'Glacier Trekking & Eco-Lodge',
    specs: '8 Days • Patagonia Wilderness Tour',
    aspect: 'large',
  },
];

const REGION_FILTERS = ['All Regions', 'Asia', 'Europe', 'Africa', 'South America'];

export const DestinationGrid: React.FC<DestinationGridProps> = ({ onSelectRegion }) => {
  const [selectedFilter, setSelectedFilter] = useState('All Regions');
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  // Mouse tilt parallax position tracker per card
  const [mousePos, setMousePos] = useState<{ [key: string]: { x: number; y: number } }>({});

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, id: string) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5; // -0.5 to 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePos((prev) => ({ ...prev, [id]: { x, y } }));
  };

  const filteredDestinations = selectedFilter === 'All Regions'
    ? DESTINATIONS
    : DESTINATIONS.filter((d) => d.region.toLowerCase() === selectedFilter.toLowerCase());

  return (
    <section
      id="destinations"
      style={{
        padding: '128px 24px',
        backgroundColor: '#FAF7F1',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        
        {/* Section Header with Region Filter Pills */}
        <Reveal>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
              marginBottom: '36px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginBottom: '8px' }}>
              <Sparkles size={14} color="#B5643D" />
              <span className="label-eyebrow" style={{ marginBottom: 0 }}>
                DESTINATIONS WORLDWIDE
              </span>
            </div>
            <h2 className="display-lg" style={{ color: '#1A1B18', margin: 0, marginBottom: '12px' }}>
              Discover Unforgettable Destinations
            </h2>
            <p
              className="body-lg"
              style={{
                maxWidth: '640px',
                color: '#5C5D54',
                margin: '0 auto',
                fontSize: '16px',
                lineHeight: 1.6,
              }}
            >
              Explore top vacation spots across Asia, Europe, Africa, and South America curated by our travel agency.
            </p>
          </div>
        </Reveal>

        {/* Region Filter Selector Bar */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', marginBottom: '48px', flexWrap: 'wrap' }}>
          {REGION_FILTERS.map((reg) => {
            const isActive = selectedFilter === reg;
            return (
              <button
                key={reg}
                onClick={() => setSelectedFilter(reg)}
                style={{
                  backgroundColor: isActive ? '#1A1B18' : 'transparent',
                  color: isActive ? '#FAF7F1' : '#5C5D54',
                  border: isActive ? '1px solid #1A1B18' : '1px solid #E4DCC8',
                  padding: '10px 20px',
                  borderRadius: '999px',
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '13px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 300ms ease',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                }}
              >
                {isActive && <Compass size={14} color="#C9A15E" />}
                <span>{reg}</span>
              </button>
            );
          })}
        </div>

        {/* Asymmetric Editorial Moveable Image Grid */}
        <motion.div
          layout
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(12, 1fr)',
            gap: '28px',
          }}
        >
          <AnimatePresence>
            {filteredDestinations.map((dest, idx) => {
              const isLarge = idx === 0 || idx === 3;
              const gridSpan = isLarge ? 'span 7' : 'span 5';
              const isHovered = hoveredCard === dest.id;
              const pos = mousePos[dest.id] || { x: 0, y: 0 };

              // Calculate interactive image translation (moveable image effect)
              const imgTranslateX = pos.x * -24; // shifts image up to 24px in opposite direction of mouse
              const imgTranslateY = pos.y * -24;

              return (
                <motion.div
                  layout
                  initial={{ opacity: 0, y: 32, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.5, delay: idx * 0.1, ease: [0.22, 1, 0.36, 1] }}
                  key={dest.id}
                  onClick={() => onSelectRegion(dest.region)}
                  onMouseEnter={() => setHoveredCard(dest.id)}
                  onMouseLeave={() => {
                    setHoveredCard(null);
                    setMousePos((prev) => ({ ...prev, [dest.id]: { x: 0, y: 0 } }));
                  }}
                  onMouseMove={(e) => handleMouseMove(e, dest.id)}
                  data-cursor="Discover"
                  className="dest-asym-card destination-card"
                  style={{
                    gridColumn: gridSpan,
                    position: 'relative',
                    height: isLarge ? '540px' : '460px',
                    borderRadius: '24px',
                    overflow: 'hidden',
                    cursor: 'pointer',
                    boxShadow: isHovered
                      ? '0 24px 64px rgba(26, 27, 24, 0.22), 0 0 0 2px #B5643D'
                      : '0 8px 32px rgba(26, 27, 24, 0.08)',
                    transform: isHovered ? 'translateY(-10px)' : 'translateY(0)',
                    transition: 'transform 400ms cubic-bezier(0.22, 1, 0.36, 1), box-shadow 400ms ease',
                  }}
                >
                  {/* Dynamic Moveable Image Container with Ambient Ken Burns Panning + Mouse Parallax */}
                  <div
                    style={{
                      position: 'absolute',
                      inset: '-10%', // Extended by 10% to prevent white edges during motion
                      backgroundImage: `url("${dest.image}")`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      transform: `translate(${imgTranslateX}px, ${imgTranslateY}px) scale(${isHovered ? 1.12 : 1.05})`,
                      transition: isHovered ? 'transform 100ms ease-out' : 'transform 800ms cubic-bezier(0.22, 1, 0.36, 1)',
                      filter: isHovered ? 'brightness(1.05)' : 'brightness(0.95)',
                    }}
                    className="moveable-dest-img"
                  />

                  {/* Gradient Scrim */}
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'linear-gradient(180deg, rgba(26,27,24,0.2) 0%, rgba(26,27,24,0.45) 50%, rgba(26,27,24,0.88) 100%)',
                      zIndex: 2,
                    }}
                  />

                  {/* Card Content Overlay */}
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      zIndex: 3,
                      padding: '36px',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                    }}
                  >
                    {/* Top Row: Glass Tag & Floating Arrow Icon */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div
                        style={{
                          backgroundColor: 'rgba(250, 247, 241, 0.92)',
                          backdropFilter: 'blur(12px)',
                          padding: '8px 18px',
                          borderRadius: '999px',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px',
                          boxShadow: '0 4px 16px rgba(0,0,0,0.1)',
                        }}
                      >
                        <MapPin size={13} color="#B5643D" />
                        <span
                          style={{
                            fontSize: '11px',
                            fontFamily: 'Inter, sans-serif',
                            fontWeight: 600,
                            letterSpacing: '0.12em',
                            textTransform: 'uppercase',
                            color: '#1A1B18',
                          }}
                        >
                          {dest.tag}
                        </span>
                      </div>

                      <div
                        style={{
                          width: '46px',
                          height: '46px',
                          borderRadius: '50%',
                          backgroundColor: isHovered ? '#B5643D' : 'rgba(250, 247, 241, 0.25)',
                          backdropFilter: 'blur(12px)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: '#FAF7F1',
                          transform: isHovered ? 'rotate(45deg) scale(1.1)' : 'rotate(0) scale(1)',
                          transition: 'all 350ms cubic-bezier(0.22, 1, 0.36, 1)',
                        }}
                      >
                        <ArrowUpRight size={20} />
                      </div>
                    </div>

                    {/* Bottom Row: Region Badge, Heading & Specs */}
                    <div>
                      <span
                        style={{
                          fontFamily: 'Inter, sans-serif',
                          fontSize: '11px',
                          fontWeight: 600,
                          letterSpacing: '0.14em',
                          textTransform: 'uppercase',
                          color: '#C9A15E',
                          display: 'block',
                          marginBottom: '6px',
                        }}
                      >
                        {dest.country} • {dest.region}
                      </span>

                      <h3
                        style={{
                          fontFamily: 'Fraunces, serif',
                          fontSize: isLarge ? '36px' : '30px',
                          fontWeight: 400,
                          color: '#FFFFFF',
                          lineHeight: 1.1,
                          marginBottom: '8px',
                        }}
                      >
                        {dest.name}
                      </h3>

                      {/* Specs Badge */}
                      <span
                        style={{
                          fontFamily: 'Inter, sans-serif',
                          fontSize: '12px',
                          color: 'rgba(250, 247, 241, 0.85)',
                          backgroundColor: 'rgba(0, 0, 0, 0.35)',
                          backdropFilter: 'blur(8px)',
                          padding: '4px 12px',
                          borderRadius: '6px',
                          display: 'inline-block',
                        }}
                      >
                        {dest.specs}
                      </span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .dest-asym-card,
          .destination-card {
            grid-column: span 12 !important;
            height: 380px !important;
          }
        }
      `}</style>
    </section>
  );
};

export default DestinationGrid;
