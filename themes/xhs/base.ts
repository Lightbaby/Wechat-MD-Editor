import React from 'react';

// ============================================
// 字体堆栈
// ============================================
export const SANS_FONT = '-apple-system, BlinkMacSystemFont, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "Helvetica Neue", Arial, sans-serif';
export const SERIF_FONT = '"Songti SC", "Noto Serif SC", "Source Han Serif SC", STSong, "Times New Roman", serif';
export const MONO_FONT = '"Fira Code", "SF Mono", Menlo, Monaco, Consolas, monospace';
export const HAND_FONT = '"Kaiti SC", "STKaiti", "KaiTi", "AR PL UKai CN", cursive';
export const CUTE_FONT = '"Yuanti SC", "YouYuan", "STYuanti", "PingFang SC", sans-serif';

// ============================================
// 纹理背景
// ============================================
export const NOISE_BG = `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.05'/%3E%3C/svg%3E")`;

export const GRID_PATTERN = `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 20L20 20M20 0L20 20' stroke='%23F0F0F0' stroke-width='1' fill='none'/%3E%3C/svg%3E")`;

export const LINED_PAPER = `repeating-linear-gradient(transparent, transparent 31px, #E5E5E5 31px, #E5E5E5 32px)`;

export const CARDBOARD_TEXTURE = `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.08'/%3E%3C/svg%3E")`;

export const DOT_PATTERN = `radial-gradient(#d4d4d4 1px, transparent 1px)`;

// ============================================
// 基础样式
// ============================================
export const baseStyles = {
  title: {
    fontFamily: SANS_FONT,
    fontSize: '24px',
    fontWeight: 700,
    lineHeight: 1.4,
    marginBottom: '24px',
    marginTop: '0px',
    letterSpacing: '0.04em',
  } as React.CSSProperties,

  body: {
    fontFamily: SANS_FONT,
    fontSize: '15px',
    lineHeight: 1.8,
    letterSpacing: '0.06em',
    color: '#333',
    textAlign: 'justify' as const,
  } as React.CSSProperties,

  heading: {
    fontFamily: SANS_FONT,
    fontSize: '18px',
    fontWeight: 700,
    marginTop: '28px',
    marginBottom: '16px',
    color: '#000',
    letterSpacing: '0.05em',
  } as React.CSSProperties,

  list: {
    paddingLeft: '20px',
    margin: '12px 0 20px',
  } as React.CSSProperties,

  listItem: {
    marginBottom: '8px',
    lineHeight: 1.7,
  } as React.CSSProperties,

  blockquote: {
    fontStyle: 'normal',
    color: '#555',
    margin: '20px 0',
    padding: '16px 20px',
    backgroundColor: '#F9FAFB',
    borderRadius: '8px',
    borderLeft: '4px solid #E5E7EB',
  } as React.CSSProperties,

  code: {
    fontFamily: MONO_FONT,
    fontSize: '13px',
    padding: '2px 6px',
    borderRadius: '4px',
    backgroundColor: '#F3F4F6',
    color: '#D946EF',
  } as React.CSSProperties,

  link: {
    textDecoration: 'none',
    borderBottom: '1px solid currentColor',
    fontWeight: 500,
  } as React.CSSProperties,

  strong: {
    fontWeight: 700,
    color: '#000',
  } as React.CSSProperties,

  divider: {
    margin: '32px 0',
    height: '1px',
    backgroundColor: '#E5E7EB',
    border: 'none',
  } as React.CSSProperties,
};
