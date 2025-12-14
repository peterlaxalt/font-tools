"use client"

import React, { useState, useEffect } from 'react';
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
  const [missingGlyphs, setMissingGlyphs] = useState<Set<string>>(new Set());

  const charArray = characters.split(/\s+/).filter(c => c.trim());

  // Check if a glyph exists in the font
  const hasGlyph = (char: string, font: string): boolean => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) return true;

    const fontSize = 100;
    canvas.width = fontSize * 2;
    canvas.height = fontSize * 2;

    // Draw with the font (wrap in quotes to handle font names with spaces)
    ctx.font = `${fontSize}px "${font}"`;
    ctx.fillText(char, 0, fontSize);
    const fontData = ctx.getImageData(0, 0, canvas.width, canvas.height).data;

    // Clear and draw with fallback
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.font = `${fontSize}px serif`;
    ctx.fillText(char, 0, fontSize);
    const fallbackData = ctx.getImageData(0, 0, canvas.width, canvas.height).data;

    // Compare pixel data - look for any difference
    let hasDifference = false;
    for (let i = 0; i < fontData.length; i += 4) {
      // Check alpha channel (every 4th value)
      if (fontData[i + 3] !== fallbackData[i + 3]) {
        hasDifference = true;
        break;
      }
    }
    return hasDifference;
  };

  // Detect missing glyphs on mount and when font changes
  useEffect(() => {
    const detectMissingGlyphs = async () => {
      // Wait for font to load
      try {
        await document.fonts.load(`100px "${fontFamily}"`);
        // Add small delay to ensure font is fully rendered
        await new Promise(resolve => setTimeout(resolve, 100));
      } catch (e) {
        console.warn('Font loading check failed:', e);
      }

      const missing = new Set<string>();
      charArray.forEach(char => {
        if (!hasGlyph(char, fontFamily)) {
          missing.add(char);
        }
      });
      setMissingGlyphs(missing);
    };

    detectMissingGlyphs();
  }, [fontFamily, characters]);

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

  const getCellStyle = (char: string): React.CSSProperties => ({
    width: '100%',
    aspectRatio: '1',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily,
    fontSize: calculatedFontSize,
    cursor: 'pointer',
    border: `1px solid ${theme.text}10`,
    transition: 'background-color 0.2s, opacity 0.2s',
    opacity: missingGlyphs.has(char) ? 0.15 : 1,
  });

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
            style={getCellStyle(char)}
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
