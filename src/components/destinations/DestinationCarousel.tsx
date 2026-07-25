import React, { useCallback, useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { DESTINATIONS_DATA } from '../../data/journeysData';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, ArrowRight, Compass, Sparkles } from 'lucide-react';
import { Reveal } from '../common/Reveal';

export const DestinationCarousel: React.FC = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      align: 'start',
      containScroll: 'trimSnaps',
      loop: true,
      duration: 35, // Smooth, unhurried slide transition duration
    },
    [
      Autoplay({
        delay: 6500, // Long 6.5s unhurried hold time
        stopOnMouseEnter: true,
        stopOnInteraction: false,
      }),
    ]
  );

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [canScrollPrev, setCanScrollPrev] = useState(true);
  const [canScrollNext, setCanScrollNext] = useState(true);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
  }, [emblaApi, onSelect]);

  const scrollTo = useCallback((index: number) => emblaApi && emblaApi.scrollTo(index), [emblaApi]);
  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

  const activeDestination = DESTINATIONS_DATA[selectedIndex] || DESTINATIONS_DATA[0];

  return (
    <section style={{ padding: '64px 0 96px', position: 'relative', overflow: 'hidden' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>
        
        {/* Carousel Top Section Header */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', marginBottom: '40px', gap: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginBottom: '4px' }}>
            <Sparkles size={14} color="#B5643D" />
            <span className="label-eyebrow" style={{ marginBottom: 0 }}>
              TOP DESTINATIONS THIS SEASON
            </span>
          </div>
          <h2 className="display-lg" style={{ color: '#1A1B18', margin: 0 }}>
            Popular Travel Destinations
          </h2>

          {/* Quick Active Destination Live Status */}
          <div
            style={{
              backgroundColor: '#F1ECE1',
              border: '1px solid #E4DCC8',
              padding: '8px 16px',
              borderRadius: '999px',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              marginTop: '4px',
            }}
          >
            <div
              style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                backgroundColor: '#4A7A5F',
                boxShadow: '0 0 8px rgba(74, 122, 95, 0.6)',
              }}
            />
            <span
              style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '11px',
                fontWeight: 600,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: '#1A1B18',
              }}
            >
              ACTIVE REGION: <strong style={{ color: '#B5643D' }}>{activeDestination.name.toUpperCase()}</strong>
            </span>
          </div>
        </div>

        {/* Embla Viewport for Arch Cards */}
        <div ref={emblaRef} style={{ overflow: 'hidden', cursor: 'grab', paddingBottom: '16px' }}>
          <div style={{ display: 'flex', gap: '28px', marginLeft: '-14px', paddingLeft: '14px' }}>
            {DESTINATIONS_DATA.map((dest, idx) => {
              const isActive = selectedIndex === idx;

              return (
                <div
                  key={dest.slug}
                  style={{
                    flex: '0 0 calc(33.333% - 19px)',
                    minWidth: '300px',
                  }}
                >
                  <Reveal delay={idx * 0.08}>
                    <Link
                      to={`/destinations/${dest.slug}`}
                      style={{ textDecoration: 'none', display: 'block' }}
                      data-cursor="Discover"
                    >
                      {/* Roman Arch Top Silhouette Card */}
                      <div
                        style={{
                          position: 'relative',
                          height: '500px',
                          borderTopLeftRadius: '150px',
                          borderTopRightRadius: '150px',
                          borderBottomLeftRadius: '24px',
                          borderBottomRightRadius: '24px',
                          overflow: 'hidden',
                          boxShadow: isActive
                            ? '0 20px 48px rgba(26, 27, 24, 0.16)'
                            : '0 8px 24px rgba(26, 27, 24, 0.08)',
                          border: isActive ? '2px solid #B5643D' : '1px solid #E4DCC8',
                          transition: 'all 600ms cubic-bezier(0.22, 1, 0.36, 1)',
                        }}
                        className="arch-destination-card"
                      >
                        {/* Immersive Image */}
                        <img
                          src={dest.heroImage}
                          alt={dest.name}
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            transition: 'transform 800ms cubic-bezier(0.22, 1, 0.36, 1)',
                          }}
                          className="arch-card-img"
                        />

                        {/* Top Gradient Scrim */}
                        <div
                          style={{
                            position: 'absolute',
                            inset: 0,
                            background: 'linear-gradient(180deg, rgba(26,27,24,0.3) 0%, rgba(26,27,24,0.1) 40%, rgba(26,27,24,0.85) 100%)',
                            zIndex: 2,
                          }}
                        />

                        {/* Top Arch Badge */}
                        <div
                          style={{
                            position: 'absolute',
                            top: '24px',
                            left: '50%',
                            transform: 'translateX(-50%)',
                            zIndex: 3,
                            backgroundColor: 'rgba(250, 247, 241, 0.88)',
                            backdropFilter: 'blur(8px)',
                            padding: '6px 14px',
                            borderRadius: '999px',
                            border: '1px solid rgba(26, 27, 24, 0.08)',
                          }}
                        >
                          <span
                            style={{
                              fontFamily: 'Inter, sans-serif',
                              fontSize: '10px',
                              fontWeight: 600,
                              letterSpacing: '0.14em',
                              textTransform: 'uppercase',
                              color: '#B5643D',
                            }}
                          >
                            {dest.country} • {dest.region}
                          </span>
                        </div>

                        {/* Floating Warm Glass Bottom Overlay Pill */}
                        <div
                          style={{
                            position: 'absolute',
                            bottom: '16px',
                            left: '16px',
                            right: '16px',
                            zIndex: 3,
                            backgroundColor: 'rgba(250, 247, 241, 0.94)',
                            backdropFilter: 'blur(16px)',
                            WebkitBackdropFilter: 'blur(16px)',
                            borderRadius: '16px',
                            padding: '16px 20px',
                            border: '1px solid rgba(26, 27, 24, 0.08)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            boxShadow: '0 4px 16px rgba(0, 0, 0, 0.08)',
                            transition: 'all 300ms ease',
                          }}
                          className="arch-card-overlay"
                        >
                          <div>
                            <span
                              style={{
                                fontSize: '10px',
                                fontFamily: 'Inter, sans-serif',
                                fontWeight: 600,
                                letterSpacing: '0.1em',
                                textTransform: 'uppercase',
                                color: '#8C8D80',
                                display: 'block',
                                marginBottom: '2px',
                              }}
                            >
                              {dest.durationRange}
                            </span>
                            <h3
                              style={{
                                fontFamily: 'Fraunces, serif',
                                fontSize: '22px',
                                fontWeight: 500,
                                color: '#1A1B18',
                                margin: 0,
                                lineHeight: 1.1,
                              }}
                            >
                              {dest.name}
                            </h3>
                          </div>

                          <div
                            style={{
                              width: '36px',
                              height: '36px',
                              borderRadius: '50%',
                              backgroundColor: '#B5643D',
                              color: '#FAF7F1',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              transition: 'transform 300ms ease',
                            }}
                            className="arch-arrow"
                          >
                            <ArrowRight size={16} />
                          </div>
                        </div>
                      </div>
                    </Link>
                  </Reveal>
                </div>
              );
            })}
          </div>
        </div>

        {/* MINDBLOWING EDITORIAL CONTROLS BAR */}
        <div
          style={{
            marginTop: '32px',
            backgroundColor: '#1A1B18',
            color: '#FAF7F1',
            borderRadius: '20px',
            padding: '20px 28px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '20px',
            boxShadow: '0 12px 36px rgba(26, 27, 24, 0.15)',
          }}
        >
          {/* Active Slide Counter */}
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
            <span
              style={{
                fontFamily: 'Fraunces, serif',
                fontSize: '32px',
                fontWeight: 400,
                color: '#C9A15E',
                lineHeight: 1,
              }}
            >
              0{selectedIndex + 1}
            </span>
            <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '13px', color: '#8C8D80' }}>
              / 0{DESTINATIONS_DATA.length}
            </span>
          </div>

          {/* Interactive Destination Slide Pills */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
            {DESTINATIONS_DATA.map((d, index) => {
              const isCurrent = selectedIndex === index;
              return (
                <button
                  key={d.slug}
                  onClick={() => scrollTo(index)}
                  style={{
                    backgroundColor: isCurrent ? '#B5643D' : 'rgba(255, 255, 255, 0.08)',
                    color: isCurrent ? '#FAF7F1' : '#8C8D80',
                    border: isCurrent ? 'none' : '1px solid rgba(255, 255, 255, 0.12)',
                    padding: '8px 16px',
                    borderRadius: '999px',
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '12px',
                    fontWeight: 600,
                    cursor: 'pointer',
                    transition: 'all 300ms ease',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                  }}
                >
                  <Compass size={12} color={isCurrent ? '#FAF7F1' : '#8C8D80'} />
                  <span>{d.name}</span>
                </button>
              );
            })}
          </div>

          {/* Nav Arrow Controls */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <button
              onClick={scrollPrev}
              disabled={!canScrollPrev}
              aria-label="Previous Destination"
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                color: '#FAF7F1',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                opacity: canScrollPrev ? 1 : 0.5,
                transition: 'all 200ms ease',
              }}
            >
              <ChevronLeft size={18} />
            </button>

            <button
              onClick={scrollNext}
              disabled={!canScrollNext}
              aria-label="Next Destination"
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                color: '#FAF7F1',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                opacity: canScrollNext ? 1 : 0.5,
                transition: 'all 200ms ease',
              }}
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>

      <style>{`
        .arch-destination-card:hover .arch-card-img {
          transform: scale(1.08);
        }
        .arch-destination-card:hover .arch-arrow {
          transform: rotate(-45deg) scale(1.1);
          background-color: #1A1B18 !important;
        }
        .arch-destination-card:hover .arch-card-overlay {
          background-color: rgba(250, 247, 241, 0.98) !important;
          transform: translateY(-4px);
        }
        @media (max-width: 960px) {
          .arch-destination-card {
            height: 420px !important;
            border-top-left-radius: 120px !important;
            border-top-right-radius: 120px !important;
          }
        }
      `}</style>
    </section>
  );
};

export default DestinationCarousel;
