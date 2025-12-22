import { XHSTemplate } from '../../types';
import { MONO_FONT, baseStyles } from './base';

/**
 * 流光像素 - Y2K风格
 * 特点：像素网格背景、霓虹色彩、复古未来感
 */
export const pixelTemplate: XHSTemplate = {
  id: 'pixel',
  name: '流光像素',
  category: 'tech',
  description: 'Y2K复古未来，霓虹赛博朋克',
  colorVariants: [
    { id: 'neon', name: '霓虹', primary: '#e0e0e0', secondary: '#00ffff', background: '#2d2d2d', accent: '#ff00ff' },
    { id: 'retro', name: '复古', primary: '#e0e0e0', secondary: '#39ff14', background: '#1a1a2e', accent: '#ff6b6b' },
    { id: 'vapor', name: '蒸汽', primary: '#e0e0e0', secondary: '#ff71ce', background: '#1f1f3d', accent: '#01cdfe' },
  ],
  styles: {
    container: {
      backgroundColor: '#2d2d2d',
      backgroundImage: 'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)',
      backgroundSize: '20px 20px',
      padding: '36px 28px',
      fontFamily: MONO_FONT,
    },
    title: {
      ...baseStyles.title,
      fontFamily: MONO_FONT,
      fontSize: '22px',
      fontWeight: 700,
      color: '#ff00ff',
      letterSpacing: '-0.02em',
      textShadow: '2px 2px 0px #00ffff',
      marginBottom: '28px',
    },
    body: {
      ...baseStyles.body,
      fontFamily: MONO_FONT,
      fontSize: '14px',
      lineHeight: 1.8,
      color: '#ccc',
    },
    heading: {
      ...baseStyles.heading,
      fontFamily: MONO_FONT,
      fontSize: '16px',
      fontWeight: 700,
      color: '#00ffff',
      border: '1px solid #00ffff',
      display: 'inline-block',
      padding: '4px 12px',
      backgroundColor: 'rgba(0, 255, 255, 0.1)',
      marginTop: '28px',
      marginBottom: '14px',
    },
    list: {
      ...baseStyles.list,
      fontFamily: MONO_FONT,
      listStyleType: 'none',
      paddingLeft: '4px',
      fontSize: '14px',
    },
    listItem: {
      ...baseStyles.listItem,
      paddingLeft: '24px',
      position: 'relative',
      marginBottom: '10px',
      color: '#e0e0e0',
    },
    blockquote: {
      ...baseStyles.blockquote,
      fontFamily: MONO_FONT,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      border: '2px dashed #ff00ff',
      borderRadius: 0,
      color: '#ff00ff',
      padding: '14px 16px',
      fontSize: '13px',
    },
    code: {
      ...baseStyles.code,
      fontFamily: MONO_FONT,
      backgroundColor: '#000',
      color: '#00ffff',
      border: '1px solid #00ffff',
    },
    link: {
      ...baseStyles.link,
      color: '#00ffff',
    },
    strong: {
      fontWeight: 700,
      color: '#00ffff',
      backgroundColor: '#000',
      padding: '0 4px',
      border: '1px solid #00ffff',
    },
    divider: {
      ...baseStyles.divider,
      borderTop: '2px dashed #ffff00',
      backgroundColor: 'transparent',
      height: 0,
      margin: '28px 0',
    },
  },
};
