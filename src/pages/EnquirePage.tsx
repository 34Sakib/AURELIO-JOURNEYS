import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Reveal } from '../components/common/Reveal';
import { CheckCircle, ShieldCheck, Send } from 'lucide-react';

export const EnquirePage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const destParam = searchParams.get('destination') || '';
  const journeyParam = searchParams.get('journey') || '';

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    season: 'Autumn 2026',
    guests: '2 Guests',
    budget: 18000,
    preferredDesigner: 'Kenji Takahashi (Asia Curator)',
    notes: destParam ? `Inquiry regarding destination: ${destParam}` : journeyParam ? `Inquiry regarding journey: ${journeyParam}` : '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    /* 
      ==========================================================================
      FRONTEND-ONLY STUBBED FORM SUBMISSION NOTE (§0 Constraint):
      In production with a real backend, replace this stub with an async API call:
      await fetch('/api/enquire', { method: 'POST', body: JSON.stringify(formData) })
      or integration with EmailJS / Formspree.
      ==========================================================================
    */
    setSubmitted(true);
  };

  return (
    <div style={{ paddingTop: '120px', paddingBottom: '96px', backgroundColor: '#FAF7F1' }}>
      <div style={{ maxWidth: '840px', margin: '0 auto', padding: '0 24px' }}>
        <Reveal>
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <span className="label-eyebrow">DESIGN MY TRIP — BESPOKE CONCIERGE</span>
            <h1 className="display-lg" style={{ color: '#1A1B18', marginBottom: '16px' }}>
              Speak with a Travel Designer
            </h1>
            <p className="body-lg" style={{ maxWidth: '600px', margin: '0 auto' }}>
              Every itinerary we compose is engineered to eliminate friction. Begin your private dialogue below.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '24px',
              padding: 'clamp(20px, 4vw, 40px)',
              boxShadow: '0 8px 32px rgba(26, 27, 24, 0.06)',
              border: '1px solid #E4DCC8',
            }}
          >
            {submitted ? (
              <div style={{ textAlign: 'center', padding: '48px 16px' }}>
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
                  Thank you, <strong>{formData.name || 'Valued Traveler'}</strong>. Your inquiry has been routed directly to senior travel curator <strong>{formData.preferredDesigner}</strong>. Expect a preliminary itinerary within 4 hours.
                </p>

                <div
                  style={{
                    backgroundColor: '#F1ECE1',
                    borderRadius: '12px',
                    padding: '16px',
                    maxWidth: '440px',
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

                <button onClick={() => setSubmitted(false)} className="btn-secondary">
                  Submit Another Request
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="modal-form-grid">
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
                      backgroundColor: '#FAF7F1',
                      fontSize: '14px',
                      fontFamily: 'Inter, sans-serif',
                      outline: 'none',
                    }}
                  />
                </div>

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
                      backgroundColor: '#FAF7F1',
                      fontSize: '14px',
                      fontFamily: 'Inter, sans-serif',
                      outline: 'none',
                    }}
                  />
                </div>

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
                      backgroundColor: '#FAF7F1',
                      fontSize: '14px',
                      fontFamily: 'Inter, sans-serif',
                      outline: 'none',
                    }}
                  >
                    <option>Autumn 2026</option>
                    <option>Winter 2026 / New Year</option>
                    <option>Spring 2027</option>
                    <option>Summer 2027</option>
                  </select>
                </div>

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
                      backgroundColor: '#FAF7F1',
                      fontSize: '14px',
                      fontFamily: 'Inter, sans-serif',
                      outline: 'none',
                    }}
                  >
                    <option>Solo Traveler</option>
                    <option>2 Guests (Couple)</option>
                    <option>3 - 5 Guests (Family)</option>
                    <option>6+ Guests (Private Charter)</option>
                  </select>
                </div>

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
                    style={{ width: '100%', accentColor: '#B5643D', cursor: 'pointer' }}
                  />
                </div>

                <div style={{ gridColumn: 'span 2' }}>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#5C5D54', marginBottom: '8px' }}>
                    Specific Desired Destinations or Milestone Notes
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Mention preferred accommodations, dietary preferences, private aviation needs, or milestone occasions..."
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '14px 16px',
                      borderRadius: '8px',
                      border: '1px solid #E4DCC8',
                      backgroundColor: '#FAF7F1',
                      fontSize: '14px',
                      fontFamily: 'Inter, sans-serif',
                      outline: 'none',
                      resize: 'vertical',
                    }}
                  />
                </div>

                <div style={{ gridColumn: 'span 2', marginTop: '12px' }}>
                  <button type="submit" className="btn-primary" style={{ width: '100%', padding: '16px', fontSize: '16px', justifyContent: 'center' }}>
                    <Send size={16} />
                    <span>Request Bespoke Proposal</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </Reveal>
      </div>
    </div>
  );
};

export default EnquirePage;
