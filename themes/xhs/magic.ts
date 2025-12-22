import { XHSTemplate } from '../../types';
import { SANS_FONT, baseStyles } from './base';

/**
 * 神奇物语 - 梦幻风格
 * 特点：浅紫渐变、柔和光效、魔法氛围
 */
export const magicTemplate: XHSTemplate = {
  id: 'magic',
  name: '神奇物语',
  category: 'fantasy',
  description: '梦幻紫调，童话般的魔法氛围',
  colorVariants: [
    { id: 'purple', name: '魔法紫', primary: '#4a3b55', secondary: '#8a4fff', background: 'linear-gradient(180deg, #f3e7ff 0%, #e8dff5 100%)', accent: '#7e57c2' },
    { id: 'pink', name: '仙女粉', primary: '#5c4158', secondary: '#e91e8c', background: 'linear-gradient(180deg, #fce4ec 0%, #f3e5f5 100%)', accent: '#ec407a' },
    { id: 'blue', name: '星空蓝', primary: '#3d4a5c', secondary: '#5c6bc0', background: 'linear-gradient(180deg, #e8eaf6 0%, #e3f2fd 100%)', accent: '#5c6bc0' },
  ],
  styles: {
    container: {
      background: 'linear-gradient(180deg, #f3e7ff 0%, #e8dff5 100%)',
      padding: '36px 24px',
      fontFamily: SANS_FONT,
    },
    title: {
      ...baseStyles.title,
      fontSize: '22px',
      fontWeight: 700,
      color: '#8a4fff',
      textShadow: '0 2px 4px rgba(138, 79, 255, 0.15)',
      marginBottom: '24px',
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
    },
    body: {
      ...baseStyles.body,
      fontSize: '15px',
      lineHeight: 1.9,
      color: '#5e4b6e',
    },
    heading: {
      ...baseStyles.heading,
      fontSize: '17px',
      fontWeight: 700,
      color: '#9d72ff',
      borderBottom: '2px solid #dcd0ff',
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
      paddingLeft: '28px',
      position: 'relative',
      marginBottom: '10px',
      color: '#5e4b6e',
    },
    blockquote: {
      ...baseStyles.blockquote,
      backgroundColor: 'rgba(255, 255, 255, 0.6)',
      backdropFilter: 'blur(4px)',
      WebkitBackdropFilter: 'blur(4px)',
      border: '1px solid #fff',
      borderRadius: '16px',
      color: '#7e57c2',
      boxShadow: '0 4px 12px rgba(126, 87, 194, 0.1)',
      padding: '16px 20px',
    },
    code: {
      ...baseStyles.code,
      backgroundColor: 'rgba(255, 255, 255, 0.6)',
      color: '#8a4fff',
    },
    link: {
      ...baseStyles.link,
      color: '#7e57c2',
    },
    strong: {
      fontWeight: 700,
      color: '#8a4fff',
      textShadow: '0 1px 2px rgba(138, 79, 255, 0.1)',
    },
    divider: {
      ...baseStyles.divider,
      borderTop: '1px solid rgba(255, 255, 255, 0.5)',
      backgroundColor: 'transparent',
      height: 0,
      margin: '24px 0',
    },
  },
};
