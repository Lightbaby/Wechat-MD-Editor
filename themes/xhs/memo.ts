import { XHSTemplate } from '../../types';
import { SANS_FONT, baseStyles, LINED_PAPER } from './base';

/**
 * 备忘录 - iOS备忘录风格
 * 特点：横线信纸、黄色高亮、经典笔记风
 */
export const memoTemplate: XHSTemplate = {
  id: 'memo',
  name: '备忘录',
  category: 'tool',
  description: '随手记神器，经典笔记风格',
  colorVariants: [
    { id: 'yellow', name: '经典黄', primary: '#333', secondary: '#4a4a4a', background: '#fbf8ef', accent: '#e6b800' },
    { id: 'pink', name: '樱花粉', primary: '#333', secondary: '#4a4a4a', background: '#fff5f5', accent: '#e91e63' },
    { id: 'blue', name: '天空蓝', primary: '#333', secondary: '#4a4a4a', background: '#f0f8ff', accent: '#2196f3' },
  ],
  styles: {
    container: {
      backgroundColor: '#fbf8ef',
      backgroundImage: LINED_PAPER,
      backgroundSize: '100% 32px',
      padding: '36px 24px',
      fontFamily: SANS_FONT,
    },
    title: {
      ...baseStyles.title,
      fontSize: '24px',
      fontWeight: 700,
      color: '#333',
      letterSpacing: '0.02em',
      marginBottom: '24px',
      lineHeight: '32px',
    },
    body: {
      ...baseStyles.body,
      fontSize: '16px',
      lineHeight: '32px',
      color: '#333',
      fontWeight: 500,
    },
    heading: {
      ...baseStyles.heading,
      fontSize: '14px',
      fontWeight: 700,
      color: '#e6b800',
      textTransform: 'uppercase',
      letterSpacing: '0.1em',
      marginTop: '32px',
      marginBottom: '12px',
      lineHeight: '32px',
    },
    list: {
      ...baseStyles.list,
      listStyleType: 'none',
      paddingLeft: '4px',
    },
    listItem: {
      ...baseStyles.listItem,
      paddingLeft: '28px',
      position: 'relative',
      marginBottom: '0',
      lineHeight: '32px',
      color: '#333',
    },
    blockquote: {
      ...baseStyles.blockquote,
      backgroundColor: '#faeeb8',
      borderLeft: '4px solid #e6c200',
      borderRadius: '8px',
      color: '#5c4b18',
      padding: '12px 16px',
    },
    code: {
      ...baseStyles.code,
      backgroundColor: 'rgba(230, 184, 0, 0.1)',
      color: '#333',
    },
    link: {
      ...baseStyles.link,
      color: '#333',
    },
    strong: {
      fontWeight: 700,
      color: '#e6b800',
      backgroundColor: 'rgba(230, 184, 0, 0.1)',
      padding: '0 4px',
      borderRadius: '2px',
    },
    divider: {
      ...baseStyles.divider,
      borderTop: '1px solid #e0e0e0',
      backgroundColor: 'transparent',
      height: 0,
      margin: '24px 0',
    },
  },
};
