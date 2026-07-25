import React, { useEffect, useState, useRef } from 'react';
import { useInView, useReducedMotion, animate } from 'framer-motion';

interface StatCounterProps {
  value: number;
  suffix?: string;
  prefix?: string;
  decimals?: number;
  duration?: number;
  label: string;
  textColor?: string;
}

export const StatCounter: React.FC<StatCounterProps> = ({
  value,
  suffix = '',
  prefix = '',
  decimals = 0,
  duration = 1.6,
  label,
  textColor,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const shouldReduceMotion = useReducedMotion();
  const [currentValue, setCurrentValue] = useState(0);

  useEffect(() => {
    if (shouldReduceMotion) {
      setCurrentValue(value);
      return;
    }

    if (isInView) {
      const controls = animate(0, value, {
        duration,
        ease: [0.22, 1, 0.36, 1], // ease-out-expo cubic-bezier
        onUpdate: (latest) => {
          setCurrentValue(latest);
        },
      });
      return () => controls.stop();
    }
  }, [isInView, value, duration, shouldReduceMotion]);

  const formattedValue = currentValue.toFixed(decimals);

  return (
    <div ref={ref}>
      <span
        style={{
          fontFamily: 'Fraunces, serif',
          fontSize: '48px',
          fontWeight: 400,
          color: textColor || '#FAF7F1',
          display: 'block',
          lineHeight: 1,
          marginBottom: '8px',
        }}
      >
        {prefix}
        {formattedValue}
        {suffix}
      </span>
      <span
        style={{
          fontFamily: 'Inter, sans-serif',
          fontSize: '13px',
          color: textColor ? '#5C5D54' : '#8C8D80',
          letterSpacing: '0.05em',
        }}
      >
        {label}
      </span>
    </div>
  );
};
