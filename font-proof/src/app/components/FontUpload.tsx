"use client"

import React, { useState, DragEvent, ChangeEvent } from 'react';
import { UploadedFont } from '../types';

interface FontUploadProps {
  onFontsUploaded: (fonts: UploadedFont[]) => void;
}

const VALID_FONT_EXTENSIONS = ['.ttf', '.otf', '.woff', '.woff2'];

const fileToDataUrl = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

const sanitizeFontName = (fileName: string): string => {
  const nameWithoutExt = fileName.replace(/\.(ttf|otf|woff|woff2)$/i, '');
  return nameWithoutExt.replace(/[^a-zA-Z0-9]/g, '-');
};

const isValidFontFile = (file: File): boolean => {
  const extension = '.' + file.name.split('.').pop()?.toLowerCase();
  return VALID_FONT_EXTENSIONS.includes(extension);
};

export default function FontUpload({ onFontsUploaded }: FontUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const processFontFiles = async (files: FileList) => {
    setError(null);
    const fontFiles = Array.from(files).filter(isValidFontFile);

    if (fontFiles.length === 0) {
      setError('Please upload valid font files (.ttf, .otf, .woff, .woff2)');
      return;
    }

    try {
      const uploadedFonts: UploadedFont[] = await Promise.all(
        fontFiles.map(async (file) => {
          const dataUrl = await fileToDataUrl(file);
          const id = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
          const sanitizedName = sanitizeFontName(file.name);

          return {
            id,
            name: file.name,
            file,
            fontFamily: `${sanitizedName}-${id}`,
            dataUrl,
            size: file.size,
          };
        })
      );

      onFontsUploaded(uploadedFonts);
    } catch (err) {
      setError('Error processing font files');
      console.error(err);
    }
  };

  const handleDragEnter = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    if (files.length > 0) {
      processFontFiles(files);
    }
  };

  const handleFileInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      processFontFiles(files);
    }
  };

  const containerStyle: React.CSSProperties = {
    padding: '8px 16px',
    border: `1px dashed ${isDragging ? 'currentColor' : 'currentColor'}40`,
    borderRadius: '4px',
    cursor: 'pointer',
    opacity: isDragging ? 1 : 0.6,
    transition: 'opacity 0.2s',
    fontSize: '13px',
  };

  const labelStyle: React.CSSProperties = {
    cursor: 'pointer',
  };

  const errorStyle: React.CSSProperties = {
    fontSize: '11px',
    marginTop: '4px',
    opacity: 0.8,
  };

  return (
    <div>
      <div
        style={containerStyle}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <label htmlFor="font-upload" style={labelStyle}>
          {isDragging ? 'Drop here' : 'Drop font or click'}
          <input
            id="font-upload"
            type="file"
            accept=".ttf,.otf,.woff,.woff2"
            multiple
            onChange={handleFileInputChange}
            style={{ display: 'none' }}
          />
        </label>
      </div>
      {error && <div style={errorStyle}>{error}</div>}
    </div>
  );
}
