import React from 'react';
import { Reveal } from '../components/common/Reveal';
import { Compass, MapPin, Mail, Phone, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

export const ContactPage: React.FC = () => {
  return (
    <div style={{ paddingTop: '120px', paddingBottom: '96px', backgroundColor: '#FAF7F1' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>
        <Reveal>
          <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 64px' }}>
            <span className="label-eyebrow">GLOBAL ATELIERS — DIRECT CONTACT</span>
            <h1 className="display-lg" style={{ color: '#1A1B18', marginBottom: '16px' }}>
              Connect with Our Travel Designers
            </h1>
            <p className="body-lg">
              Our curators operate from four global ateliers to provide 24/7 seamless execution across all time zones.
            </p>
          </div>
        </Reveal>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '32px', marginBottom: '80px' }}>
          {[
            {
              city: 'Tokyo Atelier',
              address: '4-12 Ginza, Chuo-ku, Tokyo 104-0061',
              phone: '+81 (0)3 5555 0192',
              email: 'tokyo@aureliojourneys.com',
              hours: '09:00 — 18:00 JST',
            },
            {
              city: 'Paris Atelier',
              address: '28 Place Vendôme, 75001 Paris',
              phone: '+33 (0)1 42 68 55 00',
              email: 'paris@aureliojourneys.com',
              hours: '09:00 — 18:00 CET',
            },
            {
              city: 'New York Atelier',
              address: '767 Fifth Avenue, New York, NY 10153',
              phone: '+1 (212) 555 0148',
              email: 'newyork@aureliojourneys.com',
              hours: '09:00 — 18:00 EST',
            },
            {
              city: 'Zurich Atelier',
              address: 'Bahnhofstrasse 42, 8001 Zürich',
              phone: '+41 (0)44 211 00 22',
              email: 'zurich@aureliojourneys.com',
              hours: '09:00 — 18:00 CET',
            },
          ].map((atelier, i) => (
            <Reveal key={i} delay={i * 0.08}>
              <div
                style={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: '16px',
                  padding: '32px',
                  border: '1px solid #E4DCC8',
                  boxShadow: '0 4px 16px rgba(0,0,0,0.03)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
                  <Compass size={20} color="#B5643D" />
                  <h3 style={{ fontFamily: 'Fraunces, serif', fontSize: '22px', color: '#1A1B18' }}>
                    {atelier.city}
                  </h3>
                </div>

                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '14px', color: '#5C5D54', fontFamily: 'Inter, sans-serif' }}>
                  <li style={{ display: 'flex', gap: '10px' }}><MapPin size={16} color="#8C8D80" style={{ flexShrink: 0, marginTop: '2px' }} /> {atelier.address}</li>
                  <li style={{ display: 'flex', gap: '10px' }}><Phone size={16} color="#8C8D80" style={{ flexShrink: 0, marginTop: '2px' }} /> {atelier.phone}</li>
                  <li style={{ display: 'flex', gap: '10px' }}><Mail size={16} color="#8C8D80" style={{ flexShrink: 0, marginTop: '2px' }} /> {atelier.email}</li>
                  <li style={{ display: 'flex', gap: '10px' }}><Clock size={16} color="#8C8D80" style={{ flexShrink: 0, marginTop: '2px' }} /> {atelier.hours}</li>
                </ul>
              </div>
            </Reveal>
          ))}
        </div>

        <div style={{ backgroundColor: '#173D3A', color: '#FAF7F1', borderRadius: '24px', padding: '48px', textAlign: 'center' }}>
          <h2 className="display-md" style={{ marginBottom: '16px' }}>
            Ready to Begin Planning Your Next Journey?
          </h2>
          <p className="body-lg" style={{ color: '#C7C4B4', maxWidth: '540px', margin: '0 auto 32px' }}>
            Connect directly with a Senior Travel Curator to discuss dates, private aviation, and bespoke itineraries.
          </p>
          <Link to="/enquire" className="btn-primary" style={{ display: 'inline-flex' }}>
            Submit Private Inquiry
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
