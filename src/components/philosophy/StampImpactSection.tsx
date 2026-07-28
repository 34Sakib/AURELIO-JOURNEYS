import React, { useEffect, useState, useRef } from 'react';
import { useInView, useReducedMotion, animate, motion } from 'framer-motion';
import { ArrowRight, PhoneCall } from 'lucide-react';
import { Reveal } from '../common/Reveal';

interface StampCounterProps {
  targetValue: number;
  decimals?: number;
  suffix?: string;
  label: string;
  bgStyle: string;
  textColor: string;
  dividerColor: string;
  labelColor: string;
  delay?: number;
}

const LiveStampCard: React.FC<StampCounterProps> = ({
  targetValue,
  decimals = 0,
  suffix = '',
  label,
  bgStyle,
  textColor,
  dividerColor,
  labelColor,
  delay = 0,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-40px' });
  const shouldReduceMotion = useReducedMotion();
  const [currentVal, setCurrentVal] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (shouldReduceMotion) {
      setCurrentVal(targetValue);
      return;
    }
    if (isInView) {
      const controls = animate(0, targetValue, {
        duration: 1.8,
        delay,
        ease: [0.22, 1, 0.36, 1], // ease-out-expo
        onUpdate: (latest) => setCurrentVal(latest),
      });
      return () => controls.stop();
    }
  }, [isInView, targetValue, delay, shouldReduceMotion]);

  const formattedNumber = currentVal.toFixed(decimals);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        position: 'relative',
        width: '100%',
        minWidth: '220px',
        height: '320px',
        background: bgStyle,
        borderRadius: '24px',
        padding: '32px 24px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        boxShadow: isHovered
          ? '0 24px 56px rgba(0, 0, 0, 0.35)'
          : '0 12px 32px rgba(0, 0, 0, 0.2)',
        transform: isHovered ? 'translateY(-8px) scale(1.02)' : 'translateY(0) scale(1)',
        transition: 'transform 350ms cubic-bezier(0.22, 1, 0.36, 1), box-shadow 350ms ease',
        cursor: 'pointer',
        WebkitMaskImage: `radial-gradient(circle 8px at 0 0, transparent 8px, black 9px), radial-gradient(circle 8px at 100% 0, transparent 8px, black 9px), radial-gradient(circle 8px at 0 100%, transparent 8px, black 9px), radial-gradient(circle 8px at 100% 100%, transparent 8px, black 9px)`,
      }}
    >
      {/* Top & Bottom Scalloped Stamp Edge Accents */}
      <div
        style={{
          position: 'absolute',
          top: '-6px',
          left: '20px',
          right: '20px',
          display: 'flex',
          justifyContent: 'space-between',
          pointerEvents: 'none',
        }}
      >
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            style={{
              width: '12px',
              height: '12px',
              borderRadius: '50%',
              backgroundColor: '#1A1B18',
            }}
          />
        ))}
      </div>

      <div
        style={{
          position: 'absolute',
          bottom: '-6px',
          left: '20px',
          right: '20px',
          display: 'flex',
          justifyContent: 'space-between',
          pointerEvents: 'none',
        }}
      >
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            style={{
              width: '12px',
              height: '12px',
              borderRadius: '50%',
              backgroundColor: '#1A1B18',
            }}
          />
        ))}
      </div>

      {/* Top Live Animated Number */}
      <div style={{ marginTop: '12px' }}>
        <span
          style={{
            fontFamily: 'Fraunces, serif',
            fontSize: '56px',
            fontWeight: 400,
            color: textColor,
            lineHeight: 1,
            display: 'block',
            letterSpacing: '-0.02em',
          }}
        >
          {formattedNumber}
          {suffix}
        </span>
      </div>

      {/* Bottom Label & Hairline Divider */}
      <div>
        <hr
          style={{
            border: 'none',
            height: '1px',
            backgroundColor: dividerColor,
            marginBottom: '16px',
          }}
        />

        <span
          style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: '11px',
            fontWeight: 700,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: labelColor,
            lineHeight: 1.4,
            display: 'block',
          }}
        >
          {label}
        </span>
      </div>
    </motion.div>
  );
};

interface StampImpactSectionProps {
  onOpenConcierge?: () => void;
}

export const StampImpactSection: React.FC<StampImpactSectionProps> = ({ onOpenConcierge }) => {
  return (
    <section
      style={{
        position: 'relative',
        padding: 'clamp(64px, 10vw, 128px) 24px',
        backgroundImage: 'url("https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=2000&auto=format&fit=crop")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        color: '#FAF7F1',
        overflow: 'hidden',
      }}
    >
      {/* Dark Oceanic Overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(180deg, rgba(26,27,24,0.75) 0%, rgba(23,61,58,0.85) 50%, rgba(26,27,24,0.95) 100%)',
          zIndex: 1,
        }}
      />

      <div
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          position: 'relative',
          zIndex: 2,
          display: 'grid',
          gridTemplateColumns: '1fr 1.3fr',
          gap: '64px',
          alignItems: 'center',
        }}
        className="stamp-impact-grid"
      >
        {/* Left Column: Social Proof, Narrative & CTA */}
        <div>
          <Reveal>
            {/* Traveler / Designer Avatar Stack */}
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '14px',
                backgroundColor: 'rgba(250, 247, 241, 0.12)',
                backdropFilter: 'blur(12px)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                padding: '8px 18px',
                borderRadius: '999px',
                marginBottom: '28px',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center' }}>
                {[
                  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop',
                  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop',
                  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop',
                ].map((img, i) => (
                  <img
                    key={i}
                    src={img}
                    alt="Traveler"
                    style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      objectFit: 'cover',
                      border: '2px solid #1A1B18',
                      marginLeft: i > 0 ? '-10px' : 0,
                    }}
                  />
                ))}
              </div>

              <span
                style={{
                  fontFamily: 'Fraunces, serif',
                  fontSize: '15px',
                  fontWeight: 500,
                  color: '#FAF7F1',
                }}
              >
                10,000+ Happy Travelers Served
              </span>
            </div>

            <span className="label-eyebrow" style={{ color: '#C9A15E', display: 'block', marginBottom: '12px' }}>
              PROVEN TRAVEL AGENCY EXCELLENCE
            </span>

            <h2 className="display-lg" style={{ color: '#FFFFFF', marginBottom: '20px', lineHeight: 1.1 }}>
              Unforgettable Holiday Tours & Seamless Travel Booking.
            </h2>

            <p
              className="body-lg"
              style={{
                color: 'rgba(250, 247, 241, 0.85)',
                marginBottom: '36px',
                fontSize: '18px',
                lineHeight: 1.6,
              }}
            >
              Explore breathtaking volcanic sanctuaries, coastal fjords, and private temple illuminations with dedicated travel designers available 24/7.
            </p>

            <button
              onClick={onOpenConcierge}
              className="btn-primary"
              style={{
                padding: '16px 32px',
                fontSize: '16px',
                backgroundColor: '#B5643D',
                boxShadow: '0 8px 24px rgba(181, 100, 61, 0.4)',
              }}
            >
              <PhoneCall size={18} />
              <span>Design My Trip</span>
              <ArrowRight size={16} />
            </button>
          </Reveal>
        </div>

        {/* Right Column: 3 Scalloped Stamp Cards with Live Count-Up Data */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '24px',
          }}
        >
          {/* STAMP 1: TERRACOTTA ACCENT */}
          <LiveStampCard
            targetValue={180}
            suffix="+"
            label="Curated Expeditions Worldwide"
            bgStyle="#B5643D"
            textColor="#FAF7F1"
            dividerColor="rgba(250, 247, 241, 0.3)"
            labelColor="#FAF7F1"
            delay={0.1}
          />

          {/* STAMP 2: DEEP TEAL SANCTUARY */}
          <LiveStampCard
            targetValue={99.4}
            decimals={1}
            suffix="%"
            label="Flawless Execution Record"
            bgStyle="#173D3A"
            textColor="#FAF7F1"
            dividerColor="rgba(255, 255, 255, 0.2)"
            labelColor="#C9A15E"
            delay={0.25}
          />

          {/* STAMP 3: WARM SAND ELEGANCE */}
          <LiveStampCard
            targetValue={15}
            suffix="+ YRS"
            label="Monastic & Heritage Partnerships"
            bgStyle="#FAF7F1"
            textColor="#1A1B18"
            dividerColor="#E4DCC8"
            labelColor="#B5643D"
            delay={0.4}
          />
        </div>
      </div>

      <style>{`
        @media (max-width: 960px) {
          .stamp-impact-grid {
            grid-template-columns: 1fr !important;
            gap: 48px !important;
          }
        }
      `}</style>
    </section>
  );
};

export default StampImpactSection;
