import React, { useState } from 'react';
import { useParams, Link, Navigate, useNavigate } from 'react-router-dom';
import { getJourneyBySlug, Journey, JOURNEYS_DATA } from '../data/journeysData';
import {
  Bookmark,
  Printer,
  Calendar,
  Clock,
  CheckCircle2,
  XCircle,
  PhoneCall,
  Quote,
  Star,
  MapPin,
  Users,
  ChevronDown,
  ChevronUp,
  Camera,
  ShieldCheck,
  Send,
  X,
} from 'lucide-react';
import { Reveal } from '../components/common/Reveal';
import { JourneyCard } from '../components/journeys/JourneyCard';

interface JourneyDetailPageProps {
  shortlist?: Journey[];
  onToggleShortlist?: (journey: Journey) => void;
}

// Sample Reviews Data
const SAMPLE_REVIEWS = [
  {
    id: '1',
    author: 'Lord Harrison V.',
    date: 'October 2025',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&auto=format&fit=crop',
    comment: 'An utterly unhurried, sublime experience. The private after-hours temple illumination in Kyoto was a moment my family will treasure forever. Execution was invisible and flawless.',
  },
  {
    id: '2',
    author: 'Eleanor Vance',
    date: 'September 2025',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=150&auto=format&fit=crop',
    comment: 'The level of cultural intimacy provided by Aurelio Journeys is unmatched. Meeting the 15th-generation tea master privately was an incredible honor.',
  },
];

// Sample FAQs
const SAMPLE_FAQS = [
  {
    question: 'What is the physical difficulty level for this expedition?',
    answer: 'This expedition is rated gentle to moderate. All walks are unhurried, and private chauffeured transportation is provided for all transfers.',
  },
  {
    question: 'Can dietary requirements and private preferences be accommodated?',
    answer: 'Absolutely. Every meal, including multi-course kaiseki dinners, is tailor-made to your exact dietary requirements by master chefs.',
  },
  {
    question: 'What is the cancellation and deposit policy?',
    answer: 'We require a 25% deposit upon confirmation. Full balance is due 60 days prior to departure, with 100% flexible date transfers up to 30 days prior.',
  },
];

export const JourneyDetailPage: React.FC<JourneyDetailPageProps> = ({
  shortlist = [],
  onToggleShortlist = () => {},
}) => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  const journey = getJourneyBySlug(slug || '');

  const [selectedLightboxImg, setSelectedLightboxImg] = useState<string | null>(null);
  const [openDay, setOpenDay] = useState<number | null>(1);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [selectedMonth, setSelectedMonth] = useState<string>('Autumn 2026');
  const [guestCount, setGuestCount] = useState<number>(2);

  // Review Form State
  const [newRating, setNewRating] = useState<number>(5);
  const [newReviewerName, setNewReviewerName] = useState<string>('');
  const [newReviewComment, setNewReviewComment] = useState<string>('');
  const [reviewSubmitted, setReviewSubmitted] = useState<boolean>(false);

  if (!journey) {
    return <Navigate to="/404" replace />;
  }

  const isShortlisted = shortlist.some((s) => s.id === journey.id);
  const allImages = [journey.heroImage, ...journey.gallery];

  const handlePrint = () => {
    window.print();
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReviewerName || !newReviewComment) return;
    setReviewSubmitted(true);
    setTimeout(() => {
      setNewReviewerName('');
      setNewReviewComment('');
    }, 2000);
  };

  const relatedJourneys = JOURNEYS_DATA.filter((j) => j.id !== journey.id).slice(0, 3);

  return (
    <div style={{ paddingTop: '84px', paddingBottom: '80px', backgroundColor: '#FAF7F1' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>
        
        {/* 1. Breadcrumb Navigation & Top Actions */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }} className="no-print">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', fontFamily: 'Inter, sans-serif', color: '#8C8D80' }}>
            <Link to="/" style={{ color: '#5C5D54', textDecoration: 'none' }}>Home</Link>
            <span>/</span>
            <Link to="/journeys" style={{ color: '#5C5D54', textDecoration: 'none' }}>Curated Journeys</Link>
            <span>/</span>
            <span style={{ color: '#B5643D', fontWeight: 600 }}>{journey.title}</span>
          </div>

          <div style={{ display: 'flex', gap: '10px' }}>
            <button
              onClick={handlePrint}
              style={{
                backgroundColor: '#FFFFFF',
                border: '1px solid #E4DCC8',
                borderRadius: '999px',
                padding: '6px 14px',
                fontSize: '12px',
                fontFamily: 'Inter, sans-serif',
                fontWeight: 500,
                color: '#33342F',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
              }}
            >
              <Printer size={14} />
              <span>Print Itinerary</span>
            </button>

            <button
              onClick={() => onToggleShortlist(journey)}
              style={{
                backgroundColor: isShortlisted ? '#B5643D' : '#FFFFFF',
                color: isShortlisted ? '#FAF7F1' : '#33342F',
                border: '1px solid #B5643D',
                borderRadius: '999px',
                padding: '6px 14px',
                fontSize: '12px',
                fontFamily: 'Inter, sans-serif',
                fontWeight: 500,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
              }}
            >
              <Bookmark size={14} fill={isShortlisted ? '#FAF7F1' : 'none'} />
              <span>{isShortlisted ? 'Saved' : 'Save Trip'}</span>
            </button>
          </div>
        </div>

        {/* 2. HEADER BLOCK WITH ONE-CORNER SHORT IMAGE CARD (Corner Gallery Thumbnail!) */}
        <Reveal>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 220px',
              gap: '24px',
              alignItems: 'center',
              marginBottom: '20px',
              backgroundColor: '#FFFFFF',
              border: '1px solid #E4DCC8',
              borderRadius: '20px',
              padding: '24px',
              boxShadow: '0 4px 16px rgba(26, 27, 24, 0.04)',
            }}
            className="header-corner-grid"
          >
            {/* Left Side: Title, Subtitle & Region */}
            <div>
              <span
                style={{
                  fontSize: '11px',
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: 600,
                  letterSpacing: '0.12em',
                  color: '#B5643D',
                  textTransform: 'uppercase',
                  display: 'block',
                  marginBottom: '6px',
                }}
              >
                {journey.region} • {journey.style}
              </span>
              <h1 style={{ fontFamily: 'Fraunces, serif', fontSize: '32px', color: '#1A1B18', lineHeight: 1.15, marginBottom: '8px' }}>
                {journey.title}
              </h1>
              <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px', color: '#5C5D54', lineHeight: 1.5, margin: 0 }}>
                {journey.subtitle}
              </p>
            </div>

            {/* Right Side: ONE-CORNER SHORT IMAGE CARD (Width 220px, Height 140px) */}
            <div
              onClick={() => setSelectedLightboxImg(journey.heroImage)}
              data-cursor="View Gallery"
              style={{
                position: 'relative',
                width: '220px',
                height: '140px',
                borderRadius: '14px',
                overflow: 'hidden',
                cursor: 'pointer',
                border: '1px solid #E4DCC8',
                boxShadow: '0 4px 14px rgba(0,0,0,0.1)',
                flexShrink: 0,
              }}
              className="corner-image-card"
            >
              <img
                src={journey.heroImage}
                alt={journey.title}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  transition: 'transform 500ms ease',
                }}
                className="corner-img"
              />
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(180deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.65) 100%)',
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  bottom: '10px',
                  left: '10px',
                  right: '10px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  backgroundColor: 'rgba(250,247,241,0.92)',
                  backdropFilter: 'blur(8px)',
                  padding: '4px 10px',
                  borderRadius: '999px',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '10px', fontFamily: 'Inter, sans-serif', fontWeight: 600, color: '#1A1B18' }}>
                  <Camera size={12} color="#B5643D" />
                  <span>Sanctuary Gallery</span>
                </div>
                <span style={{ fontSize: '10px', fontFamily: 'Inter, sans-serif', fontWeight: 700, color: '#B5643D' }}>
                  +{allImages.length} Photos
                </span>
              </div>
            </div>
          </div>
        </Reveal>

        {/* 3. Quick Specs Bar (STARTS RIGHT AFTER HEADER BLOCK!) */}
        <Reveal delay={0.1}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '20px',
              flexWrap: 'wrap',
              marginBottom: '28px',
              padding: '12px 20px',
              backgroundColor: '#F1ECE1',
              borderRadius: '12px',
              border: '1px solid #E4DCC8',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', fontFamily: 'Inter, sans-serif', color: '#1A1B18' }}>
              <Clock size={15} color="#B5643D" />
              <span><strong>{journey.durationDays} Days</strong> / {journey.durationDays - 1} Nights</span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', fontFamily: 'Inter, sans-serif', color: '#1A1B18' }}>
              <Users size={15} color="#B5643D" />
              <span>Max 8 Guests (Private)</span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', fontFamily: 'Inter, sans-serif', color: '#1A1B18' }}>
              <Calendar size={15} color="#B5643D" />
              <span>Season: <strong>{journey.bestTimeToVisit}</strong></span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', fontFamily: 'Inter, sans-serif', color: '#1A1B18' }}>
              <MapPin size={15} color="#B5643D" />
              <span>{journey.region}</span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '13px', fontFamily: 'Inter, sans-serif', color: '#1A1B18', marginLeft: 'auto' }}>
              <Star size={15} color="#C9A15E" fill="#C9A15E" />
              <span><strong>4.9</strong> (28 Sovereign Reviews)</span>
            </div>
          </div>
        </Reveal>

        {/* 4. 2-COLUMN MAIN CONTENT & STICKY BOOKING CARD */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: '36px', alignItems: 'start' }} className="detail-layout-grid">
          
          {/* LEFT MAIN CONTENT AREA */}
          <div>
            {/* Expedition Overview (Flows cleanly right below header!) */}
            <Reveal delay={0.15}>
              <div style={{ marginBottom: '32px' }}>
                <h3 style={{ fontFamily: 'Fraunces, serif', fontSize: '24px', color: '#1A1B18', marginBottom: '12px' }}>
                  Expedition Overview
                </h3>
                <p className="body-md" style={{ color: '#33342F', fontSize: '15px', lineHeight: 1.65 }}>
                  {journey.overview}
                </p>
              </div>
            </Reveal>

            {/* Key Highlights List */}
            <Reveal delay={0.2}>
              <div style={{ marginBottom: '32px', backgroundColor: '#FFFFFF', padding: '22px', borderRadius: '16px', border: '1px solid #E4DCC8' }}>
                <h3 style={{ fontFamily: 'Fraunces, serif', fontSize: '20px', color: '#1A1B18', marginBottom: '14px' }}>
                  Signature Expedition Highlights
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '12px' }}>
                  {journey.highlights.map((h, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                      <CheckCircle2 size={16} color="#B5643D" style={{ marginTop: '2px', flexShrink: 0 }} />
                      <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px', color: '#1A1B18', fontWeight: 500 }}>
                        {h}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>

            {/* Travel Designer Quote Card */}
            <Reveal delay={0.25}>
              <div
                style={{
                  backgroundColor: '#173D3A',
                  color: '#FAF7F1',
                  padding: '24px',
                  borderRadius: '18px',
                  marginBottom: '36px',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                <Quote size={24} color="#C9A15E" style={{ marginBottom: '10px', opacity: 0.8 }} />
                <p style={{ fontFamily: 'Fraunces, serif', fontSize: '17px', fontStyle: 'italic', lineHeight: 1.5, marginBottom: '18px' }}>
                  "{journey.designer.quote}"
                </p>

                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <img src={journey.designer.avatar} alt={journey.designer.name} style={{ width: '44px', height: '44px', borderRadius: '50%', objectFit: 'cover', border: '2px solid #C9A15E' }} />
                  <div>
                    <h4 style={{ fontSize: '15px', fontWeight: 600, color: '#FAF7F1', fontFamily: 'Fraunces, serif' }}>{journey.designer.name}</h4>
                    <span style={{ fontSize: '11px', color: '#C9A15E', fontFamily: 'Inter, sans-serif' }}>{journey.designer.role}</span>
                  </div>
                </div>
              </div>
            </Reveal>

            {/* Collapsible Day-by-Day Itinerary Accordion */}
            <Reveal delay={0.3}>
              <div style={{ marginBottom: '36px' }}>
                <h3 style={{ fontFamily: 'Fraunces, serif', fontSize: '24px', color: '#1A1B18', marginBottom: '18px' }}>
                  Day-by-Day Itinerary Plan
                </h3>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {journey.dayByDay.map((day) => {
                    const isOpen = openDay === day.day;
                    return (
                      <div
                        key={day.day}
                        style={{
                          backgroundColor: '#FFFFFF',
                          border: isOpen ? '1px solid #B5643D' : '1px solid #E4DCC8',
                          borderRadius: '14px',
                          overflow: 'hidden',
                          transition: 'all 300ms ease',
                        }}
                      >
                        <div
                          onClick={() => setOpenDay(isOpen ? null : day.day)}
                          style={{
                            padding: '14px 18px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            cursor: 'pointer',
                            backgroundColor: isOpen ? '#FAF7F1' : '#FFFFFF',
                          }}
                        >
                          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <span style={{ backgroundColor: '#B5643D', color: '#FAF7F1', fontSize: '10px', fontWeight: 700, padding: '3px 8px', borderRadius: '999px', fontFamily: 'Inter, sans-serif' }}>
                              DAY 0{day.day}
                            </span>
                            <h4 style={{ fontFamily: 'Fraunces, serif', fontSize: '17px', color: '#1A1B18', margin: 0 }}>
                              {day.title}
                            </h4>
                          </div>

                          {isOpen ? <ChevronUp size={16} color="#B5643D" /> : <ChevronDown size={16} color="#8C8D80" />}
                        </div>

                        {isOpen && (
                          <div style={{ padding: '0 18px 18px', borderTop: '1px solid #F1ECE1' }}>
                            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px', color: '#5C5D54', lineHeight: 1.55, marginTop: '12px', marginBottom: '12px' }}>
                              {day.description}
                            </p>

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', backgroundColor: '#FAF7F1', padding: '10px 14px', borderRadius: '10px' }}>
                              <div>
                                <span style={{ fontSize: '10px', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#8C8D80', display: 'block' }}>Accommodation</span>
                                <span style={{ fontSize: '12px', fontWeight: 600, color: '#1A1B18' }}>{day.accommodation}</span>
                              </div>
                              <div>
                                <span style={{ fontSize: '10px', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#8C8D80', display: 'block' }}>Dining</span>
                                <span style={{ fontSize: '12px', fontWeight: 600, color: '#1A1B18' }}>{day.meals}</span>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </Reveal>

            {/* Inclusions & Exclusions */}
            <Reveal delay={0.35}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '36px' }} className="inclusions-grid">
                <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #E4DCC8', padding: '20px', borderRadius: '16px' }}>
                  <h4 style={{ fontFamily: 'Fraunces, serif', fontSize: '17px', color: '#173D3A', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <CheckCircle2 size={16} color="#4A7A5F" />
                    <span>What's Included</span>
                  </h4>
                  <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px', padding: 0 }}>
                    {journey.inclusions.map((inc, i) => (
                      <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '6px', fontSize: '13px', color: '#33342F' }}>
                        <span style={{ color: '#4A7A5F', fontWeight: 700 }}>✓</span>
                        <span>{inc}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #E4DCC8', padding: '20px', borderRadius: '16px' }}>
                  <h4 style={{ fontFamily: 'Fraunces, serif', fontSize: '17px', color: '#1A1B18', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <XCircle size={16} color="#8C8D80" />
                    <span>Discretionary / Excluded</span>
                  </h4>
                  <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px', padding: 0 }}>
                    {journey.exclusions.map((exc, i) => (
                      <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '6px', fontSize: '13px', color: '#5C5D54' }}>
                        <span style={{ color: '#8C8D80' }}>✕</span>
                        <span>{exc}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Reveal>

            {/* FAQs Accordion */}
            <Reveal delay={0.4}>
              <div style={{ marginBottom: '36px' }}>
                <h3 style={{ fontFamily: 'Fraunces, serif', fontSize: '22px', color: '#1A1B18', marginBottom: '14px' }}>
                  Frequently Asked Questions
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {SAMPLE_FAQS.map((faq, index) => {
                    const isFaqOpen = openFaq === index;
                    return (
                      <div
                        key={index}
                        style={{
                          backgroundColor: '#FFFFFF',
                          border: '1px solid #E4DCC8',
                          borderRadius: '12px',
                          overflow: 'hidden',
                        }}
                      >
                        <div
                          onClick={() => setOpenFaq(isFaqOpen ? null : index)}
                          style={{
                            padding: '12px 16px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            cursor: 'pointer',
                            fontFamily: 'Inter, sans-serif',
                            fontSize: '13px',
                            fontWeight: 600,
                            color: '#1A1B18',
                          }}
                        >
                          <span>{faq.question}</span>
                          {isFaqOpen ? <ChevronUp size={16} color="#B5643D" /> : <ChevronDown size={16} color="#8C8D80" />}
                        </div>
                        {isFaqOpen && (
                          <div style={{ padding: '0 16px 12px', color: '#5C5D54', fontSize: '13px', lineHeight: 1.5 }}>
                            {faq.answer}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </Reveal>

            {/* Customer Reviews & Rating Breakdown */}
            <Reveal delay={0.45}>
              <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #E4DCC8', padding: '24px', borderRadius: '18px', marginBottom: '36px' }}>
                <h3 style={{ fontFamily: 'Fraunces, serif', fontSize: '22px', color: '#1A1B18', marginBottom: '18px' }}>
                  Sovereign Traveler Reviews
                </h3>

                {/* Score Summary Header */}
                <div style={{ display: 'grid', gridTemplateColumns: '150px 1fr', gap: '20px', marginBottom: '24px', alignItems: 'center' }} className="review-score-header">
                  <div style={{ textAlign: 'center', padding: '16px', backgroundColor: '#FAF7F1', borderRadius: '14px', border: '1px solid #E4DCC8' }}>
                    <span style={{ fontFamily: 'Fraunces, serif', fontSize: '38px', fontWeight: 500, color: '#1A1B18', lineHeight: 1 }}>4.9</span>
                    <div style={{ display: 'flex', justifyContent: 'center', gap: '2px', margin: '4px 0' }}>
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={13} color="#C9A15E" fill="#C9A15E" />
                      ))}
                    </div>
                    <span style={{ fontSize: '10px', fontFamily: 'Inter, sans-serif', color: '#8C8D80' }}>Based on 28 Reviews</span>
                  </div>

                  {/* Rating Breakdown Bars */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                    {[
                      { label: 'Service & Concierge', score: '5.0', pct: '100%' },
                      { label: 'Unhurried Pacing', score: '4.9', pct: '98%' },
                      { label: 'Sanctuary Comfort', score: '4.9', pct: '98%' },
                      { label: 'Private Dining & Kaiseki', score: '5.0', pct: '100%' },
                    ].map((cat, i) => (
                      <div key={i}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px', fontFamily: 'Inter, sans-serif', color: '#1A1B18', marginBottom: '2px' }}>
                          <span>{cat.label}</span>
                          <strong>{cat.score}</strong>
                        </div>
                        <div style={{ height: '4px', backgroundColor: '#E4DCC8', borderRadius: '999px', overflow: 'hidden' }}>
                          <div style={{ width: cat.pct, height: '100%', backgroundColor: '#B5643D' }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Reviewer Cards List */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '24px' }}>
                  {SAMPLE_REVIEWS.map((rev) => (
                    <div key={rev.id} style={{ borderBottom: '1px solid #F1ECE1', paddingBottom: '14px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
                        <img src={rev.avatar} alt={rev.author} style={{ width: '34px', height: '34px', borderRadius: '50%', objectFit: 'cover' }} />
                        <div>
                          <h5 style={{ fontSize: '13px', fontWeight: 600, color: '#1A1B18', fontFamily: 'Fraunces, serif' }}>{rev.author}</h5>
                          <span style={{ fontSize: '10px', color: '#8C8D80' }}>{rev.date}</span>
                        </div>
                        <div style={{ marginLeft: 'auto', display: 'flex', gap: '2px' }}>
                          {[...Array(rev.rating)].map((_, i) => (
                            <Star key={i} size={12} color="#C9A15E" fill="#C9A15E" />
                          ))}
                        </div>
                      </div>
                      <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '13px', color: '#5C5D54', lineHeight: 1.5 }}>
                        "{rev.comment}"
                      </p>
                    </div>
                  ))}
                </div>

                {/* Write a Review Form */}
                <form onSubmit={handleReviewSubmit} style={{ backgroundColor: '#FAF7F1', padding: '16px', borderRadius: '12px', border: '1px solid #E4DCC8' }}>
                  <h4 style={{ fontFamily: 'Fraunces, serif', fontSize: '15px', color: '#1A1B18', marginBottom: '12px' }}>
                    Share Your Expedition Experience
                  </h4>

                  {reviewSubmitted ? (
                    <div style={{ backgroundColor: 'rgba(74, 122, 95, 0.15)', border: '1px solid #4A7A5F', padding: '12px', borderRadius: '8px', color: '#4A7A5F', fontSize: '12px' }}>
                      ✓ Thank you! Your review has been submitted for verification.
                    </div>
                  ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                      <div>
                        <label style={{ display: 'block', fontSize: '10px', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#5C5D54', marginBottom: '4px' }}>Your Rating</label>
                        <div style={{ display: 'flex', gap: '4px' }}>
                          {[1, 2, 3, 4, 5].map((num) => (
                            <Star
                              key={num}
                              size={16}
                              color="#C9A15E"
                              fill={num <= newRating ? '#C9A15E' : 'none'}
                              style={{ cursor: 'pointer' }}
                              onClick={() => setNewRating(num)}
                            />
                          ))}
                        </div>
                      </div>

                      <div>
                        <input
                          type="text"
                          placeholder="Your Name (e.g. Lord Harrison)"
                          value={newReviewerName}
                          onChange={(e) => setNewReviewerName(e.target.value)}
                          required
                          style={{ width: '100%', padding: '8px 12px', borderRadius: '6px', border: '1px solid #E4DCC8', fontFamily: 'Inter, sans-serif', fontSize: '12px' }}
                        />
                      </div>

                      <div>
                        <textarea
                          placeholder="Write your review about the pacing, sanctuaries, and service..."
                          value={newReviewComment}
                          onChange={(e) => setNewReviewComment(e.target.value)}
                          required
                          rows={2}
                          style={{ width: '100%', padding: '8px 12px', borderRadius: '6px', border: '1px solid #E4DCC8', fontFamily: 'Inter, sans-serif', fontSize: '12px' }}
                        />
                      </div>

                      <button type="submit" className="btn-primary" style={{ padding: '8px 16px', fontSize: '12px', alignSelf: 'flex-start' }}>
                        <Send size={12} />
                        <span>Submit Sovereign Review</span>
                      </button>
                    </div>
                  )}
                </form>
              </div>
            </Reveal>
          </div>

          {/* RIGHT STICKY SIDEBAR (BOOKING & CONCIERGE CARD - STARTS RIGHT AT TOP BESIDE OVERVIEW!) */}
          <div style={{ position: 'sticky', top: '100px', width: '100%' }} className="sticky-booking-sidebar">
            <div
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '18px',
                border: '1px solid #E4DCC8',
                padding: '22px',
                boxShadow: '0 10px 32px rgba(26, 27, 24, 0.06)',
              }}
            >
              {/* Pricing Header */}
              <div style={{ marginBottom: '16px', borderBottom: '1px solid #F1ECE1', paddingBottom: '14px' }}>
                <span style={{ fontSize: '10px', color: '#8C8D80', fontFamily: 'Inter, sans-serif', textTransform: 'uppercase', letterSpacing: '0.08em', display: 'block', marginBottom: '2px' }}>
                  All-Inclusive Sovereign Experience
                </span>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px' }}>
                  <span style={{ fontFamily: 'Fraunces, serif', fontSize: '26px', fontWeight: 600, color: '#1A1B18' }}>
                    ${journey.pricePerPerson.toLocaleString()}
                  </span>
                  <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '12px', color: '#5C5D54' }}>
                    / guest
                  </span>
                </div>
              </div>

              {/* Booking Options Form Inputs */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '16px' }}>
                {/* Departure Month Selector */}
                <div>
                  <label style={{ display: 'block', fontSize: '10px', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#5C5D54', marginBottom: '3px' }}>
                    Departure Window
                  </label>
                  <select
                    value={selectedMonth}
                    onChange={(e) => setSelectedMonth(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '9px',
                      borderRadius: '8px',
                      border: '1px solid #E4DCC8',
                      backgroundColor: '#FAF7F1',
                      fontFamily: 'Inter, sans-serif',
                      fontSize: '12px',
                      color: '#1A1B18',
                      outline: 'none',
                    }}
                  >
                    <option value="Autumn 2026">Autumn 2026 (Oct – Nov)</option>
                    <option value="Winter 2026">Winter 2026 / New Year</option>
                    <option value="Spring 2027">Spring 2027 (Cherry Blossom)</option>
                    <option value="Custom Dates">Custom Private Dates</option>
                  </select>
                </div>

                {/* Guest Counter */}
                <div>
                  <label style={{ display: 'block', fontSize: '10px', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#5C5D54', marginBottom: '3px' }}>
                    Number of Guests
                  </label>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#FAF7F1', border: '1px solid #E4DCC8', padding: '7px 12px', borderRadius: '8px' }}>
                    <span style={{ fontSize: '12px', color: '#1A1B18', fontWeight: 500 }}>Travelers</span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <button
                        type="button"
                        onClick={() => setGuestCount(Math.max(1, guestCount - 1))}
                        style={{ width: '24px', height: '24px', borderRadius: '50%', border: '1px solid #E4DCC8', backgroundColor: '#FFF', cursor: 'pointer' }}
                      >
                        -
                      </button>
                      <span style={{ fontFamily: 'Fraunces, serif', fontSize: '14px', fontWeight: 600 }}>{guestCount}</span>
                      <button
                        type="button"
                        onClick={() => setGuestCount(guestCount + 1)}
                        style={{ width: '24px', height: '24px', borderRadius: '50%', border: '1px solid #E4DCC8', backgroundColor: '#FFF', cursor: 'pointer' }}
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Line Item Pricing Breakdown */}
              <div style={{ backgroundColor: '#FAF7F1', border: '1px solid #E4DCC8', padding: '12px', borderRadius: '10px', marginBottom: '16px', fontSize: '11px', fontFamily: 'Inter, sans-serif' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px', color: '#5C5D54' }}>
                  <span>Base Itinerary (${journey.pricePerPerson.toLocaleString()} × {guestCount})</span>
                  <span>${(journey.pricePerPerson * guestCount).toLocaleString()}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px', color: '#5C5D54' }}>
                  <span>Dedicated Private Chauffeur</span>
                  <span style={{ color: '#4A7A5F', fontWeight: 600 }}>Included</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px', color: '#5C5D54' }}>
                  <span>Temple Permits & VIP Concierge</span>
                  <span style={{ color: '#4A7A5F', fontWeight: 600 }}>Included</span>
                </div>
                <hr style={{ border: 'none', height: '1px', backgroundColor: '#E4DCC8', margin: '6px 0' }} />
                <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 700, color: '#1A1B18', fontSize: '13px' }}>
                  <span>Total Estimated Trip</span>
                  <span>${(journey.pricePerPerson * guestCount).toLocaleString()}</span>
                </div>
              </div>

              {/* Primary CTA Buttons */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '16px' }}>
                <button
                  onClick={() => navigate(`/enquire?journey=${encodeURIComponent(journey.title)}&guests=${guestCount}&date=${encodeURIComponent(selectedMonth)}`)}
                  className="btn-primary"
                  style={{ width: '100%', padding: '12px', justifyContent: 'center', borderRadius: '999px', fontSize: '13px' }}
                >
                  <span>Book / Enquire Expedition</span>
                </button>

                <button
                  onClick={() => navigate(`/contact`)}
                  className="btn-secondary"
                  style={{ width: '100%', padding: '10px', justifyContent: 'center', borderRadius: '999px', fontSize: '12px' }}
                >
                  <PhoneCall size={13} />
                  <span>Speak with Travel Designer</span>
                </button>
              </div>

              {/* Trust Badges */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '5px', fontSize: '11px', fontFamily: 'Inter, sans-serif', color: '#5C5D54' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <ShieldCheck size={13} color="#4A7A5F" />
                  <span>100% Flexible Date Transfers</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <ShieldCheck size={13} color="#4A7A5F" />
                  <span>Guaranteed Private Departure</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <ShieldCheck size={13} color="#4A7A5F" />
                  <span>24/7 Dedicated Concierge Support</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* RELATED JOURNEYS SECTION AT BOTTOM */}
        <div style={{ marginTop: '64px', borderTop: '1px solid #E4DCC8', paddingTop: '40px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '24px' }}>
            <div>
              <span className="label-eyebrow" style={{ color: '#B5643D', marginBottom: '4px', display: 'block' }}>
                RECOMMENDED EXPEDITIONS
              </span>
              <h3 style={{ fontFamily: 'Fraunces, serif', fontSize: '24px', color: '#1A1B18', margin: 0 }}>
                Related Journeys You Might Love
              </h3>
            </div>

            <Link to="/journeys" style={{ fontFamily: 'Inter, sans-serif', fontSize: '13px', fontWeight: 600, color: '#B5643D', textDecoration: 'none' }}>
              View All Collection ➔
            </Link>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
            {relatedJourneys.map((j) => (
              <JourneyCard
                key={j.id}
                journey={j}
                isShortlisted={shortlist.some((s) => s.id === j.id)}
                onToggleShortlist={onToggleShortlist}
                onOpenDetail={(item) => {
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                  navigate(`/journeys/${item.slug || item.id}`);
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Full Lightbox Modal for Photo Gallery */}
      {selectedLightboxImg && (
        <div
          onClick={() => setSelectedLightboxImg(null)}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 99999,
            backgroundColor: 'rgba(26,27,24,0.92)',
            backdropFilter: 'blur(16px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '32px',
          }}
        >
          <button
            onClick={() => setSelectedLightboxImg(null)}
            style={{ position: 'absolute', top: '24px', right: '24px', background: 'none', border: 'none', color: '#FFFFFF', cursor: 'pointer' }}
          >
            <X size={32} />
          </button>
          
          <div style={{ maxWidth: '900px', width: '100%', textAlign: 'center' }}>
            <img src={selectedLightboxImg} alt="Enlarged sanctuary view" style={{ maxWidth: '100%', maxHeight: '75vh', borderRadius: '16px', objectFit: 'contain', boxShadow: '0 24px 64px rgba(0,0,0,0.5)', marginBottom: '16px' }} />
            
            {/* Lightbox Gallery Thumbnails */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', overflowX: 'auto', padding: '8px' }}>
              {allImages.map((imgUrl, idx) => (
                <img
                  key={idx}
                  src={imgUrl}
                  alt="Thumbnail"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedLightboxImg(imgUrl);
                  }}
                  style={{
                    width: '70px',
                    height: '48px',
                    borderRadius: '8px',
                    objectFit: 'cover',
                    cursor: 'pointer',
                    border: selectedLightboxImg === imgUrl ? '2px solid #B5643D' : '2px solid transparent',
                    opacity: selectedLightboxImg === imgUrl ? 1 : 0.6,
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      )}

      <style>{`
        .corner-image-card:hover .corner-img {
          transform: scale(1.08);
        }
        @media (max-width: 960px) {
          .header-corner-grid {
            grid-template-columns: 1fr !important;
          }
          .corner-image-card {
            width: 100% !important;
            height: 180px !important;
          }
          .detail-layout-grid {
            grid-template-columns: 1fr !important;
          }
          .review-score-header {
            grid-template-columns: 1fr !important;
          }
          .inclusions-grid {
            grid-template-columns: 1fr !important;
          }
          .sticky-booking-sidebar {
            position: relative !important;
            top: 0 !important;
          }
        }
      `}</style>
    </div>
  );
};

export default JourneyDetailPage;
