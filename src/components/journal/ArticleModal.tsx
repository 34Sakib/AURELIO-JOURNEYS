import React from 'react';
import { JournalArticle } from '../../data/journeysData';
import { X, Clock, Calendar } from 'lucide-react';

interface ArticleModalProps {
  article: JournalArticle | null;
  isOpen: boolean;
  onClose: () => void;
}

export const ArticleModal: React.FC<ArticleModalProps> = ({ article, isOpen, onClose }) => {
  if (!isOpen || !article) return null;

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
          borderRadius: '20px',
          maxWidth: '860px',
          width: '100%',
          maxHeight: '90vh',
          overflowY: 'auto',
          boxShadow: '0 24px 64px rgba(0, 0, 0, 0.4)',
          border: '1px solid #E4DCC8',
          position: 'relative',
        }}
      >
        {/* Header */}
        <div
          style={{
            padding: '16px 24px',
            borderBottom: '1px solid #E4DCC8',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            position: 'sticky',
            top: 0,
            backgroundColor: 'rgba(250, 247, 241, 0.95)',
            zIndex: 10,
          }}
        >
          <span style={{ fontSize: '11px', fontFamily: 'Inter, sans-serif', fontWeight: 600, color: '#B5643D', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
            Aurelio Editorial • {article.category}
          </span>
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: '#1A1B18', cursor: 'pointer' }}>
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div style={{ padding: '40px' }}>
          <div style={{ marginBottom: '24px' }}>
            <h1 className="display-md" style={{ color: '#1A1B18', marginBottom: '16px', lineHeight: 1.15 }}>
              {article.title}
            </h1>

            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', fontSize: '13px', color: '#8C8D80', fontFamily: 'Inter, sans-serif' }}>
              <span>By {article.author}</span>
              <span>•</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Calendar size={13} /> {article.date}</span>
              <span>•</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Clock size={13} /> {article.readTime}</span>
            </div>
          </div>

          <div style={{ height: '360px', borderRadius: '12px', overflow: 'hidden', marginBottom: '32px' }}>
            <img src={article.image} alt={article.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>

          <div style={{ maxWidth: '720px', margin: '0 auto' }}>
            <p className="body-lg" style={{ fontSize: '20px', fontStyle: 'italic', color: '#173D3A', lineHeight: 1.5, marginBottom: '32px' }}>
              "{article.excerpt}"
            </p>

            {article.content.map((paragraph, idx) => (
              <p key={idx} className="body-md" style={{ fontSize: '17px', lineHeight: 1.8, marginBottom: '24px', color: '#33342F' }}>
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
