"use client"

import React from 'react';
import { UploadedFont } from '../types';

interface ActiveFontTabsProps {
  fonts: UploadedFont[];
  activeFontId: string | null;
  onFontSelect: (fontId: string) => void;
}

const formatBytes = (bytes: number): string => {
  const kb = bytes / 1024;
  return `${Math.round(kb)}kb`;
};

export default function ActiveFontTabs({ fonts, activeFontId, onFontSelect }: ActiveFontTabsProps) {
  if (fonts.length === 0) {
    return null;
  }

  const containerStyle: React.CSSProperties = {
    display: 'flex',
    gap: '6px',
    overflowX: 'auto',
  };

  const tabStyle: React.CSSProperties = {
    padding: '6px 12px',
    border: 'none',
    borderRadius: '3px',
    cursor: 'pointer',
    backgroundColor: 'transparent',
    color: 'currentColor',
    whiteSpace: 'nowrap',
    fontSize: '12px',
    fontWeight: 500,
    opacity: 0.5,
  };

  const activeTabStyle: React.CSSProperties = {
    ...tabStyle,
    opacity: 1,
    textDecoration: 'underline',
  };

  return (
    <div style={containerStyle}>
      {fonts.map((font) => {
        const isActive = font.id === activeFontId;
        return (
          <button
            key={font.id}
            style={isActive ? activeTabStyle : tabStyle}
            onClick={() => onFontSelect(font.id)}
          >
            {font.name}
          </button>
        );
      })}
    </div>
  );
}
