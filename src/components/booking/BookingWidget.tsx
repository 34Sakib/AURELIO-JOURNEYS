import React, { useState } from 'react';
import { Search, MapPin, Calendar, Users, SlidersHorizontal, ChevronDown } from 'lucide-react';

interface BookingWidgetProps {
  onSearch: (filters: { destination: string; style: string; travelers: number }) => void;
}

export const BookingWidget: React.FC<BookingWidgetProps> = ({ onSearch }) => {
  const [destination, setDestination] = useState('All Regions');
  const [style, setStyle] = useState('All Styles');
  const [travelers, setTravelers] = useState(2);
  const [dates, setDates] = useState('Autumn / Winter 2026');

  const [activePopover, setActivePopover] = useState<'dest' | 'style' | 'travelers' | null>(null);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch({ destination, style, travelers });
  };

  return (
    <div
      className="glass-panel-dark"
      style={{
        borderRadius: '20px',
        padding: '16px 24px',
        width: '100%',
        maxWidth: '1080px',
        margin: '0 auto',
        boxShadow: '0 24px 64px rgba(0, 0, 0, 0.4)',
        position: 'relative',
        zIndex: 100,
      }}
    >
      <form
        onSubmit={handleSearchSubmit}
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr)) auto',
          gap: '16px',
          alignItems: 'center',
        }}
      >
        {/* Destination Field */}
        <div style={{ position: 'relative' }}>
          <label
            style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '11px',
              fontWeight: 600,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: '#C7C4B4',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              marginBottom: '6px',
            }}
          >
            <MapPin size={12} color="#B5643D" />
            <span>Destination</span>
          </label>
          <button
            type="button"
            onClick={() => setActivePopover(activePopover === 'dest' ? null : 'dest')}
            style={{
              width: '100%',
              background: 'rgba(255, 255, 255, 0.06)',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              borderRadius: '8px',
              padding: '12px 14px',
              color: '#FAF7F1',
              fontFamily: 'Inter, sans-serif',
              fontSize: '14px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              cursor: 'pointer',
            }}
          >
            <span style={{ fontWeight: 500 }}>{destination}</span>
            <ChevronDown size={14} color="#8C8D80" />
          </button>

          {activePopover === 'dest' && (
            <div
              className="glass-panel-dark"
              style={{
                position: 'absolute',
                top: '100%',
                left: 0,
                right: 0,
                marginTop: '8px',
                borderRadius: '12px',
                padding: '8px',
                zIndex: 200,
              }}
            >
              {['All Regions', 'Asia', 'Europe', 'Africa', 'South America', 'Polar & Alpine'].map((reg) => (
                <button
                  key={reg}
                  type="button"
                  onClick={() => {
                    setDestination(reg);
                    setActivePopover(null);
                  }}
                  style={{
                    width: '100%',
                    textAlign: 'left',
                    padding: '10px 12px',
                    background: destination === reg ? 'rgba(181, 100, 61, 0.3)' : 'transparent',
                    border: 'none',
                    color: '#FAF7F1',
                    borderRadius: '6px',
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '13px',
                    cursor: 'pointer',
                  }}
                >
                  {reg}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Travel Style Field */}
        <div style={{ position: 'relative' }}>
          <label
            style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '11px',
              fontWeight: 600,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: '#C7C4B4',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              marginBottom: '6px',
            }}
          >
            <SlidersHorizontal size={12} color="#B5643D" />
            <span>Travel Style</span>
          </label>
          <button
            type="button"
            onClick={() => setActivePopover(activePopover === 'style' ? null : 'style')}
            style={{
              width: '100%',
              background: 'rgba(255, 255, 255, 0.06)',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              borderRadius: '8px',
              padding: '12px 14px',
              color: '#FAF7F1',
              fontFamily: 'Inter, sans-serif',
              fontSize: '14px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              cursor: 'pointer',
            }}
          >
            <span style={{ fontWeight: 500 }}>{style}</span>
            <ChevronDown size={14} color="#8C8D80" />
          </button>

          {activePopover === 'style' && (
            <div
              className="glass-panel-dark"
              style={{
                position: 'absolute',
                top: '100%',
                left: 0,
                right: 0,
                marginTop: '8px',
                borderRadius: '12px',
                padding: '8px',
                zIndex: 200,
              }}
            >
              {['All Styles', 'Cultural Expeditions', 'Private Yachting', 'Wildlife Safari', 'Alpine & Wilderness'].map((st) => (
                <button
                  key={st}
                  type="button"
                  onClick={() => {
                    setStyle(st);
                    setActivePopover(null);
                  }}
                  style={{
                    width: '100%',
                    textAlign: 'left',
                    padding: '10px 12px',
                    background: style === st ? 'rgba(181, 100, 61, 0.3)' : 'transparent',
                    border: 'none',
                    color: '#FAF7F1',
                    borderRadius: '6px',
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '13px',
                    cursor: 'pointer',
                  }}
                >
                  {st}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Date Window */}
        <div>
          <label
            style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '11px',
              fontWeight: 600,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: '#C7C4B4',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              marginBottom: '6px',
            }}
          >
            <Calendar size={12} color="#B5643D" />
            <span>Target Season</span>
          </label>
          <select
            value={dates}
            onChange={(e) => setDates(e.target.value)}
            style={{
              width: '100%',
              background: 'rgba(255, 255, 255, 0.06)',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              borderRadius: '8px',
              padding: '12px 14px',
              color: '#FAF7F1',
              fontFamily: 'Inter, sans-serif',
              fontSize: '14px',
              cursor: 'pointer',
              outline: 'none',
            }}
          >
            <option value="Autumn / Winter 2026" style={{ background: '#1A1B18' }}>Autumn / Winter 2026</option>
            <option value="Spring 2027" style={{ background: '#1A1B18' }}>Spring 2027</option>
            <option value="Summer 2027" style={{ background: '#1A1B18' }}>Summer 2027</option>
            <option value="Flexible Dates" style={{ background: '#1A1B18' }}>Flexible Dates</option>
          </select>
        </div>

        {/* Guests Field */}
        <div style={{ position: 'relative' }}>
          <label
            style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '11px',
              fontWeight: 600,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: '#C7C4B4',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              marginBottom: '6px',
            }}
          >
            <Users size={12} color="#B5643D" />
            <span>Travelers</span>
          </label>
          <button
            type="button"
            onClick={() => setActivePopover(activePopover === 'travelers' ? null : 'travelers')}
            style={{
              width: '100%',
              background: 'rgba(255, 255, 255, 0.06)',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              borderRadius: '8px',
              padding: '12px 14px',
              color: '#FAF7F1',
              fontFamily: 'Inter, sans-serif',
              fontSize: '14px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              cursor: 'pointer',
            }}
          >
            <span style={{ fontWeight: 500 }}>{travelers} Guests</span>
            <ChevronDown size={14} color="#8C8D80" />
          </button>

          {activePopover === 'travelers' && (
            <div
              className="glass-panel-dark"
              style={{
                position: 'absolute',
                top: '100%',
                left: 0,
                right: 0,
                marginTop: '8px',
                borderRadius: '12px',
                padding: '16px',
                zIndex: 200,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <span style={{ fontSize: '13px', color: '#FAF7F1' }}>Number of guests:</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <button
                  type="button"
                  onClick={() => setTravelers(Math.max(1, travelers - 1))}
                  style={{
                    width: '28px',
                    height: '28px',
                    borderRadius: '50%',
                    border: '1px solid #C7C4B4',
                    background: 'none',
                    color: '#FAF7F1',
                    cursor: 'pointer',
                  }}
                >
                  -
                </button>
                <span style={{ fontWeight: 600, color: '#FAF7F1' }}>{travelers}</span>
                <button
                  type="button"
                  onClick={() => setTravelers(travelers + 1)}
                  style={{
                    width: '28px',
                    height: '28px',
                    borderRadius: '50%',
                    border: '1px solid #C7C4B4',
                    background: 'none',
                    color: '#FAF7F1',
                    cursor: 'pointer',
                  }}
                >
                  +
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Submit Search Button */}
        <div style={{ display: 'flex', gap: '8px', alignItems: 'flex-end', height: '100%' }}>
          <button
            type="submit"
            className="btn-primary"
            data-cursor="Search"
            style={{
              height: '46px',
              padding: '0 24px',
              borderRadius: '8px',
              whiteSpace: 'nowrap',
              boxShadow: '0 4px 16px rgba(181, 100, 61, 0.4)',
            }}
          >
            <Search size={16} />
            <span>Curate Search</span>
          </button>
        </div>
      </form>
    </div>
  );
};
