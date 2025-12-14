"use client";

import { useState, useEffect } from "react";
import FontUpload from "./components/FontUpload";
import ActiveFontTabs from "./components/ActiveFontTabs";
import ProofTabs from "./components/ProofTabs";
import ColorThemePicker from "./components/ColorThemePicker";
import HeadlinesProof from "./components/proofs/HeadlinesProof";
import ParagraphsProof from "./components/proofs/ParagraphsProof";
import DiacriticsProof from "./components/proofs/DiacriticsProof";
import {
  UploadedFont,
  ProofType,
  HeadlinesSettings,
  ParagraphsSettings,
  DiacriticsSettings,
  ColorTheme,
} from "./types";
import { COLOR_THEMES } from "./themes";

export default function Home() {
  const [uploadedFonts, setUploadedFonts] = useState<UploadedFont[]>([]);
  const [activeFontId, setActiveFontId] = useState<string | null>(null);
  const [activeProofType, setActiveProofType] =
    useState<ProofType>("headlines");
  const [colorTheme, setColorTheme] = useState<ColorTheme>(COLOR_THEMES[0]);
  const [headlinesSettings, setHeadlinesSettings] = useState<HeadlinesSettings>(
    {
      maxSize: 72,
      minSize: 12,
      steps: 10,
      text: "The quick brown fox jumps over the lazy dog",
    }
  );
  const [paragraphsSettings, setParagraphsSettings] =
    useState<ParagraphsSettings>({
      maxSize: 24,
      minSize: 10,
      steps: 6,
      leading: 1.4,
      letterSpacing: 0,
      columns: 3,
    });
  const [diacriticsSettings, setDiacriticsSettings] =
    useState<DiacriticsSettings>({
      fontSize: 58,
      leading: 1.5,
      letterSpacing: 0,
      columnCount: 12,
      cellFontScale: 0.6,
    });
  const [compareEnabled, setCompareEnabled] = useState(false);
  const [comparisonFont, setComparisonFont] = useState("Inter");

  // Auto-select first font when uploaded
  useEffect(() => {
    if (uploadedFonts.length > 0 && !activeFontId) {
      setActiveFontId(uploadedFonts[0].id);
    }
  }, [uploadedFonts, activeFontId]);

  // Inject @font-face for all uploaded fonts
  useEffect(() => {
    const existingStyle = document.getElementById("dynamic-fonts");
    if (existingStyle) {
      existingStyle.remove();
    }

    if (uploadedFonts.length === 0) return;

    const styleTag = document.createElement("style");
    styleTag.id = "dynamic-fonts";
    styleTag.textContent = uploadedFonts
      .map(
        (font) => `
      @font-face {
        font-family: '${font.fontFamily}';
        src: url('${font.dataUrl}');
      }
    `
      )
      .join("\n");
    document.head.appendChild(styleTag);

    return () => {
      const style = document.getElementById("dynamic-fonts");
      if (style) style.remove();
    };
  }, [uploadedFonts]);

  const handleFontsUploaded = (newFonts: UploadedFont[]) => {
    setUploadedFonts((prev) => [...prev, ...newFonts]);
  };

  const activeFont = uploadedFonts.find((f) => f.id === activeFontId);

  const containerStyle: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
    backgroundColor: colorTheme.background,
    color: colorTheme.text,
    transition: "background-color 0.3s, color 0.3s",
  };

  const headerStyle: React.CSSProperties = {
    padding: "12px 20px",
    borderBottom: `1px solid ${colorTheme.text}20`,
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  };

  const headerRowStyle: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "20px",
    flexWrap: "wrap",
  };

  const titleStyle: React.CSSProperties = {
    fontSize: "18px",
    fontWeight: 600,
    margin: 0,
  };

  const contentStyle: React.CSSProperties = {
    flex: 1,
  };

  return (
    <div style={containerStyle}>
      {/* Condensed Header */}
      <div style={headerStyle}>
        <div style={headerRowStyle}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <h1 style={titleStyle}>Font Proof</h1>
            <label
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                fontSize: "13px",
                cursor: "pointer",
                paddingLeft: "40px",
              }}
            >
              <input
                type="checkbox"
                checked={compareEnabled}
                onChange={(e) => setCompareEnabled(e.target.checked)}
                style={{ cursor: "pointer" }}
              />
              Compare
            </label>
            {compareEnabled && (
              <input
                type="text"
                value={comparisonFont}
                onChange={(e) => setComparisonFont(e.target.value)}
                placeholder="Inter"
                style={{
                  padding: "4px 8px",
                  border: `1px solid ${colorTheme.text}20`,
                  borderRadius: "3px",
                  fontSize: "12px",
                  width: "120px",
                  backgroundColor: "transparent",
                  color: "currentColor",
                }}
              />
            )}
          </div>

          <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
            <ColorThemePicker
              currentTheme={colorTheme}
              onThemeChange={setColorTheme}
            />
          </div>
        </div>

        <div style={headerRowStyle}>
          <FontUpload onFontsUploaded={handleFontsUploaded} />
          {uploadedFonts.length > 0 && (
            <ActiveFontTabs
              fonts={uploadedFonts}
              activeFontId={activeFontId}
              onFontSelect={setActiveFontId}
            />
          )}
        </div>
      </div>

      {/* Tabs */}
      <ProofTabs
        activeProofType={activeProofType}
        onProofTypeChange={setActiveProofType}
      />

      {/* Proof Content */}
      <div style={contentStyle}>
        {activeProofType === "headlines" && (
          <HeadlinesProof
            font={activeFont}
            settings={headlinesSettings}
            onSettingsChange={setHeadlinesSettings}
            theme={colorTheme}
            compareEnabled={compareEnabled}
            comparisonFont={comparisonFont}
          />
        )}
        {activeProofType === "paragraphs" && (
          <ParagraphsProof
            font={activeFont}
            settings={paragraphsSettings}
            onSettingsChange={setParagraphsSettings}
            theme={colorTheme}
            compareEnabled={compareEnabled}
            comparisonFont={comparisonFont}
          />
        )}
        {activeProofType === "diacritics" && (
          <DiacriticsProof
            font={activeFont}
            settings={diacriticsSettings}
            onSettingsChange={setDiacriticsSettings}
            theme={colorTheme}
            compareEnabled={compareEnabled}
            comparisonFont={comparisonFont}
          />
        )}
      </div>
    </div>
  );
}
