import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { HeroSearchBar, SearchValues } from './HeroSearchBar';
import { ArrowDown, Sparkles, Send, ArrowRight, Heart } from 'lucide-react';

interface HeroProps {
  onSearch: (filters: { destination: string; style: string; travelers: number }) => void;
  onOpenConcierge: () => void;
  onScrollNext: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onSearch, onOpenConcierge, onScrollNext }) => {
  const navigate = useNavigate();
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrollY(window.scrollY);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearchBarSubmit = (values: SearchValues) => {
    onSearch({
      destination: values.destination === 'All Sanctuaries' ? 'All Regions' : values.destination.split(',')[0],
      style: values.activity === 'All Experiences' ? 'All Styles' : values.activity,
      travelers: values.adults + values.childrenCount,
    });
  };

  // Parallax calculations based on scroll
  const polaroidTopY = scrollY * -0.32;
  const polaroidBottomY = scrollY * -0.18;
  const planeY = scrollY * -0.45;
  const planeX = scrollY * 0.25;

  return (
    <section
      id="hero"
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        paddingTop: '130px',
        paddingBottom: '40px',
        zIndex: 20,
        overflow: 'hidden',
        background: 'linear-gradient(145deg, #0e2925 0%, #16403a 30%, #bf5927 75%, #e8732a 100%)',
      }}
    >
      {/* Dynamic Background Image & Color Grade Overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          zIndex: 1,
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: 'url("https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=2000&auto=format&fit=crop")',
            backgroundSize: 'cover',
            backgroundPosition: 'center 40%',
            opacity: 0.38,
            mixBlendMode: 'overlay',
            transform: `scale(1.05) translateY(${scrollY * 0.1}px)`,
            transition: 'transform 100ms ease-out',
          }}
        />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'radial-gradient(circle at 75% 35%, rgba(232, 115, 42, 0.45) 0%, rgba(22, 64, 58, 0.85) 60%, rgba(14, 41, 37, 0.95) 100%)',
          }}
        />
      </div>

      {/* Main Content & Visual Canvas Container */}
      <div
        style={{
          position: 'relative',
          zIndex: 10,
          maxWidth: '1340px',
          margin: '0 auto',
          padding: '0 24px',
          width: '100%',
        }}
      >
        <div className="hero-layout-grid">
          {/* LEFT SIDE: Dynamic Interactive Floating Polaroids + Paper Plane + Typography */}
          <div
            style={{
              position: 'relative',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
            }}
          >
            {/* PAPER PLANE & TRAJECTORY PATH (Left side flight path) */}
            <div
              style={{
                position: 'absolute',
                top: '-40px',
                left: '-20px',
                width: '320px',
                height: '240px',
                pointerEvents: 'none',
                zIndex: 25,
                transform: `translate(${planeX}px, ${planeY}px)`,
                transition: 'transform 120ms cubic-bezier(0.1, 0.8, 0.3, 1)',
              }}
            >
              {/* Dashed Flight Trajectory Arc */}
              <svg
                width="280"
                height="180"
                viewBox="0 0 280 180"
                fill="none"
                style={{ position: 'absolute', top: 0, left: 0, overflow: 'visible' }}
              >
                <path
                  d="M 10 140 C 60 40, 180 20, 260 90"
                  stroke="rgba(255, 255, 255, 0.75)"
                  strokeWidth="2.5"
                  strokeDasharray="6 6"
                  className="animate-dash-flight"
                />
              </svg>

              {/* Floating Paper Plane Icon */}
              <div
                style={{
                  position: 'absolute',
                  top: '12px',
                  left: '18px',
                  transform: 'rotate(-24deg)',
                  filter: 'drop-shadow(0 8px 16px rgba(0,0,0,0.4))',
                }}
                className="animate-float-slow"
              >
                <div
                  style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                    color: '#E8732A',
                    padding: '10px',
                    borderRadius: '50%',
                    boxShadow: '0 8px 20px rgba(0, 0, 0, 0.3), 0 0 0 4px rgba(255, 255, 255, 0.25)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Send size={22} style={{ transform: 'rotate(45deg) translate(-2px, 2px)' }} />
                </div>
              </div>
            </div>

            {/* FLOATING POLAROID CARDS (LEFT SIDE PARALLAX ON SCROLL) */}
            <div
              style={{
                position: 'relative',
                minHeight: '440px',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              {/* POLAROID 1 (TOP TILTED PHOTO CARD) - Moves on scroll */}
              <div
                className="hero-polaroid"
                style={{
                  position: 'absolute',
                  top: '-10px',
                  left: '-10px',
                  width: '230px',
                  height: '260px',
                  zIndex: 18,
                  transform: `translateY(${polaroidTopY}px) rotate(-11deg)`,
                  transition: 'transform 100ms ease-out',
                }}
              >
                <img
                  src="https://images.unsplash.com/photo-1527631746610-bca00a040d60?q=80&w=600&auto=format&fit=crop"
                  alt="Travel Exploration"
                />
                <div
                  style={{
                    position: 'absolute',
                    bottom: '6px',
                    left: '12px',
                    right: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <span
                    className="font-script"
                    style={{ fontSize: '15px', color: '#333', fontWeight: 700 }}
                  >
                    Santorini Island Tour
                  </span>
                  <span style={{ fontSize: '10px', color: '#888', fontWeight: 600 }}>★ 4.9</span>
                </div>
              </div>

              {/* POLAROID 2 (BOTTOM STACKED PHOTO CARD) - Moves on scroll in sync/parallax */}
              <div
                className="hero-polaroid"
                style={{
                  position: 'absolute',
                  top: '180px',
                  left: '-25px',
                  width: '240px',
                  height: '270px',
                  zIndex: 16,
                  transform: `translateY(${polaroidBottomY}px) rotate(9deg)`,
                  transition: 'transform 100ms ease-out',
                }}
              >
                <img
                  src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?q=80&w=600&auto=format&fit=crop"
                  alt="Swiss Alps Expedition"
                />
                <div
                  style={{
                    position: 'absolute',
                    bottom: '6px',
                    left: '12px',
                    right: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <span
                    className="font-script"
                    style={{ fontSize: '15px', color: '#333', fontWeight: 700 }}
                  >
                    Swiss Alps Trek
                  </span>
                  <span style={{ fontSize: '10px', color: '#888', fontWeight: 600 }}>Tour Package</span>
                </div>
              </div>

              {/* MAIN HERO TYPOGRAPHY CONTENT (Positioned alongside & over cards) */}
              <div
                className="hero-content-shifted"
                style={{
                  position: 'relative',
                  zIndex: 22,
                }}
              >
                {/* Collection Pill Badge */}
                <div
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    backgroundColor: 'rgba(255, 255, 255, 0.15)',
                    border: '1px solid rgba(255, 255, 255, 0.3)',
                    padding: '6px 16px',
                    borderRadius: '999px',
                    marginBottom: '16px',
                    backdropFilter: 'blur(12px)',
                    boxShadow: '0 4px 15px rgba(0,0,0,0.15)',
                  }}
                >
                  <Sparkles size={14} color="#FFB067" />
                  <span
                    style={{
                      fontFamily: 'Inter, sans-serif',
                      fontSize: '11px',
                      fontWeight: 700,
                      letterSpacing: '0.16em',
                      textTransform: 'uppercase',
                      color: '#FFF8F0',
                    }}
                  >
                    Premier Tour & Travel Agency
                  </span>
                </div>

                {/* Handwritten Accent Text "It's Time To" */}
                <div>
                  <span
                    className="font-script"
                    style={{
                      fontSize: 'clamp(42px, 5.5vw, 68px)',
                      color: '#FF9E2A',
                      fontWeight: 700,
                      lineHeight: 0.9,
                      display: 'block',
                      textShadow: '0 2px 10px rgba(0,0,0,0.4)',
                      transform: 'rotate(-2deg)',
                      transformOrigin: 'left center',
                    }}
                  >
                    It's Time To
                  </span>
                </div>

                {/* Main High-Impact Display Headline "TRAVEL EXPLORE" */}
                <h1
                  className="font-bebas"
                  style={{
                    fontSize: 'clamp(64px, 9.5vw, 128px)',
                    color: '#FFFFFF',
                    lineHeight: 0.88,
                    letterSpacing: '0.04em',
                    textTransform: 'uppercase',
                    margin: '4px 0 8px 0',
                    textShadow: '0 10px 30px rgba(0,0,0,0.45)',
                    background: 'linear-gradient(180deg, #FFFFFF 40%, #FFEBE0 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  TRAVEL EXPLORE
                </h1>

                {/* Sub-headline Text "THE WORLD WITH US!" */}
                <div
                  style={{
                    fontFamily: 'Plus Jakarta Sans, sans-serif',
                    fontSize: 'clamp(14px, 2.2vw, 22px)',
                    fontWeight: 800,
                    letterSpacing: '0.24em',
                    color: 'rgba(255, 255, 255, 0.95)',
                    textTransform: 'uppercase',
                    marginBottom: '20px',
                    textShadow: '0 2px 8px rgba(0,0,0,0.3)',
                  }}
                >
                  THE WORLD WITH US!
                </div>

                {/* Body Description */}
                <p
                  style={{
                    fontSize: '16px',
                    color: 'rgba(255, 255, 255, 0.88)',
                    maxWidth: '480px',
                    lineHeight: 1.6,
                    marginBottom: '32px',
                    fontWeight: 400,
                    textShadow: '0 1px 4px rgba(0,0,0,0.3)',
                  }}
                >
                  Book curated tour packages, flight deals, luxury resort stays, and custom holiday expeditions with our expert travel agents.
                </p>

                {/* Action Buttons: Vibrant Orange Pill CTA */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '16px',
                    flexWrap: 'wrap',
                  }}
                >
                  <button
                    onClick={() => onScrollNext()}
                    className="btn-orange-pill"
                    data-cursor="Explore"
                  >
                    <span>Book Tour Now</span>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <ArrowRight size={18} />
                      <ArrowRight size={18} style={{ marginLeft: '-10px', opacity: 0.7 }} />
                    </div>
                  </button>

                  <button
                    onClick={() => {
                      if (onOpenConcierge) onOpenConcierge();
                      navigate('/enquire');
                    }}
                    className="btn-secondary-dark"
                    style={{
                      padding: '16px 28px',
                      fontSize: '15px',
                      borderRadius: '9999px',
                      borderColor: 'rgba(255, 255, 255, 0.4)',
                      backdropFilter: 'blur(8px)',
                      cursor: 'pointer',
                    }}
                  >
                    <span>Plan Custom Trip</span>
                  </button>
                </div>

                {/* Bottom Handwritten Sketch Note/Badge */}
                <div
                  style={{
                    marginTop: '32px',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '10px',
                    opacity: 0.85,
                  }}
                >
                  <div
                    style={{
                      width: '42px',
                      height: '42px',
                      borderRadius: '50%',
                      border: '1.5px dashed rgba(255, 255, 255, 0.6)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      transform: 'rotate(-12deg)',
                    }}
                  >
                    <Sparkles size={18} color="#FF9E2A" />
                  </div>
                  <span
                    className="font-script"
                    style={{
                      fontSize: '20px',
                      color: 'rgba(255, 255, 255, 0.9)',
                      letterSpacing: '0.05em',
                      textShadow: '0 1px 3px rgba(0,0,0,0.3)',
                    }}
                  >
                    Trusted by 10,000+ happy travelers worldwide
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE: 3D Airplane Window Portal with Coastal Paradise & Floating Elements */}
          <div
            style={{
              position: 'relative',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <div
              style={{
                position: 'relative',
                width: '100%',
                maxWidth: '440px',
                height: '520px',
              }}
            >
              {/* Airplane Window Frame Portal */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  borderRadius: '160px 160px 160px 160px',
                  background: 'linear-gradient(135deg, #ffffff 0%, #e0e0e0 40%, #a8a8a8 100%)',
                  padding: '18px',
                  boxShadow: 
                    '0 30px 60px -10px rgba(0, 0, 0, 0.5), inset 0 2px 6px rgba(255, 255, 255, 0.9), inset 0 -6px 12px rgba(0, 0, 0, 0.3)',
                  overflow: 'hidden',
                }}
              >
                {/* Inner Window Glass View */}
                <div
                  style={{
                    position: 'relative',
                    width: '100%',
                    height: '100%',
                    borderRadius: '142px',
                    overflow: 'hidden',
                    boxShadow: 'inset 0 10px 30px rgba(0,0,0,0.6)',
                  }}
                >
                  <img
                    src="https://images.unsplash.com/photo-1506929562872-bb421503ef21?q=80&w=1200&auto=format&fit=crop"
                    alt="Sanctuary Window View"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      transform: `scale(1.08) translateY(${scrollY * 0.08}px)`,
                      transition: 'transform 100ms ease-out',
                    }}
                  />
                  {/* Glass Reflection Highlight */}
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'linear-gradient(135deg, rgba(255,255,255,0.35) 0%, rgba(255,255,255,0) 45%, rgba(0,0,0,0.2) 100%)',
                      pointerEvents: 'none',
                    }}
                  />
                </div>
              </div>

              {/* Floating 3D Glossy Red Heart */}
              <div
                style={{
                  position: 'absolute',
                  top: '40%',
                  left: '-30px',
                  width: '64px',
                  height: '64px',
                  borderRadius: '50%',
                  background: 'radial-gradient(circle at 35% 35%, #FF5252, #D32F2F, #8E0000)',
                  boxShadow: '0 12px 28px rgba(211, 47, 47, 0.5), inset -2px -4px 8px rgba(0,0,0,0.4), inset 2px 4px 6px rgba(255,255,255,0.6)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  zIndex: 25,
                  transform: `translateY(${scrollY * -0.15}px)`,
                  transition: 'transform 100ms ease-out',
                }}
                className="animate-float-slow"
              >
                <Heart fill="#FFFFFF" color="#FFFFFF" size={28} />
              </div>

              {/* Floating 3D Glossy Blue Heart */}
              <div
                style={{
                  position: 'absolute',
                  bottom: '10%',
                  right: '-20px',
                  width: '54px',
                  height: '54px',
                  borderRadius: '50%',
                  background: 'radial-gradient(circle at 35% 35%, #00E5FF, #0091EA, #01579B)',
                  boxShadow: '0 10px 24px rgba(0, 145, 234, 0.5), inset -2px -4px 8px rgba(0,0,0,0.4), inset 2px 4px 6px rgba(255,255,255,0.6)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  zIndex: 25,
                  transform: `translateY(${scrollY * -0.2}px)`,
                  transition: 'transform 100ms ease-out',
                }}
                className="animate-float-reverse"
              >
                <Heart fill="#FFFFFF" color="#FFFFFF" size={24} />
              </div>

              {/* Floating Cloud element */}
              <div
                style={{
                  position: 'absolute',
                  bottom: '25%',
                  left: '-40px',
                  background: 'rgba(255, 255, 255, 0.88)',
                  backdropFilter: 'blur(10px)',
                  padding: '12px 20px',
                  borderRadius: '30px',
                  boxShadow: '0 12px 30px rgba(0,0,0,0.25)',
                  fontSize: '12px',
                  fontWeight: 700,
                  color: '#16403a',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  zIndex: 26,
                  transform: `translateY(${scrollY * -0.1}px)`,
                }}
              >
                <Sparkles size={16} color="#E8732A" />
                <span>500+ Verified Travel Packages</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Hero Search Bar */}
      <div
        style={{
          position: 'relative',
          zIndex: 20,
          width: '100%',
          padding: '0 24px',
          marginTop: '40px',
        }}
      >
        <HeroSearchBar onSearch={handleSearchBarSubmit} />

        <div
          onClick={onScrollNext}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            marginTop: '32px',
            color: 'rgba(255, 255, 255, 0.75)',
            fontSize: '12px',
            fontFamily: 'Inter, sans-serif',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            cursor: 'pointer',
            transition: 'color 200ms ease',
          }}
        >
          <span>Scroll to Experience</span>
          <ArrowDown size={14} />
        </div>
      </div>
    </section>
  );
};

export default Hero;
