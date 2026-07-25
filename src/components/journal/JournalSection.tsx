
import React, { useCallback, useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { JOURNAL_ARTICLES, JournalArticle } from '../../data/journeysData';
import { ArticleModal } from './ArticleModal';
import { ArrowRight, ChevronLeft, ChevronRight, Clock, Headphones, Sparkles, User, Flame } from 'lucide-react';
import { motion } from 'framer-motion';

export const JournalSection: React.FC = () => {
  const [selectedArticle, setSelectedArticle] = useState<JournalArticle | null>(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);
  const [emailInput, setEmailInput] = useState<string>('');
  const [subscribed, setSubscribed] = useState<boolean>(false);

  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      align: 'center',
      containScroll: false,
      loop: true,
      duration: 40, // Experimental fluid inertia
    },
    [
      Autoplay({
        delay: 5000,
        stopOnMouseEnter: true,
        stopOnInteraction: false,
      }),
    ]
  );

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const scrollTo = useCallback(
    (index: number) => {
      if (emblaApi) emblaApi.scrollTo(index);
    },
    [emblaApi]
  );

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    setScrollSnaps(emblaApi.scrollSnapList());
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
    return () => {
      emblaApi.off('select', onSelect);
      emblaApi.off('reInit', onSelect);
    };
  }, [emblaApi, onSelect]);

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
        padding: '120px 24px',
        backgroundColor: '#FAF7F1',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Experimental Ambient Spotlight Glow behind Active Slide */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '600px',
          height: '400px',
          background: 'radial-gradient(circle, rgba(181, 100, 61, 0.12) 0%, rgba(250, 247, 241, 0) 70%)',
          pointerEvents: 'none',
          zIndex: 1,
          transition: 'all 500ms ease',
        }}
      />

      <div
        style={{
          maxWidth: '1340px',
          margin: '0 auto',
          position: 'relative',
          zIndex: 2,
        }}
      >
        {/* Section Header with Experimental Control Bar */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          style={{ marginBottom: '48px', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', marginBottom: '12px', flexWrap: 'wrap' }}>
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
              }}
            >
              <Flame size={12} />
              <span>Trending</span>
            </span>
          </div>

          <h2 className="display-lg" style={{ color: '#1A1B18', margin: 0, fontSize: '38px', marginBottom: '8px' }}>
            Inspiring Travel Stories & Insider Guides
          </h2>
          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '15px', color: '#5C5D54', margin: 0, marginBottom: '20px' }}>
            Discover expert travel advice, seasonal vacation guides, and destination insights from our travel advisors.
          </p>

          {/* Experimental Carousel Control Bar */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            {/* Active Fraction Pill with Pulsing Ring */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                backgroundColor: '#FFFFFF',
                border: '1px solid #E4DCC8',
                padding: '8px 16px',
                borderRadius: '999px',
                boxShadow: '0 4px 12px rgba(26, 27, 24, 0.04)',
              }}
            >
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#B5643D', display: 'inline-block' }} />
              <div style={{ fontFamily: 'Fraunces, serif', fontSize: '15px', color: '#1A1B18' }}>
                <span style={{ fontWeight: 700, color: '#B5643D' }}>0{selectedIndex + 1}</span>
                <span style={{ color: '#8C8D80', margin: '0 4px' }}>/</span>
                <span style={{ color: '#8C8D80' }}>0{JOURNAL_ARTICLES.length}</span>
              </div>
            </div>

            {/* Circular Navigation Buttons */}
            <div style={{ display: 'flex', gap: '8px' }}>
              <button
                onClick={scrollPrev}
                aria-label="Previous Dispatch"
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
                  cursor: 'pointer',
                  transition: 'all 200ms ease',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                }}
                className="carousel-arrow-btn"
              >
                <ChevronLeft size={20} />
              </button>

              <button
                onClick={scrollNext}
                aria-label="Next Dispatch"
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
                  cursor: 'pointer',
                  transition: 'all 200ms ease',
                  boxShadow: '0 4px 14px rgba(181, 100, 61, 0.35)',
                }}
                className="carousel-arrow-btn-next"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        </motion.div>

        {/* EXPERIMENTAL 3D DEPTH CAROUSEL TRACK */}
        <div style={{ overflow: 'visible', padding: '16px 0 32px' }} ref={emblaRef}>
          <div style={{ display: 'flex', gap: '24px' }}>
            {JOURNAL_ARTICLES.map((article, idx) => {
              const isActive = selectedIndex === idx;

              return (
                <div
                  key={article.id}
                  style={{
                    flex: '0 0 400px',
                    minWidth: 0,
                    transition: 'all 500ms cubic-bezier(0.22, 1, 0.36, 1)',
                    transform: isActive ? 'scale(1.03) translateY(-4px)' : 'scale(0.94) translateY(6px)',
                    opacity: isActive ? 1 : 0.7,
                    filter: isActive ? 'none' : 'grayscale(20%)',
                  }}
                  className="experimental-slide"
                >
                  <div
                    onClick={() => setSelectedArticle(article)}
                    style={{
                      backgroundColor: '#FFFFFF',
                      borderRadius: '20px',
                      overflow: 'hidden',
                      boxShadow: isActive
                        ? '0 20px 48px rgba(181, 100, 61, 0.16)'
                        : '0 6px 18px rgba(26, 27, 24, 0.04)',
                      border: isActive ? '2px solid #B5643D' : '1px solid #E4DCC8',
                      cursor: 'pointer',
                      position: 'relative',
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      transition: 'all 400ms ease',
                    }}
                    className="journal-card"
                  >
                    {/* Top Hairline Accent Line */}
                    <div className="card-top-hairline" style={{ width: isActive ? '100%' : '0%' }} />

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

                        {/* Category Badge */}
                        <span
                          style={{
                            position: 'absolute',
                            top: '14px',
                            left: '14px',
                            backgroundColor: isActive ? '#B5643D' : 'rgba(250, 247, 241, 0.94)',
                            color: isActive ? '#FAF7F1' : '#B5643D',
                            backdropFilter: 'blur(8px)',
                            padding: '5px 12px',
                            borderRadius: '999px',
                            fontSize: '10px',
                            fontWeight: 700,
                            textTransform: 'uppercase',
                            letterSpacing: '0.08em',
                            boxShadow: isActive ? '0 4px 12px rgba(181, 100, 61, 0.3)' : 'none',
                          }}
                        >
                          {article.category}
                        </span>

                        {/* Audio Dispatch Badge */}
                        <div
                          style={{
                            position: 'absolute',
                            bottom: '14px',
                            right: '14px',
                            backgroundColor: 'rgba(26, 27, 24, 0.85)',
                            backdropFilter: 'blur(8px)',
                            color: '#FAF7F1',
                            padding: '4px 10px',
                            borderRadius: '999px',
                            fontSize: '10px',
                            fontFamily: 'Inter, sans-serif',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '5px',
                          }}
                        >
                          <Headphones size={11} color="#C9A15E" />
                          <span>Audio Monograph</span>
                        </div>
                      </div>

                      {/* Content Box */}
                      <div style={{ padding: '20px 22px 16px' }}>
                        {/* Metadata Line */}
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

                        {/* Title */}
                        <h3
                          style={{
                            fontFamily: 'Fraunces, serif',
                            fontSize: '19px',
                            color: '#1A1B18',
                            lineHeight: 1.3,
                            marginBottom: '10px',
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
                            lineHeight: 1.55,
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
                    <div style={{ padding: '0 22px 18px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid #F1ECE1', paddingTop: '14px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#B5643D', fontSize: '12px', fontWeight: 600, fontFamily: 'Inter, sans-serif' }} className="read-cta">
                        <span>Read Monograph</span>
                        <ArrowRight size={13} className="cta-arrow" />
                      </div>

                      <span style={{ fontSize: '10px', color: '#8C8D80', fontFamily: 'Inter, sans-serif' }}>
                        Click to Expand
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* EXPERIMENTAL SLIDE PROGRESS JUMP PILLS */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', marginBottom: '56px' }}>
          {scrollSnaps.map((_, idx) => {
            const isActive = selectedIndex === idx;
            return (
              <button
                key={idx}
                onClick={() => scrollTo(idx)}
                style={{
                  width: isActive ? '36px' : '10px',
                  height: '10px',
                  borderRadius: '999px',
                  backgroundColor: isActive ? '#B5643D' : '#E4DCC8',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'all 350ms cubic-bezier(0.22, 1, 0.36, 1)',
                  boxShadow: isActive ? '0 2px 8px rgba(181, 100, 61, 0.4)' : 'none',
                }}
              />
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
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#C9A15E', fontSize: '11px', fontFamily: 'Inter, sans-serif', fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: '8px' }}>
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
              <div style={{ backgroundColor: 'rgba(74, 122, 95, 0.3)', border: '1px solid #4A7A5F', padding: '14px 20px', borderRadius: '12px', color: '#FAF7F1', fontSize: '14px', textAlign: 'center', fontFamily: 'Inter, sans-serif' }}>
                ✓ Welcome to The Monograph Dispatch. Check your inbox for Issue 04.
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
        .card-top-hairline {
          position: absolute;
          top: 0;
          left: 0;
          height: 3px;
          background-color: #B5643D;
          transition: width 400ms ease;
          z-index: 5;
        }
        .journal-card:hover .card-top-hairline {
          width: 100% !important;
        }
        .journal-card:hover .journal-img {
          transform: scale(1.06);
        }
        .journal-card:hover .cta-arrow {
          transform: translateX(6px);
          transition: transform 250ms ease;
        }
        .carousel-arrow-btn:hover {
          border-color: #B5643D !important;
          color: #B5643D !important;
        }
        .carousel-arrow-btn-next:hover {
          background-color: #9E522F !important;
        }
        @media (max-width: 960px) {
          .experimental-slide {
            flex: 0 0 88% !important;
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
