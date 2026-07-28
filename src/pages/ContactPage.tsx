import React from 'react';
import { Reveal } from '../components/common/Reveal';
import { Compass, MapPin, Mail, Phone, Clock, ShieldCheck, Sparkles, MessageSquare, Globe, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const ATELIERS = [
  {
    city: 'Tokyo Atelier',
    region: 'Asia-Pacific Hub',
    address: '4-12 Ginza, Chuo-ku, Tokyo 104-0061',
    phone: '+81 (0)3 5555 0192',
    email: 'tokyo@aureliojourneys.com',
    hours: '09:00 — 18:00 JST',
    image: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?q=80&w=800&auto=format&fit=crop',
    tag: 'Asia & Japan Sanctuary Desk',
  },
  {
    city: 'Paris Atelier',
    region: 'European Operations',
    address: '28 Place Vendôme, 75001 Paris',
    phone: '+33 (0)1 42 68 55 00',
    email: 'paris@aureliojourneys.com',
    hours: '09:00 — 18:00 CET',
    image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=800&auto=format&fit=crop',
    tag: 'Mediterranean & Yachting Desk',
  },
  {
    city: 'New York Atelier',
    region: 'Americas Division',
    address: '767 Fifth Avenue, New York, NY 10153',
    phone: '+1 (212) 555 0148',
    email: 'newyork@aureliojourneys.com',
    hours: '09:00 — 18:00 EST',
    image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?q=80&w=800&auto=format&fit=crop',
    tag: 'Private Aviation & Expeditions',
  },
  {
    city: 'Zurich Atelier',
    region: 'Alpine & Heritage Desk',
    address: 'Bahnhofstrasse 42, 8001 Zürich',
    phone: '+41 (0)44 211 00 22',
    email: 'zurich@aureliojourneys.com',
    hours: '09:00 — 18:00 CET',
    image: 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?q=80&w=800&auto=format&fit=crop',
    tag: 'Swiss Chalet & Escrow Security',
  },
];

export const ContactPage: React.FC = () => {
  return (
    <div style={{ paddingTop: '100px', paddingBottom: '96px', backgroundColor: '#FAF7F1' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>
        
        {/* 1. HERO BANNER WITH RICH BACKGROUND IMAGE & KEY HIGHLIGHT OVERLAYS */}
        <Reveal>
          <div
            style={{
              position: 'relative',
              borderRadius: '24px',
              overflow: 'hidden',
              marginBottom: '64px',
              minHeight: '380px',
              display: 'flex',
              alignItems: 'center',
              boxShadow: '0 20px 48px rgba(26, 27, 24, 0.12)',
              border: '1px solid #E4DCC8',
            }}
          >
            {/* Background Image */}
            <img
              src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1600&auto=format&fit=crop"
              alt="Global Concierge Lounge"
              style={{
                position: 'absolute',
                inset: 0,
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
            />

            {/* Dark Scrim Overlay */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(135deg, rgba(26, 27, 24, 0.92) 0%, rgba(23, 61, 58, 0.82) 60%, rgba(26, 27, 24, 0.9) 100%)',
              }}
            />

            {/* Hero Content Grid */}
            <div
              style={{
                position: 'relative',
                zIndex: 10,
                padding: 'clamp(28px, 5vw, 56px)',
                width: '100%',
                display: 'grid',
                gridTemplateColumns: '1.2fr 0.8fr',
                gap: '40px',
                alignItems: 'center',
              }}
              className="contact-hero-grid"
            >
              {/* Left Column: Heading & Hook */}
              <div>
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
                  }}
                >
                  <Sparkles size={14} color="#C9A15E" />
                  <span
                    style={{
                      fontFamily: 'Inter, sans-serif',
                      fontSize: '11px',
                      fontWeight: 700,
                      letterSpacing: '0.14em',
                      textTransform: 'uppercase',
                      color: '#FAF7F1',
                    }}
                  >
                    Global Concierge & Travel Ateliers
                  </span>
                </div>

                <h1
                  className="display-lg"
                  style={{ color: '#FFFFFF', marginBottom: '16px', fontSize: 'clamp(32px, 4.5vw, 52px)', lineHeight: 1.1 }}
                >
                  We Are at Your Service Worldwide 24/7
                </h1>

                <p
                  className="body-lg"
                  style={{ color: 'rgba(250, 247, 241, 0.88)', marginBottom: '28px', maxWidth: '560px', fontSize: '16px', lineHeight: 1.6 }}
                >
                  Connect directly with senior travel curators to book vacation packages, private aviation, luxury resort stays, and custom holiday itineraries.
                </p>

                <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                  <Link to="/enquire" className="btn-primary" style={{ padding: '14px 28px', fontSize: '14px' }}>
                    <MessageSquare size={16} />
                    <span>Plan Custom Trip</span>
                  </Link>
                  <a
                    href="tel:+12125550148"
                    className="btn-secondary-dark"
                    style={{ padding: '14px 24px', fontSize: '14px', borderRadius: '8px', backdropFilter: 'blur(8px)' }}
                  >
                    <Phone size={15} />
                    <span>Call Concierge Desk</span>
                  </a>
                </div>
              </div>

              {/* Right Column: Key Service Highlights Cards */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div
                  style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    backdropFilter: 'blur(16px)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    borderRadius: '16px',
                    padding: '16px 20px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '14px',
                    color: '#FAF7F1',
                  }}
                >
                  <div
                    style={{
                      width: '44px',
                      height: '44px',
                      borderRadius: '12px',
                      backgroundColor: 'rgba(181, 100, 61, 0.3)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#C9A15E',
                      flexShrink: 0,
                    }}
                  >
                    <Clock size={20} />
                  </div>
                  <div>
                    <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px', fontWeight: 700, display: 'block' }}>
                      Rapid Response (Under 2 Hours)
                    </span>
                    <span style={{ fontSize: '12px', color: 'rgba(250, 247, 241, 0.75)' }}>
                      Guaranteed preliminary proposals within 2-4 hours.
                    </span>
                  </div>
                </div>

                <div
                  style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    backdropFilter: 'blur(16px)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    borderRadius: '16px',
                    padding: '16px 20px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '14px',
                    color: '#FAF7F1',
                  }}
                >
                  <div
                    style={{
                      width: '44px',
                      height: '44px',
                      borderRadius: '12px',
                      backgroundColor: 'rgba(23, 61, 58, 0.5)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#C9A15E',
                      flexShrink: 0,
                    }}
                  >
                    <Globe size={20} />
                  </div>
                  <div>
                    <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px', fontWeight: 700, display: 'block' }}>
                      4 Global Atelier Hubs
                    </span>
                    <span style={{ fontSize: '12px', color: 'rgba(250, 247, 241, 0.75)' }}>
                      Tokyo • Paris • New York • Zurich
                    </span>
                  </div>
                </div>

                <div
                  style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    backdropFilter: 'blur(16px)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    borderRadius: '16px',
                    padding: '16px 20px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '14px',
                    color: '#FAF7F1',
                  }}
                >
                  <div
                    style={{
                      width: '44px',
                      height: '44px',
                      borderRadius: '12px',
                      backgroundColor: 'rgba(74, 122, 95, 0.3)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#4A7A5F',
                      flexShrink: 0,
                    }}
                  >
                    <ShieldCheck size={20} color="#7FCE9D" />
                  </div>
                  <div>
                    <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px', fontWeight: 700, display: 'block' }}>
                      100% Financial Escrow
                    </span>
                    <span style={{ fontSize: '12px', color: 'rgba(250, 247, 241, 0.75)' }}>
                      Full refund flexibility & secure booking guarantees.
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        {/* 2. FEATURED ATELIER LOCATION CARDS WITH CITY PHOTOGRAPHY */}
        <div style={{ marginBottom: '64px' }}>
          <Reveal>
            <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 40px' }}>
              <span className="label-eyebrow">GLOBAL PRESENCE</span>
              <h2 className="display-md" style={{ color: '#1A1B18', marginBottom: '12px' }}>
                Our International Ateliers
              </h2>
              <p className="body-md">
                Visit or call our private offices around the globe to discuss custom itineraries with our resident specialists.
              </p>
            </div>
          </Reveal>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
              gap: '32px',
            }}
          >
            {ATELIERS.map((atelier, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <div
                  style={{
                    backgroundColor: '#FFFFFF',
                    borderRadius: '20px',
                    overflow: 'hidden',
                    border: '1px solid #E4DCC8',
                    boxShadow: '0 4px 20px rgba(26, 27, 24, 0.05)',
                    transition: 'transform 350ms ease, box-shadow 350ms ease',
                  }}
                  className="atelier-card"
                >
                  {/* Atelier Header Image (180px height) */}
                  <div style={{ position: 'relative', height: '180px', overflow: 'hidden' }}>
                    <img
                      src={atelier.image}
                      alt={atelier.city}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        transition: 'transform 600ms ease',
                      }}
                      className="atelier-img"
                    />
                    <div
                      style={{
                        position: 'absolute',
                        inset: 0,
                        background: 'linear-gradient(180deg, rgba(26,27,24,0.1) 0%, rgba(26,27,24,0.7) 100%)',
                      }}
                    />
                    
                    {/* Floating City & Region Tag */}
                    <div
                      style={{
                        position: 'absolute',
                        bottom: '12px',
                        left: '16px',
                        right: '16px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                      }}
                    >
                      <div>
                        <span style={{ fontSize: '10px', color: '#C9A15E', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', display: 'block' }}>
                          {atelier.region}
                        </span>
                        <h3 style={{ fontFamily: 'Fraunces, serif', fontSize: '22px', color: '#FFFFFF', lineHeight: 1.1 }}>
                          {atelier.city}
                        </h3>
                      </div>
                    </div>
                  </div>

                  {/* Contact Info Body */}
                  <div style={{ padding: '24px' }}>
                    <div
                      style={{
                        display: 'inline-block',
                        backgroundColor: 'rgba(181, 100, 61, 0.12)',
                        color: '#B5643D',
                        fontSize: '11px',
                        fontWeight: 600,
                        padding: '4px 10px',
                        borderRadius: '6px',
                        marginBottom: '16px',
                      }}
                    >
                      {atelier.tag}
                    </div>

                    <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '14px', color: '#5C5D54', fontFamily: 'Inter, sans-serif' }}>
                      <li style={{ display: 'flex', gap: '10px' }}>
                        <MapPin size={16} color="#B5643D" style={{ flexShrink: 0, marginTop: '2px' }} />
                        <span>{atelier.address}</span>
                      </li>
                      <li style={{ display: 'flex', gap: '10px' }}>
                        <Phone size={16} color="#B5643D" style={{ flexShrink: 0, marginTop: '2px' }} />
                        <a href={`tel:${atelier.phone.replace(/[^0-9+]/g, '')}`} style={{ color: '#1A1B18', fontWeight: 600, textDecoration: 'none' }}>
                          {atelier.phone}
                        </a>
                      </li>
                      <li style={{ display: 'flex', gap: '10px' }}>
                        <Mail size={16} color="#B5643D" style={{ flexShrink: 0, marginTop: '2px' }} />
                        <a href={`mailto:${atelier.email}`} style={{ color: '#5C5D54', textDecoration: 'none' }}>
                          {atelier.email}
                        </a>
                      </li>
                      <li style={{ display: 'flex', gap: '10px' }}>
                        <Clock size={16} color="#B5643D" style={{ flexShrink: 0, marginTop: '2px' }} />
                        <span>{atelier.hours}</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* 3. BOTTOM CTA BANNER WITH RESORT PHOTOGRAPHY */}
        <Reveal>
          <div
            style={{
              position: 'relative',
              borderRadius: '24px',
              overflow: 'hidden',
              padding: 'clamp(36px, 6vw, 64px) 32px',
              textAlign: 'center',
              color: '#FAF7F1',
              boxShadow: '0 20px 48px rgba(0, 0, 0, 0.2)',
            }}
          >
            <img
              src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=1600&auto=format&fit=crop"
              alt="Luxury Vacation Destination"
              style={{
                position: 'absolute',
                inset: 0,
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
            />
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(180deg, rgba(23, 61, 58, 0.88) 0%, rgba(26, 27, 24, 0.94) 100%)',
              }}
            />

            <div style={{ position: 'relative', zIndex: 10, maxWidth: '640px', margin: '0 auto' }}>
              <Compass size={36} color="#C9A15E" style={{ margin: '0 auto 16px' }} />
              <h2 className="display-md" style={{ marginBottom: '16px', color: '#FFFFFF' }}>
                Ready to Begin Planning Your Next Journey?
              </h2>
              <p className="body-lg" style={{ color: '#C7C4B4', margin: '0 auto 32px', fontSize: '16px', lineHeight: 1.6 }}>
                Connect directly with a Senior Travel Curator to discuss dates, private aviation, luxury resorts, and bespoke itineraries.
              </p>
              <Link to="/enquire" className="btn-primary" style={{ display: 'inline-flex', padding: '16px 36px', fontSize: '15px' }}>
                <span>Submit Private Inquiry</span>
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </Reveal>
      </div>

      <style>{`
        .atelier-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 16px 40px rgba(26, 27, 24, 0.12) !important;
          border-color: #B5643D !important;
        }
        .atelier-card:hover .atelier-img {
          transform: scale(1.06);
        }
        @media (max-width: 900px) {
          .contact-hero-grid {
            grid-template-columns: 1fr !important;
            gap: 32px !important;
          }
        }
      `}</style>
    </div>
  );
};

export default ContactPage;
