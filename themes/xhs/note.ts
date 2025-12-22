import { XHSTemplate } from '../../types';
import { SANS_FONT, baseStyles } from './base';

/**
 * 撕拉便签 - 手账风格
 * 特点：便签纸效果、图钉装饰、手账贴纸感
 */
export const noteTemplate: XHSTemplate = {
  id: 'note',
  name: '撕拉便签',
  category: 'handcraft',
  description: '便签贴纸，手账拼贴风',
  colorVariants: [
    { id: 'yellow', name: '便签黄', primary: '#4a4a4a', secondary: '#ffd54f', background: '#f3f4f6', accent: '#ffd54f' },
    { id: 'pink', name: '便签粉', primary: '#4a4a4a', secondary: '#f48fb1', background: '#fce4ec', accent: '#f48fb1' },
    { id: 'green', name: '便签绿', primary: '#4a4a4a', secondary: '#81c784', background: '#e8f5e9', accent: '#81c784' },
  ],
  styles: {
    container: {
      backgroundColor: '#f3f4f6',
      padding: '32px 24px',
      fontFamily: SANS_FONT,
    },
    title: {
      ...baseStyles.title,
      fontSize: '22px',
      fontWeight: 700,
      color: '#4a4a4a',
      backgroundColor: '#fff9c4',
      display: 'inline-block',
      padding: '10px 16px',
      transform: 'rotate(-1deg)',
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
      marginBottom: '24px',
    },
    body: {
      ...baseStyles.body,
      fontSize: '15px',
      lineHeight: 1.9,
      color: '#4a4a4a',
    },
    heading: {
      ...baseStyles.heading,
      fontSize: '17px',
      fontWeight: 700,
      color: '#4a4a4a',
      borderBottom: '4px solid rgba(255, 213, 79, 0.5)',
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
      paddingLeft: '32px',
      position: 'relative',
      marginBottom: '10px',
      color: '#4a4a4a',
    },
    blockquote: {
      ...baseStyles.blockquote,
      backgroundColor: '#fff',
      borderTop: '8px solid #e0e0e0',
      borderLeft: 'none',
      borderRadius: 0,
      color: '#666',
      transform: 'rotate(1deg)',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
      padding: '16px 20px',
      position: 'relative',
    },
    code: {
      ...baseStyles.code,
      backgroundColor: 'rgba(255, 213, 79, 0.3)',
      color: '#4a4a4a',
    },
    link: {
      ...baseStyles.link,
      color: '#ffc107',
    },
    strong: {
      fontWeight: 700,
      color: '#4a4a4a',
      backgroundColor: 'rgba(255, 213, 79, 0.3)',
      padding: '0 4px',
      borderRadius: '2px',
    },
    divider: {
      ...baseStyles.divider,
      borderTop: '2px dashed #d1d5db',
      backgroundColor: 'transparent',
      height: 0,
      margin: '24px 0',
    },
  },
};
