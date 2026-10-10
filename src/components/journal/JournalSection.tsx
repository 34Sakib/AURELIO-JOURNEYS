import React, { useCallback, useEffect, useState, useRef } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
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
  ArrowDown
} from 'lucide-react';
import { motion } from 'framer-motion';

export const JournalSection: React.FC = () => {
  const [selectedArticle, setSelectedArticle] = useState<JournalArticle | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [emailInput, setEmailInput] = useState<string>('');
  const [subscribed, setSubscribed] = useState<boolean>(false);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(true);

  const sectionRef = useRef<HTMLElement>(null);

  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: 'start',
    containScroll: 'trimSnaps',
    loop: false,
    duration: 30,
    dragFree: false,
  });

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
    const progress = Math.max(0, Math.min(1, emblaApi.scrollProgress()));
    setScrollProgress(progress * 100);
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on('select', onSelect);
    emblaApi.on('scroll', onSelect);
    emblaApi.on('reInit', onSelect);

    return () => {
      emblaApi.off('select', onSelect);
      emblaApi.off('scroll', onSelect);
    };
  }, [emblaApi, onSelect]);

  // Scroll-lock effect: When user is in this section, vertical wheel scroll moves cards horizontally.
  // The user cannot scroll below until all cards are viewed!
  useEffect(() => {
    const section = sectionRef.current;
    if (!section || !emblaApi) return;

    let isScrolling = false;

    const handleWheel = (e: WheelEvent) => {
      const rect = section.getBoundingClientRect();
      const viewportHeight = window.innerHeight;

      // Section is active in view when its top has reached near viewport top
      const isInFocus = rect.top <= 80 && rect.bottom >= viewportHeight * 0.75;

      if (!isInFocus) return;

      if (e.deltaY > 15) {
        // Scrolling DOWN
        if (emblaApi.canScrollNext()) {
          e.preventDefault();
          if (!isScrolling) {
            isScrolling = true;
            emblaApi.scrollNext();
            setTimeout(() => {
              isScrolling = false;
            }, 300);
          }
        }
        // If !canScrollNext (last card reached), wheel continues naturally down the page!
      } else if (e.deltaY < -15) {
        // Scrolling UP
        if (emblaApi.canScrollPrev()) {
          e.preventDefault();
          if (!isScrolling) {
            isScrolling = true;
            emblaApi.scrollPrev();
            setTimeout(() => {
              isScrolling = false;
            }, 300);
          }
        }
        // If !canScrollPrev (first card reached), wheel continues naturally up the page!
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    return () => {
      window.removeEventListener('wheel', handleWheel);
    };
  }, [emblaApi]);

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
      ref={sectionRef}
      style={{
        padding: '90px 0 96px',
        backgroundColor: '#FAF7F1',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Ambient Spotlight Background Glows */}
      <div
        style={{
          position: 'absolute',
          top: '20%',
          right: '5%',
          width: '500px',
          height: '500px',
          background: 'radial-gradient(circle, rgba(181, 100, 61, 0.08) 0%, rgba(250, 247, 241, 0) 70%)',
          pointerEvents: 'none',
          zIndex: 1,
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: '20%',
          left: '5%',
          width: '500px',
          height: '500px',
          background: 'radial-gradient(circle, rgba(23, 61, 58, 0.06) 0%, rgba(250, 247, 241, 0) 70%)',
          pointerEvents: 'none',
          zIndex: 1,
        }}
      />

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
          style={{ marginBottom: '32px' }}
        >
          {/* Eyebrow & Live Status */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '14px', marginBottom: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
              <span className="label-eyebrow" style={{ color: '#B5643D', margin: 0 }}>
                TRAVEL BLOG & DESTINATION GUIDES
              </span>
              <span
                style={{
                  backgroundColor: '#B5643D',
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
                  boxShadow: '0 2px 8px rgba(181, 100, 61, 0.25)',
                }}
              >
                <Flame size={12} />
                <span>Curated Edition</span>
              </span>
            </div>

            {/* Scroll Lock Notice Badge (No Numbers, No Pagination) */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                backgroundColor: '#FFFFFF',
                border: '1px solid #E4DCC8',
                padding: '6px 14px',
                borderRadius: '999px',
                boxShadow: '0 2px 8px rgba(26, 27, 24, 0.04)',
              }}
            >
              <ArrowDown size={12} color="#B5643D" className="bounce-down-icon" />
              <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '11px', fontWeight: 600, color: '#1A1B18', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                Scroll down to browse all stories
              </span>
            </div>
          </div>

          {/* Title & Navigation Controls Row */}
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: '24px', flexWrap: 'wrap' }}>
            <div>
              <h2 className="display-lg" style={{ color: '#1A1B18', margin: 0, fontSize: 'clamp(28px, 3.8vw, 42px)', lineHeight: 1.15, marginBottom: '8px' }}>
                Inspiring Travel Stories & Insider Guides
              </h2>
              <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '15px', color: '#5C5D54', margin: 0, maxWidth: '640px', lineHeight: 1.6 }}>
                Discover expert travel philosophy, seasonal vacation guides, and destination insights from our private curators across six continents.
              </p>
            </div>

            {/* Navigation Arrows (No Numbers, No Pagination) */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <button
                onClick={scrollPrev}
                disabled={!canScrollPrev}
                aria-label="Previous Story"
                style={{
                  width: '46px',
                  height: '46px',
                  borderRadius: '50%',
                  backgroundColor: '#FFFFFF',
                  border: '1px solid #E4DCC8',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#1A1B18',
                  cursor: canScrollPrev ? 'pointer' : 'default',
                  opacity: canScrollPrev ? 1 : 0.45,
                  transition: 'all 200ms ease',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                }}
                className="journal-nav-btn"
              >
                <ChevronLeft size={20} />
              </button>

              <button
                onClick={scrollNext}
                disabled={!canScrollNext}
                aria-label="Next Story"
                style={{
                  width: '46px',
                  height: '46px',
                  borderRadius: '50%',
                  backgroundColor: '#B5643D',
                  border: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#FAF7F1',
                  cursor: canScrollNext ? 'pointer' : 'default',
                  opacity: canScrollNext ? 1 : 0.45,
                  transition: 'all 200ms ease',
                  boxShadow: '0 4px 14px rgba(181, 100, 61, 0.35)',
                }}
                className="journal-nav-btn-next"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        </motion.div>

        {/* HORIZONTAL CARDS TRACK */}
        <div
          ref={emblaRef}
          style={{
            overflow: 'hidden',
            cursor: 'grab',
            padding: '8px 0 28px',
            userSelect: 'none',
          }}
          className="journal-embla-viewport"
        >
          <div style={{ display: 'flex', gap: '28px', marginLeft: '-14px', paddingLeft: '14px' }}>
            {JOURNAL_ARTICLES.map((article) => (
              <div
                key={article.id}
                style={{
                  flex: '0 0 clamp(310px, 30vw, 400px)',
                  minWidth: '290px',
                }}
                className="journal-slide-item"
              >
                <div
                  onClick={() => setSelectedArticle(article)}
                  style={{
                    backgroundColor: '#FFFFFF',
                    borderRadius: '20px',
                    overflow: 'hidden',
                    boxShadow: '0 8px 24px rgba(26, 27, 24, 0.05)',
                    border: '1px solid #E4DCC8',
                    cursor: 'pointer',
                    position: 'relative',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    transition: 'all 350ms cubic-bezier(0.22, 1, 0.36, 1)',
                  }}
                  className="journal-card"
                >
                  {/* Top Hairline Indicator */}
                  <div className="card-top-hairline" />

                  <div>
                    {/* Cover Image Container */}
                    <div style={{ height: '210px', overflow: 'hidden', position: 'relative' }}>
                      <img
                        src={article.image}
                        alt={article.title}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          transition: 'transform 700ms cubic-bezier(0.22, 1, 0.36, 1)',
                        }}
                        className="journal-img"
                      />

                      {/* Top Gradient Vignette */}
                      <div
                        style={{
                          position: 'absolute',
                          inset: 0,
                          background: 'linear-gradient(180deg, rgba(26, 27, 24, 0.3) 0%, rgba(26, 27, 24, 0) 50%, rgba(26, 27, 24, 0.4) 100%)',
                          pointerEvents: 'none',
                        }}
                      />

                      {/* Category Floating Badge */}
                      <span
                        style={{
                          position: 'absolute',
                          top: '14px',
                          left: '14px',
                          backgroundColor: 'rgba(250, 247, 241, 0.94)',
                          color: '#B5643D',
                          backdropFilter: 'blur(8px)',
                          WebkitBackdropFilter: 'blur(8px)',
                          padding: '5px 12px',
                          borderRadius: '999px',
                          fontSize: '10px',
                          fontWeight: 700,
                          textTransform: 'uppercase',
                          letterSpacing: '0.08em',
                          border: '1px solid rgba(181, 100, 61, 0.15)',
                          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                        }}
                      >
                        {article.category}
                      </span>

                      {/* Audio Monograph Badge */}
                      <div
                        style={{
                          position: 'absolute',
                          bottom: '14px',
                          right: '14px',
                          backgroundColor: 'rgba(26, 27, 24, 0.88)',
                          backdropFilter: 'blur(8px)',
                          WebkitBackdropFilter: 'blur(8px)',
                          color: '#FAF7F1',
                          padding: '4px 10px',
                          borderRadius: '999px',
                          fontSize: '10px',
                          fontFamily: 'Inter, sans-serif',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '5px',
                          border: '1px solid rgba(255, 255, 255, 0.15)',
                        }}
                      >
                        <Headphones size={11} color="#C9A15E" />
                        <span>Audio Monograph</span>
                      </div>
                    </div>

                    {/* Card Body */}
                    <div style={{ padding: '20px 22px 14px' }}>
                      {/* Author and Date Meta */}
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
                        <div
                          style={{
                            width: '24px',
                            height: '24px',
                            borderRadius: '50%',
                            backgroundColor: '#FAF7F1',
                            border: '1px solid #B5643D',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: '#B5643D',
                          }}
                        >
                          <User size={12} />
                        </div>
                        <span style={{ fontSize: '12px', fontWeight: 600, color: '#1A1B18', fontFamily: 'Fraunces, serif' }}>
                          {article.author}
                        </span>
                        <span style={{ fontSize: '11px', color: '#8C8D80', fontFamily: 'Inter, sans-serif', marginLeft: 'auto' }}>
                          {article.date} • <Clock size={11} style={{ display: 'inline', verticalAlign: 'middle' }} /> {article.readTime}
                        </span>
                      </div>

                      {/* Article Title */}
                      <h3
                        style={{
                          fontFamily: 'Fraunces, serif',
                          fontSize: '19px',
                          color: '#1A1B18',
                          lineHeight: 1.3,
                          marginBottom: '10px',
                        }}
                        className="journal-card-title"
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
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: 'vertical',
                          overflow: 'hidden',
                        }}
                      >
                        {article.excerpt}
                      </p>
                    </div>
                  </div>

                  {/* Card Action Footer */}
                  <div
                    style={{
                      padding: '14px 22px 18px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      borderTop: '1px solid #F1ECE1',
                    }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        color: '#B5643D',
                        fontSize: '12px',
                        fontWeight: 600,
                        fontFamily: 'Inter, sans-serif',
                      }}
                      className="read-cta"
                    >
                      <span>Read Monograph</span>
                      <ArrowRight size={13} className="cta-arrow" />
                    </div>

                    <span style={{ fontSize: '11px', color: '#8C8D80', fontFamily: 'Inter, sans-serif' }}>
                      Click to Open
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* REAL-TIME HORIZONTAL SCROLL PROGRESS LINE (NO NUMBERS, NO PAGINATION) */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: '8px',
            marginBottom: '60px',
          }}
        >
          <div
            style={{
              width: '100%',
              maxWidth: '380px',
              height: '4px',
              backgroundColor: '#E4DCC8',
              borderRadius: '999px',
              overflow: 'hidden',
              position: 'relative',
            }}
          >
            <div
              style={{
                height: '100%',
                width: `${Math.max(16, scrollProgress)}%`,
                background: 'linear-gradient(90deg, #B5643D 0%, #C9A15E 100%)',
                borderRadius: '999px',
                transition: 'width 250ms ease-out',
              }}
            />
          </div>
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
                    backgroundColor: '#B5643D',
                    color: '#FAF7F1',
                    border: 'none',
                    borderRadius: '12px',
                    padding: '14px 24px',
                    fontSize: '14px',
                    fontWeight: 600,
                    cursor: 'pointer',
                    whiteSpace: 'nowrap',
                    transition: 'all 200ms ease',
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
        .bounce-down-icon {
          animation: bounceDown 1.8s ease-in-out infinite;
        }
        @keyframes bounceDown {
          0%, 100% {
            transform: translateY(-2px);
          }
          50% {
            transform: translateY(3px);
          }
        }

        .journal-embla-viewport:active {
          cursor: grabbing !important;
        }

        .card-top-hairline {
          position: absolute;
          top: 0;
          left: 0;
          height: 3px;
          width: 0%;
          background: linear-gradient(90deg, #B5643D 0%, #C9A15E 100%);
          transition: width 400ms ease;
          z-index: 5;
        }
        .journal-card:hover .card-top-hairline {
          width: 100% !important;
        }
        .journal-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 20px 48px rgba(181, 100, 61, 0.15) !important;
          border-color: #B5643D !important;
        }
        .journal-card:hover .journal-img {
          transform: scale(1.06);
        }
        .journal-card:hover .journal-card-title {
          color: #B5643D;
        }
        .journal-card:hover .cta-arrow {
          transform: translateX(6px);
          transition: transform 250ms ease;
        }

        .journal-nav-btn:hover:not(:disabled) {
          border-color: #B5643D !important;
          color: #B5643D !important;
          transform: scale(1.05);
        }
        .journal-nav-btn-next:hover:not(:disabled) {
          background-color: #9E522F !important;
          transform: scale(1.05);
        }

        @media (max-width: 960px) {
          .journal-slide-item {
            flex: 0 0 85% !important;
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
