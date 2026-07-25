import React, { useState } from 'react';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { ConciergeModal } from '../concierge/ConciergeModal';
import { ShortlistDrawer } from '../shortlist/ShortlistDrawer';
import { CustomCursor } from '../ui/CustomCursor';
import { ScrollToTop } from '../common/ScrollToTop';
import { Journey, JOURNEYS_DATA } from '../../data/journeysData';
import { useNavigate, useLocation } from 'react-router-dom';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const [shortlist, setShortlist] = useState<Journey[]>([JOURNEYS_DATA[0]]);
  const [isShortlistOpen, setIsShortlistOpen] = useState(false);

  const [isConciergeOpen, setIsConciergeOpen] = useState(false);
  const [conciergePrefill, setConciergePrefill] = useState('');

  const handleToggleShortlist = (journey: Journey) => {
    if (shortlist.some((item) => item.id === journey.id)) {
      setShortlist(shortlist.filter((item) => item.id !== journey.id));
    } else {
      setShortlist([...shortlist, journey]);
    }
  };

  const handleRemoveShortlistItem = (id: string) => {
    setShortlist(shortlist.filter((item) => item.id !== id));
  };

  const handleOpenConcierge = (prefillTitle?: string) => {
    setConciergePrefill(prefillTitle || '');
    setIsConciergeOpen(true);
  };

  const handleNavigate = (pathOrSectionId: string) => {
    if (pathOrSectionId.startsWith('/')) {
      navigate(pathOrSectionId);
    } else {
      if (location.pathname !== '/') {
        navigate('/');
        setTimeout(() => {
          const el = document.getElementById(pathOrSectionId);
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      } else {
        const el = document.getElementById(pathOrSectionId);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <div style={{ backgroundColor: '#FAF7F1', minHeight: '100vh', position: 'relative' }}>
      <ScrollToTop />
      <CustomCursor />

      {/* Persistent Navbar */}
      <Navbar
        shortlistCount={shortlist.length}
        onOpenShortlist={() => setIsShortlistOpen(true)}
        onOpenConcierge={() => handleOpenConcierge()}
        onNavigate={handleNavigate}
      />

      {/* Main Content Container (Immediate Render) */}
      <main key={location.pathname} style={{ minHeight: '100vh' }}>
        {React.cloneElement(children as React.ReactElement, {
          shortlist,
          onToggleShortlist: handleToggleShortlist,
          onOpenConcierge: handleOpenConcierge,
        })}
      </main>

      {/* Persistent Footer */}
      <Footer
        onOpenConcierge={() => handleOpenConcierge()}
        onNavigate={handleNavigate}
      />

      {/* Shared Modals & Drawers */}
      <ConciergeModal
        isOpen={isConciergeOpen}
        onClose={() => setIsConciergeOpen(false)}
        prefillJourneyTitle={conciergePrefill}
      />

      <ShortlistDrawer
        isOpen={isShortlistOpen}
        shortlist={shortlist}
        onClose={() => setIsShortlistOpen(false)}
        onRemoveItem={handleRemoveShortlistItem}
        onOpenDetail={(journey) => navigate(`/journeys/${journey.slug || journey.id}`)}
        onOpenConcierge={handleOpenConcierge}
      />
    </div>
  );
};
