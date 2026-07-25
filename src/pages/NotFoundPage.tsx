import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, ArrowLeft } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  return (
    <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '120px 24px 64px', backgroundColor: '#FAF7F1' }}>
      <div style={{ maxWidth: '540px' }}>
        <div style={{ width: '64px', height: '64px', borderRadius: '50%', border: '1px solid #B5643D', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#B5643D', margin: '0 auto 24px' }}>
          <Compass size={32} />
        </div>

        <span className="label-eyebrow">ERROR 404 — ROUTE UNCHARTED</span>
        <h1 className="display-lg" style={{ color: '#1A1B18', marginBottom: '16px' }}>
          This Path Remains Unmapped
        </h1>
        <p className="body-lg" style={{ marginBottom: '32px' }}>
          The page or sanctuary itinerary you requested does not exist or has moved.
        </p>

        <Link to="/" className="btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
          <ArrowLeft size={16} />
          <span>Return to Aurelio Journeys Home</span>
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
