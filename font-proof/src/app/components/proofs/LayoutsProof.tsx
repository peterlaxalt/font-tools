"use client"

import React from 'react';
import { UploadedFont, ColorTheme } from '../../types';
import HeroLayout from '../layouts/HeroLayout';
import MarqueeLayout from '../layouts/MarqueeLayout';
import PricingLayout from '../layouts/PricingLayout';
import StatsLayout from '../layouts/StatsLayout';
import TestimonialLayout from '../layouts/TestimonialLayout';
import FeatureLayout from '../layouts/FeatureLayout';

interface LayoutsProofProps {
  font: UploadedFont | undefined;
  theme: ColorTheme;
  compareEnabled: boolean;
  comparisonFont: string;
}

export default function LayoutsProof({ font, theme, compareEnabled, comparisonFont }: LayoutsProofProps) {
  const fontFamily = font ? font.fontFamily : 'system-ui, sans-serif';

  const containerStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
  };

  const splitContainerStyle: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: compareEnabled ? '50% 50%' : '1fr',
    gap: '0',
  };

  const layoutSectionStyle: React.CSSProperties = {
    borderBottom: `1px solid ${theme.text}20`,
  };

  const leftColumnStyle: React.CSSProperties = {
    paddingRight: compareEnabled ? '20px' : '0',
  };

  const rightColumnStyle: React.CSSProperties = {
    paddingLeft: '20px',
    borderLeft: `1px solid ${theme.text}`,
  };

  const columnTitleStyle: React.CSSProperties = {
    fontSize: '11px',
    fontWeight: 600,
    marginTop: '32px',
    marginBottom: '24px',
    marginLeft: '40px',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
  };

  const layoutTitleStyle: React.CSSProperties = {
    fontSize: '10px',
    fontWeight: 700,
    textTransform: 'uppercase',
    letterSpacing: '0.1em',
    padding: '20px 40px',
    opacity: 0.4,
    borderBottom: `1px solid ${theme.text}10`,
  };

  const layouts = [
    { name: 'Hero Section', component: HeroLayout },
    { name: 'Marquee Ticker', component: MarqueeLayout },
    { name: 'Feature Cards', component: FeatureLayout },
    { name: 'Statistics', component: StatsLayout },
    { name: 'Testimonial', component: TestimonialLayout },
    { name: 'Pricing Table', component: PricingLayout },
  ];

  return (
    <div style={containerStyle}>
      {/* Column Titles */}
      <div style={splitContainerStyle}>
        <div style={leftColumnStyle}>
          {compareEnabled && <div style={columnTitleStyle}>{font ? font.name : 'No Font'}</div>}
        </div>
        {compareEnabled && (
          <div style={rightColumnStyle}>
            <div style={columnTitleStyle}>{comparisonFont}</div>
          </div>
        )}
      </div>

      {/* Layouts */}
      {layouts.map(({ name, component: LayoutComponent }) => (
        <div key={name} style={layoutSectionStyle}>
          <div style={layoutTitleStyle}>{name}</div>
          <div style={splitContainerStyle}>
            <div style={leftColumnStyle}>
              <LayoutComponent fontFamily={fontFamily} theme={theme} />
            </div>
            {compareEnabled && (
              <div style={rightColumnStyle}>
                <LayoutComponent fontFamily={comparisonFont} theme={theme} />
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
