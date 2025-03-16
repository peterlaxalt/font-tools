"use client"

import type React from "react"

import { useEffect, useRef, useState, type ChangeEvent } from "react"

// Constants for text sizing and container fitting
const TEXT_HEIGHT_MULTIPLIER = 1.2 // Multiplier for text container height
const CONTAINER_FIT_BUFFER = 0.95 // Buffer multiplier when fitting text to container (e.g. 0.95 = 95% of container width)
const TEXT_TOP_PADDING = 8 // Padding at top of text container to prevent cutoff
const MIN_CONTAINER_HEIGHT = 100 // Minimum height for text container

// Define types for font settings
interface FontSetting {
  name: string
  min: number
  max: number
  default: number
  step: number
}

// Define types for font features
interface FontFeature {
  id: string
  name: string
  value: string
}

// Define types for font features state
interface FontFeatureState {
  [key: string]: boolean
}

// Define types for settings state
interface Settings {
  weight: number
  letterSpacing: number
  lineHeight: number
  fitContainer: boolean
}

function FontTester(): JSX.Element {
  // State
  const [text, setText] = useState<string>("STUDIO LAXALT")
  const [settings, setSettings] = useState<Settings>({
    weight: 450,
    letterSpacing: 0,
    lineHeight: 1.2,
    fitContainer: true, // Fit width ON by default
  })
  const [fontStyle, setFontStyle] = useState<string>("normal")
  const [fontFamily, setFontFamily] = useState<string>("Marlette")
  const [fontSize, setFontSize] = useState<number>(40)
  const [textAlign, setTextAlign] = useState<string>("left")
  const [fontFeatures, setFontFeatures] = useState<FontFeatureState>({
    liga: true, // standard ligatures
    dlig: false, // discretionary ligatures
    salt: false, // stylistic alternates
    calt: true, // contextual alternates
    smcp: false, // small caps
    tnum: false, // tabular numbers
    frac: false, // fractions
    ordn: false, // ordinals
  })
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false)
  const [darkMode, setDarkMode] = useState<boolean>(false)
  const [isEditing, setIsEditing] = useState<boolean>(false)
  const [textareaHeight, setTextareaHeight] = useState<number>(MIN_CONTAINER_HEIGHT)

  // Refs
  const containerRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLTextAreaElement>(null)

  // Font settings configuration
  const fontSettings: Record<string, FontSetting> = {
    weight: { name: "Weight", min: 100, max: 999, default: 450, step: 1 },
    letterSpacing: { name: "Letter Spacing", min: -5, max: 10, default: 0, step: 0.1 },
    lineHeight: { name: "Line Height", min: 0.8, max: 2, default: 1.2, step: 0.05 },
  }

  // Font style options
  const fontStyleOptions: string[] = ["normal", "italic"]

  // Text alignment options
  const textAlignOptions: string[] = ["left", "center", "right"]

  // Font features configuration
  const fontFeaturesConfig: FontFeature[] = [
    { id: "liga", name: "Standard Ligatures", value: "liga" },
    { id: "dlig", name: "Discretionary Ligatures", value: "dlig" },
    { id: "salt", name: "Stylistic Alternates", value: "salt" },
    { id: "calt", name: "Contextual Alternates", value: "calt" },
    { id: "smcp", name: "Small Caps", value: "smcp" },
    { id: "tnum", name: "Tabular Numbers", value: "tnum" },
    { id: "frac", name: "Fractions", value: "frac" },
    { id: "ordn", name: "Ordinals", value: "ordn" },
  ]

  // Check for system dark mode preference on mount
  useEffect(() => {
    if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setDarkMode(true)
    }
  }, [])

  // Initial fit calculation
  useEffect(() => {
    if (settings.fitContainer) {
      setTimeout(fitTextToContainer, 100)
    }
  }, [])

  // Adjust textarea height whenever text content changes
  const adjustTextareaHeight = (): void => {
    if (textRef.current) {
      const scrollHeight = textRef.current.scrollHeight
      const newHeight = Math.max(
        MIN_CONTAINER_HEIGHT,
        (scrollHeight * TEXT_HEIGHT_MULTIPLIER) + TEXT_TOP_PADDING
      )
      
      setTextareaHeight(newHeight)
    }
  }

  // Handle text change
  const handleTextChange = (e: ChangeEvent<HTMLTextAreaElement>): void => {
    setText(e.target.value)
    adjustTextareaHeight()

    if (settings.fitContainer) {
      setTimeout(fitTextToContainer, 0)
    }
  }

  // Handle setting change
  const handleSettingChange = (setting: keyof Settings, value: number): void => {
    setSettings((prev) => ({
      ...prev,
      [setting]: value,
    }))
    
    // Adjust height when line height changes
    if (setting === 'lineHeight') {
      setTimeout(adjustTextareaHeight, 0)
    }
  }

  // Handle font size change
  const handleFontSizeChange = (value: number): void => {
    setFontSize(value)
    setTimeout(adjustTextareaHeight, 0)
  }

  // Handle font style change
  const handleFontStyleChange = (style: string): void => {
    setFontStyle(style)
    setTimeout(adjustTextareaHeight, 0)
  }

  // Handle text alignment change
  const handleTextAlignChange = (align: string): void => {
    setTextAlign(align)
  }

  // Handle font family change
  const handleFontFamilyChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setFontFamily(e.target.value)
    setTimeout(adjustTextareaHeight, 0)
  }

  // Toggle fit container
  const toggleFitContainer = (): void => {
    setSettings((prev) => {
      const newSettings = {
        ...prev,
        fitContainer: !prev.fitContainer,
      }

      // If turning on fit container, immediately fit the text
      if (!prev.fitContainer) {
        setTimeout(fitTextToContainer, 10)
      }

      return newSettings
    })
  }

  // Toggle dark mode
  const toggleDarkMode = (): void => {
    setDarkMode((prev) => !prev)
  }

  // Toggle font feature
  const toggleFontFeature = (featureId: string): void => {
    setFontFeatures((prev) => ({
      ...prev,
      [featureId]: !prev[featureId],
    }))
  }

  // Get longest line width
  const getLongestLineWidth = (element: HTMLTextAreaElement): number => {
    const lines = element.value.split('\n')
    const canvas = document.createElement('canvas')
    const context = canvas.getContext('2d')
    if (!context) return 0

    context.font = `${element.style.fontStyle} ${element.style.fontWeight} ${element.style.fontSize} ${element.style.fontFamily}`
    
    return Math.max(...lines.map(line => context.measureText(line).width))
  }

  // Fit text to container width (multi-line)
  const fitTextToContainer = (): void => {
    if (containerRef.current && textRef.current) {
      const container = containerRef.current
      const textElement = textRef.current
      const containerWidth = (container.clientWidth - 40) * CONTAINER_FIT_BUFFER // Account for padding and buffer

      // Binary search for the optimal font size
      let minSize = 8
      let maxSize = 500
      let currentSize = 50
      let previousSize = 0

      // Maximum iterations to prevent infinite loops
      const maxIterations = 20
      let iterations = 0

      while (iterations < maxIterations && Math.abs(currentSize - previousSize) > 0.5) {
        previousSize = currentSize
        textElement.style.fontSize = `${currentSize}px`

        const longestLineWidth = getLongestLineWidth(textElement)

        if (longestLineWidth > containerWidth) {
          // Text is too big, decrease size
          maxSize = currentSize
          currentSize = Math.floor((minSize + currentSize) / 2)
        } else {
          // Text is too small, increase size
          minSize = currentSize
          currentSize = Math.floor((currentSize + maxSize) / 2)
        }

        iterations++
      }

      // Final adjustment to ensure text fits
      if (getLongestLineWidth(textElement) > containerWidth) {
        currentSize -= 1
        textElement.style.fontSize = `${currentSize}px`
      }

      setFontSize(currentSize)
      adjustTextareaHeight()
    }
  }

  // Update font size when text or container changes
  useEffect(() => {
    if (settings.fitContainer) {
      fitTextToContainer()
    }
    adjustTextareaHeight()
  }, [text, settings.fitContainer, fontFamily, fontStyle, settings.weight, settings.letterSpacing, settings.lineHeight, fontFeatures])

  // Listen for window resize to adjust text size
  useEffect(() => {
    if (settings.fitContainer) {
      const handleResize = (): void => {
        fitTextToContainer()
      }

      window.addEventListener("resize", handleResize)
      return () => window.removeEventListener("resize", handleResize)
    }
  }, [settings.fitContainer])

  // Generate font-feature-settings CSS value
  const getFontFeatureSettings = (): string => {
    return Object.entries(fontFeatures)
      .map(([feature, enabled]) => `"${feature}" ${enabled ? "on" : "off"}`)
      .join(", ")
  }

  // Handle focus to start editing
  const handleFocus = (): void => {
    setIsEditing(true)
  }

  // Handle blur to stop editing
  const handleBlur = (): void => {
    setIsEditing(false)
  }

  // Styles
  const containerStyle: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    height: "100%",
    minHeight: "100vh",
    padding: "20px",
    fontFamily: "system-ui, -apple-system, sans-serif",
    boxSizing: "border-box",
    backgroundColor: darkMode ? "#0a0a0a" : "#ffffff",
    color: darkMode ? "#ffffff" : "#000000",
  }

  const controlsStyle: React.CSSProperties = {
    marginBottom: "20px",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  }

  const controlRowStyle: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    flexWrap: "wrap",
  }

  const labelStyle: React.CSSProperties = {
    minWidth: "120px",
    fontWeight: "bold",
  }

  const inputStyle: React.CSSProperties = {
    width: "60px",
    backgroundColor: darkMode ? "#333" : "#fff",
    color: darkMode ? "#fff" : "#000",
    borderColor: darkMode ? "#555" : "#ccc",
  }

  const rangeStyle: React.CSSProperties = {
    flexGrow: 1,
    maxWidth: "300px",
    accentColor: darkMode ? "#0d6efd" : "#0d6efd",
  }

  const buttonStyle: React.CSSProperties = {
    padding: "6px 12px",
    background: darkMode ? "#333" : "#f0f0f0",
    borderWidth: "1px",
    borderStyle: "solid",
    borderColor: darkMode ? "#555" : "#ccc",
    borderRadius: "4px",
    cursor: "pointer",
    margin: "0 5px",
    color: darkMode ? "#fff" : "#000",
  }

  const activeButtonStyle: React.CSSProperties = {
    ...buttonStyle,
    background: "#007bff",
    color: "white",
    borderColor: "#0069d9",
  }

  const previewContainerStyle: React.CSSProperties = {
    flexGrow: 1,
    border: "none",
    borderRadius: "4px",
    padding: "20px",
    overflow: "hidden",
    position: "relative",
    background: "transparent",
    color: darkMode ? "#fff" : "#000",
  }

  const textInputStyle: React.CSSProperties = {
    fontFamily: fontFamily,
    fontVariationSettings: `"wght" ${settings.weight}`,
    fontSize: `${fontSize}px`,
    fontStyle: fontStyle,
    letterSpacing: `${settings.letterSpacing}px`,
    lineHeight: settings.lineHeight,
    margin: 0,
    padding: `${TEXT_TOP_PADDING}px 0 0 0`,
    width: "100%",
    height: `${textareaHeight}px`,
    overflow: "hidden",
    outline: "none",
    fontFeatureSettings: getFontFeatureSettings(),
    cursor: "text",
    position: "relative",
    background: "transparent",
    border: "none",
    color: darkMode ? "#fff" : "#000",
    caretColor: darkMode ? "#fff" : "#000",
    resize: "none",
    textAlign: textAlign,
  }

  const dropdownStyle: React.CSSProperties = {
    position: "relative",
    display: "inline-block",
  }

  const dropdownButtonStyle: React.CSSProperties = {
    ...buttonStyle,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    width: "200px",
  }

  const dropdownContentStyle: React.CSSProperties = {
    display: dropdownOpen ? "block" : "none",
    position: "absolute",
    backgroundColor: darkMode ? "#333" : "#f9f9f9",
    color: darkMode ? "#fff" : "#000",
    minWidth: "250px",
    boxShadow: darkMode ? "0px 8px 16px 0px rgba(0,0,0,0.5)" : "0px 8px 16px 0px rgba(0,0,0,0.2)",
    padding: "12px",
    zIndex: 1,
    borderRadius: "4px",
    marginTop: "4px",
  }

  const checkboxContainerStyle: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    padding: "6px 0",
    cursor: "pointer",
  }

  const checkboxStyle: React.CSSProperties = {
    marginRight: "8px",
  }

  // Add global styles for selection
  useEffect(() => {
    const selectionStyle = document.createElement("style")
    selectionStyle.textContent = `
      textarea::selection {
        background-color: ${darkMode ? "rgba(255, 255, 255, 0.3)" : "rgba(0, 0, 255, 0.2)"};
        color: ${darkMode ? "#fff" : "#000"};
      }
    `
    document.head.appendChild(selectionStyle)

    return () => {
      if (document.head.contains(selectionStyle)) {
        document.head.removeChild(selectionStyle)
      }
    }
  }, [darkMode])

  return (
    <div style={containerStyle}>
      <div style={controlsStyle}>
        <div style={controlRowStyle}>
          <span style={labelStyle}>Font Family:</span>
          <input
            type="text"
            value={fontFamily}
            onChange={handleFontFamilyChange}
            style={{
              ...inputStyle,
              width: "200px",
              borderWidth: "2px",
              borderStyle: "solid",
              borderColor: darkMode ? "#555" : "#ccc",
              backgroundColor: darkMode ? "#222" : "#f5f5f5",
              padding: "6px 10px",
              borderRadius: "4px",
            }}
          />

          <button style={darkMode ? activeButtonStyle : buttonStyle} onClick={toggleDarkMode}>
            {darkMode ? "Light Mode" : "Dark Mode"}
          </button>
        </div>

        <div style={controlRowStyle}>
          <span style={labelStyle}>Font Style:</span>
          {fontStyleOptions.map((style) => (
            <button
              key={style}
              style={fontStyle === style ? activeButtonStyle : buttonStyle}
              onClick={() => handleFontStyleChange(style)}
            >
              {style.charAt(0).toUpperCase() + style.slice(1)}
            </button>
          ))}
        </div>

        <div style={controlRowStyle}>
          <span style={labelStyle}>Text Align:</span>
          {textAlignOptions.map((align) => (
            <button
              key={align}
              style={textAlign === align ? activeButtonStyle : buttonStyle}
              onClick={() => handleTextAlignChange(align)}
            >
              {align.charAt(0).toUpperCase() + align.slice(1)}
            </button>
          ))}
        </div>

        {Object.entries(fontSettings).map(([key, setting]) => (
          <div key={key} style={controlRowStyle}>
            <span style={labelStyle}>{setting.name}:</span>
            <input
              type="number"
              min={setting.min}
              max={setting.max}
              step={setting.step}
              value={settings[key as keyof Settings]}
              onChange={(e) => handleSettingChange(key as keyof Settings, Number.parseFloat(e.target.value))}
              style={inputStyle}
            />
            <input
              type="range"
              min={setting.min}
              max={setting.max}
              step={setting.step}
              value={settings[key as keyof Settings]}
              onChange={(e) => handleSettingChange(key as keyof Settings, Number.parseFloat(e.target.value))}
              style={rangeStyle}
            />
          </div>
        ))}

        <div style={controlRowStyle}>
          <span style={labelStyle}>Fit Width:</span>
          <button style={settings.fitContainer ? activeButtonStyle : buttonStyle} onClick={toggleFitContainer}>
            {settings.fitContainer ? "On" : "Off"}
          </button>
        </div>

        {/* Font size slider (only visible when fit is off) */}
        {!settings.fitContainer && (
          <div style={controlRowStyle}>
            <span style={labelStyle}>Font Size:</span>
            <input
              type="number"
              min={8}
              max={200}
              step={1}
              value={fontSize}
              onChange={(e) => handleFontSizeChange(Number.parseFloat(e.target.value))}
              style={inputStyle}
            />
            <input
              type="range"
              min={8}
              max={200}
              step={1}
              value={fontSize}
              onChange={(e) => handleFontSizeChange(Number.parseFloat(e.target.value))}
              style={rangeStyle}
            />
          </div>
        )}

        <div style={controlRowStyle}>
          <span style={labelStyle}>Font Features:</span>
          <div style={dropdownStyle}>
            <button style={dropdownButtonStyle} onClick={() => setDropdownOpen(!dropdownOpen)}>
              <span>Font Features</span>
              <span>{dropdownOpen ? "▲" : "▼"}</span>
            </button>
            <div style={dropdownContentStyle}>
              {fontFeaturesConfig.map((feature) => (
                <label key={feature.id} style={checkboxContainerStyle}>
                  <input
                    type="checkbox"
                    checked={fontFeatures[feature.id]}
                    onChange={() => toggleFontFeature(feature.id)}
                    style={checkboxStyle}
                  />
                  {feature.name} ({feature.value})
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div style={previewContainerStyle} ref={containerRef}>
        {/* Textarea element for both display and editing */}
        <textarea
          ref={textRef}
          value={text}
          onChange={handleTextChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          style={textInputStyle}
          spellCheck={false}
          rows={1}
        />
      </div>
    </div>
  )
}

// For Framer, export the component
export default FontTester
