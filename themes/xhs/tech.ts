import { XHSTemplate } from '../../types';
import { MONO_FONT, baseStyles } from './base';

/**
 * 科技先锋 - 赛博风格
 * 特点：暗黑背景、霓虹绿、代码感、终端风
 */
export const techTemplate: XHSTemplate = {
  id: 'tech',
  name: '科技先锋',
  category: 'tech',
  description: '赛博朋克，终端代码风',
  colorVariants: [
    { id: 'green', name: '矩阵绿', primary: '#e0e0e0', secondary: '#00ff9d', background: '#09090b', accent: '#00ff9d' },
    { id: 'blue', name: '电光蓝', primary: '#e0e0e0', secondary: '#00d8ff', background: '#0a0a0f', accent: '#00d8ff' },
    { id: 'red', name: '警告红', primary: '#e0e0e0', secondary: '#ff0055', background: '#0f0909', accent: '#ff0055' },
  ],
  styles: {
    container: {
      backgroundColor: '#09090b',
      padding: '36px 28px',
      fontFamily: MONO_FONT,
    },
    title: {
      ...baseStyles.title,
      fontFamily: MONO_FONT,
      fontSize: '22px',
      fontWeight: 700,
      color: '#00ff9d',
      letterSpacing: '0.1em',
      border: '1px solid #00ff9d',
      backgroundColor: 'rgba(0, 255, 157, 0.1)',
      padding: '12px 16px',
      boxShadow: '0 0 10px rgba(0, 255, 157, 0.3)',
      marginBottom: '28px',
    },
    body: {
      ...baseStyles.body,
      fontFamily: MONO_FONT,
      fontSize: '14px',
      lineHeight: 1.9,
      color: '#e0e0e0',
    },
    heading: {
      ...baseStyles.heading,
      fontFamily: MONO_FONT,
      fontSize: '15px',
      fontWeight: 700,
      color: '#00d8ff',
      marginTop: '28px',
      marginBottom: '14px',
      display: 'flex',
      alignItems: 'center',
      paddingLeft: '16px',
      position: 'relative',
    },
    list: {
      ...baseStyles.list,
      fontFamily: MONO_FONT,
      listStyleType: 'none',
      paddingLeft: '8px',
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
      backgroundColor: '#1a1a1a',
      borderLeft: '2px solid #ff0055',
      borderRadius: 0,
      color: '#00ff9d',
      fontSize: '13px',
      letterSpacing: '0.02em',
      padding: '14px 16px',
    },
    code: {
      ...baseStyles.code,
      fontFamily: MONO_FONT,
      backgroundColor: 'rgba(0, 255, 157, 0.1)',
      color: '#00ff9d',
      border: '1px solid rgba(0, 255, 157, 0.3)',
    },
    link: {
      ...baseStyles.link,
      color: '#00ff9d',
    },
    strong: {
      fontWeight: 700,
      color: '#00ff9d',
      textShadow: '0 0 5px rgba(0, 255, 157, 0.5)',
    },
    divider: {
      ...baseStyles.divider,
      borderTop: '1px solid #333',
      backgroundColor: 'transparent',
      height: 0,
      margin: '28px 0',
    },
  },
};
