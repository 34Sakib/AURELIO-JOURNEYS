import React, { useState } from 'react';
import { Compass, ShieldCheck, Clock, Award } from 'lucide-react';
import { StatCounter } from '../common/StatCounter';
import { Reveal } from '../common/Reveal';
import { motion } from 'framer-motion';

const PILLARS = [
  {
    id: 'authority',
    iconType: 'compass',
    title: 'Expert Travel Advisors',
    subtitle: 'Personalized Planning',
    text: 'Our certified travel specialists assist with flights, luxury hotel bookings, visas, and hand-tailored tour itineraries.',
    badge: 'Expertise 01',
  },
  {
    id: 'pacing',
    iconType: 'clock',
    title: '100% Custom Packages',
    subtitle: 'Tailored Itineraries',
    text: 'Whether a romantic getaway, family vacation, or private group expedition, we design tours to match your exact preferences.',
    badge: 'Custom 02',
  },
  {
    id: 'frictionless',
    iconType: 'shield',
    title: 'Zero Friction Booking',
    subtitle: '24/7 Travel Support',
    text: 'Seamless airport transfers, priority resort check-ins, and 24/7 dedicated support before, during, and after your trip.',
    badge: 'Service 03',
  },
  {
    id: 'stewardship',
    iconType: 'award',
    title: 'Best Value Guarantee',
    subtitle: 'Full Price Transparency',
    text: 'Enjoy exclusive agency partner rates, zero hidden fees, flexible cancellation options, and full financial protection.',
    badge: 'Trust 04',
  },
];

interface PhilosophySectionProps {
  isDark?: boolean;
}

export const PhilosophySection: React.FC<PhilosophySectionProps> = ({ isDark = false }) => {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  const renderIcon = (type: string, isHovered: boolean) => {
    switch (type) {
      case 'compass':
        return (
          <motion.div
            animate={{
              rotate: isHovered ? 45 : 0,
              scale: isHovered ? 1.15 : 1,
            }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            style={{ display: 'inline-block' }}
          >
            <Compass size={28} color={isHovered ? '#B5643D' : '#B5643D'} strokeWidth={1.5} />
          </motion.div>
        );
      case 'clock':
        return (
          <motion.div
            animate={{
              rotate: isHovered ? 180 : 0,
              scale: isHovered ? 1.15 : 1,
            }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            style={{ display: 'inline-block' }}
          >
            <Clock size={28} color={isHovered ? '#B5643D' : '#B5643D'} strokeWidth={1.5} />
          </motion.div>
        );
      case 'shield':
        return (
          <motion.div
            animate={{
              scale: isHovered ? [1, 1.25, 1.15] : 1,
              y: isHovered ? -3 : 0,
            }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            style={{ display: 'inline-block' }}
          >
            <ShieldCheck size={28} color={isHovered ? '#B5643D' : '#B5643D'} strokeWidth={1.5} />
          </motion.div>
        );
      case 'award':
        return (
          <motion.div
            animate={{
              y: isHovered ? [-2, -6, -2] : 0,
              scale: isHovered ? 1.15 : 1,
            }}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
            style={{ display: 'inline-block' }}
          >
            <Award size={28} color={isHovered ? '#B5643D' : '#B5643D'} strokeWidth={1.5} />
          </motion.div>
        );
      default:
        return null;
    }
  };

  return (
    <section
      id="philosophy"
      style={{
        padding: '128px 24px',
        backgroundColor: isDark ? '#1A1B18' : '#FAF7F1',
        color: isDark ? '#FAF7F1' : '#1A1B18',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background Cartographic Watermark Pattern */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          opacity: 0.04,
          backgroundImage: 'radial-gradient(#FAF7F1 1px, transparent 1px)',
          backgroundSize: '32px 32px',
          pointerEvents: 'none',
        }}
      />

      <div
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          position: 'relative',
          zIndex: 2,
        }}
      >
        {/* Section Header */}
        <Reveal>
          <div style={{ textAlign: 'center', maxWidth: '760px', margin: '0 auto 80px' }}>
            <span
              style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '11px',
                fontWeight: 600,
                letterSpacing: '0.16em',
                textTransform: 'uppercase',
                color: '#B5643D',
                display: 'inline-block',
                marginBottom: '16px',
              }}
            >
              WHY CHOOSE OUR TOUR & TRAVEL AGENCY
            </span>

            <h2
              className="display-lg"
              style={{ color: isDark ? '#FFFFFF' : '#1A1B18', marginBottom: '24px', fontStyle: 'normal' }}
            >
              "Travel Made Effortless, Inspiring & Seamless."
            </h2>

            <p
              className="body-lg"
              style={{ color: isDark ? 'rgba(250, 247, 241, 0.8)' : '#5C5D54', fontSize: '18px', lineHeight: 1.7 }}
            >
              We are a full-service tour & travel agency dedicated to crafting unforgettable vacation packages, flight bookings, guided excursions, and tailor-made holiday experiences worldwide.
            </p>
          </div>
        </Reveal>

        {/* Specialized 4 Pillars Interactive Micro-Interactions Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '32px',
            marginBottom: '96px',
          }}
        >
          {PILLARS.map((pillar, idx) => {
            const isHovered = hoveredCard === pillar.id;

            return (
              <motion.div
                key={pillar.id}
                initial={{ opacity: 0, y: 36, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 0.7,
                  delay: idx * 0.12,
                  ease: [0.22, 1, 0.36, 1], // ease-out-expo
                }}
                onMouseEnter={() => setHoveredCard(pillar.id)}
                onMouseLeave={() => setHoveredCard(null)}
                data-cursor="Pillar"
                style={{
                  backgroundColor: isDark 
                    ? (isHovered ? '#2C2E27' : '#24251F')
                    : (isHovered ? '#FFFFFF' : '#FFFFFF'),
                  border: isHovered 
                    ? '1px solid #B5643D' 
                    : (isDark ? '1px solid rgba(255, 255, 255, 0.08)' : '1px solid #E4DCC8'),
                  borderRadius: '20px',
                  padding: '36px 28px',
                  position: 'relative',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  boxShadow: isHovered
                    ? '0 20px 48px rgba(181, 100, 61, 0.15)'
                    : (isDark ? '0 8px 24px rgba(0, 0, 0, 0.1)' : '0 8px 24px rgba(26, 27, 24, 0.05)'),
                  transform: isHovered ? 'translateY(-8px)' : 'translateY(0)',
                  transition: 'all 350ms cubic-bezier(0.22, 1, 0.36, 1)',
                }}
              >
                {/* Top Accent Hairline Drawer on Hover */}
                <motion.div
                  initial={{ width: '0%' }}
                  animate={{ width: isHovered ? '100%' : '0%' }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    height: '2px',
                    backgroundColor: '#B5643D',
                  }}
                />

                {/* Card Top Row: Micro Icon + Badge */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: '24px',
                  }}
                >
                  <div
                    style={{
                      width: '52px',
                      height: '52px',
                      borderRadius: '14px',
                      backgroundColor: isHovered ? 'rgba(181, 100, 61, 0.15)' : (isDark ? 'rgba(255, 255, 255, 0.04)' : '#FAF7F1'),
                      border: isHovered ? '1px solid rgba(181, 100, 61, 0.4)' : (isDark ? '1px solid rgba(255, 255, 255, 0.08)' : '1px solid #E4DCC8'),
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      transition: 'all 300ms ease',
                    }}
                  >
                    {renderIcon(pillar.iconType, isHovered)}
                  </div>

                  <span
                    style={{
                      fontSize: '10px',
                      fontFamily: 'Inter, sans-serif',
                      fontWeight: 600,
                      letterSpacing: '0.14em',
                      textTransform: 'uppercase',
                      color: isHovered ? '#B5643D' : (isDark ? '#8C8D80' : '#8C8D80'),
                      transition: 'color 300ms ease',
                    }}
                  >
                    {pillar.badge}
                  </span>
                </div>

                {/* Subtitle Eyebrow */}
                <span
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '11px',
                    fontWeight: 600,
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    color: '#B5643D',
                    display: 'block',
                    marginBottom: '6px',
                  }}
                >
                  {pillar.subtitle}
                </span>

                {/* Pillar Heading */}
                <h3
                  style={{
                    fontFamily: 'Fraunces, serif',
                    fontSize: '22px',
                    fontWeight: 500,
                    color: isDark ? '#FFFFFF' : '#1A1B18',
                    lineHeight: 1.2,
                    marginBottom: '14px',
                  }}
                >
                  {pillar.title}
                </h3>

                {/* Text Body */}
                <p
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '14px',
                    color: isDark ? (isHovered ? '#FAF7F1' : '#8C8D80') : '#5C5D54',
                    lineHeight: 1.6,
                    transition: 'color 300ms ease',
                  }}
                >
                  {pillar.text}
                </p>

                {/* Subtle Corner Glow Accent */}
                <div
                  style={{
                    position: 'absolute',
                    bottom: '-30px',
                    right: '-30px',
                    width: '100px',
                    height: '100px',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(181, 100, 61, 0.08)',
                    filter: 'blur(20px)',
                    opacity: isHovered ? 1 : 0,
                    transition: 'opacity 400ms ease',
                    pointerEvents: 'none',
                  }}
                />
              </motion.div>
            );
          })}
        </div>

        {/* Live Scroll Counter Statistics Bar */}
        <div
          style={{
            borderTop: isDark ? '1px solid rgba(255, 255, 255, 0.12)' : '1px solid #E4DCC8',
            paddingTop: '64px',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '40px',
            textAlign: 'center',
          }}
        >
          <StatCounter
            value={500}
            suffix="+"
            label="Curated Destinations Worldwide"
            textColor={isDark ? undefined : '#1A1B18'}
          />
          <StatCounter
            value={99.8}
            decimals={1}
            suffix="%"
            label="Customer Satisfaction Rate"
            textColor={isDark ? undefined : '#1A1B18'}
          />
          <StatCounter
            value={24}
            suffix="/7"
            label="Dedicated Travel Advisor Support"
            textColor={isDark ? undefined : '#1A1B18'}
          />
          <StatCounter
            value={15}
            suffix=" Years"
            label="Travel Agency Industry Leadership"
            textColor={isDark ? undefined : '#1A1B18'}
          />
        </div>
      </div>
    </section>
  );
};
