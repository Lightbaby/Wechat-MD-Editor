import { XHSTemplate } from '../../types';
import { SERIF_FONT, baseStyles } from './base';

/**
 * 东方美学 - 国风风格
 * 特点：中式配色、宋体、红色点缀、竹青色调
 */
export const chinaTemplate: XHSTemplate = {
  id: 'china',
  name: '东方美学',
  category: 'chinese',
  description: '传统国风，东方韵味',
  colorVariants: [
    { id: 'red', name: '故宫红', primary: '#4a4a4a', secondary: '#8b3a3a', background: '#f5f5f0', accent: '#8b3a3a' },
    { id: 'green', name: '竹青', primary: '#4a4a4a', secondary: '#5d6b5e', background: '#f5f7f2', accent: '#5d6b5e' },
    { id: 'blue', name: '青花', primary: '#4a4a4a', secondary: '#2d5a7b', background: '#f5f8fa', accent: '#2d5a7b' },
  ],
  styles: {
    container: {
      backgroundColor: '#f5f5f0',
      padding: '40px 28px',
      fontFamily: SERIF_FONT,
    },
    title: {
      ...baseStyles.title,
      fontFamily: SERIF_FONT,
      fontSize: '26px',
      fontWeight: 700,
      color: '#8b3a3a',
      letterSpacing: '0.15em',
      borderLeft: '4px solid #8b3a3a',
      paddingLeft: '12px',
      marginBottom: '28px',
    },
    body: {
      ...baseStyles.body,
      fontFamily: SERIF_FONT,
      fontSize: '15px',
      lineHeight: 2,
      color: '#555',
      letterSpacing: '0.05em',
    },
    heading: {
      ...baseStyles.heading,
      fontFamily: SERIF_FONT,
      fontSize: '17px',
      fontWeight: 700,
      color: '#5d6b5e',
      marginTop: '32px',
      marginBottom: '16px',
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
      color: '#555',
    },
    blockquote: {
      ...baseStyles.blockquote,
      fontFamily: SERIF_FONT,
      fontStyle: 'italic',
      backgroundColor: '#e8e8e0',
      borderLeft: '2px solid #8b3a3a',
      borderRadius: 0,
      color: '#5d6b5e',
      padding: '16px 20px',
    },
    code: {
      ...baseStyles.code,
      backgroundColor: '#e8e8e0',
      color: '#8b3a3a',
    },
    link: {
      ...baseStyles.link,
      color: '#8b3a3a',
    },
    strong: {
      fontWeight: 700,
      color: '#8b3a3a',
    },
    divider: {
      ...baseStyles.divider,
      borderTop: '1px solid rgba(139, 58, 58, 0.3)',
      backgroundColor: 'transparent',
      height: 0,
      margin: '28px 0',
    },
  },
};
