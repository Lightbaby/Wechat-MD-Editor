import { XHSTemplate } from '../../types';
import { SERIF_FONT, baseStyles, LINED_PAPER } from './base';

/**
 * 一页信笺 - 日记风格
 * 特点：横线信纸背景、手写感、怀旧日记
 */
export const letterTemplate: XHSTemplate = {
  id: 'letter',
  name: '一页信笺',
  category: 'handcraft',
  description: '信纸横线，日记手账风',
  colorVariants: [
    { id: 'cream', name: '米黄', primary: '#333', secondary: '#8b5a2b', background: '#fffdf5', accent: '#8b5a2b' },
    { id: 'pink', name: '樱粉', primary: '#5d4037', secondary: '#d81b60', background: '#fff5f7', accent: '#d81b60' },
    { id: 'blue', name: '天蓝', primary: '#37474f', secondary: '#1976d2', background: '#f5f9ff', accent: '#1976d2' },
  ],
  styles: {
    container: {
      backgroundColor: '#fffdf5',
      backgroundImage: LINED_PAPER,
      backgroundSize: '100% 32px',
      padding: '40px 28px',
      fontFamily: SERIF_FONT,
    },
    title: {
      ...baseStyles.title,
      fontFamily: SERIF_FONT,
      fontSize: '24px',
      fontWeight: 700,
      color: '#333',
      lineHeight: '32px',
      paddingTop: '3px',
      marginBottom: '32px',
      borderBottom: '2px solid transparent',
    },
    body: {
      ...baseStyles.body,
      fontFamily: SERIF_FONT,
      fontSize: '16px',
      lineHeight: '32px',
      color: '#333',
      marginBottom: 0,
    },
    heading: {
      ...baseStyles.heading,
      fontFamily: SERIF_FONT,
      fontSize: '18px',
      fontWeight: 700,
      color: '#8b5a2b',
      lineHeight: '32px',
      marginTop: '32px',
      marginBottom: 0,
    },
    list: {
      ...baseStyles.list,
      fontFamily: SERIF_FONT,
      listStyleType: 'none',
      paddingLeft: '8px',
      lineHeight: '32px',
    },
    listItem: {
      ...baseStyles.listItem,
      paddingLeft: '28px',
      position: 'relative',
      marginBottom: 0,
      lineHeight: '32px',
      color: '#333',
    },
    blockquote: {
      ...baseStyles.blockquote,
      fontFamily: SERIF_FONT,
      backgroundColor: 'rgba(255, 255, 255, 0.9)',
      border: '1px dashed #999',
      borderRadius: 0,
      color: '#666',
      transform: 'rotate(1deg)',
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
      padding: '16px 20px',
      lineHeight: 1.8,
      backdropFilter: 'blur(2px)',
    },
    code: {
      ...baseStyles.code,
      backgroundColor: 'rgba(139, 90, 43, 0.1)',
      color: '#8b5a2b',
    },
    link: {
      ...baseStyles.link,
      color: '#8b5a2b',
    },
    strong: {
      fontWeight: 700,
      color: '#8b5a2b',
    },
    divider: {
      ...baseStyles.divider,
      borderTop: '2px solid #8b5a2b',
      backgroundColor: 'transparent',
      height: 0,
      margin: '32px 0',
    },
  },
};
