"use client"

import React from 'react';
import { ColorTheme } from '../../types';

interface PricingLayoutProps {
  fontFamily: string;
  theme: ColorTheme;
}

export default function PricingLayout({ fontFamily, theme }: PricingLayoutProps) {
  const containerStyle: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '32px',
    padding: '60px 40px',
    maxWidth: '1200px',
    margin: '0 auto',
  };

  const cardStyle: React.CSSProperties = {
    padding: '40px 32px',
    border: `1px solid ${theme.text}20`,
    borderRadius: '12px',
  };

  const featuredCardStyle: React.CSSProperties = {
    ...cardStyle,
    border: `2px solid ${theme.text}`,
    position: 'relative',
  };

  const planNameStyle: React.CSSProperties = {
    fontFamily,
    fontSize: '14px',
    fontWeight: 600,
    textTransform: 'uppercase',
    letterSpacing: '0.1em',
    marginBottom: '16px',
    opacity: 0.6,
  };

  const priceStyle: React.CSSProperties = {
    fontFamily,
    fontSize: '64px',
    fontWeight: 700,
    lineHeight: 1,
    marginBottom: '8px',
  };

  const periodStyle: React.CSSProperties = {
    fontFamily,
    fontSize: '18px',
    opacity: 0.5,
    marginBottom: '32px',
  };

  const featureStyle: React.CSSProperties = {
    fontFamily,
    fontSize: '16px',
    lineHeight: 1.8,
    marginBottom: '8px',
  };

  const buttonStyle: React.CSSProperties = {
    fontFamily,
    fontSize: '16px',
    fontWeight: 600,
    padding: '14px 28px',
    width: '100%',
    backgroundColor: theme.text,
    color: theme.background,
    border: 'none',
    borderRadius: '8px',
    marginTop: '32px',
    cursor: 'pointer',
  };

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <div style={planNameStyle}>Tiny Dog</div>
        <div style={priceStyle}>$3</div>
        <div style={periodStyle}>per belly rub</div>
        <div style={featureStyle}>✓ 5 barks daily</div>
        <div style={featureStyle}>✓ Fits in purse</div>
        <div style={featureStyle}>✓ Occasional yapping</div>
        <div style={featureStyle}>✓ 1 sweater included</div>
        <button style={buttonStyle}>Adopt Tiny Dog</button>
      </div>

      <div style={featuredCardStyle}>
        <div style={planNameStyle}>Medium Dog</div>
        <div style={priceStyle}>$12</div>
        <div style={periodStyle}>per belly rub</div>
        <div style={featureStyle}>✓ 50 barks daily</div>
        <div style={featureStyle}>✓ Medium zoomies</div>
        <div style={featureStyle}>✓ Tail wagging</div>
        <div style={featureStyle}>✓ 3 sweaters included</div>
        <button style={buttonStyle}>Adopt Medium Dog</button>
      </div>

      <div style={cardStyle}>
        <div style={planNameStyle}>Big Dog</div>
        <div style={priceStyle}>$47</div>
        <div style={periodStyle}>per belly rub</div>
        <div style={featureStyle}>✓ Unlimited barks</div>
        <div style={featureStyle}>✓ Maximum zoomies</div>
        <div style={featureStyle}>✓ Aggressive snuggling</div>
        <div style={featureStyle}>✓ Eats entire couch</div>
        <button style={buttonStyle}>Adopt Big Dog</button>
      </div>
    </div>
  );
}
