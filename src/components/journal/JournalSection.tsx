import React, { useState } from 'react';
import { JOURNAL_ARTICLES, JournalArticle } from '../../data/journeysData';
import { ArticleModal } from './ArticleModal';
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Clock,
  Headphones,
  Sparkles,
  User,
  Flame,
  Compass,
  Mountain,
  Sun,
  Waves,
  Trees,
  Scroll,
  LucideIcon
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface ArticleTheme {
  primary: string;
  accent: string;
  bgLight: string;
  glowColor: string;
  icon: LucideIcon;
  tag: string;
}

const ARTICLE_THEMES: Record<string, ArticleTheme> = {
  'art-of-unhurried-travel': {
    primary: '#B5643D',
    accent: '#F3E2D6',
    bgLight: '#FAF3ED',
    glowColor: 'rgba(181, 100, 61, 0.16)',
    icon: Compass,
    tag: 'Philosophy',
  },
  'kyoto-secret-autumn': {
    primary: '#9E3824',
    accent: '#FADFD8',
    bgLight: '#FAF0ED',
    glowColor: 'rgba(158, 56, 36, 0.16)',
    icon: Scroll,
    tag: 'Cultural Heritage',
  },
  'patagonia-ice-and-architecture': {
    primary: '#173D3A',
    accent: '#D4E5E3',
    bgLight: '#EEF5F4',
    glowColor: 'rgba(23, 61, 58, 0.16)',
    icon: Mountain,
    tag: 'Architecture',
  },
  'serengeti-migration-nomads': {
    primary: '#B86F20',
    accent: '#FAE8D2',
    bgLight: '#FAF5EC',
    glowColor: 'rgba(184, 111, 32, 0.16)',
    icon: Sun,
    tag: 'Wildlife Safari',
  },
  'ravello-cliffside-villas': {
    primary: '#1E627B',
    accent: '#D3E7F0',
    bgLight: '#EEF5F8',
    glowColor: 'rgba(30, 98, 123, 0.16)',
    icon: Waves,
    tag: 'Coastal Sanctuary',
  },
  'alpine-thermal-engadin': {
    primary: '#265740',
    accent: '#D6EAE0',
    bgLight: '#EEF6F2',
    glowColor: 'rgba(38, 87, 64, 0.16)',
    icon: Trees,
    tag: 'Alpine Restoration',
  },
};

const DEFAULT_THEME: ArticleTheme = {
  primary: '#B5643D',
  accent: '#F3E2D6',
  bgLight: '#FAF3ED',
  glowColor: 'rgba(181, 100, 61, 0.16)',
  icon: Sparkles,
  tag: 'Curated Monograph',
};

export const JournalSection: React.FC = () => {
  const [selectedArticle, setSelectedArticle] = useState<JournalArticle | null>(null);
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [emailInput, setEmailInput] = useState<string>('');
  const [subscribed, setSubscribed] = useState<boolean>(false);

  const activeArticle = JOURNAL_ARTICLES[activeIndex] || JOURNAL_ARTICLES[0];
  const activeTheme = ARTICLE_THEMES[activeArticle.id] || DEFAULT_THEME;

  const handlePrev = () => {
    setActiveIndex((prev) => (prev > 0 ? prev - 1 : JOURNAL_ARTICLES.length - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev < JOURNAL_ARTICLES.length - 1 ? prev + 1 : 0));
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput) return;
    setSubscribed(true);
    setTimeout(() => {
      setEmailInput('');
    }, 3000);
  };

  return (
    <section
      id="journal"
      style={{
        padding: '96px 0 108px',
        backgroundColor: activeTheme.bgLight,
        position: 'relative',
        overflow: 'hidden',
        transition: 'background-color 600ms cubic-bezier(0.22, 1, 0.36, 1)',
      }}
    >
      {/* Dynamic Ambient Glows Morphed by Active Theme */}
      <div
        style={{
          position: 'absolute',
          top: '12%',
          right: '8%',
          width: '650px',
          height: '650px',
          background: `radial-gradient(circle, ${activeTheme.glowColor} 0%, rgba(250, 247, 241, 0) 70%)`,
          pointerEvents: 'none',
          zIndex: 1,
          transition: 'all 600ms cubic-bezier(0.22, 1, 0.36, 1)',
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: '12%',
          left: '8%',
          width: '550px',
          height: '550px',
          background: `radial-gradient(circle, ${activeTheme.glowColor} 0%, rgba(250, 247, 241, 0) 70%)`,
          pointerEvents: 'none',
          zIndex: 1,
          transition: 'all 600ms cubic-bezier(0.22, 1, 0.36, 1)',
        }}
      />

      {/* Floating Corner Silhouette Vector Accents (Inspired by Dribbble Reference) */}
      <div
        style={{
          position: 'absolute',
          bottom: '40px',
          left: '32px',
          opacity: 0.12,
          pointerEvents: 'none',
          zIndex: 1,
          transition: 'all 600ms ease',
        }}
      >
        <activeTheme.icon size={150} color={activeTheme.primary} />
      </div>

      <div
        style={{
          position: 'absolute',
          top: '50px',
          right: '40px',
          opacity: 0.08,
          pointerEvents: 'none',
          zIndex: 1,
          transition: 'all 600ms ease',
        }}
      >
        <activeTheme.icon size={190} color={activeTheme.primary} />
      </div>

      <div
        style={{
          maxWidth: '1380px',
          margin: '0 auto',
          padding: '0 24px',
          position: 'relative',
          zIndex: 2,
        }}
      >
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          style={{ marginBottom: '36px' }}
        >
          {/* Eyebrow and Status Tag */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '14px', marginBottom: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
              <span className="label-eyebrow" style={{ color: activeTheme.primary, margin: 0, transition: 'color 500ms ease' }}>
                TRAVEL BLOG & DESTINATION GUIDES
              </span>
              <span
                style={{
                  backgroundColor: activeTheme.primary,
                  color: '#FAF7F1',
                  fontSize: '10px',
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: 700,
                  padding: '3px 10px',
                  borderRadius: '999px',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  boxShadow: `0 2px 8px ${activeTheme.glowColor}`,
                  transition: 'all 500ms ease',
                }}
              >
                <Flame size={12} />
                <span>Featured Monograph</span>
              </span>
            </div>

            {/* Clean Live Status Tag (No Numbers, No Pagination) */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                backdropFilter: 'blur(8px)',
                border: '1px solid rgba(26, 27, 24, 0.08)',
                padding: '6px 14px',
                borderRadius: '999px',
                boxShadow: '0 2px 8px rgba(26, 27, 24, 0.04)',
              }}
            >
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: activeTheme.primary, display: 'inline-block', transition: 'background-color 500ms ease' }} className="pulse-indicator" />
              <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '11px', fontWeight: 600, color: '#1A1B18', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                {activeTheme.tag}
              </span>
            </div>
          </div>

          {/* Title and Controls Row */}
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: '24px', flexWrap: 'wrap' }}>
            <div>
              <h2 className="display-lg" style={{ color: '#1A1B18', margin: 0, fontSize: 'clamp(28px, 3.6vw, 40px)', lineHeight: 1.15, marginBottom: '8px' }}>
                Inspiring Travel Stories & Insider Guides
              </h2>
              <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '15px', color: '#5C5D54', margin: 0, maxWidth: '640px', lineHeight: 1.6 }}>
                Discover expert travel philosophy, seasonal vacation guides, and insider destination notes from our global curators.
              </p>
            </div>

            {/* Stepper Navigation Buttons (No Numbers, No Pagination) */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <button
                onClick={handlePrev}
                aria-label="Previous Dispatch"
                style={{
                  width: '46px',
                  height: '46px',
                  borderRadius: '50%',
                  backgroundColor: '#FFFFFF',
                  border: '1px solid rgba(26, 27, 24, 0.12)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#1A1B18',
                  cursor: 'pointer',
                  transition: 'all 200ms ease',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                }}
                className="accordion-nav-btn"
              >
                <ChevronLeft size={20} />
              </button>

              <button
                onClick={handleNext}
                aria-label="Next Dispatch"
                style={{
                  width: '46px',
                  height: '46px',
                  borderRadius: '50%',
                  backgroundColor: activeTheme.primary,
                  border: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#FAF7F1',
                  cursor: 'pointer',
                  transition: 'all 300ms ease',
                  boxShadow: `0 4px 14px ${activeTheme.glowColor}`,
                }}
                className="accordion-nav-btn-next"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        </motion.div>

        {/* DRIBBLE-STYLE EXPANDING ACCORDION CAROUSEL CONTAINER */}
        <div
          style={{
            display: 'flex',
            gap: '16px',
            height: '520px',
            marginBottom: '64px',
            alignItems: 'stretch',
            position: 'relative',
          }}
          className="accordion-carousel-container"
        >
          {JOURNAL_ARTICLES.map((article, index) => {
            const isActive = activeIndex === index;
            const theme = ARTICLE_THEMES[article.id] || DEFAULT_THEME;
            const ThemeIcon = theme.icon;

            return (
              <motion.div
                key={article.id}
                layout
                onClick={() => setActiveIndex(index)}
                transition={{
                  layout: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
                }}
                style={{
                  flex: isActive ? '4 1 0%' : '0.8 1 0%',
                  minWidth: isActive ? '360px' : '84px',
                  borderRadius: '26px',
                  overflow: 'hidden',
                  position: 'relative',
                  cursor: isActive ? 'default' : 'pointer',
                  boxShadow: isActive
                    ? `0 20px 48px ${theme.glowColor}, 0 8px 20px rgba(26, 27, 24, 0.08)`
                    : '0 6px 18px rgba(26, 27, 24, 0.05)',
                  border: isActive ? `2px solid ${theme.primary}` : '1px solid rgba(26, 27, 24, 0.12)',
                  backgroundColor: '#FFFFFF',
                  boxSizing: 'border-box',
                  transition: 'box-shadow 400ms ease, border-color 400ms ease',
                }}
                className={`accordion-card ${isActive ? 'is-active' : 'is-collapsed'}`}
              >
                <AnimatePresence mode="wait">
                  {isActive ? (
                    /* EXPANDED ACTIVE CARD VIEW (PERFECTLY CONTAINED) */
                    <motion.div
                      key="expanded"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      style={{
                        width: '100%',
                        height: '100%',
                        display: 'grid',
                        gridTemplateColumns: '48% 52%',
                        borderRadius: '24px',
                        overflow: 'hidden',
                        position: 'relative',
                        backgroundColor: '#FFFFFF',
                      }}
                      className="expanded-card-layout"
                    >
                      {/* Left: Hero Image (Strictly clipped to left rounded border) */}
                      <div
                        style={{
                          position: 'relative',
                          height: '100%',
                          width: '100%',
                          overflow: 'hidden',
                          borderTopLeftRadius: '24px',
                          borderBottomLeftRadius: '24px',
                        }}
                      >
                        <img
                          src={article.image}
                          alt={article.title}
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            display: 'block',
                            borderTopLeftRadius: '24px',
                            borderBottomLeftRadius: '24px',
                            transition: 'transform 800ms cubic-bezier(0.22, 1, 0.36, 1)',
                          }}
                          className="expanded-card-img"
                        />

                        {/* Top Gradient Vignette */}
                        <div
                          style={{
                            position: 'absolute',
                            inset: 0,
                            background: 'linear-gradient(180deg, rgba(26, 27, 24, 0.38) 0%, rgba(26, 27, 24, 0.05) 45%, rgba(26, 27, 24, 0.7) 100%)',
                            pointerEvents: 'none',
                            borderTopLeftRadius: '24px',
                            borderBottomLeftRadius: '24px',
                          }}
                        />

                        {/* Top Category Floating Badge */}
                        <div
                          style={{
                            position: 'absolute',
                            top: '16px',
                            left: '16px',
                            backgroundColor: 'rgba(250, 247, 241, 0.95)',
                            backdropFilter: 'blur(10px)',
                            WebkitBackdropFilter: 'blur(10px)',
                            color: theme.primary,
                            padding: '6px 14px',
                            borderRadius: '999px',
                            fontSize: '11px',
                            fontWeight: 700,
                            textTransform: 'uppercase',
                            letterSpacing: '0.08em',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '6px',
                            border: '1px solid rgba(255, 255, 255, 0.5)',
                            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                            zIndex: 3,
                          }}
                        >
                          <ThemeIcon size={13} color={theme.primary} />
                          <span>{article.category}</span>
                        </div>

                        {/* Audio Monograph Tag */}
                        <div
                          style={{
                            position: 'absolute',
                            bottom: '16px',
                            left: '16px',
                            backgroundColor: 'rgba(26, 27, 24, 0.88)',
                            backdropFilter: 'blur(8px)',
                            WebkitBackdropFilter: 'blur(8px)',
                            color: '#FAF7F1',
                            padding: '5px 12px',
                            borderRadius: '999px',
                            fontSize: '11px',
                            fontFamily: 'Inter, sans-serif',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '6px',
                            border: '1px solid rgba(255, 255, 255, 0.15)',
                            zIndex: 3,
                          }}
                        >
                          <Headphones size={12} color="#C9A15E" />
                          <span>Audio Monograph</span>
                        </div>
                      </div>

                      {/* Right: Editorial Typography & Action */}
                      <div
                        style={{
                          padding: '28px 28px 24px',
                          display: 'flex',
                          flexDirection: 'column',
                          justifyContent: 'space-between',
                          boxSizing: 'border-box',
                          backgroundColor: '#FFFFFF',
                          overflow: 'hidden',
                        }}
                        className="expanded-content-box"
                      >
                        <div>
                          {/* Author & Meta Row */}
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px', flexWrap: 'wrap' }}>
                            <div
                              style={{
                                width: '28px',
                                height: '28px',
                                borderRadius: '50%',
                                backgroundColor: theme.bgLight,
                                border: `1px solid ${theme.primary}`,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: theme.primary,
                                flexShrink: 0,
                              }}
                            >
                              <User size={13} />
                            </div>
                            <span style={{ fontSize: '13px', fontWeight: 600, color: '#1A1B18', fontFamily: 'Fraunces, serif', whiteSpace: 'nowrap' }}>
                              {article.author}
                            </span>
                            <span style={{ fontSize: '11px', color: '#8C8D80', fontFamily: 'Inter, sans-serif', marginLeft: 'auto', whiteSpace: 'nowrap' }}>
                              {article.date} • <Clock size={11} style={{ display: 'inline', verticalAlign: 'middle' }} /> {article.readTime}
                            </span>
                          </div>

                          {/* Headline */}
                          <h3
                            style={{
                              fontFamily: 'Fraunces, serif',
                              fontSize: 'clamp(18px, 1.6vw, 22px)',
                              color: '#1A1B18',
                              lineHeight: 1.25,
                              marginBottom: '12px',
                              letterSpacing: '-0.01em',
                            }}
                          >
                            {article.title}
                          </h3>

                          {/* Excerpt */}
                          <p
                            style={{
                              fontFamily: 'Inter, sans-serif',
                              fontSize: '13px',
                              color: '#5C5D54',
                              lineHeight: 1.6,
                              margin: 0,
                              display: '-webkit-box',
                              WebkitLineClamp: 3,
                              WebkitBoxOrient: 'vertical',
                              overflow: 'hidden',
                            }}
                          >
                            {article.excerpt}
                          </p>
                        </div>

                        {/* CTA Footer Action */}
                        <div
                          style={{
                            paddingTop: '16px',
                            borderTop: '1px solid #F1ECE1',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'flex-start',
                          }}
                        >
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedArticle(article);
                            }}
                            style={{
                              backgroundColor: theme.primary,
                              color: '#FAF7F1',
                              border: 'none',
                              padding: '12px 24px',
                              borderRadius: '12px',
                              fontFamily: 'Inter, sans-serif',
                              fontSize: '13px',
                              fontWeight: 600,
                              cursor: 'pointer',
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '8px',
                              boxShadow: `0 4px 14px ${theme.glowColor}`,
                              transition: 'all 200ms ease',
                            }}
                            className="read-article-btn"
                          >
                            <span>Read Full Monograph</span>
                            <ArrowRight size={14} className="cta-arrow" />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ) : (
                    /* COLLAPSED VERTICAL TAB VIEW (RICH VISUAL DRIBBLE REFERENCE STYLE) */
                    <motion.div
                      key="collapsed"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      style={{
                        width: '100%',
                        height: '100%',
                        borderRadius: '24px',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '20px 0 24px',
                        position: 'relative',
                        overflow: 'hidden',
                      }}
                      className="collapsed-tab-layout"
                    >
                      {/* Background Visual Image Preview with Subtle Tint */}
                      <img
                        src={article.image}
                        alt={article.title}
                        style={{
                          position: 'absolute',
                          inset: 0,
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          filter: 'brightness(0.55) saturate(1.1)',
                          transition: 'transform 600ms ease, filter 400ms ease',
                        }}
                        className="collapsed-bg-img"
                      />

                      {/* Dark Frosted Glass Gradient Overlay */}
                      <div
                        style={{
                          position: 'absolute',
                          inset: 0,
                          background: `linear-gradient(180deg, rgba(26,27,24,0.45) 0%, rgba(26,27,24,0.3) 40%, ${theme.primary}CC 100%)`,
                          pointerEvents: 'none',
                        }}
                      />

                      {/* Top Icon Badge in Frosted Circle */}
                      <div
                        style={{
                          width: '44px',
                          height: '44px',
                          borderRadius: '50%',
                          backgroundColor: 'rgba(250, 247, 241, 0.92)',
                          backdropFilter: 'blur(8px)',
                          border: `1.5px solid ${theme.primary}`,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: theme.primary,
                          zIndex: 2,
                          transition: 'transform 300ms ease',
                          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.25)',
                        }}
                        className="collapsed-icon-badge"
                      >
                        <ThemeIcon size={20} color={theme.primary} />
                      </div>

                      {/* Crisp Vertical Spined Title */}
                      <div
                        style={{
                          writingMode: 'vertical-rl',
                          textOrientation: 'mixed',
                          transform: 'rotate(180deg)',
                          textAlign: 'center',
                          fontFamily: 'Fraunces, serif',
                          fontSize: '16px',
                          fontWeight: 600,
                          letterSpacing: '0.04em',
                          color: '#FFFFFF',
                          textShadow: '0 2px 8px rgba(0,0,0,0.6)',
                          whiteSpace: 'nowrap',
                          maxHeight: '300px',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          lineHeight: 1.2,
                          zIndex: 2,
                        }}
                        className="collapsed-spined-title"
                      >
                        {article.title}
                      </div>

                      {/* Bottom Category Glow Dot */}
                      <div
                        style={{
                          width: '10px',
                          height: '10px',
                          borderRadius: '50%',
                          backgroundColor: '#FAF7F1',
                          boxShadow: '0 0 10px rgba(255, 255, 255, 0.8)',
                          zIndex: 2,
                        }}
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        {/* PRIVATE MONOGRAPH NEWSLETTER DISPATCH BOX */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          style={{
            backgroundColor: '#173D3A',
            color: '#FAF7F1',
            borderRadius: '24px',
            padding: '40px 36px',
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '32px',
            alignItems: 'center',
            boxShadow: '0 16px 48px rgba(23, 61, 58, 0.2)',
          }}
          className="newsletter-box-grid"
        >
          <div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                color: '#C9A15E',
                fontSize: '11px',
                fontFamily: 'Inter, sans-serif',
                fontWeight: 600,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                marginBottom: '8px',
              }}
            >
              <Sparkles size={14} />
              <span>THE MONOGRAPH DISPATCH</span>
            </div>
            <h3 style={{ fontFamily: 'Fraunces, serif', fontSize: '26px', color: '#FAF7F1', margin: 0, marginBottom: '8px' }}>
              Receive Unhurried Reflections in Your Inbox
            </h3>
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px', color: '#C7C4B4', margin: 0, lineHeight: 1.5 }}>
              Delivered once monthly. Pure travel philosophy, sanctuary photography, and private departure announcements. Zero noise.
            </p>
          </div>

          <form onSubmit={handleSubscribe} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {subscribed ? (
              <div
                style={{
                  backgroundColor: 'rgba(74, 122, 95, 0.3)',
                  border: '1px solid #4A7A5F',
                  padding: '14px 20px',
                  borderRadius: '12px',
                  color: '#FAF7F1',
                  fontSize: '14px',
                  textAlign: 'center',
                  fontFamily: 'Inter, sans-serif',
                }}
              >
                ✓ Welcome to The Monograph Dispatch. Check your inbox for the latest edition.
              </div>
            ) : (
              <div style={{ display: 'flex', gap: '10px' }} className="form-input-row">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  required
                  style={{
                    flex: 1,
                    padding: '14px 18px',
                    borderRadius: '12px',
                    border: '1px solid rgba(255,255,255,0.2)',
                    backgroundColor: 'rgba(255,255,255,0.08)',
                    color: '#FFFFFF',
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '14px',
                    outline: 'none',
                  }}
                />
                <button
                  type="submit"
                  className="btn-primary"
                  style={{
                    backgroundColor: activeTheme.primary,
                    color: '#FAF7F1',
                    border: 'none',
                    borderRadius: '12px',
                    padding: '14px 24px',
                    fontSize: '14px',
                    fontWeight: 600,
                    cursor: 'pointer',
                    whiteSpace: 'nowrap',
                    transition: 'all 300ms ease',
                  }}
                >
                  Subscribe
                </button>
              </div>
            )}
            <span style={{ fontSize: '11px', color: '#8C8D80', fontFamily: 'Inter, sans-serif' }}>
              Strict privacy guarantee. Unsubscribe at any time.
            </span>
          </form>
        </motion.div>
      </div>

      {/* Article Detail Reading Modal */}
      <ArticleModal
        article={selectedArticle}
        isOpen={Boolean(selectedArticle)}
        onClose={() => setSelectedArticle(null)}
      />

      <style>{`
        .pulse-indicator {
          animation: pulseGlow 2s infinite;
        }
        @keyframes pulseGlow {
          0% {
            box-shadow: 0 0 0 0 rgba(181, 100, 61, 0.6);
          }
          70% {
            box-shadow: 0 0 0 6px rgba(181, 100, 61, 0);
          }
          100% {
            box-shadow: 0 0 0 0 rgba(181, 100, 61, 0);
          }
        }

        .accordion-card.is-collapsed:hover {
          transform: translateY(-5px);
          box-shadow: 0 16px 36px rgba(26, 27, 24, 0.12) !important;
        }

        .accordion-card.is-collapsed:hover .collapsed-bg-img {
          transform: scale(1.08);
          filter: brightness(0.7) saturate(1.2) !important;
        }

        .accordion-card.is-collapsed:hover .collapsed-icon-badge {
          transform: scale(1.12);
        }

        .expanded-card-layout:hover .expanded-card-img {
          transform: scale(1.05);
        }

        .read-article-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2) !important;
        }
        .read-article-btn:hover .cta-arrow {
          transform: translateX(4px);
          transition: transform 200ms ease;
        }

        .accordion-nav-btn:hover {
          border-color: #1A1B18 !important;
          transform: scale(1.05);
        }
        .accordion-nav-btn-next:hover {
          transform: scale(1.05);
          filter: brightness(1.1);
        }

        @media (max-width: 960px) {
          .accordion-carousel-container {
            flex-direction: column !important;
            height: auto !important;
          }
          .accordion-card {
            flex: none !important;
            width: 100% !important;
            height: auto !important;
          }
          .accordion-card.is-collapsed {
            display: none !important;
          }
          .expanded-card-layout {
            grid-template-columns: 1fr !important;
          }
          .expanded-card-layout img {
            height: 240px !important;
          }
          .newsletter-box-grid {
            grid-template-columns: 1fr !important;
          }
          .form-input-row {
            flex-direction: column !important;
          }
        }
      `}</style>
    </section>
  );
};

export default JournalSection;
