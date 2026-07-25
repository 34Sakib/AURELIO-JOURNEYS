import React, { useState } from 'react';
import { DayItinerary } from '../../data/journeysData';
import { MapPin, ChevronDown, ChevronUp, Utensils, Bed, Sparkles } from 'lucide-react';

interface ItineraryTimelineProps {
  days: DayItinerary[];
}

export const ItineraryTimeline: React.FC<ItineraryTimelineProps> = ({ days }) => {
  const [openDay, setOpenDay] = useState<number | null>(1); // Day 1 open by default

  const toggleDay = (dayNum: number) => {
    setOpenDay(openDay === dayNum ? null : dayNum);
  };

  return (
    <div style={{ marginTop: '32px' }}>
      <h3
        style={{
          fontFamily: 'Fraunces, serif',
          fontSize: '26px',
          color: '#1A1B18',
          marginBottom: '24px',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
        }}
      >
        <span>Day-by-Day Journey Breakdown</span>
        <span
          style={{
            fontSize: '12px',
            fontFamily: 'Inter, sans-serif',
            fontWeight: 600,
            backgroundColor: '#F3E2D6',
            color: '#B5643D',
            padding: '4px 10px',
            borderRadius: '999px',
          }}
        >
          {days.length} Days
        </span>
      </h3>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {days.map((day) => {
          const isOpen = openDay === day.day;

          return (
            <div
              key={day.day}
              style={{
                backgroundColor: '#FAF7F1',
                borderRadius: '12px',
                border: isOpen ? '1px solid #B5643D' : '1px solid #E4DCC8',
                overflow: 'hidden',
                transition: 'all 300ms cubic-bezier(0.22, 1, 0.36, 1)',
              }}
            >
              {/* Day Header Trigger */}
              <div
                onClick={() => toggleDay(day.day)}
                style={{
                  padding: '20px 24px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  cursor: 'pointer',
                  backgroundColor: isOpen ? '#FAF7F1' : '#FAF7F1',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <span
                    style={{
                      fontFamily: 'Fraunces, serif',
                      fontSize: '18px',
                      fontWeight: 600,
                      color: '#B5643D',
                      backgroundColor: '#F3E2D6',
                      width: '40px',
                      height: '40px',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    {day.day}
                  </span>

                  <div>
                    <h4
                      style={{
                        fontFamily: 'Fraunces, serif',
                        fontSize: '18px',
                        color: '#1A1B18',
                        lineHeight: 1.2,
                        marginBottom: '4px',
                      }}
                    >
                      {day.title}
                    </h4>
                    <span
                      style={{
                        fontFamily: 'Inter, sans-serif',
                        fontSize: '13px',
                        color: '#5C5D54',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px',
                      }}
                    >
                      <MapPin size={12} color="#B5643D" />
                      {day.location}
                    </span>
                  </div>
                </div>

                <button
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#8C8D80',
                    cursor: 'pointer',
                  }}
                >
                  {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
              </div>

              {/* Day Expanded Content */}
              {isOpen && (
                <div
                  style={{
                    padding: '0 24px 24px 80px',
                    borderTop: '1px solid #F1ECE1',
                    paddingTop: '20px',
                  }}
                >
                  <p
                    style={{
                      fontFamily: 'Inter, sans-serif',
                      fontSize: '15px',
                      color: '#33342F',
                      lineHeight: 1.6,
                      marginBottom: '16px',
                    }}
                  >
                    {day.description}
                  </p>

                  {/* Highlight Callout Box */}
                  <div
                    style={{
                      backgroundColor: '#F3E2D6',
                      borderLeft: '3px solid #B5643D',
                      padding: '12px 16px',
                      borderRadius: '0 8px 8px 0',
                      marginBottom: '16px',
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '10px',
                    }}
                  >
                    <Sparkles size={16} color="#B5643D" style={{ marginTop: '2px', flexShrink: 0 }} />
                    <div>
                      <span
                        style={{
                          fontSize: '11px',
                          fontFamily: 'Inter, sans-serif',
                          fontWeight: 700,
                          letterSpacing: '0.1em',
                          textTransform: 'uppercase',
                          color: '#B5643D',
                          display: 'block',
                        }}
                      >
                        Curated Highlight
                      </span>
                      <span style={{ fontSize: '13px', color: '#1A1B18', fontWeight: 500 }}>
                        {day.highlight}
                      </span>
                    </div>
                  </div>

                  {/* Accommodation & Meals */}
                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                      gap: '12px',
                      fontFamily: 'Inter, sans-serif',
                      fontSize: '13px',
                      color: '#5C5D54',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Bed size={15} color="#173D3A" />
                      <span><strong>Sanctuary:</strong> {day.accommodation}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Utensils size={15} color="#173D3A" />
                      <span><strong>Dining:</strong> {day.meals}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
