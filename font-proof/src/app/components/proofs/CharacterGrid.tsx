"use client"

import React, { useState } from 'react';
import { ColorTheme } from '../../types';

interface CharacterGridProps {
  characters: string;
  fontFamily: string;
  theme: ColorTheme;
  compareEnabled: boolean;
  comparisonFont?: string;
  columnCount: number;
  cellFontScale: number;
}

export default function CharacterGrid({ characters, fontFamily, theme, compareEnabled, comparisonFont, columnCount, cellFontScale }: CharacterGridProps) {
  const [hoveredChar, setHoveredChar] = useState<string | null>(null);
  const [hoverPosition, setHoverPosition] = useState({ x: 0, y: 0 });

  const charArray = characters.split(/\s+/).filter(c => c.trim());

  const handleMouseEnter = (char: string, event: React.MouseEvent) => {
    setHoveredChar(char);
    const rect = event.currentTarget.getBoundingClientRect();
    setHoverPosition({
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2
    });
  };

  const handleMouseLeave = () => {
    setHoveredChar(null);
  };

  const handleClick = (char: string) => {
    navigator.clipboard.writeText(char);
  };

  const gridStyle: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: `repeat(${columnCount}, 1fr)`,
    gap: '0',
    width: '100%',
  };

  // Calculate font size based on viewport width, column count, and scale
  // In compare mode, each side gets ~45vw (accounting for padding/borders)
  // In normal mode, container gets ~95vw
  const containerWidthVw = compareEnabled ? 45 : 95;
  const calculatedFontSize = `calc((${containerWidthVw}vw / ${columnCount}) * ${cellFontScale})`;

  const cellStyle: React.CSSProperties = {
    width: '100%',
    aspectRatio: '1',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily,
    fontSize: calculatedFontSize,
    cursor: 'pointer',
    border: `1px solid ${theme.text}10`,
    transition: 'background-color 0.2s',
  };

  const tooltipStyle: React.CSSProperties = {
    position: 'fixed',
    left: `${hoverPosition.x}px`,
    top: `${hoverPosition.y}px`,
    transform: 'translate(-50%, -50%)',
    backgroundColor: theme.background,
    border: `2px solid ${theme.text}`,
    borderRadius: '8px',
    padding: '24px',
    zIndex: 1000,
    pointerEvents: 'none',
    display: compareEnabled ? 'grid' : 'flex',
    gridTemplateColumns: compareEnabled ? '1fr 1fr' : '1fr',
    gap: compareEnabled ? '32px' : '0',
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: compareEnabled ? '320px' : '160px',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
  };

  const zoomCharStyle = (font: string): React.CSSProperties => ({
    fontFamily: font,
    fontSize: '120px',
    lineHeight: 1,
    textAlign: 'center',
  });

  const zoomLabelStyle: React.CSSProperties = {
    fontSize: '10px',
    opacity: 0.5,
    marginTop: '8px',
    textAlign: 'center',
    fontFamily: 'system-ui, sans-serif',
  };

  return (
    <>
      <div style={gridStyle}>
        {charArray.map((char, index) => (
          <div
            key={index}
            style={cellStyle}
            onMouseEnter={(e) => handleMouseEnter(char, e)}
            onMouseLeave={handleMouseLeave}
            onClick={() => handleClick(char)}
          >
            {char}
          </div>
        ))}
      </div>

      {hoveredChar && (
        <div style={tooltipStyle}>
          <div>
            <div style={zoomCharStyle(fontFamily)}>{hoveredChar}</div>
            {compareEnabled && <div style={zoomLabelStyle}>Your Font</div>}
          </div>
          {compareEnabled && comparisonFont && (
            <div>
              <div style={zoomCharStyle(comparisonFont)}>{hoveredChar}</div>
              <div style={zoomLabelStyle}>{comparisonFont}</div>
            </div>
          )}
        </div>
      )}
    </>
  );
}
