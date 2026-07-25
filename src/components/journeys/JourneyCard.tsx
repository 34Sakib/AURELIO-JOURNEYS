import React, { useState } from 'react';
import { Journey } from '../../data/journeysData';
import { Bookmark, Clock, ArrowRight, Star, MapPin, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

interface JourneyCardProps {
  journey: Journey;
  isShortlisted: boolean;
  onToggleShortlist: (journey: Journey) => void;
  onOpenDetail: (journey: Journey) => void;
}

export const JourneyCard: React.FC<JourneyCardProps> = ({
  journey,
  isShortlisted,
  onToggleShortlist,
  onOpenDetail,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        backgroundColor: '#FFFFFF',
        borderRadius: '18px',
        overflow: 'hidden',
        boxShadow: isHovered
          ? '0 16px 40px rgba(26, 27, 24, 0.12), 0 0 0 2px #B5643D'
          : '0 6px 20px rgba(26, 27, 24, 0.04)',
        border: '1px solid #E4DCC8',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        transform: isHovered ? 'translateY(-6px)' : 'translateY(0)',
        transition: 'all 350ms cubic-bezier(0.22, 1, 0.36, 1)',
        position: 'relative',
      }}
      className="journey-card"
    >
      {/* Compact Top Photography Container (195px height) */}
      <div
        style={{
          position: 'relative',
          height: '195px',
          overflow: 'hidden',
          cursor: 'pointer',
        }}
        onClick={() => onOpenDetail(journey)}
        data-cursor="View Itinerary"
      >
        <img
          src={journey.heroImage}
          alt={journey.title}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transform: isHovered ? 'scale(1.08)' : 'scale(1)',
            transition: 'transform 700ms cubic-bezier(0.22, 1, 0.36, 1)',
          }}
        />

        {/* Dark Scrim Gradient */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(180deg, rgba(26,27,24,0.3) 0%, rgba(26,27,24,0.02) 50%, rgba(26,27,24,0.65) 100%)',
            zIndex: 2,
          }}
        />

        {/* Top Badges: Style & Bookmark */}
        <div
          style={{
            position: 'absolute',
            top: '12px',
            left: '12px',
            right: '12px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            zIndex: 3,
          }}
        >
          <span
            style={{
              backgroundColor: 'rgba(250, 247, 241, 0.94)',
              backdropFilter: 'blur(10px)',
              padding: '4px 10px',
              borderRadius: '999px',
              fontFamily: 'Inter, sans-serif',
              fontSize: '10px',
              fontWeight: 600,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: '#B5643D',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            }}
          >
            {journey.style}
          </span>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleShortlist(journey);
            }}
            aria-label="Save to Shortlist"
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              backgroundColor: isShortlisted ? '#B5643D' : 'rgba(250, 247, 241, 0.85)',
              backdropFilter: 'blur(10px)',
              border: 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: isShortlisted ? '#FAF7F1' : '#1A1B18',
              cursor: 'pointer',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
              transition: 'all 200ms ease',
            }}
          >
            <Bookmark size={14} fill={isShortlisted ? '#FAF7F1' : 'none'} />
          </button>
        </div>

        {/* Bottom Floating Glass Badge: Duration & Rating */}
        <div
          style={{
            position: 'absolute',
            bottom: '12px',
            left: '12px',
            right: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            zIndex: 3,
          }}
        >
          <div
            style={{
              backgroundColor: 'rgba(26, 27, 24, 0.75)',
              backdropFilter: 'blur(10px)',
              color: '#FAF7F1',
              padding: '4px 8px',
              borderRadius: '6px',
              fontFamily: 'Inter, sans-serif',
              fontSize: '11px',
              fontWeight: 500,
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
            }}
          >
            <Clock size={11} color="#C9A15E" />
            <span>{journey.durationDays}D / {journey.durationDays - 1}N</span>
          </div>

          <div
            style={{
              backgroundColor: 'rgba(250, 247, 241, 0.9)',
              backdropFilter: 'blur(10px)',
              color: '#1A1B18',
              padding: '3px 8px',
              borderRadius: '999px',
              fontFamily: 'Inter, sans-serif',
              fontSize: '10px',
              fontWeight: 700,
              display: 'flex',
              alignItems: 'center',
              gap: '3px',
            }}
          >
            <Star size={11} color="#C9A15E" fill="#C9A15E" />
            <span>4.9</span>
            <span style={{ color: '#8C8D80', fontWeight: 400 }}>(24)</span>
          </div>
        </div>
      </div>

      {/* Compact Card Content Padding (18px) */}
      <div
        style={{
          padding: '18px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          flexGrow: 1,
        }}
      >
        <div>
          {/* Location & Region */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '6px' }}>
            <MapPin size={12} color="#B5643D" />
            <span
              style={{
                fontSize: '10px',
                fontFamily: 'Inter, sans-serif',
                fontWeight: 600,
                letterSpacing: '0.1em',
                color: '#8C8D80',
                textTransform: 'uppercase',
              }}
            >
              {journey.region}
            </span>
          </div>

          {/* Compact Fraunces Title */}
          <h3
            onClick={() => onOpenDetail(journey)}
            style={{
              fontFamily: 'Fraunces, serif',
              fontSize: '19px',
              fontWeight: 500,
              color: '#1A1B18',
              lineHeight: 1.25,
              marginBottom: '6px',
              cursor: 'pointer',
              transition: 'color 200ms ease',
            }}
          >
            {journey.title}
          </h3>

          {/* Subtitle Description */}
          <p
            style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '13px',
              color: '#5C5D54',
              lineHeight: 1.45,
              marginBottom: '14px',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
            }}
          >
            {journey.subtitle}
          </p>

          {/* Experience Highlight Chips */}
          <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '16px' }}>
            {journey.highlights.slice(0, 2).map((h, i) => (
              <span
                key={i}
                style={{
                  backgroundColor: '#FAF7F1',
                  border: '1px solid #E4DCC8',
                  padding: '3px 8px',
                  borderRadius: '5px',
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '10px',
                  color: '#5C5D54',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                }}
              >
                <Sparkles size={9} color="#C9A15E" />
                {h}
              </span>
            ))}
          </div>
        </div>

        {/* Card Footer: Price Line & Compact Full-Width Terracotta CTA Pill */}
        <div>
          <hr style={{ border: 'none', height: '1px', backgroundColor: '#E4DCC8', marginBottom: '14px' }} />

          <div
            style={{
              display: 'flex',
              alignItems: 'baseline',
              justifyContent: 'space-between',
              marginBottom: '12px',
            }}
          >
            <span style={{ fontSize: '11px', color: '#8C8D80', fontFamily: 'Inter, sans-serif' }}>From</span>
            <div>
              <span
                style={{
                  fontFamily: 'Fraunces, serif',
                  fontSize: '20px',
                  fontWeight: 600,
                  color: '#1A1B18',
                }}
              >
                ${journey.pricePerPerson.toLocaleString()}
              </span>
              <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '11px', color: '#8C8D80', marginLeft: '3px' }}>
                / guest
              </span>
            </div>
          </div>

          {/* Compact Solid Terracotta Anchor CTA Button */}
          <button
            onClick={() => onOpenDetail(journey)}
            style={{
              width: '100%',
              backgroundColor: isHovered ? '#95502F' : '#B5643D',
              color: '#FAF7F1',
              border: 'none',
              borderRadius: '999px',
              padding: '10px 16px',
              fontFamily: 'Inter, sans-serif',
              fontSize: '13px',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              boxShadow: isHovered ? '0 6px 18px rgba(181, 100, 61, 0.4)' : '0 3px 12px rgba(181, 100, 61, 0.2)',
              transition: 'all 200ms ease',
            }}
          >
            <span>View Journey</span>
            <motion.div
              animate={{ x: isHovered ? 4 : 0 }}
              transition={{ duration: 0.2 }}
              style={{ display: 'flex', alignItems: 'center' }}
            >
              <ArrowRight size={15} />
            </motion.div>
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default JourneyCard;
