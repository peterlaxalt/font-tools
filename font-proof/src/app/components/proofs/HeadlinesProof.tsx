"use client"

import React from 'react';
import { UploadedFont, HeadlinesSettings, ColorTheme } from '../../types';

interface HeadlinesProofProps {
  font: UploadedFont | undefined;
  settings: HeadlinesSettings;
  onSettingsChange: (settings: HeadlinesSettings) => void;
  theme: ColorTheme;
  compareEnabled: boolean;
  comparisonFont: string;
}

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

export default function HeadlinesProof({ font, settings, onSettingsChange, theme, compareEnabled, comparisonFont }: HeadlinesProofProps) {
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

  const textInputStyle: React.CSSProperties = {
    ...inputStyle,
    width: '300px',
    maxWidth: '100%',
  };

  const proofContentStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: '32px',
    padding: '0',
    width: '100%',
    maxWidth: '100%',
  };

  const splitContainerStyle: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: compareEnabled ? '50% 50%' : '1fr',
    gap: compareEnabled ? '0px' : '0',
  };

  const rowStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  };

  const sizeLabelStyle: React.CSSProperties = {
    fontSize: '10px',
    fontWeight: 700,
    textTransform: 'uppercase',
    marginTop: 20,
  };

  const editableTextStyle: React.CSSProperties = {
    border: 'none',
    outline: 'none',
    width: '100%',
    padding: 0,
    backgroundColor: 'transparent',
    color: 'currentColor',
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
    paddingLeft: compareEnabled ? '20px' : '0',
    borderLeft: compareEnabled ? `1px solid ${theme.text}` : 'none',
  };

  const leftColumnStyle: React.CSSProperties = {
    paddingRight: compareEnabled ? '0' : '0',
    paddingLeft: 20,
  };

  const renderProofColumn = (fontFamily: string) => (
    <div>
      {sizes.map((size) => (
        <div key={size} style={rowStyle}>
          <div style={sizeLabelStyle}>{size}px</div>
          <input
            type="text"
            value={settings.text}
            onChange={(e) => onSettingsChange({ ...settings, text: e.target.value })}
            style={{
              ...editableTextStyle,
              fontFamily,
              fontSize: `${size}px`,
              lineHeight: 1.2,
            }}
          />
        </div>
      ))}
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
          <label style={labelStyle}>Text</label>
          <input
            type="text"
            style={textInputStyle}
            value={settings.text}
            onChange={(e) => onSettingsChange({ ...settings, text: e.target.value })}
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
