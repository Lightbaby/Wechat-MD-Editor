import { XHSTemplate } from '../types';

// 通用字体栈
const FONT_FAMILY = '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", sans-serif';
const SERIF_FONT = '"Noto Serif SC", "Source Han Serif SC", "Songti SC", STSong, serif';

// 基础样式
const baseStyles = {
  title: {
    fontFamily: FONT_FAMILY,
    fontWeight: 700,
    marginBottom: '16px',
    lineHeight: 1.4,
  },
  body: {
    fontFamily: FONT_FAMILY,
    lineHeight: 1.8,
    letterSpacing: '0.5px',
  },
  heading: {
    fontFamily: FONT_FAMILY,
    fontWeight: 600,
    marginTop: '24px',
    marginBottom: '12px',
  },
  list: {
    paddingLeft: '20px',
    marginBottom: '16px',
  },
  listItem: {
    marginBottom: '8px',
  },
  blockquote: {
    borderLeftWidth: '3px',
    borderLeftStyle: 'solid' as const,
    paddingLeft: '16px',
    marginLeft: 0,
    marginRight: 0,
    fontStyle: 'italic' as const,
  },
  code: {
    fontFamily: '"Fira Code", "SF Mono", Menlo, Monaco, monospace',
    fontSize: '0.9em',
    padding: '2px 6px',
    borderRadius: '4px',
  },
  link: {
    textDecoration: 'underline',
  },
  strong: {
    fontWeight: 600,
  },
  divider: {
    height: '1px',
    margin: '24px 0',
  },
};

export const XHS_TEMPLATES: XHSTemplate[] = [
  // ============================================
  // 1. 简单格子 - Simple Grid
  // ============================================
  {
    id: 'simple-grid',
    name: '简单格子',
    category: 'minimal',
    description: '极简主义设计，使用微妙的网格背景营造干净整洁的视觉效果',
    colorVariants: [
      { id: 'white', name: '纯白', primary: '#333333', secondary: '#666666', background: '#FFFFFF' },
      { id: 'cream', name: '米白', primary: '#4A4A4A', secondary: '#7A7A7A', background: '#FDF8F3' },
      { id: 'grey', name: '浅灰', primary: '#333333', secondary: '#666666', background: '#F8F8F8' },
    ],
    styles: {
      container: {
        backgroundImage: 'linear-gradient(#E5E5E5 1px, transparent 1px), linear-gradient(90deg, #E5E5E5 1px, transparent 1px)',
        backgroundSize: '20px 20px',
      },
      title: { ...baseStyles.title },
      body: { ...baseStyles.body },
      heading: { ...baseStyles.heading },
      list: { ...baseStyles.list },
      listItem: { ...baseStyles.listItem },
      blockquote: { ...baseStyles.blockquote, borderLeftColor: '#E5E5E5' },
      code: { ...baseStyles.code, backgroundColor: '#F5F5F5' },
      link: { ...baseStyles.link },
      strong: { ...baseStyles.strong },
      divider: { ...baseStyles.divider, backgroundColor: '#E5E5E5' },
    },
  },

  // ============================================
  // 2. 彩页随笔 - Color Page Notes
  // ============================================
  {
    id: 'color-page',
    name: '彩页随笔',
    category: 'handcraft',
    description: '模拟笔记本/日志风格，带有横线和彩色标题元素',
    colorVariants: [
      { id: 'pink', name: '樱花粉', primary: '#5C4033', secondary: '#8B7355', background: '#FFF5F5', accent: '#FF6B6B' },
      { id: 'mint', name: '薄荷绿', primary: '#2D5A4A', secondary: '#5D8A7A', background: '#F0FFF4', accent: '#38A169' },
      { id: 'lavender', name: '薰衣草', primary: '#4A3A5C', secondary: '#7A6A8C', background: '#F5F0FF', accent: '#805AD5' },
    ],
    styles: {
      container: {
        backgroundImage: 'repeating-linear-gradient(transparent, transparent 27px, #E8E8E8 28px)',
        backgroundSize: '100% 28px',
      },
      title: { ...baseStyles.title, borderBottom: '3px solid', paddingBottom: '8px' },
      body: { ...baseStyles.body },
      heading: { ...baseStyles.heading, backgroundColor: 'rgba(0,0,0,0.05)', padding: '8px 12px', borderRadius: '4px' },
      list: { ...baseStyles.list },
      listItem: { ...baseStyles.listItem },
      blockquote: { ...baseStyles.blockquote },
      code: { ...baseStyles.code, backgroundColor: 'rgba(0,0,0,0.05)' },
      link: { ...baseStyles.link },
      strong: { ...baseStyles.strong },
      divider: { ...baseStyles.divider, backgroundColor: '#E8E8E8' },
    },
  },

  // ============================================
  // 3. 纸纹背景 - Paper Texture
  // ============================================
  {
    id: 'paper-texture',
    name: '纸纹背景',
    category: 'nature',
    description: '使用真实纸张纹理作为背景，营造质朴、自然的阅读体验',
    colorVariants: [
      { id: 'kraft', name: '牛皮纸', primary: '#5C4033', secondary: '#8B7355', background: '#E8DCC8' },
      { id: 'rice', name: '宣纸白', primary: '#4A4A4A', secondary: '#7A7A7A', background: '#F5F2EB' },
      { id: 'aged', name: '复古黄', primary: '#5C4033', secondary: '#8B6914', background: '#F0E6D2' },
    ],
    styles: {
      container: {
        backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.65\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\' opacity=\'0.08\'/%3E%3C/svg%3E")',
      },
      title: { ...baseStyles.title, fontFamily: SERIF_FONT },
      body: { ...baseStyles.body, fontFamily: SERIF_FONT },
      heading: { ...baseStyles.heading, fontFamily: SERIF_FONT },
      list: { ...baseStyles.list },
      listItem: { ...baseStyles.listItem },
      blockquote: { ...baseStyles.blockquote, borderLeftColor: '#C4B89B' },
      code: { ...baseStyles.code, backgroundColor: 'rgba(0,0,0,0.05)' },
      link: { ...baseStyles.link },
      strong: { ...baseStyles.strong },
      divider: { ...baseStyles.divider, backgroundColor: '#C4B89B' },
    },
  },

  // ============================================
  // 4. 备忘录 - Memo
  // ============================================
  {
    id: 'memo',
    name: '备忘录',
    category: 'tool',
    description: '模仿手机备忘录/便签应用的界面外观，营造熟悉的数字记录感',
    colorVariants: [
      { id: 'yellow', name: '经典黄', primary: '#333333', secondary: '#666666', background: '#FFF9C4' },
      { id: 'white', name: '纯白', primary: '#333333', secondary: '#666666', background: '#FFFFFF' },
      { id: 'blue', name: '天蓝', primary: '#1A365D', secondary: '#2C5282', background: '#EBF8FF' },
    ],
    styles: {
      container: {
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        borderRadius: '8px',
      },
      title: { ...baseStyles.title, fontSize: '20px', borderBottom: '1px dashed #DDD', paddingBottom: '12px' },
      body: { ...baseStyles.body, fontSize: '14px' },
      heading: { ...baseStyles.heading, fontSize: '16px' },
      list: { ...baseStyles.list },
      listItem: { ...baseStyles.listItem, position: 'relative' as const },
      blockquote: { ...baseStyles.blockquote, backgroundColor: 'rgba(0,0,0,0.03)', padding: '12px 16px', borderRadius: '4px' },
      code: { ...baseStyles.code, backgroundColor: 'rgba(0,0,0,0.05)' },
      link: { ...baseStyles.link },
      strong: { ...baseStyles.strong },
      divider: { ...baseStyles.divider, borderTop: '1px dashed #DDD', backgroundColor: 'transparent' },
    },
  },

  // ============================================
  // 5. 神奇物语 - Magic Story
  // ============================================
  {
    id: 'magic-story',
    name: '神奇物语',
    category: 'fantasy',
    description: '梦幻艺术风格，运用柔和渐变和神秘元素打造奇幻阅读体验',
    colorVariants: [
      { id: 'purple', name: '梦幻紫', primary: '#4A3A5C', secondary: '#6B5B7D', background: 'linear-gradient(135deg, #E8D5F2 0%, #D5C5E8 100%)' },
      { id: 'blue', name: '星空蓝', primary: '#1A365D', secondary: '#2A4A7D', background: 'linear-gradient(135deg, #C5D5F2 0%, #A5C5E8 100%)' },
      { id: 'pink', name: '樱花粉', primary: '#5C3A4A', secondary: '#7D5B6B', background: 'linear-gradient(135deg, #F2D5E5 0%, #E8C5D5 100%)' },
    ],
    styles: {
      container: {},
      title: { ...baseStyles.title, textShadow: '0 1px 2px rgba(0,0,0,0.1)' },
      body: { ...baseStyles.body },
      heading: { ...baseStyles.heading },
      list: { ...baseStyles.list },
      listItem: { ...baseStyles.listItem },
      blockquote: { ...baseStyles.blockquote, background: 'rgba(255,255,255,0.5)', padding: '16px', borderRadius: '8px' },
      code: { ...baseStyles.code, backgroundColor: 'rgba(255,255,255,0.6)' },
      link: { ...baseStyles.link },
      strong: { ...baseStyles.strong },
      divider: { ...baseStyles.divider, background: 'linear-gradient(90deg, transparent, rgba(0,0,0,0.1), transparent)' },
    },
  },

  // ============================================
  // 6. 中国色 - China Color
  // ============================================
  {
    id: 'china-color',
    name: '中国色',
    category: 'chinese',
    description: '采用传统中国美学调色板，展现东方韵味与文化底蕴',
    colorVariants: [
      { id: 'ink-green', name: '墨绿', primary: '#2F4F4F', secondary: '#4A6A6A', background: '#E8F0E8', accent: '#2F4F4F' },
      { id: 'crimson', name: '绛红', primary: '#8B0000', secondary: '#A52A2A', background: '#FFF0F0', accent: '#8B0000' },
      { id: 'ochre', name: '赭石', primary: '#8B4513', secondary: '#A0522D', background: '#FFF5EB', accent: '#8B4513' },
      { id: 'gold', name: '金色', primary: '#8B6914', secondary: '#A08030', background: '#FFFEF0', accent: '#DAA520' },
      { id: 'forest', name: '松绿', primary: '#228B22', secondary: '#2E8B57', background: '#F0FFF0', accent: '#228B22' },
    ],
    styles: {
      container: {},
      title: { ...baseStyles.title, fontFamily: SERIF_FONT, letterSpacing: '2px' },
      body: { ...baseStyles.body, fontFamily: SERIF_FONT },
      heading: { ...baseStyles.heading, fontFamily: SERIF_FONT, borderLeft: '4px solid', paddingLeft: '12px' },
      list: { ...baseStyles.list },
      listItem: { ...baseStyles.listItem },
      blockquote: { ...baseStyles.blockquote, fontFamily: SERIF_FONT },
      code: { ...baseStyles.code, backgroundColor: 'rgba(0,0,0,0.05)' },
      link: { ...baseStyles.link },
      strong: { ...baseStyles.strong },
      divider: { ...baseStyles.divider },
    },
  },

  // ============================================
  // 7. 撕拉便签 - Torn Note
  // ============================================
  {
    id: 'torn-note',
    name: '撕拉便签',
    category: 'handcraft',
    description: '独特的"撕边纸"效果，营造手工拼贴的亲切感',
    colorVariants: [
      { id: 'grey', name: '浅灰', primary: '#333333', secondary: '#666666', background: '#F5F5F5' },
      { id: 'cream', name: '米色', primary: '#5C4033', secondary: '#8B7355', background: '#FDF8F3' },
      { id: 'brown', name: '咖啡棕', primary: '#3E2723', secondary: '#5D4037', background: '#EFEBE9' },
    ],
    styles: {
      container: {
        boxShadow: '2px 2px 8px rgba(0,0,0,0.1)',
        transform: 'rotate(-0.5deg)',
      },
      title: { ...baseStyles.title },
      body: { ...baseStyles.body },
      heading: { ...baseStyles.heading, textDecoration: 'underline', textUnderlineOffset: '4px' },
      list: { ...baseStyles.list },
      listItem: { ...baseStyles.listItem },
      blockquote: { ...baseStyles.blockquote, backgroundColor: 'rgba(0,0,0,0.03)', padding: '12px' },
      code: { ...baseStyles.code, backgroundColor: 'rgba(0,0,0,0.05)' },
      link: { ...baseStyles.link },
      strong: { ...baseStyles.strong },
      divider: { ...baseStyles.divider, height: '2px', background: 'repeating-linear-gradient(90deg, #CCC, #CCC 4px, transparent 4px, transparent 8px)' },
    },
  },

  // ============================================
  // 8. 一页信笺 - Letterhead
  // ============================================
  {
    id: 'letterhead',
    name: '一页信笺',
    category: 'retro',
    description: '优雅专业的信纸风格，融合复古与现代的商务审美',
    colorVariants: [
      { id: 'purple', name: '深紫', primary: '#4A3A5C', secondary: '#6B5B7D', background: '#FAF8FC', accent: '#6B46C1' },
      { id: 'gold', name: '金棕', primary: '#5C4033', secondary: '#8B7355', background: '#FFFEF5', accent: '#D69E2E' },
      { id: 'blue', name: '经典蓝', primary: '#1A365D', secondary: '#2C5282', background: '#F7FAFC', accent: '#3182CE' },
    ],
    styles: {
      container: {
        border: '1px solid #E2E8F0',
        boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
      },
      title: { ...baseStyles.title, fontFamily: SERIF_FONT, textAlign: 'center' as const, paddingBottom: '16px', borderBottom: '2px solid' },
      body: { ...baseStyles.body, fontFamily: SERIF_FONT },
      heading: { ...baseStyles.heading, fontFamily: SERIF_FONT },
      list: { ...baseStyles.list },
      listItem: { ...baseStyles.listItem },
      blockquote: { ...baseStyles.blockquote, fontFamily: SERIF_FONT, fontStyle: 'italic' as const },
      code: { ...baseStyles.code, backgroundColor: 'rgba(0,0,0,0.03)' },
      link: { ...baseStyles.link },
      strong: { ...baseStyles.strong },
      divider: { ...baseStyles.divider, background: 'linear-gradient(90deg, transparent, currentColor, transparent)', height: '1px' },
    },
  },

  // ============================================
  // 9. 流光像素 - Pixel Stream
  // ============================================
  {
    id: 'pixel-stream',
    name: '流光像素',
    category: 'tech',
    description: '赛博朋克/数码艺术风格，融合像素美学与流光效果',
    colorVariants: [
      { id: 'cyan', name: '天蓝', primary: '#0EA5E9', secondary: '#38BDF8', background: '#0F172A', accent: '#06B6D4' },
      { id: 'grey', name: '浅灰', primary: '#E2E8F0', secondary: '#CBD5E1', background: '#1E293B', accent: '#94A3B8' },
      { id: 'grid', name: '网格', primary: '#22D3EE', secondary: '#67E8F9', background: '#0C1222', accent: '#06B6D4' },
    ],
    styles: {
      container: {
        backgroundImage: 'linear-gradient(rgba(6,182,212,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(6,182,212,0.03) 1px, transparent 1px)',
        backgroundSize: '16px 16px',
      },
      title: { ...baseStyles.title, fontFamily: '"Fira Code", monospace', textTransform: 'uppercase' as const, letterSpacing: '2px' },
      body: { ...baseStyles.body },
      heading: { ...baseStyles.heading, fontFamily: '"Fira Code", monospace' },
      list: { ...baseStyles.list },
      listItem: { ...baseStyles.listItem },
      blockquote: { ...baseStyles.blockquote, borderLeftColor: '#06B6D4', backgroundColor: 'rgba(6,182,212,0.1)', padding: '12px 16px' },
      code: { ...baseStyles.code, backgroundColor: 'rgba(6,182,212,0.2)', color: '#22D3EE' },
      link: { ...baseStyles.link, color: '#22D3EE' },
      strong: { ...baseStyles.strong },
      divider: { ...baseStyles.divider, background: 'linear-gradient(90deg, #06B6D4, transparent)' },
    },
  },

  // ============================================
  // 10. 酷炫卡片 - Cool Card
  // ============================================
  {
    id: 'cool-card',
    name: '酷炫卡片',
    category: 'modern',
    description: '现代大胆的卡片式UI设计，干净利落的视觉层次',
    colorVariants: [
      { id: 'pink', name: '柔粉', primary: '#4A3A5C', secondary: '#6B5B7D', background: '#FFF0F5', accent: '#EC4899' },
      { id: 'white', name: '纯白', primary: '#333333', secondary: '#666666', background: '#FFFFFF', accent: '#3B82F6' },
      { id: 'cyan', name: '活力青', primary: '#134E4A', secondary: '#0F766E', background: '#F0FDFA', accent: '#14B8A6' },
    ],
    styles: {
      container: {
        borderRadius: '16px',
        boxShadow: '0 8px 32px rgba(0,0,0,0.08)',
      },
      title: { ...baseStyles.title },
      body: { ...baseStyles.body },
      heading: { ...baseStyles.heading, backgroundColor: 'rgba(0,0,0,0.03)', padding: '8px 16px', borderRadius: '8px', display: 'inline-block' },
      list: { ...baseStyles.list },
      listItem: { ...baseStyles.listItem },
      blockquote: { ...baseStyles.blockquote, borderRadius: '8px', backgroundColor: 'rgba(0,0,0,0.02)', padding: '16px' },
      code: { ...baseStyles.code, borderRadius: '6px' },
      link: { ...baseStyles.link },
      strong: { ...baseStyles.strong },
      divider: { ...baseStyles.divider, borderRadius: '2px' },
    },
  },

  // ============================================
  // 11. 现代纹理 - Modern Texture
  // ============================================
  {
    id: 'modern-texture',
    name: '现代纹理',
    category: 'minimal',
    description: '简洁几何图案与现代纹理的结合，呈现专业设计感',
    colorVariants: [
      { id: 'geo', name: '几何', primary: '#1F2937', secondary: '#4B5563', background: '#F9FAFB' },
      { id: 'mono', name: '单色', primary: '#111827', secondary: '#374151', background: '#FFFFFF' },
      { id: 'warm', name: '暖调', primary: '#78350F', secondary: '#92400E', background: '#FFFBEB' },
    ],
    styles: {
      container: {
        backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(0,0,0,0.03) 1px, transparent 0)',
        backgroundSize: '24px 24px',
      },
      title: { ...baseStyles.title },
      body: { ...baseStyles.body },
      heading: { ...baseStyles.heading },
      list: { ...baseStyles.list },
      listItem: { ...baseStyles.listItem },
      blockquote: { ...baseStyles.blockquote, borderLeftWidth: '4px' },
      code: { ...baseStyles.code, backgroundColor: 'rgba(0,0,0,0.04)' },
      link: { ...baseStyles.link },
      strong: { ...baseStyles.strong },
      divider: { ...baseStyles.divider, backgroundColor: 'rgba(0,0,0,0.08)' },
    },
  },

  // ============================================
  // 12. 复古通用 - Retro Universal
  // ============================================
  {
    id: 'retro-universal',
    name: '复古通用',
    category: 'retro',
    description: '复古印刷风格，模拟旧报纸/打字机效果',
    colorVariants: [
      { id: 'sepia', name: '深褐色', primary: '#3E2723', secondary: '#5D4037', background: '#F5E6D3' },
      { id: 'aged', name: '旧纸黄', primary: '#4A4A4A', secondary: '#6A6A6A', background: '#F0E6D2' },
      { id: 'typewriter', name: '打字机', primary: '#1A1A1A', secondary: '#4A4A4A', background: '#FAF8F5' },
    ],
    styles: {
      container: {},
      title: { ...baseStyles.title, fontFamily: SERIF_FONT, borderBottom: '2px solid', paddingBottom: '12px' },
      body: { ...baseStyles.body, fontFamily: SERIF_FONT },
      heading: { ...baseStyles.heading, fontFamily: SERIF_FONT, textTransform: 'uppercase' as const, letterSpacing: '1px' },
      list: { ...baseStyles.list },
      listItem: { ...baseStyles.listItem },
      blockquote: { ...baseStyles.blockquote, fontFamily: SERIF_FONT },
      code: { ...baseStyles.code, fontFamily: '"Courier New", monospace', backgroundColor: 'rgba(0,0,0,0.05)' },
      link: { ...baseStyles.link },
      strong: { ...baseStyles.strong },
      divider: { ...baseStyles.divider, borderTop: '1px solid', background: 'transparent' },
    },
  },

  // ============================================
  // 13. 人文叙事 - Humanistic Narrative
  // ============================================
  {
    id: 'humanistic',
    name: '人文叙事',
    category: 'modern',
    description: '高端编辑风格，聚焦图文关系与叙事节奏',
    colorVariants: [
      { id: 'classic', name: '经典', primary: '#1A1A1A', secondary: '#4A4A4A', background: '#FFFFFF' },
      { id: 'warm', name: '暖调', primary: '#2D2D2D', secondary: '#5A5A5A', background: '#FDFBF7' },
      { id: 'cool', name: '冷调', primary: '#1F2937', secondary: '#4B5563', background: '#F8FAFC' },
    ],
    styles: {
      container: {},
      title: { ...baseStyles.title, fontFamily: SERIF_FONT, fontSize: '28px', fontWeight: 400, letterSpacing: '-0.5px' },
      body: { ...baseStyles.body, fontFamily: SERIF_FONT, fontSize: '16px', lineHeight: 2 },
      heading: { ...baseStyles.heading, fontFamily: SERIF_FONT, fontWeight: 400 },
      list: { ...baseStyles.list },
      listItem: { ...baseStyles.listItem },
      blockquote: { ...baseStyles.blockquote, fontFamily: SERIF_FONT, fontSize: '18px', lineHeight: 1.8 },
      code: { ...baseStyles.code },
      link: { ...baseStyles.link },
      strong: { ...baseStyles.strong, fontWeight: 500 },
      divider: { ...baseStyles.divider, width: '60px', marginLeft: 'auto', marginRight: 'auto' },
    },
  },

  // ============================================
  // 14. 科技先锋 - Tech Pioneer
  // ============================================
  {
    id: 'tech-pioneer',
    name: '科技先锋',
    category: 'tech',
    description: '未来感设计，高对比度霓虹配色打造先锋视觉',
    colorVariants: [
      { id: 'red', name: '动力红', primary: '#FFFFFF', secondary: '#E2E8F0', background: '#0F0F0F', accent: '#EF4444' },
      { id: 'blue', name: '赛博蓝', primary: '#FFFFFF', secondary: '#E2E8F0', background: '#0A0F1A', accent: '#3B82F6' },
      { id: 'black', name: '午夜黑', primary: '#FFFFFF', secondary: '#A1A1AA', background: '#09090B', accent: '#A855F7' },
    ],
    styles: {
      container: {},
      title: { ...baseStyles.title, textTransform: 'uppercase' as const, letterSpacing: '3px' },
      body: { ...baseStyles.body },
      heading: { ...baseStyles.heading, borderLeft: '3px solid', paddingLeft: '12px' },
      list: { ...baseStyles.list },
      listItem: { ...baseStyles.listItem },
      blockquote: { ...baseStyles.blockquote, backgroundColor: 'rgba(255,255,255,0.05)', padding: '16px', borderRadius: '4px' },
      code: { ...baseStyles.code, backgroundColor: 'rgba(255,255,255,0.1)' },
      link: { ...baseStyles.link },
      strong: { ...baseStyles.strong },
      divider: { ...baseStyles.divider, background: 'linear-gradient(90deg, currentColor, transparent)' },
    },
  },

  // ============================================
  // 15. 跃动黑底 - Dynamic Black
  // ============================================
  {
    id: 'dynamic-black',
    name: '跃动黑底',
    category: 'tech',
    description: '暗黑底色配霓虹文字/图案，呈现夜店/潮流美学',
    colorVariants: [
      { id: 'neon-yellow', name: '霓虹黄', primary: '#FDE047', secondary: '#FACC15', background: '#0A0A0A', accent: '#EAB308' },
      { id: 'electric-cyan', name: '电光青', primary: '#22D3EE', secondary: '#06B6D4', background: '#0A0A0A', accent: '#00CED1' },
      { id: 'vivid-green', name: '活力绿', primary: '#4ADE80', secondary: '#22C55E', background: '#0A0A0A', accent: '#10B981' },
    ],
    styles: {
      container: {},
      title: { ...baseStyles.title, fontWeight: 800, textShadow: '0 0 20px currentColor' },
      body: { ...baseStyles.body },
      heading: { ...baseStyles.heading, fontWeight: 700 },
      list: { ...baseStyles.list },
      listItem: { ...baseStyles.listItem },
      blockquote: { ...baseStyles.blockquote, borderLeftWidth: '4px', backgroundColor: 'rgba(255,255,255,0.03)' },
      code: { ...baseStyles.code, backgroundColor: 'rgba(255,255,255,0.1)' },
      link: { ...baseStyles.link, textShadow: '0 0 8px currentColor' },
      strong: { ...baseStyles.strong },
      divider: { ...baseStyles.divider, boxShadow: '0 0 8px currentColor' },
    },
  },

  // ============================================
  // 16. 科技简约 - Tech Minimal
  // ============================================
  {
    id: 'tech-minimal',
    name: '科技简约',
    category: 'tech',
    description: '专业现代科技感，简约而不简单的视觉呈现',
    colorVariants: [
      { id: 'sky', name: '天蓝', primary: '#0369A1', secondary: '#0284C7', background: '#F0F9FF', accent: '#0EA5E9' },
      { id: 'orange', name: '安全橙', primary: '#C2410C', secondary: '#EA580C', background: '#FFF7ED', accent: '#F97316' },
      { id: 'white', name: '科技白', primary: '#374151', secondary: '#6B7280', background: '#FFFFFF', accent: '#6366F1' },
    ],
    styles: {
      container: {
        borderLeft: '4px solid',
      },
      title: { ...baseStyles.title },
      body: { ...baseStyles.body },
      heading: { ...baseStyles.heading },
      list: { ...baseStyles.list },
      listItem: { ...baseStyles.listItem },
      blockquote: { ...baseStyles.blockquote, borderRadius: '0 8px 8px 0', backgroundColor: 'rgba(0,0,0,0.02)' },
      code: { ...baseStyles.code },
      link: { ...baseStyles.link },
      strong: { ...baseStyles.strong },
      divider: { ...baseStyles.divider },
    },
  },
];

// 导出默认模板
export const DEFAULT_XHS_TEMPLATE = XHS_TEMPLATES[0];

// 根据 ID 获取模板
export const getXHSTemplateById = (id: string): XHSTemplate | undefined => {
  return XHS_TEMPLATES.find(t => t.id === id);
};

// 根据分类获取模板
export const getXHSTemplatesByCategory = (category: string): XHSTemplate[] => {
  return XHS_TEMPLATES.filter(t => t.category === category);
};
