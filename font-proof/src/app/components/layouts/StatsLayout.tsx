"use client"

import React from 'react';
import { ColorTheme } from '../../types';

interface StatsLayoutProps {
  fontFamily: string;
  theme: ColorTheme;
}

export default function StatsLayout({ fontFamily, theme }: StatsLayoutProps) {
  const containerStyle: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '60px',
    padding: '80px 40px',
    maxWidth: '1200px',
    margin: '0 auto',
    textAlign: 'center',
  };

  const statNumberStyle: React.CSSProperties = {
    fontFamily,
    fontSize: '72px',
    fontWeight: 700,
    lineHeight: 1,
    marginBottom: '12px',
    letterSpacing: '-0.02em',
  };

  const statLabelStyle: React.CSSProperties = {
    fontFamily,
    fontSize: '16px',
    textTransform: 'uppercase',
    letterSpacing: '0.1em',
    opacity: 0.6,
  };

  return (
    <div style={containerStyle}>
      <div>
        <div style={statNumberStyle}>847</div>
        <div style={statLabelStyle}>Socks Lost</div>
      </div>
      <div>
        <div style={statNumberStyle}>3.2K</div>
        <div style={statLabelStyle}>Snacks Eaten</div>
      </div>
      <div>
        <div style={statNumberStyle}>∞</div>
        <div style={statLabelStyle}>Dad Jokes</div>
      </div>
      <div>
        <div style={statNumberStyle}>0</div>
        <div style={statLabelStyle}>Regrets</div>
      </div>
    </div>
  );
}
