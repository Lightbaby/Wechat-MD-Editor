import { XHSTemplate } from '../../types';
import { SERIF_FONT, baseStyles } from './base';

/**
 * 人文叙事 - 情感风格
 * 特点：宋体排版、居中标题、段落首行缩进、文学感
 */
export const storyTemplate: XHSTemplate = {
  id: 'story',
  name: '人文叙事',
  category: 'retro',
  description: '文学感排版，情感叙事',
  colorVariants: [
    { id: 'classic', name: '经典', primary: '#4a4a4a', secondary: '#2c2c2c', background: '#f9f7f2', accent: '#2c2c2c' },
    { id: 'warm', name: '暖阳', primary: '#5d4037', secondary: '#3e2723', background: '#faf6f0', accent: '#8d6e63' },
    { id: 'ink', name: '墨香', primary: '#37474f', secondary: '#263238', background: '#eceff1', accent: '#546e7a' },
  ],
  styles: {
    container: {
      backgroundColor: '#f9f7f2',
      padding: '40px 28px',
      fontFamily: SERIF_FONT,
    },
    title: {
      ...baseStyles.title,
      fontFamily: SERIF_FONT,
      fontSize: '24px',
      fontWeight: 400,
      color: '#2c2c2c',
      textAlign: 'center',
      letterSpacing: '0.2em',
      textTransform: 'uppercase',
      borderBottom: '1px solid #000',
      paddingTop: '16px',
      paddingBottom: '16px',
      marginBottom: '36px',
    },
    body: {
      ...baseStyles.body,
      fontFamily: SERIF_FONT,
      fontSize: '16px',
      lineHeight: 2,
      color: '#333',
      textAlign: 'justify',
      textIndent: '2em',
    },
    heading: {
      ...baseStyles.heading,
      fontFamily: SERIF_FONT,
      fontSize: '18px',
      fontWeight: 700,
      color: '#2c2c2c',
      textAlign: 'center',
      textDecoration: 'underline',
      textUnderlineOffset: '8px',
      textDecorationThickness: '1px',
      marginTop: '40px',
      marginBottom: '20px',
    },
    list: {
      ...baseStyles.list,
      fontFamily: SERIF_FONT,
      listStyleType: 'none',
      paddingLeft: '0',
      textAlign: 'center',
    },
    listItem: {
      ...baseStyles.listItem,
      marginBottom: '16px',
      color: '#4a4a4a',
    },
    blockquote: {
      ...baseStyles.blockquote,
      fontFamily: SERIF_FONT,
      fontStyle: 'italic',
      borderTop: '1px solid #ccc',
      borderBottom: '1px solid #ccc',
      borderLeft: 'none',
      borderRadius: 0,
      backgroundColor: 'transparent',
      color: '#666',
      textAlign: 'center',
      fontSize: '18px',
      lineHeight: 2,
      padding: '32px 16px',
    },
    code: {
      ...baseStyles.code,
      backgroundColor: '#f0ebe0',
      color: '#5d4037',
    },
    link: {
      ...baseStyles.link,
      color: '#000',
    },
    strong: {
      fontWeight: 700,
      color: '#2c2c2c',
    },
    divider: {
      ...baseStyles.divider,
      borderTop: '1px solid #000',
      backgroundColor: 'transparent',
      height: 0,
      width: '48px',
      margin: '48px auto',
    },
  },
};
