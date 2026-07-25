import React, { useState, useEffect } from 'react';
import { Bookmark, Menu, X, Compass, PhoneCall } from 'lucide-react';
import { useLocation } from 'react-router-dom';

interface NavbarProps {
  shortlistCount: number;
  onOpenShortlist: () => void;
  onOpenConcierge: () => void;
  onNavigate: (sectionId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  shortlistCount,
  onOpenShortlist,
  onOpenConcierge,
  onNavigate,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Is this the home page with dark hero?
  const isHomePage = location.pathname === '/';
  
  // If not on home page OR if scrolled down > 40px, use solid sand background + dark text
  const isLightNav = !isHomePage || isScrolled;

  const handleNavClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <>
      <header
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 10000,
          transition: 'all 300ms cubic-bezier(0.22, 1, 0.36, 1)',
          backgroundColor: isLightNav ? '#FAF7F1' : 'transparent',
          backdropFilter: isLightNav ? 'blur(16px) saturate(140%)' : 'none',
          WebkitBackdropFilter: isLightNav ? 'blur(16px) saturate(140%)' : 'none',
          borderBottom: isLightNav ? '1px solid #E4DCC8' : '1px solid rgba(255, 255, 255, 0.15)',
          padding: isScrolled ? '12px 0' : '18px 0',
          boxShadow: isLightNav ? '0 4px 20px rgba(26, 27, 24, 0.06)' : 'none',
        }}
      >
        <div
          style={{
            maxWidth: '1340px',
            margin: '0 auto',
            padding: '0 24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          {/* Logo / Brand Wordmark */}
          <div
            onClick={() => handleNavClick('/')}
            data-cursor="Home"
            style={{
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
            }}
          >
            <div
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                border: isLightNav ? '1px solid #B5643D' : '1px solid rgba(255, 255, 255, 0.6)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: isLightNav ? '#B5643D' : '#FAF7F1',
                transition: 'all 300ms ease',
              }}
            >
              <Compass size={20} strokeWidth={1.5} />
            </div>
            <div>
              <span
                style={{
                  fontFamily: 'Fraunces, serif',
                  fontSize: '22px',
                  fontWeight: 500,
                  letterSpacing: '0.08em',
                  color: isLightNav ? '#1A1B18' : '#FFFFFF',
                  textTransform: 'uppercase',
                  display: 'block',
                  lineHeight: 1,
                }}
              >
                Aurelio
              </span>
              <span
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '9px',
                  fontWeight: 600,
                  letterSpacing: '0.18em',
                  color: isLightNav ? '#B5643D' : 'rgba(255, 255, 255, 0.85)',
                  textTransform: 'uppercase',
                  display: 'block',
                  marginTop: '3px',
                }}
              >
                Tour & Travel Agency
              </span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav
            className="no-mobile"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '36px',
            }}
          >
            {[
              { id: '/destinations', label: 'Destinations' },
              { id: '/journeys', label: 'Tour Packages' },
              { id: '/philosophy', label: 'About Us' },
              { id: '/journal', label: 'Travel Blog' },
            ].map((link) => {
              const isActive = location.pathname === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  style={{
                    background: 'none',
                    border: 'none',
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '14px',
                    fontWeight: isActive ? 600 : 500,
                    color: isLightNav
                      ? (isActive ? '#B5643D' : '#33342F')
                      : (isActive ? '#FFFFFF' : 'rgba(255, 255, 255, 0.9)'),
                    cursor: 'pointer',
                    padding: '6px 0',
                    position: 'relative',
                    transition: 'color 200ms ease',
                  }}
                >
                  {link.label}
                  {isActive && (
                    <span
                      style={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        right: 0,
                        height: '2px',
                        backgroundColor: isLightNav ? '#B5643D' : '#FFFFFF',
                        borderRadius: '2px',
                      }}
                    />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Actions: Shortlist & Concierge CTA */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
            }}
          >
            {/* Shortlist Bookmark Button */}
            <button
              onClick={onOpenShortlist}
              data-cursor="Shortlist"
              aria-label="View Saved Shortlist"
              style={{
                background: 'transparent',
                border: isLightNav ? '1px solid #E4DCC8' : '1px solid rgba(255, 255, 255, 0.3)',
                borderRadius: '50%',
                width: '42px',
                height: '42px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: isLightNav ? '#1A1B18' : '#FAF7F1',
                cursor: 'pointer',
                position: 'relative',
                transition: 'all 200ms ease',
              }}
            >
              <Bookmark size={18} strokeWidth={1.5} />
              {shortlistCount > 0 && (
                <span
                  style={{
                    position: 'absolute',
                    top: '-4px',
                    right: '-4px',
                    backgroundColor: '#B5643D',
                    color: '#FAF7F1',
                    fontSize: '10px',
                    fontWeight: 700,
                    width: '18px',
                    height: '18px',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 2px 6px rgba(0,0,0,0.2)',
                  }}
                >
                  {shortlistCount}
                </span>
              )}
            </button>

            {/* Design My Trip Primary CTA */}
            <button
              onClick={onOpenConcierge}
              className="btn-primary no-mobile"
              style={{
                padding: '10px 20px',
                fontSize: '14px',
                backgroundColor: '#B5643D',
                border: 'none',
                color: '#FAF7F1',
                borderRadius: '8px',
                boxShadow: isLightNav ? '0 4px 14px rgba(181, 100, 61, 0.3)' : 'none',
              }}
            >
              <PhoneCall size={14} strokeWidth={1.5} />
              <span>Book a Tour</span>
            </button>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="mobile-only"
              aria-label="Toggle Navigation Menu"
              style={{
                background: 'none',
                border: 'none',
                color: isLightNav ? '#1A1B18' : '#FFFFFF',
                cursor: 'pointer',
                padding: '8px',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Overlay */}
      {mobileMenuOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 99999,
            backgroundColor: '#1A1B18',
            color: '#FAF7F1',
            padding: '100px 32px 40px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            {[
              { id: '/destinations', label: 'Destinations' },
              { id: '/journeys', label: 'Tour Packages' },
              { id: '/philosophy', label: 'About Us' },
              { id: '/journal', label: 'Travel Blog' },
              { id: '/contact', label: 'Contact Our Agency' },
            ].map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                style={{
                  background: 'none',
                  border: 'none',
                  textAlign: 'left',
                  fontFamily: 'Fraunces, serif',
                  fontSize: '32px',
                  color: '#FAF7F1',
                  cursor: 'pointer',
                }}
              >
                {link.label}
              </button>
            ))}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenConcierge();
              }}
              className="btn-primary"
              style={{ width: '100%', justifyContent: 'center' }}
            >
              Speak with a Travel Advisor
            </button>
            <p
              style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '12px',
                color: '#8C8D80',
                textAlign: 'center',
              }}
            >
              Tokyo • Paris • New York • Zurich
            </p>
          </div>
        </div>
      )}

      {/* Responsive helper inline style */}
      <style>{`
        @media (max-width: 900px) {
          .no-mobile { display: none !important; }
        }
        @media (min-width: 901px) {
          .mobile-only { display: none !important; }
        }
      `}</style>
    </>
  );
};
