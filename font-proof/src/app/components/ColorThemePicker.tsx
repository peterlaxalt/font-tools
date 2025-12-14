"use client"

import React, { useState } from 'react';
import { ColorTheme } from '../types';
import { COLOR_THEMES } from '../themes';

interface ColorThemePickerProps {
  currentTheme: ColorTheme;
  onThemeChange: (theme: ColorTheme) => void;
}

export default function ColorThemePicker({ currentTheme, onThemeChange }: ColorThemePickerProps) {
  const [customText, setCustomText] = useState('#000000');
  const [customBg, setCustomBg] = useState('#FFFFFF');
  const [showCustomPicker, setShowCustomPicker] = useState(false);

  const handleCustomApply = () => {
    onThemeChange({
      name: 'Custom',
      text: customText,
      background: customBg
    });
    setShowCustomPicker(false);
  };

  const containerStyle: React.CSSProperties = {
    display: 'flex',
    gap: '8px',
    alignItems: 'center',
  };

  const circleButtonStyle = (theme: ColorTheme, isActive: boolean): React.CSSProperties => ({
    width: '36px',
    height: '36px',
    borderRadius: '50%',
    border: 'none',
    cursor: 'pointer',
    backgroundColor: theme.background,
    color: theme.text,
    fontSize: '14px',
    fontWeight: 600,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    outline: isActive ? `2px solid ${theme.text}` : 'none',
    outlineOffset: '2px',
    transition: 'all 0.2s',
  });

  const customPickerStyle: React.CSSProperties = {
    display: 'flex',
    gap: '8px',
    alignItems: 'center',
    marginLeft: '8px',
  };

  const colorInputStyle: React.CSSProperties = {
    width: '50px',
    height: '32px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  };

  const applyButtonStyle: React.CSSProperties = {
    padding: '6px 12px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '11px',
    fontWeight: 500,
    backgroundColor: '#000',
    color: '#fff',
  };

  return (
    <div style={containerStyle}>
      {COLOR_THEMES.map((theme) => {
        const isActive = currentTheme.name === theme.name;
        return (
          <button
            key={theme.name}
            style={circleButtonStyle(theme, isActive)}
            onClick={() => onThemeChange(theme)}
            title={theme.name}
          >
            Aa
          </button>
        );
      })}

      <button
        style={{
          ...circleButtonStyle({ name: 'Custom', text: customText, background: customBg }, currentTheme.name === 'Custom'),
          fontSize: '18px',
        }}
        onClick={() => setShowCustomPicker(!showCustomPicker)}
        title="Custom"
      >
        +
      </button>

      {showCustomPicker && (
        <div style={customPickerStyle}>
          <input
            type="color"
            value={customText}
            onChange={(e) => setCustomText(e.target.value)}
            style={colorInputStyle}
            title="Text color"
          />
          <input
            type="color"
            value={customBg}
            onChange={(e) => setCustomBg(e.target.value)}
            style={colorInputStyle}
            title="Background color"
          />
          <button style={applyButtonStyle} onClick={handleCustomApply}>
            Apply
          </button>
        </div>
      )}
    </div>
  );
}
