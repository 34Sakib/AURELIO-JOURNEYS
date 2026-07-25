import React from 'react';
import { PhilosophySection } from '../components/philosophy/PhilosophySection';
import { Reveal } from '../components/common/Reveal';
import { Sparkles, HeartHandshake, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const PhilosophyPage: React.FC = () => {
  return (
    <div style={{ paddingTop: '120px', paddingBottom: '96px', backgroundColor: '#FAF7F1' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>
        {/* Page Hero Header */}
        <Reveal>
          <div style={{ textAlign: 'center', maxWidth: '760px', margin: '0 auto 56px' }}>
            <span className="label-eyebrow">ABOUT OUR TOUR & TRAVEL AGENCY</span>
            <h1 className="display-lg" style={{ color: '#1A1B18', marginBottom: '20px' }}>
              Crafting Unforgettable Journeys Since 2011
            </h1>
            <p className="body-lg" style={{ color: '#5C5D54', fontSize: '18px', lineHeight: 1.7 }}>
              We are a full-service tour & travel agency dedicated to creating seamless holiday expeditions, custom vacation packages, and authentic cultural tours across 6 continents.
            </p>
          </div>
        </Reveal>

        {/* Agency Story Showcase Box with Image */}
        <Reveal delay={0.1}>
          <div
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '24px',
              border: '1px solid #E4DCC8',
              overflow: 'hidden',
              boxShadow: '0 16px 40px rgba(26, 27, 24, 0.06)',
              marginBottom: '64px',
            }}
          >
            <div className="about-story-grid">
              {/* Left Column: Mission & Story */}
              <div
                style={{
                  padding: '48px',
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
                    Our Agency Mission
                  </span>
                </div>

                <h2
                  className="display-md"
                  style={{ color: '#1A1B18', marginBottom: '20px', fontSize: '32px', lineHeight: 1.25 }}
                >
                  Personalized Care in Every Tour We Craft
                </h2>

                <p
                  className="body-md"
                  style={{ color: '#5C5D54', marginBottom: '20px', lineHeight: 1.7, fontSize: '15px' }}
                >
                  Founded over a decade ago, our agency was built on a simple promise: to eliminate travel stress and deliver extraordinary, tailor-made holiday experiences. From flight reservations and hotel suites to local guided excursions, our team takes care of every detail.
                </p>

                <p
                  className="body-md"
                  style={{ color: '#5C5D54', marginBottom: '28px', lineHeight: 1.7, fontSize: '15px' }}
                >
                  Whether you are planning a romantic honeymoon, a family vacation, or a group adventure, our dedicated travel advisors provide 24/7 support and guaranteed best rates.
                </p>

                <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                  <Link to="/enquire" className="btn-primary" style={{ padding: '14px 28px', fontSize: '14px' }}>
                    <span>Plan Your Vacation</span>
                    <ArrowRight size={16} />
                  </Link>

                  <Link to="/destinations" className="btn-secondary" style={{ padding: '14px 28px', fontSize: '14px' }}>
                    <span>View Destinations</span>
                  </Link>
                </div>
              </div>

              {/* Right Column: High Quality Travel Showcase Image */}
              <div style={{ position: 'relative', minHeight: '420px' }}>
                <img
                  src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?q=80&w=1200&auto=format&fit=crop"
                  alt="Travel Agency Team Experience"
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
                    background: 'linear-gradient(180deg, transparent 40%, rgba(26,27,24,0.65) 100%)',
                  }}
                />

                {/* Floating Badge overlay */}
                <div
                  style={{
                    position: 'absolute',
                    bottom: '24px',
                    left: '24px',
                    right: '24px',
                    backgroundColor: 'rgba(255, 255, 255, 0.94)',
                    backdropFilter: 'blur(12px)',
                    padding: '16px 20px',
                    borderRadius: '16px',
                    boxShadow: '0 8px 32px rgba(0,0,0,0.18)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                  }}
                >
                  <HeartHandshake size={24} color="#B5643D" />
                  <div>
                    <span style={{ display: 'block', fontSize: '14px', fontWeight: 700, color: '#1A1B18' }}>100% Satisfaction Guarantee</span>
                    <span style={{ fontSize: '11px', color: '#5C5D54' }}>Trusted by over 10,000+ happy travelers worldwide</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        {/* 4 Pillars & Agency Value Section (Light Sand Theme) */}
        <PhilosophySection isDark={false} />
      </div>

      <style>{`
        .about-story-grid {
          display: grid;
          grid-template-columns: 1.1fr 0.9fr;
        }
        @media (max-width: 900px) {
          .about-story-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
};

export default PhilosophyPage;
