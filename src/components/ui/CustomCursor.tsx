import React, { useEffect, useState } from 'react';

export const CustomCursor: React.FC = () => {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [cursorText, setCursorText] = useState('');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Desktop only check
    if (window.matchMedia('(pointer: coarse)').matches) {
      return;
    }

    const onMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);

      const target = e.target as HTMLElement | null;
      if (!target) return;

      const hoverable = target.closest('[data-cursor]');
      if (hoverable) {
        setIsHovered(true);
        setCursorText(hoverable.getAttribute('data-cursor') || '');
      } else {
        setIsHovered(false);
        setCursorText('');
      }
    };

    const onMouseLeave = () => setIsVisible(false);

    window.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseleave', onMouseLeave);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
        pointerEvents: 'none',
        zIndex: 99999,
        transition: 'transform 0.08s ease-out',
      }}
    >
      <div
        style={{
          transform: 'translate(-50%, -50%)',
          width: isHovered ? (cursorText ? '72px' : '44px') : '12px',
          height: isHovered ? (cursorText ? '72px' : '44px') : '12px',
          borderRadius: '50%',
          backgroundColor: isHovered ? 'rgba(181, 100, 61, 0.85)' : 'rgba(26, 27, 24, 0.4)',
          border: isHovered ? '1px solid rgba(255, 255, 255, 0.4)' : '1px solid rgba(250, 247, 241, 0.6)',
          backdropFilter: 'blur(4px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#FAF7F1',
          fontSize: '11px',
          fontFamily: 'Inter, sans-serif',
          fontWeight: 600,
          letterSpacing: '0.05em',
          textTransform: 'uppercase',
          transition: 'width 0.25s ease, height 0.25s ease, background-color 0.25s ease',
          boxShadow: isHovered ? '0 8px 24px rgba(181, 100, 61, 0.3)' : 'none',
        }}
      >
        {isHovered && cursorText}
      </div>
    </div>
  );
};
