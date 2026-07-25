import React, { useState, useEffect, useRef } from 'react';
import { MapPin, Sparkles, Calendar, Users, Search, ChevronDown, Plus, Minus, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export interface SearchValues {
  destination: string;
  activity: string;
  departure: string;
  adults: number;
  childrenCount: number;
}

interface HeroSearchBarProps {
  onSearch: (values: SearchValues) => void;
}

const DESTINATIONS_OPTIONS = [
  'All Sanctuaries',
  'Kyoto, Japan',
  'Amalfi Coast, Italy',
  'Serengeti, Tanzania',
  'Patagonia, Chile',
  'Swiss Alps, Switzerland',
  'Rajasthan, India',
];

const ACTIVITY_OPTIONS = [
  'All Experiences',
  'Cultural Expeditions',
  'Private Yachting',
  'Wildlife Safari',
  'Alpine & Wilderness',
  'Wellness Retreat',
];

const DEPARTURE_OPTIONS = [
  'Autumn 2026',
  'Winter 2026 / New Year',
  'Spring 2027',
  'Summer 2027',
  'Flexible Dates',
];

export const HeroSearchBar: React.FC<HeroSearchBarProps> = ({ onSearch }) => {
  const [destination, setDestination] = useState('Kyoto, Japan');
  const [activity, setActivity] = useState('Cultural Expeditions');
  const [departure, setDeparture] = useState('Autumn 2026');
  const [adults, setAdults] = useState(2);
  const [childrenCount, setChildrenCount] = useState(0);

  const [activePopover, setActivePopover] = useState<'dest' | 'activity' | 'departure' | 'guests' | null>(null);
  const [mobileModalOpen, setMobileModalOpen] = useState(false);

  const barRef = useRef<HTMLDivElement>(null);

  // Close popover on click outside or Esc key
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (barRef.current && !barRef.current.contains(e.target as Node)) {
        setActivePopover(null);
      }
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActivePopover(null);
        setMobileModalOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const totalGuests = adults + childrenCount;
  const guestLabel = `${totalGuests} ${totalGuests === 1 ? 'Guest' : 'Guests'}${childrenCount > 0 ? ` (${adults}A, ${childrenCount}C)` : ''}`;

  const handleSearchSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setActivePopover(null);
    setMobileModalOpen(false);
    onSearch({
      destination,
      activity,
      departure,
      adults,
      childrenCount,
    });
  };

  return (
    <div style={{ position: 'relative', width: '100%', zIndex: 1000 }} ref={barRef}>
      {/* Desktop / Tablet Horizontal Pill Bar */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
        style={{
          width: '100%',
          maxWidth: '1100px',
          margin: '0 auto',
          position: 'relative',
        }}
        className="no-mobile-search"
      >
        <div
          style={{
            backgroundColor: 'rgba(250, 247, 241, 0.95)',
            backdropFilter: 'blur(16px) saturate(140%)',
            WebkitBackdropFilter: 'blur(16px) saturate(140%)',
            border: '1px solid rgba(26, 27, 24, 0.12)',
            borderRadius: '999px',
            boxShadow: '0 16px 48px rgba(26, 27, 24, 0.16)',
            padding: '8px 12px 8px 24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '0',
          }}
        >
          {/* FIELD 1: DESTINATION */}
          <div
            onClick={() => setActivePopover(activePopover === 'dest' ? null : 'dest')}
            tabIndex={0}
            role="button"
            aria-expanded={activePopover === 'dest'}
            style={{
              flex: 1,
              padding: '8px 16px 8px 8px',
              cursor: 'pointer',
              borderRadius: '999px',
              outline: 'none',
              transition: 'background-color 200ms ease',
              position: 'relative',
              boxShadow: activePopover === 'dest' ? '0 0 0 2px #B5643D' : 'none',
              backgroundColor: activePopover === 'dest' ? 'rgba(255, 255, 255, 0.8)' : 'transparent',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <MapPin size={20} color="#B5643D" strokeWidth={1.5} style={{ flexShrink: 0 }} />
              <div style={{ overflow: 'hidden' }}>
                <span
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '10px',
                    fontWeight: 600,
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    color: '#5C5D54',
                    display: 'block',
                    marginBottom: '2px',
                  }}
                >
                  Destination
                </span>
                <span
                  style={{
                    fontFamily: 'Fraunces, serif',
                    fontSize: '17px',
                    fontWeight: 500,
                    color: '#1A1B18',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    display: 'block',
                  }}
                >
                  {destination}
                </span>
              </div>
              <ChevronDown size={14} color="#8C8D80" style={{ marginLeft: 'auto', flexShrink: 0 }} />
            </div>

            {/* Destination Popover Dropdown */}
            <AnimatePresence>
              {activePopover === 'dest' && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.96 }}
                  transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                  style={{
                    position: 'absolute',
                    top: 'calc(100% + 14px)',
                    left: 0,
                    width: '280px',
                    maxHeight: '340px',
                    overflowY: 'auto',
                    backgroundColor: '#FAF7F1',
                    border: '1px solid rgba(26, 27, 24, 0.14)',
                    borderRadius: '20px',
                    boxShadow: '0 24px 64px rgba(0, 0, 0, 0.25)',
                    padding: '10px',
                    zIndex: 9999,
                  }}
                >
                  {DESTINATIONS_OPTIONS.map((opt) => (
                    <div
                      key={opt}
                      onClick={(e) => {
                        e.stopPropagation();
                        setDestination(opt);
                        setActivePopover(null);
                      }}
                      style={{
                        padding: '11px 16px',
                        borderRadius: '12px',
                        backgroundColor: destination === opt ? 'rgba(181, 100, 61, 0.15)' : 'transparent',
                        color: destination === opt ? '#B5643D' : '#1A1B18',
                        fontFamily: 'Inter, sans-serif',
                        fontSize: '14px',
                        fontWeight: destination === opt ? 600 : 400,
                        cursor: 'pointer',
                        transition: 'all 150ms ease',
                      }}
                    >
                      {opt}
                    </div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Hairline Divider 1 */}
          <div style={{ width: '1px', height: '32px', backgroundColor: '#E4DCC8', flexShrink: 0 }} />

          {/* FIELD 2: ACTIVITY / EXPERIENCE */}
          <div
            onClick={() => setActivePopover(activePopover === 'activity' ? null : 'activity')}
            tabIndex={0}
            role="button"
            aria-expanded={activePopover === 'activity'}
            style={{
              flex: 1,
              padding: '8px 16px 8px 16px',
              cursor: 'pointer',
              borderRadius: '999px',
              outline: 'none',
              transition: 'background-color 200ms ease',
              position: 'relative',
              boxShadow: activePopover === 'activity' ? '0 0 0 2px #B5643D' : 'none',
              backgroundColor: activePopover === 'activity' ? 'rgba(255, 255, 255, 0.8)' : 'transparent',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <Sparkles size={20} color="#B5643D" strokeWidth={1.5} style={{ flexShrink: 0 }} />
              <div style={{ overflow: 'hidden' }}>
                <span
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '10px',
                    fontWeight: 600,
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    color: '#5C5D54',
                    display: 'block',
                    marginBottom: '2px',
                  }}
                >
                  Activity
                </span>
                <span
                  style={{
                    fontFamily: 'Fraunces, serif',
                    fontSize: '17px',
                    fontWeight: 500,
                    color: '#1A1B18',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    display: 'block',
                  }}
                >
                  {activity}
                </span>
              </div>
              <ChevronDown size={14} color="#8C8D80" style={{ marginLeft: 'auto', flexShrink: 0 }} />
            </div>

            {/* Activity Popover */}
            <AnimatePresence>
              {activePopover === 'activity' && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.96 }}
                  transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                  style={{
                    position: 'absolute',
                    top: 'calc(100% + 14px)',
                    left: 0,
                    width: '280px',
                    maxHeight: '340px',
                    overflowY: 'auto',
                    backgroundColor: '#FAF7F1',
                    border: '1px solid rgba(26, 27, 24, 0.14)',
                    borderRadius: '20px',
                    boxShadow: '0 24px 64px rgba(0, 0, 0, 0.25)',
                    padding: '10px',
                    zIndex: 9999,
                  }}
                >
                  {ACTIVITY_OPTIONS.map((opt) => (
                    <div
                      key={opt}
                      onClick={(e) => {
                        e.stopPropagation();
                        setActivity(opt);
                        setActivePopover(null);
                      }}
                      style={{
                        padding: '11px 16px',
                        borderRadius: '12px',
                        backgroundColor: activity === opt ? 'rgba(181, 100, 61, 0.15)' : 'transparent',
                        color: activity === opt ? '#B5643D' : '#1A1B18',
                        fontFamily: 'Inter, sans-serif',
                        fontSize: '14px',
                        fontWeight: activity === opt ? 600 : 400,
                        cursor: 'pointer',
                        transition: 'all 150ms ease',
                      }}
                    >
                      {opt}
                    </div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Hairline Divider 2 */}
          <div style={{ width: '1px', height: '32px', backgroundColor: '#E4DCC8', flexShrink: 0 }} />

          {/* FIELD 3: DEPARTURE MONTH */}
          <div
            onClick={() => setActivePopover(activePopover === 'departure' ? null : 'departure')}
            tabIndex={0}
            role="button"
            aria-expanded={activePopover === 'departure'}
            style={{
              flex: 1,
              padding: '8px 16px 8px 16px',
              cursor: 'pointer',
              borderRadius: '999px',
              outline: 'none',
              transition: 'background-color 200ms ease',
              position: 'relative',
              boxShadow: activePopover === 'departure' ? '0 0 0 2px #B5643D' : 'none',
              backgroundColor: activePopover === 'departure' ? 'rgba(255, 255, 255, 0.8)' : 'transparent',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <Calendar size={20} color="#B5643D" strokeWidth={1.5} style={{ flexShrink: 0 }} />
              <div style={{ overflow: 'hidden' }}>
                <span
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '10px',
                    fontWeight: 600,
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    color: '#5C5D54',
                    display: 'block',
                    marginBottom: '2px',
                  }}
                >
                  Departure
                </span>
                <span
                  style={{
                    fontFamily: 'Fraunces, serif',
                    fontSize: '17px',
                    fontWeight: 500,
                    color: '#1A1B18',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    display: 'block',
                  }}
                >
                  {departure}
                </span>
              </div>
              <ChevronDown size={14} color="#8C8D80" style={{ marginLeft: 'auto', flexShrink: 0 }} />
            </div>

            {/* Departure Glass Month Picker Popover */}
            <AnimatePresence>
              {activePopover === 'departure' && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.96 }}
                  transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                  style={{
                    position: 'absolute',
                    top: 'calc(100% + 14px)',
                    left: 0,
                    width: '280px',
                    maxHeight: '340px',
                    overflowY: 'auto',
                    backgroundColor: '#FAF7F1',
                    border: '1px solid rgba(26, 27, 24, 0.14)',
                    borderRadius: '20px',
                    boxShadow: '0 24px 64px rgba(0, 0, 0, 0.25)',
                    padding: '10px',
                    zIndex: 9999,
                  }}
                >
                  {DEPARTURE_OPTIONS.map((opt) => (
                    <div
                      key={opt}
                      onClick={(e) => {
                        e.stopPropagation();
                        setDeparture(opt);
                        setActivePopover(null);
                      }}
                      style={{
                        padding: '11px 16px',
                        borderRadius: '12px',
                        backgroundColor: departure === opt ? 'rgba(181, 100, 61, 0.15)' : 'transparent',
                        color: departure === opt ? '#B5643D' : '#1A1B18',
                        fontFamily: 'Inter, sans-serif',
                        fontSize: '14px',
                        fontWeight: departure === opt ? 600 : 400,
                        cursor: 'pointer',
                        transition: 'all 150ms ease',
                      }}
                    >
                      {opt}
                    </div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Hairline Divider 3 */}
          <div style={{ width: '1px', height: '32px', backgroundColor: '#E4DCC8', flexShrink: 0 }} />

          {/* FIELD 4: GUESTS STEPPER */}
          <div
            onClick={() => setActivePopover(activePopover === 'guests' ? null : 'guests')}
            tabIndex={0}
            role="button"
            aria-expanded={activePopover === 'guests'}
            style={{
              flex: 1,
              padding: '8px 16px 8px 16px',
              cursor: 'pointer',
              borderRadius: '999px',
              outline: 'none',
              transition: 'background-color 200ms ease',
              position: 'relative',
              boxShadow: activePopover === 'guests' ? '0 0 0 2px #B5643D' : 'none',
              backgroundColor: activePopover === 'guests' ? 'rgba(255, 255, 255, 0.8)' : 'transparent',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <Users size={20} color="#B5643D" strokeWidth={1.5} style={{ flexShrink: 0 }} />
              <div style={{ overflow: 'hidden' }}>
                <span
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '10px',
                    fontWeight: 600,
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    color: '#5C5D54',
                    display: 'block',
                    marginBottom: '2px',
                  }}
                >
                  Guests
                </span>
                <span
                  style={{
                    fontFamily: 'Fraunces, serif',
                    fontSize: '17px',
                    fontWeight: 500,
                    color: '#1A1B18',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    display: 'block',
                  }}
                >
                  {guestLabel}
                </span>
              </div>
              <ChevronDown size={14} color="#8C8D80" style={{ marginLeft: 'auto', flexShrink: 0 }} />
            </div>

            {/* Guests Stepper Popover */}
            <AnimatePresence>
              {activePopover === 'guests' && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.96 }}
                  transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                  onClick={(e) => e.stopPropagation()}
                  style={{
                    position: 'absolute',
                    top: 'calc(100% + 14px)',
                    right: 0,
                    width: '280px',
                    backgroundColor: '#FAF7F1',
                    border: '1px solid rgba(26, 27, 24, 0.14)',
                    borderRadius: '20px',
                    boxShadow: '0 24px 64px rgba(0, 0, 0, 0.25)',
                    padding: '20px',
                    zIndex: 9999,
                  }}
                >
                  {/* Adults Stepper */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                    <div>
                      <span style={{ fontSize: '14px', fontWeight: 600, color: '#1A1B18', display: 'block' }}>Adults</span>
                      <span style={{ fontSize: '11px', color: '#8C8D80' }}>Ages 12+</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <button
                        type="button"
                        onClick={() => setAdults(Math.max(1, adults - 1))}
                        style={{
                          width: '32px',
                          height: '32px',
                          borderRadius: '50%',
                          border: '1px solid #E4DCC8',
                          backgroundColor: '#FAF7F1',
                          color: '#1A1B18',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <Minus size={14} />
                      </button>
                      <span style={{ fontFamily: 'Fraunces, serif', fontSize: '18px', fontWeight: 600, width: '20px', textAlign: 'center' }}>{adults}</span>
                      <button
                        type="button"
                        onClick={() => setAdults(adults + 1)}
                        style={{
                          width: '32px',
                          height: '32px',
                          borderRadius: '50%',
                          border: '1px solid #E4DCC8',
                          backgroundColor: '#FAF7F1',
                          color: '#1A1B18',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                  </div>

                  {/* Children Stepper */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div>
                      <span style={{ fontSize: '14px', fontWeight: 600, color: '#1A1B18', display: 'block' }}>Children</span>
                      <span style={{ fontSize: '11px', color: '#8C8D80' }}>Ages 0–11</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <button
                        type="button"
                        onClick={() => setChildrenCount(Math.max(0, childrenCount - 1))}
                        style={{
                          width: '32px',
                          height: '32px',
                          borderRadius: '50%',
                          border: '1px solid #E4DCC8',
                          backgroundColor: '#FAF7F1',
                          color: '#1A1B18',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <Minus size={14} />
                      </button>
                      <span style={{ fontFamily: 'Fraunces, serif', fontSize: '18px', fontWeight: 600, width: '20px', textAlign: 'center' }}>{childrenCount}</span>
                      <button
                        type="button"
                        onClick={() => setChildrenCount(childrenCount + 1)}
                        style={{
                          width: '32px',
                          height: '32px',
                          borderRadius: '50%',
                          border: '1px solid #E4DCC8',
                          backgroundColor: '#FAF7F1',
                          color: '#1A1B18',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* ANCHOR CTA BUTTON (FAR RIGHT) */}
          <button
            onClick={() => handleSearchSubmit()}
            data-cursor="Search"
            style={{
              backgroundColor: '#B5643D',
              color: '#FAF7F1',
              border: 'none',
              borderRadius: '999px',
              padding: '14px 28px',
              fontFamily: 'Inter, sans-serif',
              fontSize: '15px',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              boxShadow: '0 4px 16px rgba(181, 100, 61, 0.35)',
              transition: 'all 200ms ease',
              flexShrink: 0,
              marginLeft: '8px',
            }}
            className="hero-search-cta"
          >
            <Search size={18} strokeWidth={2} />
            <span>Search</span>
          </button>
        </div>
      </motion.div>

      {/* Mobile Collapsed Summary Pill */}
      <div className="mobile-search-pill-container" style={{ width: '100%', maxWidth: '400px', margin: '0 auto' }}>
        <button
          onClick={() => setMobileModalOpen(true)}
          style={{
            width: '100%',
            backgroundColor: 'rgba(250, 247, 241, 0.92)',
            backdropFilter: 'blur(16px)',
            border: '1px solid rgba(26, 27, 24, 0.1)',
            borderRadius: '999px',
            padding: '14px 20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
            cursor: 'pointer',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Search size={18} color="#B5643D" />
            <span style={{ fontFamily: 'Fraunces, serif', fontSize: '15px', color: '#1A1B18' }}>
              Where to? · {departure} · {guestLabel}
            </span>
          </div>
        </button>
      </div>

      {/* Mobile Full-Screen Glass Search Modal */}
      <AnimatePresence>
        {mobileModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 99999,
              backgroundColor: 'rgba(26, 27, 24, 0.7)',
              backdropFilter: 'blur(16px)',
              padding: '24px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              style={{
                backgroundColor: '#FAF7F1',
                borderRadius: '24px',
                width: '100%',
                maxWidth: '480px',
                padding: '28px',
                boxShadow: '0 24px 64px rgba(0,0,0,0.4)',
                border: '1px solid #E4DCC8',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <h3 style={{ fontFamily: 'Fraunces, serif', fontSize: '24px', color: '#1A1B18' }}>Curate Expedition</h3>
                <button onClick={() => setMobileModalOpen(false)} style={{ background: 'none', border: 'none', color: '#1A1B18' }}>
                  <X size={24} />
                </button>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginBottom: '28px' }}>
                {/* Destination Input */}
                <div>
                  <label style={{ display: 'block', fontSize: '10px', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#5C5D54', marginBottom: '6px' }}>
                    Destination
                  </label>
                  <select
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    style={{ width: '100%', padding: '12px', borderRadius: '12px', border: '1px solid #E4DCC8', fontFamily: 'Fraunces, serif', fontSize: '16px', background: '#FFF' }}
                  >
                    {DESTINATIONS_OPTIONS.map((opt) => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                </div>

                {/* Activity Input */}
                <div>
                  <label style={{ display: 'block', fontSize: '10px', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#5C5D54', marginBottom: '6px' }}>
                    Activity / Style
                  </label>
                  <select
                    value={activity}
                    onChange={(e) => setActivity(e.target.value)}
                    style={{ width: '100%', padding: '12px', borderRadius: '12px', border: '1px solid #E4DCC8', fontFamily: 'Fraunces, serif', fontSize: '16px', background: '#FFF' }}
                  >
                    {ACTIVITY_OPTIONS.map((opt) => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                </div>

                {/* Departure Input */}
                <div>
                  <label style={{ display: 'block', fontSize: '10px', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#5C5D54', marginBottom: '6px' }}>
                    Departure Window
                  </label>
                  <select
                    value={departure}
                    onChange={(e) => setDeparture(e.target.value)}
                    style={{ width: '100%', padding: '12px', borderRadius: '12px', border: '1px solid #E4DCC8', fontFamily: 'Fraunces, serif', fontSize: '16px', background: '#FFF' }}
                  >
                    {DEPARTURE_OPTIONS.map((opt) => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                </div>

                {/* Guests */}
                <div>
                  <label style={{ display: 'block', fontSize: '10px', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#5C5D54', marginBottom: '6px' }}>
                    Travelers ({guestLabel})
                  </label>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#FFF', padding: '12px', borderRadius: '12px', border: '1px solid #E4DCC8' }}>
                    <span>Adults</span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <button type="button" onClick={() => setAdults(Math.max(1, adults - 1))} style={{ width: '28px', height: '28px', borderRadius: '50%', border: '1px solid #CCC', background: '#FFF' }}>-</button>
                      <span style={{ fontWeight: 600 }}>{adults}</span>
                      <button type="button" onClick={() => setAdults(adults + 1)} style={{ width: '28px', height: '28px', borderRadius: '50%', border: '1px solid #CCC', background: '#FFF' }}>+</button>
                    </div>
                  </div>
                </div>
              </div>

              <button
                onClick={() => handleSearchSubmit()}
                className="btn-primary"
                style={{ width: '100%', padding: '16px', justifyContent: 'center', borderRadius: '999px' }}
              >
                <Search size={18} />
                <span>Search Expeditions</span>
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .hero-search-cta:hover {
          background-color: #95502F !important;
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(181, 100, 61, 0.45) !important;
        }
        @media (max-width: 900px) {
          .no-mobile-search { display: none !important; }
          .mobile-search-pill-container { display: block !important; }
        }
        @media (min-width: 901px) {
          .mobile-search-pill-container { display: none !important; }
        }
      `}</style>
    </div>
  );
};

export default HeroSearchBar;
