import { XHSTemplate } from '../types';

// ============================================
// Font Stacks & Base Configurations
// ============================================

const SANS_FONT = '-apple-system, BlinkMacSystemFont, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "Helvetica Neue", Arial, sans-serif';
const SERIF_FONT = '"Songti SC", "Noto Serif SC", "Source Han Serif SC", STSong, "Times New Roman", serif';
const MONO_FONT = '"Fira Code", "SF Mono", Menlo, Monaco, Consolas, monospace';

// Refined "Premium" Font Stacks
const HAND_FONT = '"Kaiti SC", "STKaiti", "KaiTi", "AR PL UKai CN", cursive';
const CUTE_FONT = '"Yuanti SC", "YouYuan", "STYuanti", "PingFang SC", sans-serif';

// Noise Texture for Paper/Retro effects
const NOISE_BG = `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.05'/%3E%3C/svg%3E")`;

const baseStyles = {
  title: {
    fontFamily: SANS_FONT,
    fontSize: '24px',
    fontWeight: 700,
    lineHeight: 1.4,
    marginBottom: '24px',
    marginTop: '0px',
    letterSpacing: '0.04em',
  },
  body: {
    fontFamily: SANS_FONT,
    fontSize: '15px',
    lineHeight: 1.8,
    letterSpacing: '0.06em',
    color: '#333',
    textAlign: 'justify' as const,
  },
  heading: {
    fontFamily: SANS_FONT,
    fontSize: '18px',
    fontWeight: 700,
    marginTop: '28px',
    marginBottom: '16px',
    color: '#000',
    letterSpacing: '0.05em',
  },
  list: {
    paddingLeft: '20px',
    margin: '12px 0 20px',
  },
  listItem: {
    marginBottom: '8px',
    lineHeight: 1.7,
  },
  blockquote: {
    fontStyle: 'normal',
    color: '#555',
    margin: '20px 0',
    padding: '16px 20px',
    backgroundColor: '#F9FAFB',
    borderRadius: '8px',
    borderLeft: '4px solid #E5E7EB',
  },
  code: {
    fontFamily: MONO_FONT,
    fontSize: '13px',
    padding: '2px 6px',
    borderRadius: '4px',
    backgroundColor: '#F3F4F6',
    color: '#D946EF',
  },
  link: {
    textDecoration: 'none',
    borderBottom: '1px solid currentColor',
    fontWeight: 500,
  },
  strong: {
    fontWeight: 700,
    color: '#000',
  },
  divider: {
    margin: '32px 0',
    height: '1px',
    backgroundColor: '#E5E7EB',
    border: 'none',
  },
};

export const XHS_TEMPLATES: XHSTemplate[] = [
  // ============================================
  // 1. 简单格子 (Simple Grid)
  // 截图特征: 白底+浅灰虚线格子，H2左侧黑色圆角方块前缀，强调文字有下划线
  // ============================================
  {
    id: 'simple-grid',
    name: '简单格子',
    category: 'minimal',
    description: '极简白底灰格子，理性手账风',
    colorVariants: [
      { id: 'white', name: '纯白', primary: '#000', secondary: '#333', background: '#fff' },
      { id: 'warm', name: '暖白', primary: '#222', secondary: '#444', background: '#FFFBF0' },
      { id: 'cool', name: '冷灰', primary: '#111', secondary: '#333', background: '#F8F9FA' },
    ],
    styles: {
      container: {
        // 浅灰虚线格子背景
        backgroundImage: `
          linear-gradient(to right, #E8E8E8 1px, transparent 1px),
          linear-gradient(to bottom, #E8E8E8 1px, transparent 1px)
        `,
        backgroundSize: '40px 40px',
        padding: '36px 28px',
        backgroundColor: '#fff',
      },
      title: {
        ...baseStyles.title,
        fontFamily: SANS_FONT,
        textAlign: 'left',
        fontSize: '28px',
        fontWeight: 900,
        color: '#000',
        marginBottom: '32px',
        lineHeight: 1.5,
      },
      body: {
        ...baseStyles.body,
        color: '#333',
        fontSize: '15px',
        lineHeight: 1.9,
      },
      heading: {
        ...baseStyles.heading,
        // H2 左侧黑色圆角方块
        paddingLeft: '28px',
        position: 'relative' as const,
        fontSize: '20px',
        fontWeight: 800,
        color: '#000',
        marginTop: '36px',
        marginBottom: '20px',
        // 使用背景模拟方块
        backgroundImage: `linear-gradient(#000, #000)`,
        backgroundSize: '18px 18px',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: '0 50%',
        borderRadius: '3px',
      },
      list: { ...baseStyles.list, paddingLeft: '24px' },
      listItem: { ...baseStyles.listItem, marginBottom: '12px' },
      blockquote: {
        ...baseStyles.blockquote,
        borderLeft: 'none',
        backgroundColor: '#F5F5F5',
        padding: '20px 24px',
        borderRadius: '0',
        color: '#333',
      },
      code: { ...baseStyles.code, backgroundColor: '#F0F0F0', color: '#333' },
      link: { ...baseStyles.link, color: '#000' },
      strong: {
        ...baseStyles.strong,
        // 强调文字带下划线效果
        textDecoration: 'underline',
        textDecorationColor: '#000',
        textUnderlineOffset: '4px',
      },
      divider: { ...baseStyles.divider, backgroundColor: '#E0E0E0' },
    },
  },

  // ============================================
  // 2. 彩页随笔 (Color Page Notes)
  // 截图特征: 柔光渐变背景，顶部菱形/星星装饰，宋体，菱形(◆)列表符号，深墨绿文字
  // ============================================
  {
    id: 'color-page',
    name: '彩页随笔',
    category: 'handcraft',
    description: '梦幻柔光渐变，宋体文学感',
    colorVariants: [
      { id: 'blue-green', name: '青蓝', primary: '#2D5A5A', secondary: '#3D6A6A', background: 'linear-gradient(180deg, #D4F1F4 0%, #E8F5E9 50%, #F0F7E6 100%)', accent: '#2D5A5A' },
      { id: 'pink-yellow', name: '粉黄', primary: '#5D4037', secondary: '#795548', background: 'linear-gradient(180deg, #FFE4EC 0%, #FFF8E1 100%)', accent: '#C2185B' },
      { id: 'purple-blue', name: '紫蓝', primary: '#4A148C', secondary: '#6A1B9A', background: 'linear-gradient(180deg, #E8DEF8 0%, #D1C4E9 50%, #E3F2FD 100%)', accent: '#7B1FA2' },
    ],
    styles: {
      container: {
        padding: '40px 28px',
        position: 'relative' as const,
      },
      title: {
        ...baseStyles.title,
        fontFamily: SERIF_FONT,
        textAlign: 'left',
        fontSize: '26px',
        fontWeight: 700,
        color: '#2D5A5A',
        marginBottom: '28px',
        lineHeight: 1.6,
      },
      body: {
        ...baseStyles.body,
        fontFamily: SERIF_FONT,
        fontSize: '15px',
        color: '#2D5A5A',
        lineHeight: 2,
        textIndent: '2em',
      },
      heading: {
        ...baseStyles.heading,
        fontFamily: SERIF_FONT,
        fontSize: '17px',
        fontWeight: 700,
        color: '#2D5A5A',
        // 菱形前缀
        paddingLeft: '20px',
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='12' height='12' viewBox='0 0 12 12' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M6 0L12 6L6 12L0 6Z' fill='%232D5A5A'/%3E%3C/svg%3E")`,
        backgroundSize: '12px 12px',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: '0 50%',
        marginTop: '32px',
        marginBottom: '16px',
      },
      list: { ...baseStyles.list, listStyleType: 'none', paddingLeft: '0' },
      listItem: {
        ...baseStyles.listItem,
        paddingLeft: '20px',
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='10' height='10' viewBox='0 0 10 10' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M5 0L10 5L5 10L0 5Z' fill='%232D5A5A'/%3E%3C/svg%3E")`,
        backgroundSize: '10px 10px',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: '0 8px',
        marginBottom: '10px',
      },
      blockquote: {
        ...baseStyles.blockquote,
        fontFamily: SERIF_FONT,
        backgroundColor: 'rgba(255,255,255,0.4)',
        border: 'none',
        borderRadius: '8px',
        color: '#2D5A5A',
        padding: '20px 24px',
      },
      code: { ...baseStyles.code, backgroundColor: 'rgba(255,255,255,0.6)', color: '#2D5A5A' },
      link: { ...baseStyles.link, color: '#2D5A5A' },
      strong: { ...baseStyles.strong, color: '#2D5A5A', fontWeight: 900 },
      divider: { ...baseStyles.divider, backgroundColor: 'rgba(45,90,90,0.3)' },
    },
  },

  // ============================================
  // 3. 纸纹背景 (Paper Texture)
  // 截图特征: 深色墨色/水墨纹理背景，白色宋体文字，边缘有暗角效果
  // ============================================
  {
    id: 'paper-texture',
    name: '纸纹背景',
    category: 'nature',
    description: '深色质感纹理，白色宋体',
    colorVariants: [
      { id: 'ink', name: '水墨', primary: '#FFFFFF', secondary: '#E8E8E8', background: '#2A2A2A', accent: '#888' },
      { id: 'kraft', name: '牛皮', primary: '#FFFFFF', secondary: '#F0E6D3', background: '#3E2723', accent: '#D7CCC8' },
      { id: 'slate', name: '石板', primary: '#F5F5F5', secondary: '#E0E0E0', background: '#37474F', accent: '#B0BEC5' },
    ],
    styles: {
      container: {
        backgroundImage: NOISE_BG,
        padding: '40px 28px',
        // 暗角效果
        boxShadow: 'inset 0 0 120px rgba(0,0,0,0.6)',
      },
      title: {
        ...baseStyles.title,
        fontFamily: SERIF_FONT,
        textAlign: 'left',
        fontSize: '26px',
        fontWeight: 700,
        color: '#fff',
        marginBottom: '28px',
        lineHeight: 1.6,
        textShadow: '0 2px 4px rgba(0,0,0,0.3)',
      },
      body: {
        ...baseStyles.body,
        fontFamily: SERIF_FONT,
        color: '#fff',
        fontSize: '15px',
        lineHeight: 2,
        textIndent: '2em',
      },
      heading: {
        ...baseStyles.heading,
        fontFamily: SERIF_FONT,
        color: '#fff',
        fontSize: '17px',
        fontWeight: 700,
        marginTop: '32px',
        marginBottom: '16px',
        borderBottom: '1px solid rgba(255,255,255,0.3)',
        paddingBottom: '8px',
      },
      list: { ...baseStyles.list },
      listItem: { ...baseStyles.listItem, color: '#fff' },
      blockquote: {
        ...baseStyles.blockquote,
        fontFamily: SERIF_FONT,
        backgroundColor: 'rgba(255,255,255,0.1)',
        borderLeft: '3px solid rgba(255,255,255,0.4)',
        color: '#fff',
      },
      code: { ...baseStyles.code, backgroundColor: 'rgba(0,0,0,0.4)', color: '#FFD54F' },
      link: { ...baseStyles.link, color: '#fff' },
      strong: { ...baseStyles.strong, color: '#fff' },
      divider: { ...baseStyles.divider, backgroundColor: 'rgba(255,255,255,0.3)' },
    },
  },

  // ============================================
  // 4. 备忘录 (Memo)
  // 截图特征: 白底横线信纸，顶部DATE/MEMO NO表单头，红色圆点列表，强调文字红色下划线点
  // ============================================
  {
    id: 'memo',
    name: '备忘录',
    category: 'tool',
    description: '横线信纸与荧光笔高亮',
    colorVariants: [
      { id: 'standard', name: '标准', primary: '#333', secondary: '#555', background: '#fff', accent: '#C62828' },
      { id: 'warm', name: '暖色', primary: '#333', secondary: '#555', background: '#FFFDF5', accent: '#E65100' },
    ],
    styles: {
      container: {
        // 横线信纸效果
        backgroundImage: `
          linear-gradient(transparent 0px, transparent 29px, #E8E8E8 30px)
        `,
        backgroundSize: '100% 30px',
        padding: '20px 28px 40px',
        backgroundColor: '#fff',
        // 顶部边线模拟表单头区域
        borderTop: '1px solid #E0E0E0',
      },
      title: {
        ...baseStyles.title,
        fontFamily: SANS_FONT,
        textAlign: 'left',
        fontSize: '28px',
        fontWeight: 900,
        color: '#000',
        marginTop: '40px',
        marginBottom: '32px',
        lineHeight: '30px',
      },
      body: {
        ...baseStyles.body,
        fontFamily: SANS_FONT,
        color: '#333',
        fontSize: '15px',
        lineHeight: '30px',
      },
      heading: {
        ...baseStyles.heading,
        fontFamily: SANS_FONT,
        fontSize: '17px',
        fontWeight: 700,
        color: '#333',
        lineHeight: '30px',
        marginTop: '30px',
        marginBottom: '15px',
      },
      list: { ...baseStyles.list, paddingLeft: '24px' },
      listItem: {
        ...baseStyles.listItem,
        lineHeight: '30px',
        marginBottom: '0',
        // 红色圆点
        color: '#C62828',
      },
      blockquote: {
        ...baseStyles.blockquote,
        backgroundColor: 'transparent',
        borderLeft: 'none',
        borderBottom: '2px dashed #CCC',
        borderRadius: '0',
        padding: '0 0 15px 0',
        margin: '15px 0 30px',
        color: '#333',
      },
      code: { ...baseStyles.code, backgroundColor: '#F5F5F5', color: '#333', border: '1px solid #E0E0E0' },
      link: { ...baseStyles.link, color: '#333' },
      strong: {
        ...baseStyles.strong,
        color: '#000',
        // 红色下划线点效果
        textDecoration: 'underline',
        textDecorationStyle: 'dotted' as const,
        textDecorationColor: '#C62828',
        textUnderlineOffset: '4px',
      },
      divider: { ...baseStyles.divider, borderTop: '2px dashed #CCC', backgroundColor: 'transparent', height: '0' },
    },
  },

  // ============================================
  // 5. 神奇物语 (Magic Story)
  // 截图特征: 浅紫色/羊皮纸背景，黑色双线古典边框，宋体
  // ============================================
  {
    id: 'magic-story',
    name: '神奇物语',
    category: 'fantasy',
    description: '塔罗牌与魔法书风格，古典边框',
    colorVariants: [
      { id: 'mystic', name: '秘紫', primary: '#2C2C2C', secondary: '#444', background: '#E8E0F0', accent: '#6A1B9A' },
      { id: 'parchment', name: '羊皮', primary: '#3E2723', secondary: '#5D4037', background: '#F5E6D3', accent: '#8D6E63' },
    ],
    styles: {
      container: {
        padding: '50px 36px',
        // 古典双线边框
        boxShadow: 'inset 0 0 0 2px #333, inset 0 0 0 6px transparent, inset 0 0 0 8px #333',
        border: '12px solid transparent',
        backgroundClip: 'padding-box',
      },
      title: {
        ...baseStyles.title,
        fontFamily: SERIF_FONT,
        textAlign: 'center',
        fontSize: '22px',
        fontWeight: 400,
        color: '#2C2C2C',
        marginBottom: '24px',
        lineHeight: 1.8,
      },
      body: {
        ...baseStyles.body,
        fontFamily: SERIF_FONT,
        color: '#2C2C2C',
        fontSize: '14px',
        lineHeight: 2,
        textIndent: '2em',
      },
      heading: {
        ...baseStyles.heading,
        fontFamily: SERIF_FONT,
        fontSize: '15px',
        fontWeight: 400,
        color: '#2C2C2C',
        marginTop: '28px',
        marginBottom: '14px',
        // 菱形前缀
        paddingLeft: '18px',
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='10' height='10' viewBox='0 0 10 10' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M5 0L10 5L5 10L0 5Z' fill='%232C2C2C'/%3E%3C/svg%3E")`,
        backgroundSize: '10px 10px',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: '0 50%',
      },
      list: { ...baseStyles.list },
      listItem: {
        ...baseStyles.listItem,
        // 菱形列表符号
        listStyleType: 'none',
        paddingLeft: '18px',
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='8' height='8' viewBox='0 0 8 8' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M4 0L8 4L4 8L0 4Z' fill='%232C2C2C'/%3E%3C/svg%3E")`,
        backgroundSize: '8px 8px',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: '0 8px',
      },
      blockquote: {
        ...baseStyles.blockquote,
        fontFamily: SERIF_FONT,
        border: '1px solid #2C2C2C',
        backgroundColor: 'transparent',
        textAlign: 'center',
        fontStyle: 'italic',
        color: '#2C2C2C',
      },
      code: { ...baseStyles.code, backgroundColor: 'rgba(0,0,0,0.05)', color: '#6A1B9A' },
      link: { ...baseStyles.link, color: '#2C2C2C' },
      strong: { ...baseStyles.strong, color: '#2C2C2C' },
      divider: { ...baseStyles.divider, backgroundColor: '#2C2C2C' },
    },
  },

  // ============================================
  // 6. 中国色 (China Color)
  // 截图特征: 深蓝/故宫红/竹青背景，白色宋体，竖排标题布局，祥云装饰
  // ============================================
  {
    id: 'china-color',
    name: '中国色',
    category: 'chinese',
    description: '传统国色背景，白色宋体',
    colorVariants: [
      { id: 'indigo', name: '青花', primary: '#FFFFFF', secondary: '#E8E8E8', background: '#1A3A5C', accent: '#C5CAE9' },
      { id: 'vermilion', name: '故宫', primary: '#FFFFFF', secondary: '#FFEBEE', background: '#8B1A1A', accent: '#FFCDD2' },
      { id: 'bamboo', name: '竹青', primary: '#FFFFFF', secondary: '#E8F5E9', background: '#2E5A3A', accent: '#C8E6C9' },
    ],
    styles: {
      container: {
        padding: '48px 32px',
        backgroundImage: NOISE_BG,
      },
      title: {
        ...baseStyles.title,
        fontFamily: SERIF_FONT,
        // 竖排标题样式 - 使用多列模拟
        textAlign: 'center',
        fontSize: '28px',
        fontWeight: 400,
        color: '#fff',
        marginBottom: '40px',
        lineHeight: 1.8,
        letterSpacing: '0.2em',
      },
      body: {
        ...baseStyles.body,
        fontFamily: SERIF_FONT,
        color: '#fff',
        fontSize: '15px',
        lineHeight: 2.2,
        textIndent: '2em',
      },
      heading: {
        ...baseStyles.heading,
        fontFamily: SERIF_FONT,
        color: '#fff',
        fontSize: '16px',
        fontWeight: 400,
        marginTop: '36px',
        marginBottom: '20px',
        paddingLeft: '0',
        textAlign: 'left',
        borderBottom: '1px solid rgba(255,255,255,0.3)',
        paddingBottom: '8px',
      },
      list: { ...baseStyles.list },
      listItem: { ...baseStyles.listItem, color: '#fff' },
      blockquote: {
        ...baseStyles.blockquote,
        fontFamily: SERIF_FONT,
        borderLeft: '3px solid rgba(255,255,255,0.6)',
        backgroundColor: 'rgba(255,255,255,0.1)',
        color: '#fff',
      },
      code: { ...baseStyles.code, backgroundColor: 'rgba(255,255,255,0.15)', color: '#FFD54F' },
      link: { ...baseStyles.link, color: '#fff' },
      strong: { ...baseStyles.strong, color: '#FFD700' },
      divider: { ...baseStyles.divider, backgroundColor: 'rgba(255,255,255,0.4)' },
    },
  },

  // ============================================
  // 7. 撕拉便签 (Torn Note)
  // 截图特征: 浅米色便签纸，顶部有阴影/胶带效果，手写楷体，撕裂边缘
  // ============================================
  {
    id: 'torn-note',
    name: '撕拉便签',
    category: 'handcraft',
    description: '拼贴手账风，边缘撕裂效果',
    colorVariants: [
      { id: 'cream', name: '奶油', primary: '#5D4037', secondary: '#6D4C41', background: '#FFF8E1', accent: '#8D6E63' },
    ],
    styles: {
      container: {
        backgroundColor: '#FFF8E1',
        padding: '48px 28px 60px',
        // 顶部阴影模拟胶带
        boxShadow: '0 -20px 40px -20px rgba(0,0,0,0.15) inset, 0 10px 30px rgba(0,0,0,0.08)',
        // 底部撕裂边缘
        clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 8px), 98% 100%, 96% calc(100% - 4px), 94% 100%, 92% calc(100% - 6px), 90% 100%, 88% calc(100% - 3px), 86% 100%, 84% calc(100% - 5px), 82% 100%, 80% calc(100% - 4px), 78% 100%, 76% calc(100% - 6px), 74% 100%, 72% calc(100% - 3px), 70% 100%, 68% calc(100% - 5px), 66% 100%, 64% calc(100% - 4px), 62% 100%, 60% calc(100% - 6px), 58% 100%, 56% calc(100% - 3px), 54% 100%, 52% calc(100% - 5px), 50% 100%, 48% calc(100% - 4px), 46% 100%, 44% calc(100% - 6px), 42% 100%, 40% calc(100% - 3px), 38% 100%, 36% calc(100% - 5px), 34% 100%, 32% calc(100% - 4px), 30% 100%, 28% calc(100% - 6px), 26% 100%, 24% calc(100% - 3px), 22% 100%, 20% calc(100% - 5px), 18% 100%, 16% calc(100% - 4px), 14% 100%, 12% calc(100% - 6px), 10% 100%, 8% calc(100% - 3px), 6% 100%, 4% calc(100% - 5px), 2% 100%, 0 calc(100% - 8px))',
      },
      title: {
        ...baseStyles.title,
        fontFamily: SERIF_FONT,
        textAlign: 'center',
        fontSize: '24px',
        fontWeight: 700,
        color: '#4E342E',
        marginBottom: '24px',
        lineHeight: 1.6,
      },
      body: {
        ...baseStyles.body,
        fontFamily: SERIF_FONT,
        color: '#5D4037',
        fontSize: '15px',
        lineHeight: 2,
        textIndent: '2em',
      },
      heading: {
        ...baseStyles.heading,
        fontFamily: SERIF_FONT,
        fontSize: '16px',
        fontWeight: 700,
        color: '#4E342E',
        marginTop: '28px',
        marginBottom: '16px',
      },
      list: { ...baseStyles.list },
      listItem: { ...baseStyles.listItem, color: '#5D4037' },
      blockquote: {
        ...baseStyles.blockquote,
        fontFamily: SERIF_FONT,
        backgroundColor: 'rgba(255,255,255,0.5)',
        borderLeft: '3px solid #8D6E63',
        color: '#4E342E',
      },
      code: { ...baseStyles.code, fontFamily: MONO_FONT, backgroundColor: 'rgba(0,0,0,0.05)' },
      link: { ...baseStyles.link, color: '#5D4037' },
      strong: { ...baseStyles.strong, color: '#3E2723' },
      divider: { ...baseStyles.divider, borderTop: '2px dashed #D7CCC8', backgroundColor: 'transparent', height: '0' },
    },
  },

  // ============================================
  // 8. 一页信笺 (Letterhead)
  // 截图特征: 浅粉渐变顶部，大Hero图，模拟App导航栏，紫色宋体标题
  // ============================================
  {
    id: 'letterhead',
    name: '一页信笺',
    category: 'retro',
    description: '商务信笺与顶部导航栏模拟',
    colorVariants: [
      { id: 'pink', name: '粉紫', primary: '#6A1B9A', secondary: '#7B1FA2', background: 'linear-gradient(180deg, #FCE4EC 0%, #F3E5F5 30%, #FAFAFA 100%)', accent: '#9C27B0' },
    ],
    styles: {
      container: {
        padding: '32px 24px',
      },
      title: {
        ...baseStyles.title,
        fontFamily: SERIF_FONT,
        textAlign: 'left',
        fontSize: '26px',
        fontWeight: 700,
        color: '#6A1B9A',
        marginBottom: '24px',
        lineHeight: 1.5,
        letterSpacing: '0.05em',
      },
      body: {
        ...baseStyles.body,
        fontFamily: SERIF_FONT,
        color: '#333',
        fontSize: '15px',
        lineHeight: 2,
      },
      heading: {
        ...baseStyles.heading,
        fontFamily: SERIF_FONT,
        color: '#6A1B9A',
        fontSize: '18px',
        fontWeight: 700,
        marginTop: '32px',
        marginBottom: '16px',
        borderBottom: '2px solid #6A1B9A',
        paddingBottom: '8px',
        display: 'inline-block',
      },
      list: { ...baseStyles.list },
      listItem: { ...baseStyles.listItem },
      blockquote: {
        ...baseStyles.blockquote,
        fontFamily: SERIF_FONT,
        borderLeft: '4px solid #9C27B0',
        backgroundColor: '#FCE4EC',
        color: '#4A148C',
      },
      code: { ...baseStyles.code, backgroundColor: '#F3E5F5', color: '#6A1B9A' },
      link: { ...baseStyles.link, color: '#6A1B9A' },
      strong: { ...baseStyles.strong, color: '#4A148C' },
      divider: { ...baseStyles.divider, backgroundColor: '#E1BEE7' },
    },
  },

  // ============================================
  // 9. 流光像素 (Pixel Stream)
  // 截图特征: 浅蓝菱形格纹背景，黑色文字，无衬线字体
  // ============================================
  {
    id: 'pixel-stream',
    name: '流光像素',
    category: 'tech',
    description: '英伦菱格与像素风',
    colorVariants: [
      { id: 'blue', name: '蓝格', primary: '#000', secondary: '#333', background: '#E3F2FD', accent: '#2196F3' },
      { id: 'purple', name: '紫格', primary: '#000', secondary: '#333', background: '#F3E5F5', accent: '#9C27B0' },
    ],
    styles: {
      container: {
        // 菱形格纹背景
        backgroundColor: '#E8F4FD',
        backgroundImage: `
          linear-gradient(45deg, #D6EAF8 25%, transparent 25%),
          linear-gradient(-45deg, #D6EAF8 25%, transparent 25%),
          linear-gradient(45deg, transparent 75%, #D6EAF8 75%),
          linear-gradient(-45deg, transparent 75%, #D6EAF8 75%)
        `,
        backgroundSize: '20px 20px',
        backgroundPosition: '0 0, 0 10px, 10px -10px, -10px 0px',
        padding: '36px 28px',
      },
      title: {
        ...baseStyles.title,
        fontFamily: SANS_FONT,
        textAlign: 'left',
        fontSize: '26px',
        fontWeight: 800,
        color: '#000',
        marginBottom: '28px',
        lineHeight: 1.5,
      },
      body: {
        ...baseStyles.body,
        fontFamily: SANS_FONT,
        color: '#000',
        fontSize: '15px',
        lineHeight: 1.9,
      },
      heading: {
        ...baseStyles.heading,
        fontFamily: SANS_FONT,
        fontSize: '17px',
        fontWeight: 700,
        color: '#000',
        marginTop: '32px',
        marginBottom: '16px',
      },
      list: { ...baseStyles.list },
      listItem: { ...baseStyles.listItem },
      blockquote: {
        ...baseStyles.blockquote,
        backgroundColor: '#fff',
        border: '2px solid #000',
        borderRadius: '0',
        color: '#000',
        boxShadow: '4px 4px 0 rgba(0,0,0,0.1)',
      },
      code: { ...baseStyles.code, border: '1px solid #000', backgroundColor: '#fff' },
      link: { ...baseStyles.link, color: '#000', borderBottom: '2px solid #000' },
      strong: { ...baseStyles.strong },
      divider: { ...baseStyles.divider, backgroundColor: '#000' },
    },
  },

  // ============================================
  // 10. 酷炫卡片 (Cool Card)
  // 截图特征: 粉紫渐变背景，白色圆角卡片容器，强调文字带颜色
  // ============================================
  {
    id: 'cool-card',
    name: '酷炫卡片',
    category: 'modern',
    description: '潮流渐变背景与悬浮白卡',
    colorVariants: [
      { id: 'neon', name: '霓虹', primary: '#000', secondary: '#333', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)', accent: '#E040FB' },
    ],
    styles: {
      container: {
        // 白色圆角卡片
        backgroundColor: '#fff',
        borderRadius: '20px',
        padding: '36px 28px',
        boxShadow: '0 20px 60px rgba(0,0,0,0.15)',
        margin: '20px',
      },
      title: {
        ...baseStyles.title,
        fontFamily: SANS_FONT,
        textAlign: 'left',
        fontSize: '24px',
        fontWeight: 800,
        color: '#000',
        marginBottom: '24px',
        lineHeight: 1.5,
      },
      body: {
        ...baseStyles.body,
        fontFamily: SANS_FONT,
        color: '#333',
        fontSize: '15px',
        lineHeight: 1.9,
      },
      heading: {
        ...baseStyles.heading,
        fontFamily: SANS_FONT,
        fontSize: '17px',
        fontWeight: 700,
        color: '#000',
        marginTop: '28px',
        marginBottom: '16px',
      },
      list: { ...baseStyles.list },
      listItem: { ...baseStyles.listItem },
      blockquote: {
        ...baseStyles.blockquote,
        backgroundColor: '#F8F4FF',
        borderLeft: '4px solid #E040FB',
        color: '#333',
      },
      code: { ...baseStyles.code, backgroundColor: '#F3E5F5', color: '#9C27B0' },
      link: { ...baseStyles.link, color: '#7C4DFF' },
      strong: {
        ...baseStyles.strong,
        color: '#E040FB',
        // 强调文字带渐变色效果
        backgroundImage: 'linear-gradient(90deg, #7C4DFF, #E040FB)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
      },
      divider: { ...baseStyles.divider, backgroundColor: '#E1BEE7' },
    },
  },

  // ============================================
  // 11. 现代纹理 (Modern Texture)
  // 截图特征: 深色/黑色背景+纹理，黄色高亮标题，白色正文
  // ============================================
  {
    id: 'modern-texture',
    name: '现代纹理',
    category: 'minimal',
    description: '暗黑质感与酸性高亮',
    colorVariants: [
      { id: 'dark', name: '暗夜', primary: '#fff', secondary: '#ccc', background: '#1A1A1A', accent: '#FFD600' },
    ],
    styles: {
      container: {
        backgroundColor: '#1A1A1A',
        // 细线纹理
        backgroundImage: `
          repeating-linear-gradient(
            0deg,
            transparent,
            transparent 2px,
            rgba(255,255,255,0.03) 2px,
            rgba(255,255,255,0.03) 4px
          )
        `,
        padding: '36px 28px',
      },
      title: {
        ...baseStyles.title,
        fontFamily: SANS_FONT,
        textAlign: 'left',
        fontSize: '26px',
        fontWeight: 800,
        color: '#FFD600',
        marginBottom: '28px',
        lineHeight: 1.5,
      },
      body: {
        ...baseStyles.body,
        fontFamily: SANS_FONT,
        color: '#fff',
        fontSize: '15px',
        lineHeight: 1.9,
      },
      heading: {
        ...baseStyles.heading,
        fontFamily: SANS_FONT,
        fontSize: '17px',
        fontWeight: 700,
        color: '#FFD600',
        marginTop: '32px',
        marginBottom: '16px',
        // 黄色竖线前缀
        paddingLeft: '16px',
        borderLeft: '4px solid #FFD600',
      },
      list: { ...baseStyles.list },
      listItem: { ...baseStyles.listItem, color: '#fff' },
      blockquote: {
        ...baseStyles.blockquote,
        backgroundColor: 'rgba(255,255,255,0.05)',
        borderLeft: '3px solid #FFD600',
        color: '#fff',
      },
      code: { ...baseStyles.code, backgroundColor: 'rgba(255,214,0,0.1)', color: '#FFD600', border: '1px solid rgba(255,214,0,0.3)' },
      link: { ...baseStyles.link, color: '#FFD600' },
      strong: { ...baseStyles.strong, color: '#FFD600' },
      divider: { ...baseStyles.divider, backgroundColor: 'rgba(255,214,0,0.3)' },
    },
  },

  // ============================================
  // 12. 复古通用 (Retro Universal)
  // 截图特征: 米黄帆布背景，顶部书架Hero图，黑色粗竖线引用，宋体
  // ============================================
  {
    id: 'retro-universal',
    name: '复古通用',
    category: 'retro',
    description: '经典帆布纹理，人文阅读感',
    colorVariants: [
      { id: 'canvas', name: '帆布', primary: '#2C2C2C', secondary: '#444', background: '#F5F0E6', accent: '#5D4037' },
    ],
    styles: {
      container: {
        backgroundColor: '#F5F0E6',
        backgroundImage: NOISE_BG,
        padding: '36px 28px',
      },
      title: {
        ...baseStyles.title,
        fontFamily: SERIF_FONT,
        textAlign: 'center',
        fontSize: '24px',
        fontWeight: 700,
        color: '#2C2C2C',
        marginBottom: '28px',
        lineHeight: 1.6,
      },
      body: {
        ...baseStyles.body,
        fontFamily: SERIF_FONT,
        color: '#2C2C2C',
        fontSize: '15px',
        lineHeight: 2,
      },
      heading: {
        ...baseStyles.heading,
        fontFamily: SERIF_FONT,
        fontSize: '17px',
        fontWeight: 700,
        color: '#2C2C2C',
        marginTop: '32px',
        marginBottom: '16px',
      },
      list: { ...baseStyles.list },
      listItem: { ...baseStyles.listItem },
      blockquote: {
        ...baseStyles.blockquote,
        fontFamily: SERIF_FONT,
        // 粗黑色竖线
        borderLeft: '6px solid #2C2C2C',
        backgroundColor: 'rgba(0,0,0,0.03)',
        color: '#2C2C2C',
        borderRadius: '0',
      },
      code: { ...baseStyles.code, backgroundColor: 'rgba(0,0,0,0.05)', color: '#5D4037' },
      link: { ...baseStyles.link, color: '#5D4037' },
      strong: { ...baseStyles.strong, color: '#000' },
      divider: { ...baseStyles.divider, backgroundColor: '#D7CCC8' },
    },
  },

  // ============================================
  // 13. 人文叙事 (Humanistic Narrative)
  // 截图特征: 暖白背景，顶部UPlog圆形Logo，深棕色H2竖线前缀，浅棕色引用背景
  // ============================================
  {
    id: 'humanistic',
    name: '人文叙事',
    category: 'modern',
    description: '知性博客风，舒适阅读体验',
    colorVariants: [
      { id: 'warm', name: '温润', primary: '#2C2C2C', secondary: '#555', background: '#FAFAF8', accent: '#8B4513' },
    ],
    styles: {
      container: {
        backgroundColor: '#FAFAF8',
        padding: '40px 28px',
      },
      title: {
        ...baseStyles.title,
        fontFamily: SERIF_FONT,
        textAlign: 'left',
        fontSize: '26px',
        fontWeight: 800,
        color: '#8B4513',
        marginBottom: '28px',
        lineHeight: 1.5,
      },
      body: {
        ...baseStyles.body,
        fontFamily: SANS_FONT,
        color: '#333',
        fontSize: '15px',
        lineHeight: 2,
      },
      heading: {
        ...baseStyles.heading,
        fontFamily: SERIF_FONT,
        fontSize: '18px',
        fontWeight: 700,
        color: '#8B4513',
        marginTop: '36px',
        marginBottom: '18px',
        // 深棕色粗竖线
        paddingLeft: '18px',
        borderLeft: '5px solid #8B4513',
      },
      list: { ...baseStyles.list },
      listItem: { ...baseStyles.listItem },
      blockquote: {
        ...baseStyles.blockquote,
        fontFamily: SANS_FONT,
        // 浅棕色背景
        backgroundColor: '#F5F0E6',
        borderLeft: '4px solid #8B4513',
        color: '#5D4037',
        borderRadius: '4px',
      },
      code: { ...baseStyles.code, backgroundColor: '#F0EBE0', color: '#5D4037' },
      link: { ...baseStyles.link, color: '#8B4513' },
      strong: { ...baseStyles.strong, color: '#5D4037' },
      divider: { ...baseStyles.divider, backgroundColor: '#D7CCC8' },
    },
  },

  // ============================================
  // 14. 科技先锋 (Tech Pioneer)
  // 截图特征: 红色背景，白色标题，顶部红色横条，下方Hero图
  // ============================================
  {
    id: 'tech-pioneer',
    name: '科技先锋',
    category: 'tech',
    description: '活力红与科技感',
    colorVariants: [
      { id: 'red', name: '活力红', primary: '#fff', secondary: '#FFE0E0', background: '#E53935', accent: '#fff' },
    ],
    styles: {
      container: {
        backgroundColor: '#E53935',
        padding: '36px 28px',
        // 顶部红色横条装饰
        borderTop: '6px solid #B71C1C',
      },
      title: {
        ...baseStyles.title,
        fontFamily: SANS_FONT,
        textAlign: 'left',
        fontSize: '28px',
        fontWeight: 900,
        color: '#fff',
        marginBottom: '28px',
        lineHeight: 1.4,
      },
      body: {
        ...baseStyles.body,
        fontFamily: SANS_FONT,
        color: '#fff',
        fontSize: '15px',
        lineHeight: 1.9,
      },
      heading: {
        ...baseStyles.heading,
        fontFamily: SANS_FONT,
        fontSize: '18px',
        fontWeight: 700,
        color: '#fff',
        marginTop: '32px',
        marginBottom: '16px',
      },
      list: { ...baseStyles.list },
      listItem: { ...baseStyles.listItem, color: '#fff' },
      blockquote: {
        ...baseStyles.blockquote,
        backgroundColor: 'rgba(255,255,255,0.15)',
        borderLeft: '4px solid #fff',
        color: '#fff',
      },
      code: { ...baseStyles.code, backgroundColor: 'rgba(255,255,255,0.2)', color: '#fff' },
      link: { ...baseStyles.link, color: '#fff', borderBottomColor: '#fff' },
      strong: { ...baseStyles.strong, color: '#fff', textDecoration: 'underline' },
      divider: { ...baseStyles.divider, backgroundColor: 'rgba(255,255,255,0.4)' },
    },
  },

  // ============================================
  // 15. 跃动黑底 (Dynamic Black)
  // 截图特征: 纯黑背景，黄色标题，顶部油画Hero图，黄色短横线装饰
  // ============================================
  {
    id: 'dynamic-black',
    name: '跃动黑底',
    category: 'tech',
    description: '极客黑与酸性黄',
    colorVariants: [
      { id: 'acid', name: '酸性黄', primary: '#fff', secondary: '#ccc', background: '#000', accent: '#FFD600' },
    ],
    styles: {
      container: {
        backgroundColor: '#000',
        padding: '36px 28px',
      },
      title: {
        ...baseStyles.title,
        fontFamily: SANS_FONT,
        textAlign: 'left',
        fontSize: '26px',
        fontWeight: 800,
        color: '#FFD600',
        marginBottom: '28px',
        lineHeight: 1.5,
      },
      body: {
        ...baseStyles.body,
        fontFamily: SANS_FONT,
        color: '#fff',
        fontSize: '15px',
        lineHeight: 1.9,
      },
      heading: {
        ...baseStyles.heading,
        fontFamily: SANS_FONT,
        fontSize: '17px',
        fontWeight: 700,
        color: '#fff',
        marginTop: '32px',
        marginBottom: '16px',
        // 黄色短横线装饰
        paddingTop: '16px',
        borderTop: '3px solid #FFD600',
        display: 'inline-block',
        minWidth: '60px',
      },
      list: { ...baseStyles.list },
      listItem: { ...baseStyles.listItem, color: '#fff' },
      blockquote: {
        ...baseStyles.blockquote,
        backgroundColor: 'rgba(255,255,255,0.05)',
        borderLeft: '3px solid #FFD600',
        color: '#fff',
      },
      code: { ...baseStyles.code, backgroundColor: 'rgba(255,214,0,0.15)', color: '#FFD600' },
      link: { ...baseStyles.link, color: '#FFD600' },
      strong: { ...baseStyles.strong, color: '#FFD600' },
      divider: { ...baseStyles.divider, backgroundColor: '#FFD600', height: '2px' },
    },
  },

  // ============================================
  // 16. 科技简约 (Tech Minimal)
  // 截图特征: 白底，科技蓝标题，顶部Hero图+黑色条，蓝色直角括号引用装饰
  // ============================================
  {
    id: 'tech-minimal',
    name: '科技简约',
    category: 'tech',
    description: '大厂技术风，蓝黑配色',
    colorVariants: [
      { id: 'tech-blue', name: '科技蓝', primary: '#1A1A1A', secondary: '#555', background: '#fff', accent: '#2196F3' },
    ],
    styles: {
      container: {
        backgroundColor: '#fff',
        padding: '36px 28px',
      },
      title: {
        ...baseStyles.title,
        fontFamily: SANS_FONT,
        textAlign: 'left',
        fontSize: '26px',
        fontWeight: 800,
        color: '#2196F3',
        marginBottom: '28px',
        lineHeight: 1.5,
      },
      body: {
        ...baseStyles.body,
        fontFamily: SANS_FONT,
        color: '#333',
        fontSize: '15px',
        lineHeight: 1.9,
      },
      heading: {
        ...baseStyles.heading,
        fontFamily: SANS_FONT,
        fontSize: '18px',
        fontWeight: 700,
        color: '#1A1A1A',
        marginTop: '32px',
        marginBottom: '16px',
        // 蓝色方块前缀
        paddingLeft: '18px',
        borderLeft: '5px solid #2196F3',
      },
      list: { ...baseStyles.list },
      listItem: { ...baseStyles.listItem },
      blockquote: {
        ...baseStyles.blockquote,
        // 蓝色直角括号装饰
        backgroundColor: '#F5F9FF',
        borderLeft: 'none',
        borderRadius: '0',
        position: 'relative' as const,
        padding: '24px 28px',
        color: '#333',
        // 使用伪元素模拟直角括号（通过边框）
        borderTop: '3px solid #2196F3',
        borderBottom: '3px solid #2196F3',
      },
      code: { ...baseStyles.code, backgroundColor: '#E3F2FD', color: '#1565C0' },
      link: { ...baseStyles.link, color: '#2196F3' },
      strong: { ...baseStyles.strong, color: '#1565C0' },
      divider: { ...baseStyles.divider, backgroundColor: '#E3F2FD' },
    },
  },
];

export const DEFAULT_XHS_TEMPLATE = XHS_TEMPLATES[0];

export const getXHSTemplateById = (id: string): XHSTemplate | undefined => {
  return XHS_TEMPLATES.find(t => t.id === id);
};

export const getXHSTemplatesByCategory = (category: string): XHSTemplate[] => {
  return XHS_TEMPLATES.filter(t => t.category === category);
};
