// Represents an uploaded font file
export interface UploadedFont {
  id: string;
  name: string;
  file: File;
  fontFamily: string; // CSS font-family name
  dataUrl: string; // Data URL for @font-face
  size: number; // File size in bytes
}

// Available proof types
export type ProofType = 'headlines' | 'paragraphs' | 'diacritics';

// Settings for Headlines proof
export interface HeadlinesSettings {
  maxSize: number;
  minSize: number;
  steps: number;
  text: string;
}

// Settings for Paragraphs proof
export interface ParagraphsSettings {
  maxSize: number;
  minSize: number;
  steps: number;
  leading: number; // line-height
  letterSpacing: number;
  columns: number; // for grid layout
}

// Settings for Diacritics proof
export interface DiacriticsSettings {
  fontSize: number;
  leading: number;
  letterSpacing: number;
  columnCount: number;
  cellFontScale: number;
}

// Color theme for the app
export interface ColorTheme {
  name: string;
  text: string;
  background: string;
}
