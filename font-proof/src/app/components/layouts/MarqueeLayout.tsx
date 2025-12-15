"use client"

import React from 'react';
import { ColorTheme } from '../../types';

interface MarqueeLayoutProps {
  fontFamily: string;
  theme: ColorTheme;
}

export default function MarqueeLayout({ fontFamily, theme }: MarqueeLayoutProps) {
  const containerStyle: React.CSSProperties = {
    overflow: 'hidden',
    padding: '60px 0',
    borderTop: `1px solid ${theme.text}20`,
    borderBottom: `1px solid ${theme.text}20`,
  };

  const marqueeStyle: React.CSSProperties = {
    display: 'flex',
    animation: 'marquee 20s linear infinite',
    whiteSpace: 'nowrap',
  };

  const textStyle: React.CSSProperties = {
    fontFamily,
    fontSize: '96px',
    fontWeight: 700,
    letterSpacing: '-0.02em',
    paddingRight: '80px',
  };

  const text = "PIZZA • TACOS • NAPS • SNACKS • ";

  return (
    <>
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
      <div style={containerStyle}>
        <div style={marqueeStyle}>
          <span style={textStyle}>{text.repeat(4)}</span>
        </div>
      </div>
    </>
  );
}
