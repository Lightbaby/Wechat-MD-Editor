import { XHSTemplate } from '../../types';
import { SANS_FONT, baseStyles } from './base';

/**
 * 跃动黑底 - 运动风格
 * 特点：纯黑背景、荧光黄强调、斜体动感
 */
export const dynamicTemplate: XHSTemplate = {
  id: 'dynamic',
  name: '跃动黑底',
  category: 'modern',
  description: '极客黑配荧光黄，运动潮流',
  colorVariants: [
    { id: 'yellow', name: '荧光黄', primary: '#fff', secondary: '#ccff00', background: '#0f0f0f', accent: '#ccff00' },
    { id: 'orange', name: '活力橙', primary: '#fff', secondary: '#ff6b35', background: '#0f0f0f', accent: '#ff6b35' },
    { id: 'cyan', name: '电光蓝', primary: '#fff', secondary: '#00f5ff', background: '#0f0f0f', accent: '#00f5ff' },
  ],
  styles: {
    container: {
      backgroundColor: '#0f0f0f',
      padding: '36px 28px',
      fontFamily: SANS_FONT,
    },
    title: {
      ...baseStyles.title,
      fontSize: '26px',
      fontWeight: 900,
      fontStyle: 'italic',
      color: '#ccff00',
      letterSpacing: '-0.02em',
      transform: 'skewX(-6deg)',
      borderBottom: '4px solid #ccff00',
      display: 'inline-block',
      paddingBottom: '8px',
      marginBottom: '32px',
    },
    body: {
      ...baseStyles.body,
      fontSize: '15px',
      fontWeight: 500,
      lineHeight: 1.9,
      color: '#e5e5e5',
    },
    heading: {
      ...baseStyles.heading,
      fontSize: '17px',
      fontWeight: 700,
      color: '#000',
      backgroundColor: '#fff',
      display: 'inline-block',
      padding: '6px 16px',
      transform: 'skewX(-6deg)',
      boxShadow: '4px 4px 0px #ccff00',
      marginTop: '32px',
      marginBottom: '18px',
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
      color: '#e5e5e5',
    },
    blockquote: {
      ...baseStyles.blockquote,
      backgroundColor: '#222',
      borderLeft: '4px solid #ccff00',
      borderRadius: 0,
      color: '#ccff00',
      fontStyle: 'italic',
      fontWeight: 700,
      padding: '16px 20px',
    },
    code: {
      ...baseStyles.code,
      backgroundColor: 'rgba(204, 255, 0, 0.2)',
      color: '#ccff00',
    },
    link: {
      ...baseStyles.link,
      color: '#ccff00',
    },
    strong: {
      fontWeight: 700,
      fontStyle: 'italic',
      color: '#ccff00',
      paddingRight: '4px',
    },
    divider: {
      ...baseStyles.divider,
      borderTop: '4px solid #ccff00',
      backgroundColor: 'transparent',
      height: 0,
      margin: '32px 0',
    },
  },
};
