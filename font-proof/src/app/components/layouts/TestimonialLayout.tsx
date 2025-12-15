"use client"

import React from 'react';
import { ColorTheme } from '../../types';

interface TestimonialLayoutProps {
  fontFamily: string;
  theme: ColorTheme;
}

export default function TestimonialLayout({ fontFamily, theme }: TestimonialLayoutProps) {
  const containerStyle: React.CSSProperties = {
    padding: '80px 40px',
    maxWidth: '800px',
    margin: '0 auto',
    textAlign: 'center',
  };

  const quoteStyle: React.CSSProperties = {
    fontFamily,
    fontSize: '36px',
    lineHeight: 1.4,
    fontStyle: 'italic',
    marginBottom: '40px',
    fontWeight: 400,
  };

  const authorStyle: React.CSSProperties = {
    fontFamily,
    fontSize: '18px',
    fontWeight: 600,
    marginBottom: '4px',
  };

  const roleStyle: React.CSSProperties = {
    fontFamily,
    fontSize: '16px',
    opacity: 0.6,
  };

  return (
    <div style={containerStyle}>
      <blockquote style={quoteStyle}>
        "I once saw a bird steal a whole sandwich right out of someone's hand. It was magnificent. This has nothing to do with your product but I wanted to share."
      </blockquote>
      <div style={authorStyle}>Gary Fishmonger</div>
      <div style={roleStyle}>Professional Bird Watcher</div>
    </div>
  );
}
