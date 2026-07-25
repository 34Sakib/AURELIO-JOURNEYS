import React, { useState } from 'react';
import { Compass, ArrowRight } from 'lucide-react';

interface FooterProps {
  onOpenConcierge: () => void;
  onNavigate: (sectionId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenConcierge, onNavigate }) => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail) {
      setNewsletterSubscribed(true);
    }
  };

  return (
    <footer
      style={{
        backgroundColor: '#1A1B18',
        color: '#FAF7F1',
        paddingTop: '96px',
        paddingBottom: '48px',
        borderTop: '1px solid rgba(255, 255, 255, 0.1)',
        position: 'relative',
      }}
    >
      <div
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '0 24px',
        }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(12, 1fr)',
            gap: '40px',
            marginBottom: '80px',
          }}
        >
          {/* Brand Col */}
          <div style={{ gridColumn: 'span 4' }} className="footer-col">
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
              <div
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  border: '1px solid #B5643D',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#B5643D',
                }}
              >
                <Compass size={20} />
              </div>
              <span
                style={{
                  fontFamily: 'Fraunces, serif',
                  fontSize: '24px',
                  letterSpacing: '0.08em',
                  color: '#FFFFFF',
                  textTransform: 'uppercase',
                }}
              >
                Aurelio
              </span>
            </div>

            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px', color: '#8C8D80', lineHeight: 1.7, marginBottom: '24px' }}>
              Your premier tour & travel agency offering curated vacation packages, flights, resort stays, and custom holiday tours worldwide.
            </p>

            <div style={{ display: 'flex', gap: '12px' }}>
              <button onClick={onOpenConcierge} className="btn-primary" style={{ padding: '10px 18px', fontSize: '13px' }}>
                Speak with a Travel Advisor
              </button>
            </div>
          </div>

          {/* Quick Navigation Links */}
          <div style={{ gridColumn: 'span 2' }} className="footer-col">
            <h4 style={{ fontFamily: 'Inter, sans-serif', fontSize: '12px', fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#C9A15E', marginBottom: '20px' }}>
              Navigation
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px', fontFamily: 'Inter, sans-serif', fontSize: '14px' }}>
              {[
                { label: 'Destinations', path: '/destinations' },
                { label: 'Tour Packages', path: '/journeys' },
                { label: 'About Us', path: '/philosophy' },
                { label: 'Travel Blog', path: '/journal' },
              ].map((item) => (
                <li key={item.label}>
                  <button
                    onClick={() => onNavigate(item.path)}
                    style={{ background: 'none', border: 'none', color: '#C7C4B4', cursor: 'pointer', padding: 0 }}
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Global Atelier Offices */}
          <div style={{ gridColumn: 'span 3' }} className="footer-col">
            <h4 style={{ fontFamily: 'Inter, sans-serif', fontSize: '12px', fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#C9A15E', marginBottom: '20px' }}>
              Atelier Locations
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '14px', fontFamily: 'Inter, sans-serif', fontSize: '13px', color: '#C7C4B4' }}>
              <li><strong>Tokyo:</strong> 4-12 Ginza, Chuo-ku, Tokyo 104-0061</li>
              <li><strong>Paris:</strong> 28 Place Vendôme, 75001 Paris</li>
              <li><strong>New York:</strong> 767 Fifth Avenue, New York, NY 10153</li>
              <li><strong>Zurich:</strong> Bahnhofstrasse 42, 8001 Zürich</li>
            </ul>
          </div>

          {/* Monograph Newsletter Subscription */}
          <div style={{ gridColumn: 'span 3' }} className="footer-col">
            <h4 style={{ fontFamily: 'Inter, sans-serif', fontSize: '12px', fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#C9A15E', marginBottom: '20px' }}>
              The Quarterly Monograph
            </h4>
            <p style={{ fontSize: '13px', color: '#8C8D80', marginBottom: '16px', lineHeight: 1.5 }}>
              Receive our private seasonal publication detailing upcoming private access permits and private island charters.
            </p>

            {newsletterSubscribed ? (
              <div style={{ backgroundColor: 'rgba(74, 122, 95, 0.2)', border: '1px solid #4A7A5F', padding: '12px', borderRadius: '8px', fontSize: '13px', color: '#FAF7F1' }}>
                ✓ Subscription confirmed. Welcome to the Monograph.
              </div>
            ) : (
              <form onSubmit={handleSubscribe} style={{ display: 'flex', gap: '8px' }}>
                <input
                  type="email"
                  required
                  placeholder="Private Email..."
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    borderRadius: '6px',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    backgroundColor: 'rgba(255, 255, 255, 0.05)',
                    color: '#FAF7F1',
                    fontSize: '13px',
                    outline: 'none',
                  }}
                />
                <button
                  type="submit"
                  style={{
                    backgroundColor: '#B5643D',
                    color: '#FFFFFF',
                    border: 'none',
                    borderRadius: '6px',
                    padding: '0 14px',
                    cursor: 'pointer',
                  }}
                >
                  <ArrowRight size={16} />
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Bottom Hairline & Legal Note */}
        <hr style={{ border: 'none', height: '1px', backgroundColor: 'rgba(255, 255, 255, 0.1)', marginBottom: '32px' }} />

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '16px',
            fontSize: '12px',
            color: '#8C8D80',
            fontFamily: 'Inter, sans-serif',
          }}
        >
          <span>© {new Date().getFullYear()} AURELIO JOURNEYS | LUMORA VOYAGE. All rights reserved.</span>
          <div style={{ display: 'flex', gap: '24px' }}>
            <span>Privacy Policy</span>
            <span>Terms of Charter</span>
            <span>Security & Escrow</span>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .footer-col {
            grid-column: span 12 !important;
          }
        }
      `}</style>
    </footer>
  );
};
