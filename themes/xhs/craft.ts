import { XHSTemplate } from '../../types';
import { SERIF_FONT, baseStyles, CARDBOARD_TEXTURE } from './base';

/**
 * 纸纹背景 - 复古手工风
 * 特点：牛皮纸纹理、虚线装饰、手写感
 */
export const craftTemplate: XHSTemplate = {
  id: 'craft',
  name: '纸纹背景',
  category: 'handcraft',
  description: '牛皮纸纹理，复古手工感',
  colorVariants: [
    { id: 'kraft', name: '牛皮', primary: '#5c4033', secondary: '#3e2723', background: '#f0e6d2', accent: '#8d6e63' },
    { id: 'cream', name: '奶油', primary: '#5d4037', secondary: '#4e342e', background: '#faf6f0', accent: '#a1887f' },
    { id: 'gray', name: '灰棕', primary: '#4e4e4e', secondary: '#3e3e3e', background: '#e8e4de', accent: '#9e9e9e' },
  ],
  styles: {
    container: {
      backgroundColor: '#f0e6d2',
      backgroundImage: CARDBOARD_TEXTURE,
      padding: '36px 28px',
      fontFamily: SERIF_FONT,
    },
    title: {
      ...baseStyles.title,
      fontFamily: SERIF_FONT,
      fontSize: '24px',
      fontWeight: 700,
      color: '#3e2723',
      borderBottom: '2px dashed #8d6e63',
      paddingBottom: '12px',
      marginBottom: '28px',
    },
    body: {
      ...baseStyles.body,
      fontFamily: SERIF_FONT,
      fontSize: '15px',
      lineHeight: 2,
      color: '#4e342e',
    },
    heading: {
      ...baseStyles.heading,
      fontFamily: SERIF_FONT,
      fontSize: '17px',
      fontWeight: 700,
      color: '#5d4037',
      marginTop: '28px',
      marginBottom: '14px',
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
    },
    list: {
      ...baseStyles.list,
      fontFamily: SERIF_FONT,
      listStyleType: 'none',
      paddingLeft: '8px',
    },
    listItem: {
      ...baseStyles.listItem,
      paddingLeft: '28px',
      position: 'relative',
      marginBottom: '10px',
      color: '#5c4033',
    },
    blockquote: {
      ...baseStyles.blockquote,
      fontFamily: SERIF_FONT,
      fontStyle: 'italic',
      backgroundColor: '#d7ccc8',
      border: '1px solid #8d6e63',
      borderRadius: 0,
      color: '#3e2723',
      boxShadow: '3px 3px 0px #8d6e63',
      padding: '16px 20px',
    },
    code: {
      ...baseStyles.code,
      backgroundColor: 'rgba(0, 0, 0, 0.05)',
      color: '#5d4037',
    },
    link: {
      ...baseStyles.link,
      color: '#5d4037',
    },
    strong: {
      fontWeight: 900,
      color: '#3e2723',
    },
    divider: {
      ...baseStyles.divider,
      borderTop: '2px dashed #8d6e63',
      backgroundColor: 'transparent',
      height: 0,
      margin: '24px 0',
    },
  },
};
