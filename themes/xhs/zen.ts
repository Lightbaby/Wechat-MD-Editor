import { XHSTemplate } from '../../types';
import { SANS_FONT, baseStyles } from './base';

/**
 * 禅意茶白 - 极简风格
 * 特点：大量留白、细线条、轻字重、呼吸感
 */
export const zenTemplate: XHSTemplate = {
  id: 'zen',
  name: '禅意茶白',
  category: 'minimal',
  description: '极简留白，回归生活本真',
  colorVariants: [
    { id: 'white', name: '素白', primary: '#595959', secondary: '#2c2c2c', background: '#fdfdfd', accent: '#a4b0be' },
    { id: 'warm', name: '暖灰', primary: '#5d5d5d', secondary: '#3d3d3d', background: '#faf8f5', accent: '#b8a692' },
    { id: 'green', name: '茶青', primary: '#4a5d52', secondary: '#2f3d35', background: '#f7faf8', accent: '#7d9a8c' },
  ],
  styles: {
    container: {
      backgroundColor: '#fdfdfd',
      padding: '40px 28px',
      fontFamily: SANS_FONT,
    },
    title: {
      ...baseStyles.title,
      fontSize: '26px',
      fontWeight: 300,
      color: '#2c2c2c',
      letterSpacing: '0.15em',
      borderLeft: '6px solid #a4b0be',
      paddingLeft: '16px',
      paddingTop: '4px',
      paddingBottom: '4px',
      marginBottom: '32px',
    },
    body: {
      ...baseStyles.body,
      fontSize: '15px',
      fontWeight: 300,
      lineHeight: 2.2,
      color: '#595959',
      letterSpacing: '0.05em',
    },
    heading: {
      ...baseStyles.heading,
      fontSize: '17px',
      fontWeight: 400,
      color: '#57606f',
      marginTop: '36px',
      marginBottom: '16px',
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
    },
    list: {
      ...baseStyles.list,
      listStyleType: 'none',
      paddingLeft: '8px',
    },
    listItem: {
      ...baseStyles.listItem,
      paddingLeft: '20px',
      position: 'relative',
      marginBottom: '14px',
      color: '#595959',
      fontWeight: 300,
    },
    blockquote: {
      ...baseStyles.blockquote,
      backgroundColor: '#f1f2f6',
      borderTop: '2px solid #ced6e0',
      borderLeft: 'none',
      borderRadius: 0,
      color: '#57606f',
      fontWeight: 300,
      letterSpacing: '0.1em',
      padding: '24px 20px',
    },
    code: {
      ...baseStyles.code,
      backgroundColor: '#f1f2f6',
      color: '#57606f',
    },
    link: {
      ...baseStyles.link,
      color: '#a4b0be',
    },
    strong: {
      fontWeight: 700,
      color: '#2c2c2c',
    },
    divider: {
      ...baseStyles.divider,
      borderTop: '1px solid #f1f2f6',
      backgroundColor: 'transparent',
      height: 0,
      margin: '36px 0',
    },
  },
};
