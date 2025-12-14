"use client"

import React from 'react';
import { ProofType } from '../types';

interface ProofTabsProps {
  activeProofType: ProofType;
  onProofTypeChange: (type: ProofType) => void;
}

const proofTypes: { type: ProofType; label: string }[] = [
  { type: 'headlines', label: 'Headlines' },
  { type: 'paragraphs', label: 'Paragraphs' },
  { type: 'diacritics', label: 'Diacritics' },
];

export default function ProofTabs({ activeProofType, onProofTypeChange }: ProofTabsProps) {
  const containerStyle: React.CSSProperties = {
    display: 'flex',
    gap: '4px',
    padding: '8px 20px',
    borderBottom: `1px solid currentColor`,
  };

  const tabStyle: React.CSSProperties = {
    padding: '6px 16px',
    border: 'none',
    backgroundColor: 'transparent',
    cursor: 'pointer',
    fontSize: '13px',
    fontWeight: 500,
    color: 'currentColor',
    opacity: 0.4,
  };

  const activeTabStyle: React.CSSProperties = {
    ...tabStyle,
    opacity: 1,
    textDecoration: 'underline',
  };

  return (
    <div style={containerStyle}>
      {proofTypes.map(({ type, label }) => {
        const isActive = type === activeProofType;
        return (
          <button
            key={type}
            style={isActive ? activeTabStyle : tabStyle}
            onClick={() => onProofTypeChange(type)}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}
