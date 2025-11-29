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

// AI Configuration - User configurable
export interface AIConfig {
  apiKey: string;
  apiUrl: string;
  model: string;
}

export const DEFAULT_AI_CONFIG: AIConfig = {
  apiKey: '',
  apiUrl: 'https://api.openai.com/v1',
  model: 'gpt-4o-mini',
};

// localStorage helpers
const AI_CONFIG_KEY = 'wechat-md-editor-ai-config';

export const saveAIConfig = (config: AIConfig): void => {
  localStorage.setItem(AI_CONFIG_KEY, JSON.stringify(config));
};

export const loadAIConfig = (): AIConfig => {
  try {
    const saved = localStorage.getItem(AI_CONFIG_KEY);
    if (saved) {
      return { ...DEFAULT_AI_CONFIG, ...JSON.parse(saved) };
    }
  } catch (e) {
    console.error('Failed to load AI config:', e);
  }
  return DEFAULT_AI_CONFIG;
};

export const isAIConfigured = (config: AIConfig): boolean => {
  return !!(config.apiKey && config.apiUrl && config.model);
};