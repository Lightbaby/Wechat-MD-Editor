import { XHSTemplate } from '../../types';
import { SANS_FONT, baseStyles } from './base';

/**
 * 糖果渐变 - INS风格
 * 特点：柔和渐变背景、毛玻璃效果、圆角卡片
 */
export const candyTemplate: XHSTemplate = {
  id: 'candy',
  name: '糖果渐变',
  category: 'modern',
  description: 'INS风弥散光感，温柔到犯规',
  colorVariants: [
    { id: 'pink-cyan', name: '粉青', primary: '#555', secondary: '#ff9a9e', background: 'linear-gradient(135deg, #ffdee9 0%, #b5fffc 100%)', accent: '#ff9a9e' },
    { id: 'purple-pink', name: '紫粉', primary: '#555', secondary: '#a18cd1', background: 'linear-gradient(135deg, #fbc2eb 0%, #a6c1ee 100%)', accent: '#a18cd1' },
    { id: 'peach', name: '蜜桃', primary: '#555', secondary: '#f8a5c2', background: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)', accent: '#f8a5c2' },
  ],
  styles: {
    container: {
      background: 'linear-gradient(135deg, #ffdee9 0%, #b5fffc 100%)',
      padding: '32px 24px',
      fontFamily: SANS_FONT,
    },
    title: {
      ...baseStyles.title,
      fontSize: '22px',
      fontWeight: 700,
      color: '#fff',
      textAlign: 'center',
      textShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
      backgroundColor: 'rgba(255, 255, 255, 0.3)',
      backdropFilter: 'blur(8px)',
      WebkitBackdropFilter: 'blur(8px)',
      padding: '12px 20px',
      borderRadius: '16px',
      border: '1px solid rgba(255, 255, 255, 0.5)',
      marginBottom: '24px',
    },
    body: {
      ...baseStyles.body,
      fontSize: '15px',
      lineHeight: 1.9,
      color: '#555',
      backgroundColor: 'rgba(255, 255, 255, 0.4)',
      padding: '14px 16px',
      borderRadius: '12px',
      backdropFilter: 'blur(4px)',
      WebkitBackdropFilter: 'blur(4px)',
      marginBottom: '12px',
    },
    heading: {
      ...baseStyles.heading,
      fontSize: '17px',
      fontWeight: 700,
      color: '#ff9a9e',
      backgroundColor: 'rgba(255, 255, 255, 0.6)',
      display: 'inline-block',
      padding: '6px 18px',
      borderRadius: '20px',
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
      marginTop: '20px',
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
      color: '#555',
    },
    blockquote: {
      ...baseStyles.blockquote,
      backgroundColor: 'rgba(255, 255, 255, 0.5)',
      border: '1px solid #fff',
      borderRadius: '16px',
      color: '#777',
      padding: '16px 20px',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
    },
    code: {
      ...baseStyles.code,
      backgroundColor: 'rgba(255, 255, 255, 0.6)',
      color: '#a18cd1',
    },
    link: {
      ...baseStyles.link,
      color: '#ff9a9e',
    },
    strong: {
      fontWeight: 700,
      color: '#ff9a9e',
    },
    divider: {
      ...baseStyles.divider,
      borderTop: '2px solid rgba(255, 255, 255, 0.6)',
      backgroundColor: 'transparent',
      height: 0,
      margin: '24px 0',
    },
  },
};
