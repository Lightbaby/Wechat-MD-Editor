import { XHSTemplate } from '../../types';
import { SANS_FONT, SERIF_FONT, baseStyles } from './base';

/**
 * 电影字幕 - 氛围感
 * 特点：纯黑背景、居中排版、黄色强调、电影感字幕
 */
export const cinemaTemplate: XHSTemplate = {
  id: 'cinema',
  name: '电影字幕',
  category: 'modern',
  description: '把生活过成电影，记录每一个高光时刻',
  colorVariants: [
    { id: 'classic', name: '经典黑', primary: '#e5e5e5', secondary: '#facc15', background: '#080808', accent: '#facc15' },
    { id: 'warm', name: '暖光', primary: '#fef3c7', secondary: '#f59e0b', background: '#0c0a09', accent: '#f59e0b' },
    { id: 'cold', name: '冷调', primary: '#e0f2fe', secondary: '#38bdf8', background: '#0a0a0a', accent: '#38bdf8' },
    { id: 'neon', name: '霓虹', primary: '#f0f0f0', secondary: '#ff6b9d', background: '#0d0d0d', accent: '#ff6b9d' },
    { id: 'matrix', name: '骇客', primary: '#00ff00', secondary: '#00cc00', background: '#000000', accent: '#00ff00' },
    { id: 'retro', name: '复古', primary: '#f5deb3', secondary: '#daa520', background: '#1a1a1a', accent: '#daa520' },
  ],
  styles: {
    container: {
      backgroundColor: '#080808',
      padding: '40px 28px',
      fontFamily: SANS_FONT,
    },
    title: {
      ...baseStyles.title,
      fontSize: '20px',
      fontWeight: 400,
      color: '#e5e5e5',
      textAlign: 'center',
      letterSpacing: '0.3em',
      marginBottom: '32px',
      paddingTop: '20px',
      borderTop: '1px solid rgba(255, 255, 255, 0.1)',
      textShadow: '0 2px 4px rgba(0, 0, 0, 0.5)',
    },
    body: {
      ...baseStyles.body,
      fontSize: '16px',
      lineHeight: 2.2,
      color: '#e5e5e5',
      textAlign: 'center',
      letterSpacing: '0.05em',
      textShadow: '0 1px 2px rgba(0, 0, 0, 0.3)',
    },
    heading: {
      ...baseStyles.heading,
      fontSize: '17px',
      fontWeight: 400,
      color: '#facc15',
      textAlign: 'center',
      letterSpacing: '0.1em',
      marginTop: '36px',
      marginBottom: '20px',
      textShadow: '0 2px 4px rgba(0, 0, 0, 0.5)',
    },
    list: {
      ...baseStyles.list,
      listStyleType: 'none',
      paddingLeft: 0,
      textAlign: 'center',
    },
    listItem: {
      ...baseStyles.listItem,
      color: '#e5e5e5',
      marginBottom: '16px',
      textAlign: 'center',
    },
    blockquote: {
      ...baseStyles.blockquote,
      fontFamily: SERIF_FONT,
      fontStyle: 'italic',
      backgroundColor: 'transparent',
      border: 'none',
      color: '#facc15',
      textAlign: 'center',
      fontSize: '18px',
      lineHeight: 2,
      padding: '20px 0',
      opacity: 0.9,
      textShadow: '0 2px 4px rgba(0, 0, 0, 0.5)',
    },
    code: {
      ...baseStyles.code,
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
      color: '#facc15',
    },
    link: {
      ...baseStyles.link,
      color: '#facc15',
    },
    strong: {
      fontWeight: 400,
      color: '#facc15',
      textShadow: '0 1px 2px rgba(0, 0, 0, 0.8)',
    },
    divider: {
      ...baseStyles.divider,
      borderTop: '1px solid rgba(255, 255, 255, 0.2)',
      backgroundColor: 'transparent',
      height: 0,
      width: '33%',
      margin: '36px auto',
    },
  },
};
