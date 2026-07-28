import React, { useState } from 'react';
import { Journey } from '../../data/journeysData';
import { ItineraryTimeline } from './ItineraryTimeline';
import { X, Bookmark, Printer, Calendar, Clock, CheckCircle2, XCircle, PhoneCall, Quote } from 'lucide-react';

interface JourneyDetailModalProps {
  journey: Journey | null;
  isOpen: boolean;
  isShortlisted: boolean;
  onClose: () => void;
  onToggleShortlist: (journey: Journey) => void;
  onOpenConcierge: (journeyTitle?: string) => void;
}

export const JourneyDetailModal: React.FC<JourneyDetailModalProps> = ({
  journey,
  isOpen,
  isShortlisted,
  onClose,
  onToggleShortlist,
  onOpenConcierge,
}) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  if (!isOpen || !journey) return null;

  const currentHeroImg = selectedImage || journey.heroImage;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        backgroundColor: 'rgba(26, 27, 24, 0.85)',
        backdropFilter: 'blur(12px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 'clamp(10px, 3vw, 24px)',
        overflowY: 'auto',
      }}
    >
      {/* Modal Card Box */}
      <div
        style={{
          backgroundColor: '#FAF7F1',
          borderRadius: '20px',
          maxWidth: '1000px',
          width: '100%',
          maxHeight: '90vh',
          overflowY: 'auto',
          position: 'relative',
          boxShadow: '0 24px 64px rgba(0, 0, 0, 0.4)',
          border: '1px solid #E4DCC8',
        }}
        className="modal-container"
      >
        {/* Sticky Header Actions */}
        <div
          className="no-print"
          style={{
            position: 'sticky',
            top: 0,
            zIndex: 100,
            backgroundColor: 'rgba(250, 247, 241, 0.95)',
            backdropFilter: 'blur(12px)',
            padding: '16px 24px',
            borderBottom: '1px solid #E4DCC8',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span
              style={{
                fontSize: '11px',
                fontFamily: 'Inter, sans-serif',
                fontWeight: 600,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: '#B5643D',
              }}
            >
              {journey.region} • {journey.style}
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            {/* Print Itinerary Button (§19.8) */}
            <button
              onClick={handlePrint}
              style={{
                background: 'none',
                border: '1px solid #E4DCC8',
                borderRadius: '8px',
                padding: '8px 14px',
                fontSize: '13px',
                fontFamily: 'Inter, sans-serif',
                fontWeight: 500,
                color: '#33342F',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
              }}
            >
              <Printer size={15} />
              <span>Print Itinerary PDF</span>
            </button>

            {/* Shortlist Toggle */}
            <button
              onClick={() => onToggleShortlist(journey)}
              style={{
                background: isShortlisted ? '#B5643D' : 'none',
                color: isShortlisted ? '#FAF7F1' : '#33342F',
                border: '1px solid #B5643D',
                borderRadius: '8px',
                padding: '8px 14px',
                fontSize: '13px',
                fontFamily: 'Inter, sans-serif',
                fontWeight: 500,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
              }}
            >
              <Bookmark size={15} fill={isShortlisted ? '#FAF7F1' : 'none'} />
              <span>{isShortlisted ? 'Saved' : 'Save Trip'}</span>
            </button>

            {/* Close Modal */}
            <button
              onClick={onClose}
              style={{
                background: 'none',
                border: 'none',
                color: '#1A1B18',
                cursor: 'pointer',
                padding: '6px',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <X size={24} />
            </button>
          </div>
        </div>

        {/* Modal Main Content Area */}
        <div style={{ padding: 'clamp(16px, 4vw, 32px)' }}>
          {/* Main Hero Gallery */}
          <div style={{ marginBottom: '32px' }}>
            <div
              style={{
                height: 'clamp(200px, 40vh, 420px)',
                borderRadius: '16px',
                overflow: 'hidden',
                marginBottom: '16px',
              }}
            >
              <img
                src={currentHeroImg}
                alt={journey.title}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>

            {/* Gallery Thumbnails */}
            <div style={{ display: 'flex', gap: '12px', overflowX: 'auto', paddingBottom: '4px' }} className="hide-scrollbar">
              {[journey.heroImage, ...journey.gallery].map((imgUrl, idx) => (
                <div
                  key={idx}
                  onClick={() => setSelectedImage(imgUrl)}
                  style={{
                    width: '90px',
                    height: '60px',
                    flexShrink: 0,
                    borderRadius: '8px',
                    overflow: 'hidden',
                    cursor: 'pointer',
                    border: currentHeroImg === imgUrl ? '2px solid #B5643D' : '2px solid transparent',
                    opacity: currentHeroImg === imgUrl ? 1 : 0.7,
                    transition: 'all 200ms ease',
                  }}
                >
                  <img src={imgUrl} alt="Thumbnail" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
              ))}
            </div>
          </div>

          {/* Title & Key Meta */}
          <div style={{ marginBottom: '32px' }}>
            <h1 className="display-lg" style={{ color: '#1A1B18', marginBottom: '8px' }}>
              {journey.title}
            </h1>
            <p className="body-lg" style={{ color: '#B5643D', marginBottom: '24px', fontWeight: 500 }}>
              {journey.subtitle}
            </p>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '16px',
                backgroundColor: '#F1ECE1',
                padding: '20px 24px',
                borderRadius: '12px',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Clock size={20} color="#B5643D" />
                <div>
                  <span style={{ fontSize: '11px', color: '#8C8D80', display: 'block', textTransform: 'uppercase' }}>Duration</span>
                  <span style={{ fontWeight: 600, color: '#1A1B18' }}>{journey.durationDays} Days / {journey.durationDays - 1} Nights</span>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Calendar size={20} color="#B5643D" />
                <div>
                  <span style={{ fontSize: '11px', color: '#8C8D80', display: 'block', textTransform: 'uppercase' }}>Optimal Season</span>
                  <span style={{ fontWeight: 600, color: '#1A1B18' }}>{journey.bestTimeToVisit}</span>
                </div>
              </div>

              <div>
                <span style={{ fontSize: '11px', color: '#8C8D80', display: 'block', textTransform: 'uppercase' }}>All-Inclusive Pricing</span>
                <span style={{ fontSize: '20px', fontWeight: 600, color: '#1A1B18' }}>
                  ${journey.pricePerPerson.toLocaleString()} <span style={{ fontSize: '12px', fontWeight: 400 }}>/ guest</span>
                </span>
              </div>
            </div>
          </div>

          {/* Overview & Travel Designer Quote */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '32px',
              marginBottom: '40px',
            }}
          >
            <div>
              <h3 style={{ fontFamily: 'Fraunces, serif', fontSize: '22px', marginBottom: '12px' }}>
                Expedition Overview
              </h3>
              <p className="body-md" style={{ lineHeight: 1.7 }}>
                {journey.overview}
              </p>
            </div>

            {/* Travel Designer Card (§19.6) */}
            <div
              style={{
                backgroundColor: '#173D3A',
                color: '#FAF7F1',
                padding: '24px',
                borderRadius: '16px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <div>
                <Quote size={24} color="#C9A15E" style={{ marginBottom: '12px' }} />
                <p style={{ fontFamily: 'Fraunces, serif', fontSize: '16px', fontStyle: 'italic', lineHeight: 1.5, marginBottom: '20px' }}>
                  "{journey.designer.quote}"
                </p>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <img
                  src={journey.designer.avatar}
                  alt={journey.designer.name}
                  style={{ width: '48px', height: '48px', borderRadius: '50%', objectFit: 'cover' }}
                />
                <div>
                  <h4 style={{ fontSize: '15px', fontWeight: 600, color: '#FAF7F1' }}>{journey.designer.name}</h4>
                  <span style={{ fontSize: '12px', color: '#C7C4B4' }}>{journey.designer.role}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Highlights, Inclusions & Exclusions */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '24px',
              marginBottom: '40px',
            }}
          >
            {/* Inclusions */}
            <div style={{ backgroundColor: '#F1ECE1', padding: '24px', borderRadius: '12px' }}>
              <h4 style={{ fontFamily: 'Fraunces, serif', fontSize: '18px', marginBottom: '16px', color: '#173D3A' }}>
                Bespoke Inclusions
              </h4>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {journey.inclusions.map((inc, i) => (
                  <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '14px', color: '#33342F' }}>
                    <CheckCircle2 size={16} color="#4A7A5F" style={{ marginTop: '2px', flexShrink: 0 }} />
                    <span>{inc}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Exclusions */}
            <div style={{ backgroundColor: '#F1ECE1', padding: '24px', borderRadius: '12px' }}>
              <h4 style={{ fontFamily: 'Fraunces, serif', fontSize: '18px', marginBottom: '16px', color: '#1A1B18' }}>
                Discretionary Items
              </h4>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {journey.exclusions.map((exc, i) => (
                  <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '14px', color: '#5C5D54' }}>
                    <XCircle size={16} color="#8C8D80" style={{ marginTop: '2px', flexShrink: 0 }} />
                    <span>{exc}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Day-by-Day Timeline Component */}
          <ItineraryTimeline days={journey.dayByDay} />

          {/* Bottom Conversion Bar */}
          <div
            className="no-print"
            style={{
              marginTop: '48px',
              padding: '32px',
              backgroundColor: '#1A1B18',
              color: '#FAF7F1',
              borderRadius: '16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '20px',
            }}
          >
            <div>
              <h3 style={{ fontFamily: 'Fraunces, serif', fontSize: '24px', marginBottom: '4px' }}>
                Tailor This Itinerary to Your Schedule
              </h3>
              <p style={{ fontSize: '14px', color: '#C7C4B4' }}>
                Our travel designers customize every detail to match your personal preferences.
              </p>
            </div>

            <button
              onClick={() => {
                onClose();
                onOpenConcierge(journey.title);
              }}
              className="btn-primary"
              style={{ padding: '14px 28px' }}
            >
              <PhoneCall size={16} />
              <span>Inquire About This Trip</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
