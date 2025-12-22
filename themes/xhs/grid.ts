import { XHSTemplate } from '../../types';
import { SANS_FONT, baseStyles, GRID_PATTERN } from './base';

/**
 * 简单格子 - 清单风格
 * 特点：网格背景、黑白配色、复选框风格
 */
export const gridTemplate: XHSTemplate = {
  id: 'grid',
  name: '简单格子',
  category: 'minimal',
  description: '极简网格，清单待办风',
  colorVariants: [
    { id: 'white', name: '纯白', primary: '#1a1a1a', secondary: '#333', background: '#fff', accent: '#000' },
    { id: 'cream', name: '奶白', primary: '#2d2a26', secondary: '#4a4540', background: '#faf8f5', accent: '#2d2a26' },
    { id: 'gray', name: '冷灰', primary: '#1f2937', secondary: '#374151', background: '#f3f4f6', accent: '#1f2937' },
  ],
  styles: {
    container: {
      backgroundColor: '#fff',
      backgroundImage: GRID_PATTERN,
      backgroundSize: '20px 20px',
      padding: '36px 28px',
      fontFamily: SANS_FONT,
    },
    title: {
      ...baseStyles.title,
      fontSize: '22px',
      fontWeight: 700,
      color: '#000',
      textAlign: 'center',
      border: '2px solid #000',
      padding: '12px 20px',
      boxShadow: '4px 4px 0px 0px #000',
      backgroundColor: '#fff',
      marginBottom: '28px',
    },
    body: {
      ...baseStyles.body,
      fontSize: '15px',
      lineHeight: 1.8,
      color: '#1a1a1a',
      backgroundColor: 'rgba(255, 255, 255, 0.8)',
      padding: '4px 8px',
    },
    heading: {
      ...baseStyles.heading,
      fontSize: '17px',
      fontWeight: 700,
      color: '#000',
      borderBottom: '2px solid #000',
      display: 'inline-block',
      paddingBottom: '4px',
      marginTop: '28px',
      marginBottom: '16px',
    },
    list: {
      ...baseStyles.list,
      listStyleType: 'none',
      paddingLeft: '8px',
    },
    listItem: {
      ...baseStyles.listItem,
      paddingLeft: '32px',
      position: 'relative',
      marginBottom: '12px',
      color: '#1a1a1a',
    },
    blockquote: {
      ...baseStyles.blockquote,
      backgroundColor: '#fff',
      border: '2px solid #000',
      borderRadius: 0,
      color: '#1a1a1a',
      boxShadow: '2px 2px 0px 0px #000',
      fontWeight: 500,
      padding: '16px 20px',
    },
    code: {
      ...baseStyles.code,
      backgroundColor: '#f5f5f5',
      color: '#000',
      border: '1px solid #e0e0e0',
    },
    link: {
      ...baseStyles.link,
      color: '#000',
    },
    strong: {
      fontWeight: 700,
      color: '#fff',
      backgroundColor: '#000',
      padding: '0 4px',
    },
    divider: {
      ...baseStyles.divider,
      borderTop: '2px solid #000',
      backgroundColor: 'transparent',
      height: 0,
      margin: '28px 0',
    },
  },
};
