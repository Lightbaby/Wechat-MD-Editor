import { XHSTemplate } from '../../types';
import { SERIF_FONT, baseStyles, NOISE_BG } from './base';

/**
 * 复古报刊 - 怀旧风格
 * 特点：双线边框、衬线字体、大写字母、首字下沉
 */
export const vintageTemplate: XHSTemplate = {
  id: 'vintage',
  name: '复古报刊',
  category: 'retro',
  description: '旧时光滤镜，文学与历史的绝配',
  colorVariants: [
    { id: 'sepia', name: '泛黄', primary: '#2b2b2b', secondary: '#5c4f4a', background: '#f4f1ea', accent: '#8c7b75' },
    { id: 'warm', name: '暖棕', primary: '#3e2723', secondary: '#5d4037', background: '#efebe9', accent: '#8d6e63' },
    { id: 'gray', name: '铅灰', primary: '#212121', secondary: '#424242', background: '#eeeeee', accent: '#757575' },
  ],
  styles: {
    container: {
      backgroundColor: '#f4f1ea',
      backgroundImage: NOISE_BG,
      padding: '36px 28px',
      fontFamily: SERIF_FONT,
    },
    title: {
      ...baseStyles.title,
      fontFamily: SERIF_FONT,
      fontSize: '26px',
      fontWeight: 700,
      color: '#2b2b2b',
      textAlign: 'center',
      letterSpacing: '0.15em',
      textTransform: 'uppercase',
      borderBottom: '3px double #2b2b2b',
      paddingBottom: '12px',
      marginBottom: '28px',
    },
    body: {
      ...baseStyles.body,
      fontFamily: SERIF_FONT,
      fontSize: '15px',
      lineHeight: 2,
      color: '#2b2b2b',
      textAlign: 'justify',
    },
    heading: {
      ...baseStyles.heading,
      fontFamily: SERIF_FONT,
      fontSize: '16px',
      fontWeight: 700,
      color: '#2b2b2b',
      textTransform: 'uppercase',
      letterSpacing: '0.1em',
      borderLeft: '4px solid #8c7b75',
      paddingLeft: '12px',
      marginTop: '28px',
      marginBottom: '14px',
    },
    list: {
      ...baseStyles.list,
      fontFamily: SERIF_FONT,
      paddingLeft: '24px',
    },
    listItem: {
      ...baseStyles.listItem,
      marginBottom: '8px',
      color: '#2b2b2b',
    },
    blockquote: {
      ...baseStyles.blockquote,
      fontFamily: SERIF_FONT,
      fontStyle: 'italic',
      borderTop: '1px solid #2b2b2b',
      borderBottom: '1px solid #2b2b2b',
      borderLeft: 'none',
      borderRadius: 0,
      backgroundColor: 'rgba(234, 221, 207, 0.3)',
      color: '#2b2b2b',
      padding: '20px 16px',
    },
    code: {
      ...baseStyles.code,
      fontFamily: SERIF_FONT,
      backgroundColor: '#eaddcf',
      color: '#5c4f4a',
    },
    link: {
      ...baseStyles.link,
      color: '#5c4f4a',
    },
    strong: {
      fontWeight: 900,
      color: '#5c4f4a',
      textDecoration: 'underline',
      textDecorationColor: 'rgba(140, 123, 117, 0.5)',
      textUnderlineOffset: '3px',
    },
    divider: {
      ...baseStyles.divider,
      borderTop: '1px solid #2b2b2b',
      backgroundColor: 'transparent',
      height: 0,
      position: 'relative',
    },
  },
};
