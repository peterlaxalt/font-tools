"use client"

import React from 'react';
import { ColorTheme } from '../../types';

interface FeatureLayoutProps {
  fontFamily: string;
  theme: ColorTheme;
}

export default function FeatureLayout({ fontFamily, theme }: FeatureLayoutProps) {
  const containerStyle: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '40px',
    padding: '60px 40px',
    maxWidth: '1200px',
    margin: '0 auto',
  };

  const cardStyle: React.CSSProperties = {
    padding: '32px',
  };

  const iconStyle: React.CSSProperties = {
    fontFamily,
    fontSize: '48px',
    marginBottom: '20px',
  };

  const headingStyle: React.CSSProperties = {
    fontFamily,
    fontSize: '24px',
    fontWeight: 700,
    marginBottom: '12px',
  };

  const descriptionStyle: React.CSSProperties = {
    fontFamily,
    fontSize: '16px',
    lineHeight: 1.6,
    opacity: 0.7,
  };

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <div style={iconStyle}>🦖</div>
        <h3 style={headingStyle}>Dinosaur Mode</h3>
        <p style={descriptionStyle}>
          Your website will roar at visitors. Literally. We added sound effects. You're welcome.
        </p>
      </div>

      <div style={cardStyle}>
        <div style={iconStyle}>🧀</div>
        <h3 style={headingStyle}>Extra Cheesy</h3>
        <p style={descriptionStyle}>
          Every page comes with 47% more cheese than legally required in most countries.
        </p>
      </div>

      <div style={cardStyle}>
        <div style={iconStyle}>🎪</div>
        <h3 style={headingStyle}>Circus Certified</h3>
        <p style={descriptionStyle}>
          Approved by at least three professional clowns. Juggling compatibility guaranteed.
        </p>
      </div>
    </div>
  );
}
