import React from 'react';
import { JOURNAL_ARTICLES } from '../data/journeysData';
import { Reveal } from '../components/common/Reveal';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export const JournalIndexPage: React.FC = () => {
  return (
    <div style={{ paddingTop: '120px', paddingBottom: '96px', backgroundColor: '#FAF7F1' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>
        <Reveal>
          <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 64px' }}>
            <span className="label-eyebrow">EDITORIAL JOURNAL — MONOGRAPH DISPATCHES</span>
            <h1 className="display-lg" style={{ color: '#1A1B18', marginBottom: '16px' }}>
              Stories from the Unhurried World
            </h1>
            <p className="body-lg">
              Travel essays, architectural monographs, and quiet reflections from our curators across six continents.
            </p>
          </div>
        </Reveal>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))', gap: '32px' }}>
          {JOURNAL_ARTICLES.map((article, idx) => (
            <Reveal key={article.id} delay={idx * 0.08}>
              <Link to={`/journal/${article.slug || article.id}`} style={{ textDecoration: 'none' }} data-cursor="Read">
                <div
                  style={{
                    backgroundColor: '#FFFFFF',
                    borderRadius: '16px',
                    overflow: 'hidden',
                    boxShadow: '0 4px 16px rgba(26, 27, 24, 0.05)',
                    border: '1px solid #E4DCC8',
                    transition: 'all 400ms cubic-bezier(0.22, 1, 0.36, 1)',
                  }}
                  className="journal-item-card"
                >
                  <div style={{ height: '240px', overflow: 'hidden', position: 'relative' }}>
                    <img
                      src={article.image}
                      alt={article.title}
                      style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 600ms ease' }}
                      className="journal-item-img"
                    />
                    <span
                      style={{
                        position: 'absolute',
                        top: '16px',
                        left: '16px',
                        backgroundColor: 'rgba(250, 247, 241, 0.9)',
                        padding: '4px 12px',
                        borderRadius: '999px',
                        fontSize: '11px',
                        fontWeight: 600,
                        color: '#B5643D',
                        textTransform: 'uppercase',
                      }}
                    >
                      {article.category}
                    </span>
                  </div>

                  <div style={{ padding: '28px' }}>
                    <span style={{ fontSize: '12px', color: '#8C8D80', display: 'block', marginBottom: '8px' }}>
                      {article.date} • {article.readTime}
                    </span>
                    <h3 style={{ fontFamily: 'Fraunces, serif', fontSize: '22px', color: '#1A1B18', lineHeight: 1.3, marginBottom: '12px' }}>
                      {article.title}
                    </h3>
                    <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px', color: '#5C5D54', lineHeight: 1.5, marginBottom: '20px' }}>
                      {article.excerpt}
                    </p>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#B5643D', fontSize: '13px', fontWeight: 600 }}>
                      <span>Read Article</span>
                      <ArrowRight size={14} />
                    </div>
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>

      <style>{`
        .journal-item-card:hover {
          transform: translateY(-4px);
          border-color: #B5643D;
          box-shadow: 0 16px 36px rgba(26, 27, 24, 0.1);
        }
        .journal-item-card:hover .journal-item-img {
          transform: scale(1.04);
        }
      `}</style>
    </div>
  );
};

export default JournalIndexPage;
