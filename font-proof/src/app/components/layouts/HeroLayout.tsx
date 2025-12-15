"use client"

import React from 'react';
import { ColorTheme } from '../../types';

interface HeroLayoutProps {
  fontFamily: string;
  theme: ColorTheme;
}

export default function HeroLayout({ fontFamily, theme }: HeroLayoutProps) {
  const containerStyle: React.CSSProperties = {
    padding: '80px 40px',
    textAlign: 'center',
    maxWidth: '900px',
    margin: '0 auto',
  };

  const headingStyle: React.CSSProperties = {
    fontFamily,
    fontSize: '72px',
    fontWeight: 700,
    lineHeight: 1.1,
    marginBottom: '24px',
    letterSpacing: '-0.02em',
  };

  const subtitleStyle: React.CSSProperties = {
    fontFamily,
    fontSize: '24px',
    lineHeight: 1.5,
    opacity: 0.7,
    marginBottom: '40px',
    maxWidth: '600px',
    margin: '0 auto 40px',
  };

  const ctaContainerStyle: React.CSSProperties = {
    display: 'flex',
    gap: '16px',
    justifyContent: 'center',
    flexWrap: 'wrap',
  };

  const primaryButtonStyle: React.CSSProperties = {
    fontFamily,
    fontSize: '18px',
    fontWeight: 600,
    padding: '16px 32px',
    backgroundColor: theme.text,
    color: theme.background,
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
  };

  const secondaryButtonStyle: React.CSSProperties = {
    fontFamily,
    fontSize: '18px',
    fontWeight: 600,
    padding: '16px 32px',
    backgroundColor: 'transparent',
    color: theme.text,
    border: `2px solid ${theme.text}`,
    borderRadius: '8px',
    cursor: 'pointer',
  };

  return (
    <div style={containerStyle}>
      <h1 style={headingStyle}>We Sell Rocks. Very Cool Rocks.</h1>
      <p style={subtitleStyle}>
        Each rock is hand-selected by our team of professional rock enthusiasts and comes with a certificate of authenticity
      </p>
      <div style={ctaContainerStyle}>
        <button style={primaryButtonStyle}>Buy Rock</button>
        <button style={secondaryButtonStyle}>See Rocks</button>
      </div>
    </div>
  );
}
