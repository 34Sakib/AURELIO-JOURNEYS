import React from 'react';
import { Journey } from '../../data/journeysData';
import { X, Trash2, BookmarkCheck, PhoneCall } from 'lucide-react';

interface ShortlistDrawerProps {
  isOpen: boolean;
  shortlist: Journey[];
  onClose: () => void;
  onRemoveItem: (journeyId: string) => void;
  onOpenDetail: (journey: Journey) => void;
  onOpenConcierge: (journeyTitle?: string) => void;
}

export const ShortlistDrawer: React.FC<ShortlistDrawerProps> = ({
  isOpen,
  shortlist,
  onClose,
  onRemoveItem,
  onOpenDetail,
  onOpenConcierge,
}) => {
  if (!isOpen) return null;

  const totalEstimate = shortlist.reduce((sum, item) => sum + item.pricePerPerson, 0);

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 99999,
        backgroundColor: 'rgba(26, 27, 24, 0.6)',
        backdropFilter: 'blur(8px)',
        display: 'flex',
        justifyContent: 'flex-end',
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '480px',
          height: '100vh',
          backgroundColor: '#FAF7F1',
          borderLeft: '1px solid #E4DCC8',
          boxShadow: '-8px 0 32px rgba(0, 0, 0, 0.2)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        {/* Drawer Header */}
        <div
          style={{
            padding: '16px 20px',
            borderBottom: '1px solid #E4DCC8',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <BookmarkCheck size={20} color="#B5643D" />
            <h3 style={{ fontFamily: 'Fraunces, serif', fontSize: '22px', color: '#1A1B18' }}>
              Your Saved Journeys ({shortlist.length})
            </h3>
          </div>

          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              color: '#1A1B18',
              cursor: 'pointer',
            }}
          >
            <X size={24} />
          </button>
        </div>

        {/* Drawer Content */}
        <div
          style={{
            padding: '24px',
            overflowY: 'auto',
            flexGrow: 1,
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
          }}
        >
          {shortlist.length > 0 ? (
            shortlist.map((item) => (
              <div
                key={item.id}
                style={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: '12px',
                  border: '1px solid #E4DCC8',
                  padding: '16px',
                  display: 'flex',
                  gap: '16px',
                  alignItems: 'center',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)',
                }}
              >
                <img
                  src={item.heroImage}
                  alt={item.title}
                  style={{
                    width: '80px',
                    height: '80px',
                    borderRadius: '8px',
                    objectFit: 'cover',
                  }}
                />

                <div style={{ flexGrow: 1 }}>
                  <span style={{ fontSize: '11px', color: '#B5643D', fontWeight: 600, textTransform: 'uppercase' }}>
                    {item.region}
                  </span>
                  <h4
                    onClick={() => {
                      onClose();
                      onOpenDetail(item);
                    }}
                    style={{
                      fontFamily: 'Fraunces, serif',
                      fontSize: '16px',
                      color: '#1A1B18',
                      cursor: 'pointer',
                      lineHeight: 1.2,
                      marginBottom: '4px',
                    }}
                  >
                    {item.title}
                  </h4>
                  <span style={{ fontSize: '13px', fontWeight: 600, color: '#1A1B18' }}>
                    ${item.pricePerPerson.toLocaleString()} <span style={{ fontSize: '11px', color: '#8C8D80' }}>/ guest</span>
                  </span>
                </div>

                <button
                  onClick={() => onRemoveItem(item.id)}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#8C8D80',
                    cursor: 'pointer',
                    padding: '4px',
                  }}
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))
          ) : (
            <div style={{ textAlign: 'center', padding: '48px 16px', color: '#5C5D54' }}>
              <p className="body-md" style={{ marginBottom: '16px' }}>
                Your shortlist is currently empty. Bookmark curated expeditions while exploring to compare itineraries.
              </p>
            </div>
          )}
        </div>

        {/* Drawer Footer */}
        {shortlist.length > 0 && (
          <div
            style={{
              padding: '24px',
              borderTop: '1px solid #E4DCC8',
              backgroundColor: '#F1ECE1',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
              <span style={{ fontSize: '14px', color: '#5C5D54' }}>Combined Total Estimate:</span>
              <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '18px', fontWeight: 700, color: '#1A1B18' }}>
                ${totalEstimate.toLocaleString()} USD
              </span>
            </div>

            <button
              onClick={() => {
                onClose();
                onOpenConcierge(`Combined Shortlist (${shortlist.map((s) => s.title).join(', ')})`);
              }}
              className="btn-primary"
              style={{ width: '100%', justifyContent: 'center' }}
            >
              <PhoneCall size={16} />
              <span>Inquire About Shortlist</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
