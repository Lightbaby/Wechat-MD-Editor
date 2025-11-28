import React from 'react';

export interface Theme {
  id: string;
  name: string;
  colors: {
    primary: string;
    secondary: string;
    text: string;
    heading: string;
    background: string;
    accent: string;
  };
  styles: {
    h1: React.CSSProperties;
    h2: React.CSSProperties;
    h3: React.CSSProperties;
    p: React.CSSProperties;
    blockquote: React.CSSProperties;
    list: React.CSSProperties;
    li: React.CSSProperties; // Added explicit LI styling
    code: React.CSSProperties;
    link: React.CSSProperties;
    strong: React.CSSProperties;
  };
}

export interface MarkdownRendererProps {
  content: string;
  theme: Theme;
}

export type AIActionType = 'polish' | 'title' | 'summary' | 'grammar' | 'fix-markdown';