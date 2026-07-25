import React, { useState } from 'react';
import { X, CheckCircle, ShieldCheck, Sparkles, Send } from 'lucide-react';

interface ConciergeModalProps {
  isOpen: boolean;
  onClose: () => void;
  prefillJourneyTitle?: string;
}

export const ConciergeModal: React.FC<ConciergeModalProps> = ({
  isOpen,
  onClose,
  prefillJourneyTitle = '',
}) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    season: 'Autumn 2026',
    guests: '2 Guests',
    budget: 15000,
    preferredDesigner: 'Kenji Takahashi (Asia & Japan Curator)',
    notes: prefillJourneyTitle ? `Inquiry for: ${prefillJourneyTitle}` : '',
  });

  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 99999,
        backgroundColor: 'rgba(26, 27, 24, 0.85)',
        backdropFilter: 'blur(12px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px',
      }}
    >
      <div
        style={{
          backgroundColor: '#FAF7F1',
          borderRadius: '24px',
          maxWidth: '840px',
          width: '100%',
          maxHeight: '90vh',
          overflowY: 'auto',
          boxShadow: '0 24px 64px rgba(0, 0, 0, 0.4)',
          border: '1px solid #E4DCC8',
          position: 'relative',
        }}
      >
        {/* Sticky Header */}
        <div
          style={{
            padding: '20px 32px',
            borderBottom: '1px solid #E4DCC8',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: 'rgba(250, 247, 241, 0.95)',
            position: 'sticky',
            top: 0,
            zIndex: 10,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Sparkles size={16} color="#B5643D" />
            <span
              style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '11px',
                fontWeight: 600,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: '#B5643D',
              }}
            >
              Private Concierge Consultation
            </span>
          </div>

          <button
            onClick={() => {
              setSubmitted(false);
              onClose();
            }}
            style={{
              background: 'none',
              border: 'none',
              color: '#1A1B18',
              cursor: 'pointer',
              padding: '6px',
            }}
          >
            <X size={24} />
          </button>
        </div>

        {submitted ? (
          /* Confirmation View */
          <div style={{ padding: '64px 32px', textAlign: 'center' }}>
            <div
              style={{
                width: '64px',
                height: '64px',
                borderRadius: '50%',
                backgroundColor: '#F3E2D6',
                color: '#B5643D',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 24px',
              }}
            >
              <CheckCircle size={36} />
            </div>

            <h2 className="display-md" style={{ marginBottom: '16px', color: '#1A1B18' }}>
              Your Journey Consultation is Initiated
            </h2>

            <p className="body-lg" style={{ maxWidth: '540px', margin: '0 auto 32px', color: '#5C5D54' }}>
              Thank you, <strong>{formData.name || 'Valued Traveler'}</strong>. Your request has been assigned directly to <strong>{formData.preferredDesigner}</strong>. You will receive a bespoke preliminary proposal within 4 hours.
            </p>

            <div
              style={{
                backgroundColor: '#F1ECE1',
                borderRadius: '12px',
                padding: '16px',
                maxWidth: '400px',
                margin: '0 auto 32px',
                fontSize: '13px',
                color: '#33342F',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                justifyContent: 'center',
              }}
            >
              <ShieldCheck size={18} color="#4A7A5F" />
              <span>Strict Privacy Guaranteed • Zero Unsolicited Communications</span>
            </div>

            <button
              onClick={() => {
                setSubmitted(false);
                onClose();
              }}
              className="btn-primary"
            >
              Return to Expeditions
            </button>
          </div>
        ) : (
          /* Form View */
          <div style={{ padding: '32px' }}>
            <div style={{ marginBottom: '32px' }}>
              <h2 className="display-md" style={{ color: '#1A1B18', marginBottom: '8px' }}>
                Speak with a Travel Designer
              </h2>
              <p className="body-md">
                We design bespoke journeys tailored precisely to your timing, companions, and cultural interests.
              </p>
            </div>

            <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
              {/* Name Input */}
              <div style={{ gridColumn: 'span 1' }}>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#5C5D54', marginBottom: '8px' }}>
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Lord / Lady / Dr / Mr / Ms..."
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '14px 16px',
                    borderRadius: '8px',
                    border: '1px solid #E4DCC8',
                    backgroundColor: '#FFFFFF',
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '14px',
                    outline: 'none',
                  }}
                />
              </div>

              {/* Email Input */}
              <div style={{ gridColumn: 'span 1' }}>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#5C5D54', marginBottom: '8px' }}>
                  Private Email Address *
                </label>
                <input
                  type="email"
                  required
                  placeholder="contact@domain.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '14px 16px',
                    borderRadius: '8px',
                    border: '1px solid #E4DCC8',
                    backgroundColor: '#FFFFFF',
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '14px',
                    outline: 'none',
                  }}
                />
              </div>

              {/* Travel Season */}
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#5C5D54', marginBottom: '8px' }}>
                  Target Travel Window
                </label>
                <select
                  value={formData.season}
                  onChange={(e) => setFormData({ ...formData, season: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '14px 16px',
                    borderRadius: '8px',
                    border: '1px solid #E4DCC8',
                    backgroundColor: '#FFFFFF',
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '14px',
                    outline: 'none',
                  }}
                >
                  <option>Autumn 2026</option>
                  <option>Winter 2026 / New Year</option>
                  <option>Spring 2027</option>
                  <option>Summer 2027</option>
                </select>
              </div>

              {/* Guests */}
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#5C5D54', marginBottom: '8px' }}>
                  Companions
                </label>
                <select
                  value={formData.guests}
                  onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '14px 16px',
                    borderRadius: '8px',
                    border: '1px solid #E4DCC8',
                    backgroundColor: '#FFFFFF',
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '14px',
                    outline: 'none',
                  }}
                >
                  <option>Solo Traveler</option>
                  <option>2 Guests (Couple)</option>
                  <option>3 - 5 Guests (Family)</option>
                  <option>6+ Guests (Private Charter)</option>
                </select>
              </div>

              {/* Estimated Budget Slider */}
              <div style={{ gridColumn: 'span 2' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <label style={{ fontSize: '12px', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#5C5D54' }}>
                    Target Investment per Guest
                  </label>
                  <span style={{ fontSize: '14px', fontWeight: 600, color: '#B5643D' }}>
                    ${formData.budget.toLocaleString()} USD
                  </span>
                </div>
                <input
                  type="range"
                  min={8000}
                  max={50000}
                  step={1000}
                  value={formData.budget}
                  onChange={(e) => setFormData({ ...formData, budget: Number(e.target.value) })}
                  style={{
                    width: '100%',
                    accentColor: '#B5643D',
                    cursor: 'pointer',
                  }}
                />
              </div>

              {/* Notes / Special Requests */}
              <div style={{ gridColumn: 'span 2' }}>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#5C5D54', marginBottom: '8px' }}>
                  Specific Requirements or Desired Destinations
                </label>
                <textarea
                  rows={3}
                  placeholder="Mention preferred accommodations, dietary preferences, private aviation needs, or milestone occasions..."
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '14px 16px',
                    borderRadius: '8px',
                    border: '1px solid #E4DCC8',
                    backgroundColor: '#FFFFFF',
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '14px',
                    outline: 'none',
                    resize: 'vertical',
                  }}
                />
              </div>

              {/* Submit CTA */}
              <div style={{ gridColumn: 'span 2', marginTop: '12px' }}>
                <button
                  type="submit"
                  className="btn-primary"
                  style={{ width: '100%', padding: '16px', fontSize: '16px', justifyContent: 'center' }}
                >
                  <Send size={16} />
                  <span>Request Bespoke Proposal</span>
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
