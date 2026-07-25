import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { getJournalBySlug } from '../data/journeysData';
import { Reveal } from '../components/common/Reveal';
import { ArrowLeft, Calendar, Clock } from 'lucide-react';

export const JournalArticlePage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const article = getJournalBySlug(slug || '');

  if (!article) {
    return <Navigate to="/404" replace />;
  }

  return (
    <div style={{ paddingTop: '120px', paddingBottom: '96px', backgroundColor: '#FAF7F1' }}>
      <div style={{ maxWidth: '860px', margin: '0 auto', padding: '0 24px' }}>
        <Link
          to="/journal"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            color: '#5C5D54',
            fontSize: '13px',
            fontFamily: 'Inter, sans-serif',
            textDecoration: 'none',
            marginBottom: '32px',
          }}
        >
          <ArrowLeft size={16} />
          <span>Return to Journal Index</span>
        </Link>

        <Reveal>
          <span style={{ fontSize: '11px', fontFamily: 'Inter, sans-serif', fontWeight: 600, color: '#B5643D', letterSpacing: '0.14em', textTransform: 'uppercase', display: 'block', marginBottom: '12px' }}>
            AURELIO EDITORIAL • {article.category}
          </span>
          <h1 className="display-lg" style={{ color: '#1A1B18', marginBottom: '20px', lineHeight: 1.15 }}>
            {article.title}
          </h1>

          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', fontSize: '13px', color: '#8C8D80', fontFamily: 'Inter, sans-serif', marginBottom: '32px' }}>
            <span>By {article.author}</span>
            <span>•</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Calendar size={13} /> {article.date}</span>
            <span>•</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Clock size={13} /> {article.readTime}</span>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div style={{ height: '440px', borderRadius: '16px', overflow: 'hidden', marginBottom: '40px' }}>
            <img src={article.image} alt={article.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
        </Reveal>

        <Reveal delay={0.2}>
          <div style={{ maxWidth: '720px', margin: '0 auto' }}>
            <p className="body-lg" style={{ fontSize: '20px', fontStyle: 'italic', color: '#173D3A', lineHeight: 1.6, marginBottom: '32px', borderLeft: '3px solid #B5643D', paddingLeft: '20px' }}>
              "{article.excerpt}"
            </p>

            {article.content.map((paragraph, idx) => (
              <p key={idx} className="body-md" style={{ fontSize: '18px', lineHeight: 1.8, marginBottom: '24px', color: '#33342F' }}>
                {paragraph}
              </p>
            ))}
          </div>
        </Reveal>
      </div>
    </div>
  );
};

export default JournalArticlePage;
