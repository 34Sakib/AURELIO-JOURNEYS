import React, { useState } from 'react';
import { useParams, Link, Navigate, useNavigate } from 'react-router-dom';
import { getDestinationBySlug, JOURNEYS_DATA, Journey } from '../data/journeysData';
import { Reveal } from '../components/common/Reveal';
import { JourneyCard } from '../components/journeys/JourneyCard';
import { ArrowLeft, Calendar, Clock, Globe, Languages, Sparkles, PhoneCall, X, MapPin } from 'lucide-react';

interface DestinationDetailPageProps {
  shortlist?: Journey[];
  onToggleShortlist?: (journey: Journey) => void;
}

export const DestinationDetailPage: React.FC<DestinationDetailPageProps> = ({
  shortlist = [],
  onToggleShortlist = () => {},
}) => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [selectedLightboxImg, setSelectedLightboxImg] = useState<string | null>(null);

  const destination = getDestinationBySlug(slug || '');

  if (!destination) {
    return <Navigate to="/404" replace />;
  }

  const relatedJourneys = JOURNEYS_DATA.filter((j) => j.destinationSlug === destination.slug || destination.relatedJourneyIds.includes(j.id));

  return (
    <div style={{ paddingTop: '86px', paddingBottom: '80px', backgroundColor: '#FAF7F1' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>
        
        {/* Breadcrumb Navigation */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
          <Link
            to="/destinations"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              color: '#5C5D54',
              fontSize: '13px',
              fontFamily: 'Inter, sans-serif',
              textDecoration: 'none',
              transition: 'color 200ms ease',
            }}
          >
            <ArrowLeft size={15} />
            <span>Return to All Destinations</span>
          </Link>

          <span
            style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '11px',
              fontWeight: 600,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: '#B5643D',
            }}
          >
            {destination.country} • {destination.region}
          </span>
        </div>

        {/* 1. Sleek Compact Hero Image Banner (Height 180px - Non-Blocking!) */}
        <Reveal>
          <div
            style={{
              position: 'relative',
              height: '180px',
              borderRadius: '16px',
              overflow: 'hidden',
              marginBottom: '20px',
              boxShadow: '0 8px 24px rgba(26, 27, 24, 0.08)',
              border: '1px solid #E4DCC8',
            }}
          >
            <img
              src={destination.heroImage}
              alt={destination.name}
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
                background: 'linear-gradient(180deg, rgba(26,27,24,0.15) 0%, rgba(26,27,24,0.65) 100%)',
              }}
            />
            <div
              style={{
                position: 'absolute',
                bottom: '16px',
                left: '20px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                color: '#FAF7F1',
              }}
            >
              <MapPin size={16} color="#C9A15E" />
              <span style={{ fontFamily: 'Fraunces, serif', fontSize: '20px', fontWeight: 500 }}>
                {destination.name} Sanctuary Monograph
              </span>
            </div>
          </div>
        </Reveal>

        {/* 2. Destination Title & Hook Narrative (STARTS AFTER COMPACT IMAGE!) */}
        <Reveal delay={0.1}>
          <div style={{ marginBottom: '20px' }}>
            <h1 className="display-lg" style={{ color: '#1A1B18', marginBottom: '8px', fontSize: '32px' }}>
              {destination.name}
            </h1>
            <p className="body-lg" style={{ color: '#5C5D54', maxWidth: '820px', fontSize: '16px' }}>
              {destination.hook}
            </p>
          </div>
        </Reveal>

        {/* 3. Fact Chips Overview Strip */}
        <Reveal delay={0.15}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '16px',
              backgroundColor: '#F1ECE1',
              padding: '16px 20px',
              borderRadius: '12px',
              border: '1px solid #E4DCC8',
              marginBottom: '32px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Calendar size={18} color="#B5643D" />
              <div>
                <span style={{ fontSize: '10px', color: '#8C8D80', display: 'block', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Optimal Season</span>
                <span style={{ fontWeight: 600, fontSize: '13px', color: '#1A1B18' }}>{destination.bestTimeToVisit}</span>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Clock size={18} color="#B5643D" />
              <div>
                <span style={{ fontSize: '10px', color: '#8C8D80', display: 'block', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Recommended Duration</span>
                <span style={{ fontWeight: 600, fontSize: '13px', color: '#1A1B18' }}>{destination.durationRange}</span>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Globe size={18} color="#B5643D" />
              <div>
                <span style={{ fontSize: '10px', color: '#8C8D80', display: 'block', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Time Zone</span>
                <span style={{ fontWeight: 600, fontSize: '13px', color: '#1A1B18' }}>{destination.timeZone}</span>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Languages size={18} color="#B5643D" />
              <div>
                <span style={{ fontSize: '10px', color: '#8C8D80', display: 'block', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Language</span>
                <span style={{ fontWeight: 600, fontSize: '13px', color: '#1A1B18' }}>{destination.language}</span>
              </div>
            </div>
          </div>
        </Reveal>

        {/* 4. Main Content & Sticky Sidebar Container */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: '40px', alignItems: 'start' }} className="dest-detail-grid">
          
          {/* Main Editorial Column */}
          <div>
            {/* Editorial Intro Narrative */}
            <Reveal delay={0.2}>
              <div style={{ marginBottom: '40px' }}>
                <span className="label-eyebrow" style={{ color: '#B5643D', marginBottom: '4px', display: 'block' }}>
                  ESSENCE OF {destination.name.toUpperCase()}
                </span>
                <h2 className="display-md" style={{ color: '#1A1B18', marginBottom: '16px', fontSize: '26px' }}>
                  An Unhurried Perspective
                </h2>
                {destination.overview.map((paragraph, idx) => (
                  <p key={idx} className="body-lg" style={{ lineHeight: 1.65, marginBottom: '16px', color: '#33342F', fontSize: '15px' }}>
                    {paragraph}
                  </p>
                ))}
              </div>
            </Reveal>

            {/* Signature Experiences List */}
            <Reveal delay={0.25}>
              <div style={{ marginBottom: '40px' }}>
                <h3 style={{ fontFamily: 'Fraunces, serif', fontSize: '24px', color: '#1A1B18', marginBottom: '20px' }}>
                  Curated Signature Experiences
                </h3>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px' }}>
                  {destination.signatureExperiences.map((exp, idx) => (
                    <div
                      key={idx}
                      style={{
                        backgroundColor: '#FFFFFF',
                        border: '1px solid #E4DCC8',
                        borderRadius: '14px',
                        padding: '20px',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
                      }}
                    >
                      <Sparkles size={18} color="#B5643D" style={{ marginBottom: '10px' }} />
                      <h4 style={{ fontFamily: 'Fraunces, serif', fontSize: '17px', color: '#1A1B18', marginBottom: '6px' }}>
                        {exp.title}
                      </h4>
                      <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '13px', color: '#5C5D54', lineHeight: 1.5 }}>
                        {exp.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>

            {/* Photo Lightbox Gallery (Visual Monograph) */}
            <Reveal delay={0.3}>
              <div style={{ marginBottom: '40px' }}>
                <h3 style={{ fontFamily: 'Fraunces, serif', fontSize: '24px', color: '#1A1B18', marginBottom: '16px' }}>
                  Visual Monograph
                </h3>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
                  {destination.gallery.map((imgUrl, i) => (
                    <div
                      key={i}
                      onClick={() => setSelectedLightboxImg(imgUrl)}
                      style={{
                        height: '140px',
                        borderRadius: '12px',
                        overflow: 'hidden',
                        cursor: 'pointer',
                        border: '1px solid #E4DCC8',
                      }}
                    >
                      <img
                        src={imgUrl}
                        alt="Gallery"
                        style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 400ms ease' }}
                        className="gallery-thumb"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>

            {/* Related Journeys */}
            {relatedJourneys.length > 0 && (
              <Reveal delay={0.35}>
                <div>
                  <h3 style={{ fontFamily: 'Fraunces, serif', fontSize: '24px', color: '#1A1B18', marginBottom: '20px' }}>
                    Curated Expeditions to {destination.name}
                  </h3>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
                    {relatedJourneys.map((j) => (
                      <JourneyCard
                        key={j.id}
                        journey={j}
                        isShortlisted={shortlist.some((s) => s.id === j.id)}
                        onToggleShortlist={onToggleShortlist}
                        onOpenDetail={() => navigate(`/journeys/${j.slug || j.id}`)}
                      />
                    ))}
                  </div>
                </div>
              </Reveal>
            )}
          </div>

          {/* Sticky Enquire Sidebar Widget */}
          <aside>
            <div
              style={{
                position: 'sticky',
                top: '100px',
                backgroundColor: '#173D3A',
                color: '#FAF7F1',
                borderRadius: '18px',
                padding: '28px 20px',
                boxShadow: '0 12px 36px rgba(0, 0, 0, 0.14)',
              }}
            >
              <span style={{ fontSize: '10px', fontFamily: 'Inter, sans-serif', fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#C9A15E', display: 'block', marginBottom: '6px' }}>
                PRIVATE CONSULTATION
              </span>

              <h3 style={{ fontFamily: 'Fraunces, serif', fontSize: '22px', marginBottom: '10px', lineHeight: 1.2 }}>
                Design a Journey to {destination.name}
              </h3>

              <p style={{ fontSize: '13px', color: '#C7C4B4', lineHeight: 1.5, marginBottom: '20px' }}>
                Our travel designers will craft a custom itinerary around your timing, preferences, and companions.
              </p>

              <button
                onClick={() => navigate(`/enquire?destination=${encodeURIComponent(destination.slug)}`)}
                className="btn-primary"
                style={{ width: '100%', justifyContent: 'center', padding: '12px', borderRadius: '999px', fontSize: '14px' }}
              >
                <PhoneCall size={15} />
                <span>Enquire About {destination.name}</span>
              </button>

              <hr style={{ border: 'none', height: '1px', backgroundColor: 'rgba(255,255,255,0.12)', margin: '16px 0' }} />

              <div style={{ fontSize: '11px', color: '#C7C4B4', lineHeight: 1.5 }}>
                ✓ Dedicated Concierge assigned within 4 hours<br />
                ✓ Private Villa & Helipad access guarantee
              </div>
            </div>
          </aside>
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedLightboxImg && (
        <div
          onClick={() => setSelectedLightboxImg(null)}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 99999,
            backgroundColor: 'rgba(26,27,24,0.9)',
            backdropFilter: 'blur(12px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '32px',
          }}
        >
          <button
            onClick={() => setSelectedLightboxImg(null)}
            style={{ position: 'absolute', top: '24px', right: '24px', background: 'none', border: 'none', color: '#FFFFFF', cursor: 'pointer' }}
          >
            <X size={32} />
          </button>
          <img src={selectedLightboxImg} alt="Enlarged gallery view" style={{ maxWidth: '90vw', maxHeight: '85vh', borderRadius: '12px', objectFit: 'contain' }} />
        </div>
      )}

      <style>{`
        .gallery-thumb:hover {
          transform: scale(1.05);
        }
        @media (max-width: 960px) {
          .dest-detail-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
};

export default DestinationDetailPage;
