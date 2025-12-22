import { XHSTemplate } from '../../types';
import { SANS_FONT, baseStyles } from './base';

/**
 * 科技简约 - Apple风格
 * 特点：极简白底、科技蓝强调、干净利落
 */
export const techMinimalTemplate: XHSTemplate = {
  id: 'tech-minimal',
  name: '科技简约',
  category: 'tech',
  description: '大厂设计风，简约专业',
  colorVariants: [
    { id: 'blue', name: '科技蓝', primary: '#1d1d1f', secondary: '#0071e3', background: '#f5f5f7', accent: '#0071e3' },
    { id: 'dark', name: '暗夜', primary: '#f5f5f7', secondary: '#0a84ff', background: '#1c1c1e', accent: '#0a84ff' },
    { id: 'green', name: '环保绿', primary: '#1d1d1f', secondary: '#34c759', background: '#f5f5f7', accent: '#34c759' },
  ],
  styles: {
    container: {
      backgroundColor: '#f5f5f7',
      padding: '40px 32px',
      fontFamily: SANS_FONT,
    },
    title: {
      ...baseStyles.title,
      fontSize: '26px',
      fontWeight: 600,
      color: '#1d1d1f',
      letterSpacing: '-0.02em',
      marginBottom: '28px',
    },
    body: {
      ...baseStyles.body,
      fontSize: '15px',
      lineHeight: 1.8,
      color: '#1d1d1f',
    },
    heading: {
      ...baseStyles.heading,
      fontSize: '17px',
      fontWeight: 600,
      color: '#0071e3',
      marginTop: '32px',
      marginBottom: '14px',
    },
    list: {
      ...baseStyles.list,
      listStyleType: 'none',
      paddingLeft: '4px',
    },
    listItem: {
      ...baseStyles.listItem,
      paddingLeft: '20px',
      position: 'relative',
      marginBottom: '10px',
      color: '#1d1d1f',
    },
    blockquote: {
      ...baseStyles.blockquote,
      backgroundColor: '#fff',
      borderLeft: '3px solid #0071e3',
      borderRadius: '0 8px 8px 0',
      color: '#1d1d1f',
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)',
      padding: '16px 20px',
    },
    code: {
      ...baseStyles.code,
      backgroundColor: '#e5e5ea',
      color: '#1d1d1f',
    },
    link: {
      ...baseStyles.link,
      color: '#0071e3',
    },
    strong: {
      fontWeight: 600,
      color: '#0071e3',
    },
    divider: {
      ...baseStyles.divider,
      borderTop: '1px solid #d2d2d7',
      backgroundColor: 'transparent',
      height: 0,
      margin: '28px 0',
    },
  },
};
