import { XHSTemplate } from '../../types';
import { SANS_FONT, baseStyles } from './base';

/**
 * 活力红薯 - 小红书经典风格
 * 特点：红色强调、圆角元素、活泼emoji装饰
 */
export const xiaohongshuTemplate: XHSTemplate = {
  id: 'xiaohongshu',
  name: '活力红薯',
  category: 'modern',
  description: '小红书经典配色，活力满满',
  colorVariants: [
    { id: 'red', name: '经典红', primary: '#ff2442', secondary: '#333', background: '#fffbfb', accent: '#ff2442' },
    { id: 'coral', name: '珊瑚橙', primary: '#ff6b6b', secondary: '#333', background: '#fff9f9', accent: '#ff6b6b' },
    { id: 'pink', name: '少女粉', primary: '#ff69b4', secondary: '#333', background: '#fff5f8', accent: '#ff69b4' },
    { id: 'orange', name: '活力橙', primary: '#ff7849', secondary: '#333', background: '#fff8f5', accent: '#ff7849' },
    { id: 'purple', name: '葡萄紫', primary: '#9b59b6', secondary: '#333', background: '#f9f5fc', accent: '#9b59b6' },
    { id: 'blue', name: '天空蓝', primary: '#3498db', secondary: '#333', background: '#f5f9fc', accent: '#3498db' },
  ],
  styles: {
    container: {
      backgroundColor: '#fffbfb',
      padding: '32px 24px',
      fontFamily: SANS_FONT,
    },
    title: {
      ...baseStyles.title,
      fontSize: '22px',
      fontWeight: 900,
      color: '#ff2442',
      marginBottom: '20px',
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
    },
    body: {
      ...baseStyles.body,
      fontSize: '15px',
      lineHeight: 1.9,
      color: '#333',
      letterSpacing: '0.04em',
      textAlign: 'justify',
    },
    heading: {
      ...baseStyles.heading,
      fontSize: '17px',
      fontWeight: 700,
      color: '#ff2442',
      backgroundColor: 'rgba(255, 36, 66, 0.1)',
      display: 'inline-block',
      padding: '4px 14px',
      borderRadius: '20px',
      marginTop: '24px',
      marginBottom: '12px',
    },
    list: {
      ...baseStyles.list,
      listStyleType: 'none',
      paddingLeft: '4px',
    },
    listItem: {
      ...baseStyles.listItem,
      paddingLeft: '24px',
      position: 'relative',
      marginBottom: '10px',
    },
    blockquote: {
      ...baseStyles.blockquote,
      backgroundColor: '#fff0f2',
      border: 'none',
      borderRadius: '12px',
      color: '#ff2442',
      padding: '16px 20px',
      fontWeight: 500,
      boxShadow: '0 2px 8px rgba(255, 36, 66, 0.08)',
    },
    code: {
      ...baseStyles.code,
      backgroundColor: '#fff0f2',
      color: '#ff2442',
    },
    link: {
      ...baseStyles.link,
      color: '#ff2442',
    },
    strong: {
      fontWeight: 900,
      color: '#ff2442',
    },
    divider: {
      ...baseStyles.divider,
      borderTop: '2px dashed rgba(255, 36, 66, 0.2)',
      backgroundColor: 'transparent',
      height: 0,
      margin: '24px 0',
    },
  },
};
