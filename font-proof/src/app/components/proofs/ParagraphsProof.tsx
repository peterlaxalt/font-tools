"use client"

import React from 'react';
import { UploadedFont, ParagraphsSettings, ColorTheme } from '../../types';

interface ParagraphsProofProps {
  font: UploadedFont | undefined;
  settings: ParagraphsSettings;
  onSettingsChange: (settings: ParagraphsSettings) => void;
  theme: ColorTheme;
  compareEnabled: boolean;
  comparisonFont: string;
}

const DEFAULT_PARAGRAPH = `The quick brown fox jumps over the lazy dog. Pack my box with five dozen liquor jugs. How vexingly quick daft zebras jump! The five boxing wizards jump quickly. Sphinx of black quartz, judge my vow. Two driven jocks help fax my big quiz. The jay, pig, fox, zebra and my wolves quack! Blowzy red vixens fight for a quick jump.`;

const generateSizes = (max: number, min: number, steps: number): number[] => {
  if (steps <= 0) return [];
  if (steps === 1) return [max];

  const sizes: number[] = [];
  const increment = (max - min) / (steps - 1);

  for (let i = 0; i < steps; i++) {
    sizes.push(Math.round(max - (increment * i)));
  }

  return sizes;
};

export default function ParagraphsProof({ font, settings, onSettingsChange, theme, compareEnabled, comparisonFont }: ParagraphsProofProps) {
  const sizes = generateSizes(settings.maxSize, settings.minSize, settings.steps);

  const containerStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
  };

  const settingsPanelStyle: React.CSSProperties = {
    display: 'flex',
    gap: '12px',
    padding: '12px 20px',
    borderBottom: `1px solid ${theme.text}`,
    alignItems: 'center',
    flexWrap: 'wrap',
  };

  const settingGroupStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
  };

  const labelStyle: React.CSSProperties = {
    fontSize: '11px',
    opacity: 0.6,
  };

  const inputStyle: React.CSSProperties = {
    padding: '4px 8px',
    border: `1px solid ${theme.text}20`,
    borderRadius: '3px',
    fontSize: '12px',
    width: '60px',
    backgroundColor: 'transparent',
    color: 'currentColor',
  };

  const proofContentStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: '32px',
    padding: '0 20px 32px 20px',
  };

  const splitContainerStyle: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: compareEnabled ? '50% 50%' : '1fr',
    gap: '0',
  };

  const gridContainerStyle: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: `repeat(${settings.columns}, 1fr)`,
    gap: '40px',
  };

  const textBlockStyle = (size: number, fontFamily: string): React.CSSProperties => ({
    fontFamily,
    fontSize: `${size}px`,
    lineHeight: settings.leading,
    letterSpacing: `${settings.letterSpacing}px`,
  });

  const sizeLabelStyle: React.CSSProperties = {
    fontSize: '10px',
    fontWeight: 700,
    marginBottom: '12px',
    textTransform: 'uppercase',
    marginTop: 20,
  };

  const columnTitleStyle: React.CSSProperties = {
    fontSize: '11px',
    fontWeight: 600,
    marginTop: '32px',
    marginBottom: '24px',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
  };

  const rightColumnStyle: React.CSSProperties = {
    paddingLeft: '20px',
    borderLeft: `1px solid ${theme.text}`,
  };

  const leftColumnStyle: React.CSSProperties = {
    paddingRight: compareEnabled ? '20px' : '0',
  };

  const renderProofColumn = (fontFamily: string) => (
    <div>
      <div style={gridContainerStyle}>
        {sizes.map((size) => (
          <div key={size}>
            <div style={sizeLabelStyle}>{size}px</div>
            <div style={textBlockStyle(size, fontFamily)}>{DEFAULT_PARAGRAPH}</div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div style={containerStyle}>
      {/* Settings Panel */}
      <div style={settingsPanelStyle}>
        <div style={settingGroupStyle}>
          <label style={labelStyle}>Max</label>
          <input
            type="number"
            style={inputStyle}
            value={settings.maxSize}
            onChange={(e) => onSettingsChange({ ...settings, maxSize: Number(e.target.value) })}
            min={1}
          />
        </div>

        <div style={settingGroupStyle}>
          <label style={labelStyle}>Min</label>
          <input
            type="number"
            style={inputStyle}
            value={settings.minSize}
            onChange={(e) => onSettingsChange({ ...settings, minSize: Number(e.target.value) })}
            min={1}
          />
        </div>

        <div style={settingGroupStyle}>
          <label style={labelStyle}>Steps</label>
          <input
            type="number"
            style={inputStyle}
            value={settings.steps}
            onChange={(e) => onSettingsChange({ ...settings, steps: Number(e.target.value) })}
            min={1}
          />
        </div>

        <div style={settingGroupStyle}>
          <label style={labelStyle}>Leading</label>
          <input
            type="number"
            style={inputStyle}
            value={settings.leading}
            onChange={(e) => onSettingsChange({ ...settings, leading: Number(e.target.value) })}
            min={0.5}
            max={3}
            step={0.1}
          />
        </div>

        <div style={settingGroupStyle}>
          <label style={labelStyle}>Spacing</label>
          <input
            type="number"
            style={inputStyle}
            value={settings.letterSpacing}
            onChange={(e) => onSettingsChange({ ...settings, letterSpacing: Number(e.target.value) })}
            min={-5}
            max={10}
            step={0.1}
          />
        </div>

        <div style={settingGroupStyle}>
          <label style={labelStyle}>Columns</label>
          <input
            type="number"
            style={inputStyle}
            value={settings.columns}
            onChange={(e) => onSettingsChange({ ...settings, columns: Number(e.target.value) })}
            min={1}
            max={6}
          />
        </div>
      </div>

      {/* Proof Display */}
      <div style={proofContentStyle}>
        <div style={splitContainerStyle}>
          <div style={leftColumnStyle}>
            {compareEnabled && <div style={columnTitleStyle}>{font ? font.name : 'No Font'}</div>}
            {renderProofColumn(font ? font.fontFamily : 'system-ui, sans-serif')}
          </div>
          {compareEnabled && (
            <div style={rightColumnStyle}>
              <div style={columnTitleStyle}>{comparisonFont}</div>
              {renderProofColumn(comparisonFont)}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
