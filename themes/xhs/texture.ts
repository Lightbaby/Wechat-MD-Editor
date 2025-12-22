import { XHSTemplate } from '../../types';
import { SANS_FONT, baseStyles, DOT_PATTERN } from './base';

/**
 * 现代纹理 - 高级感
 * 特点：点阵纹理背景、几何装饰、高级灰
 */
export const textureTemplate: XHSTemplate = {
  id: 'texture',
  name: '现代纹理',
  category: 'minimal',
  description: '高级灰调，质感纹理',
  colorVariants: [
    { id: 'gray', name: '高级灰', primary: '#1a1a1a', secondary: '#333', background: '#e5e5e5', accent: '#1a1a1a' },
    { id: 'warm', name: '暖砂', primary: '#2d2a26', secondary: '#4a4540', background: '#e8e4de', accent: '#2d2a26' },
    { id: 'cool', name: '冷石', primary: '#1e3a5f', secondary: '#2d5a87', background: '#e3e8ed', accent: '#1e3a5f' },
  ],
  styles: {
    container: {
      backgroundColor: '#e5e5e5',
      backgroundImage: DOT_PATTERN,
      backgroundSize: '16px 16px',
      padding: '40px 32px',
      fontFamily: SANS_FONT,
    },
    title: {
      ...baseStyles.title,
      fontSize: '26px',
      fontWeight: 700,
      color: '#1a1a1a',
      letterSpacing: '-0.01em',
      marginBottom: '32px',
      position: 'relative',
      paddingBottom: '16px',
    },
    body: {
      ...baseStyles.body,
      fontSize: '15px',
      fontWeight: 500,
      lineHeight: 1.9,
      color: '#333',
      letterSpacing: '0.03em',
    },
    heading: {
      ...baseStyles.heading,
      fontSize: '17px',
      fontWeight: 700,
      color: '#333',
      marginTop: '36px',
      marginBottom: '16px',
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
    },
    list: {
      ...baseStyles.list,
      listStyleType: 'none',
      paddingLeft: '8px',
    },
    listItem: {
      ...baseStyles.listItem,
      paddingLeft: '20px',
      position: 'relative',
      marginBottom: '12px',
      color: '#333',
    },
    blockquote: {
      ...baseStyles.blockquote,
      backgroundColor: '#dcdcdc',
      borderLeft: '4px solid #666',
      borderRadius: 0,
      color: '#444',
      fontWeight: 500,
      fontStyle: 'italic',
      boxShadow: 'inset 0 0 20px rgba(0, 0, 0, 0.05)',
      padding: '20px 24px',
    },
    code: {
      ...baseStyles.code,
      backgroundColor: 'rgba(255, 255, 255, 0.5)',
      color: '#1a1a1a',
    },
    link: {
      ...baseStyles.link,
      color: '#1a1a1a',
    },
    strong: {
      fontWeight: 900,
      color: '#000',
      backgroundColor: 'rgba(255, 255, 255, 0.5)',
      padding: '0 4px',
    },
    divider: {
      ...baseStyles.divider,
      borderTop: '1px solid #999',
      backgroundColor: 'transparent',
      height: 0,
      margin: '32px 0',
    },
  },
};
