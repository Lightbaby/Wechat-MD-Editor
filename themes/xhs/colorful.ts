import { XHSTemplate } from '../../types';
import { SANS_FONT, baseStyles } from './base';

/**
 * 彩页随笔 - 活泼风格
 * 特点：彩色渐变标题、多彩装饰、手账感
 */
export const colorfulTemplate: XHSTemplate = {
  id: 'colorful',
  name: '彩页随笔',
  category: 'handcraft',
  description: '活泼配色，手账风格',
  colorVariants: [
    { id: 'warm', name: '暖阳', primary: '#4a4a4a', secondary: '#ff6b6b', background: '#fffbe6', accent: '#ff6b6b' },
    { id: 'cool', name: '清新', primary: '#4a4a4a', secondary: '#4ecdc4', background: '#e8fff8', accent: '#4ecdc4' },
    { id: 'purple', name: '葡萄', primary: '#4a4a4a', secondary: '#a855f7', background: '#faf5ff', accent: '#a855f7' },
  ],
  styles: {
    container: {
      backgroundColor: '#fffbe6',
      padding: '32px 24px',
      fontFamily: SANS_FONT,
    },
    title: {
      ...baseStyles.title,
      fontSize: '22px',
      fontWeight: 900,
      color: '#fff',
      background: 'linear-gradient(135deg, #f472b6 0%, #fb923c 100%)',
      display: 'inline-block',
      padding: '8px 16px',
      borderRadius: '8px',
      boxShadow: '0 4px 12px rgba(244, 114, 182, 0.3)',
      transform: 'rotate(-1deg)',
      marginBottom: '24px',
    },
    body: {
      ...baseStyles.body,
      fontSize: '15px',
      lineHeight: 1.9,
      color: '#555',
      fontWeight: 500,
    },
    heading: {
      ...baseStyles.heading,
      fontSize: '17px',
      fontWeight: 700,
      color: '#ff6b6b',
      borderBottom: '4px solid #4ecdc4',
      display: 'inline-block',
      paddingBottom: '4px',
      marginTop: '24px',
      marginBottom: '14px',
    },
    list: {
      ...baseStyles.list,
      listStyleType: 'none',
      paddingLeft: '4px',
    },
    listItem: {
      ...baseStyles.listItem,
      paddingLeft: '32px',
      position: 'relative',
      marginBottom: '10px',
      color: '#555',
    },
    blockquote: {
      ...baseStyles.blockquote,
      backgroundColor: '#ffeaa7',
      border: '2px solid #fff',
      borderRadius: '0 16px',
      color: '#e17055',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
      padding: '16px 20px',
    },
    code: {
      ...baseStyles.code,
      backgroundColor: 'rgba(255, 107, 107, 0.1)',
      color: '#ff6b6b',
    },
    link: {
      ...baseStyles.link,
      color: '#ff6b6b',
    },
    strong: {
      fontWeight: 700,
      color: '#ff6b6b',
      backgroundColor: 'rgba(255, 107, 107, 0.1)',
      padding: '0 4px',
      borderRadius: '2px',
    },
    divider: {
      ...baseStyles.divider,
      borderTop: '4px dotted #ff9ff3',
      backgroundColor: 'transparent',
      height: 0,
      margin: '24px 0',
    },
  },
};
