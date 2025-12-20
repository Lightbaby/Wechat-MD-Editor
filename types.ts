import React from 'react';

// ============================================
// 编辑模式类型
// ============================================
export type EditorMode = 'wechat' | 'xiaohongshu';

// ============================================
// 微信公众号主题类型
// ============================================
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
    li: React.CSSProperties;
    code: React.CSSProperties;
    link: React.CSSProperties;
    strong: React.CSSProperties;
  };
}

// ============================================
// 小红书模板类型
// ============================================
export type XHSAspectRatio = '3:4' | '3:5' | '4:5' | '1:1';

export type XHSCategory =
  | 'minimal'     // 极简风
  | 'handcraft'   // 手账/手工风
  | 'nature'      // 自然风
  | 'tool'        // 工具风
  | 'fantasy'     // 梦幻风
  | 'chinese'     // 国风
  | 'retro'       // 复古风
  | 'tech'        // 科技风
  | 'modern';     // 现代风

export interface XHSColorVariant {
  id: string;
  name: string;
  primary: string;      // 主色调（文字/标题）
  secondary: string;    // 辅助色
  background: string;   // 背景色
  accent?: string;      // 强调色
}

export interface XHSTemplate {
  id: string;
  name: string;
  category: XHSCategory;
  description: string;
  colorVariants: XHSColorVariant[];
  styles: {
    container: React.CSSProperties;
    title: React.CSSProperties;
    body: React.CSSProperties;
    heading: React.CSSProperties;
    list: React.CSSProperties;
    listItem: React.CSSProperties;
    blockquote: React.CSSProperties;
    code: React.CSSProperties;
    link: React.CSSProperties;
    strong: React.CSSProperties;
    divider: React.CSSProperties;
  };
}

export type XHSFontSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type XHSTextAlign = 'left' | 'center' | 'right';

export interface XHSConfig {
  aspectRatio: XHSAspectRatio;
  templateId: string;
  colorVariantId: string;
  titleFontSize: XHSFontSize;
  bodyFontSize: XHSFontSize;
  textAlign: XHSTextAlign;
  lineHeight: number;       // 1.4 - 2.0
  letterSpacing: number;    // 0 - 2 (px)
  padding: number;          // 16 - 48 (px)
}

export const DEFAULT_XHS_CONFIG: XHSConfig = {
  aspectRatio: '3:4',
  templateId: 'simple-grid',
  colorVariantId: 'white',
  titleFontSize: 'lg',
  bodyFontSize: 'md',
  textAlign: 'left',
  lineHeight: 1.8,
  letterSpacing: 0.5,
  padding: 24,
};

// 字号映射
export const XHS_FONT_SIZE_MAP: Record<XHSFontSize, { title: string; body: string }> = {
  xs: { title: '18px', body: '12px' },
  sm: { title: '20px', body: '13px' },
  md: { title: '22px', body: '14px' },
  lg: { title: '24px', body: '15px' },
  xl: { title: '28px', body: '16px' },
};

// 比例尺寸映射 (基于 375px 宽度)
export const XHS_ASPECT_RATIO_MAP: Record<XHSAspectRatio, { width: number; height: number }> = {
  '3:4': { width: 375, height: 500 },
  '3:5': { width: 375, height: 625 },
  '4:5': { width: 375, height: 469 },
  '1:1': { width: 375, height: 375 },
};

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