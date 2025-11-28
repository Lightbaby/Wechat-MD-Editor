import { Theme } from './types';

export const DEFAULT_MARKDOWN = `# 欢迎使用公众号排版神器

这是一个 **所见即所得** 的 Markdown 编辑器，专为微信公众号设计。

## ✨ 主要功能

1. **多主题切换**：点击上方工具栏切换不同风格。
2. **AI 智能辅助**：利用 Gemini 模型润色文章、生成标题。
3. **一键复制**：直接复制渲染后的格式，完美粘贴到公众号后台。

## 🎨 样式展示

### 引用样式
> 这是一个引用段落。设计的本质是解决问题，而不仅仅是美化外观。

### 列表样式
*   简洁的界面
*   快速的响应
*   优雅的排版

### 代码块
\`\`\`javascript
const sayHello = () => {
  console.log("Hello, WeChat!");
};
\`\`\`

开始你的创作吧！
`;

// Standard WeChat Font Stack
const WECHAT_FONT_FAMILY = "-apple-system-font, BlinkMacSystemFont, 'Helvetica Neue', 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei UI', 'Microsoft YaHei', Arial, sans-serif";

// Common base styles - "Style Sinking" Strategy
const baseText = {
  lineHeight: '1.75',
  letterSpacing: '0.05em',
  fontSize: '16px',
  textAlign: 'justify' as const,
  color: '#333333',
  margin: '0 0 1.5em 0',
  clear: 'both' as const,
  fontFamily: WECHAT_FONT_FAMILY,
  overflowWrap: 'break-word' as const,
};

// Explicit styles for LI elements
const baseLi = {
  fontSize: '16px',
  lineHeight: '1.75',
  color: '#333333',
  fontFamily: WECHAT_FONT_FAMILY,
  marginBottom: '8px',
  textAlign: 'justify' as const,
};

// Common list container styles
// CRITICAL FIX: listStylePosition: 'inside' prevents bullets from being stripped or overflowing
const baseList = {
  margin: '0 0 1.5em 0',
  paddingLeft: '10px', 
  listStylePosition: 'inside' as const,
  listStyleType: 'disc', // Default fallback
};

export const THEMES: Theme[] = [
  {
    id: 'classic-blue',
    name: '经典蓝',
    colors: {
      primary: '#1890ff',
      secondary: '#e6f7ff',
      text: '#333333',
      heading: '#1f1f1f',
      background: '#ffffff',
      accent: '#096dd9',
    },
    styles: {
      h1: {
        fontSize: '22px',
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: '24px',
        marginTop: '10px',
        borderBottom: '2px solid #1890ff',
        paddingBottom: '10px',
        color: '#1f1f1f',
        lineHeight: '1.4',
        fontFamily: WECHAT_FONT_FAMILY,
      },
      h2: {
        fontSize: '18px',
        fontWeight: 'bold',
        marginBottom: '20px',
        marginTop: '30px',
        borderLeft: '4px solid #1890ff',
        paddingLeft: '10px',
        lineHeight: '1.4',
        color: '#1f1f1f',
        fontFamily: WECHAT_FONT_FAMILY,
      },
      h3: {
        fontSize: '16px',
        fontWeight: 'bold',
        marginBottom: '16px',
        marginTop: '24px',
        color: '#1890ff',
        lineHeight: '1.4',
        fontFamily: WECHAT_FONT_FAMILY,
      },
      p: { ...baseText, color: '#3f3f3f' },
      blockquote: {
        borderLeft: '4px solid #1890ff',
        backgroundColor: '#f0f5ff',
        padding: '16px',
        color: '#595959',
        borderRadius: '4px',
        margin: '20px 0',
        fontSize: '15px',
        lineHeight: '1.6',
        fontFamily: WECHAT_FONT_FAMILY,
      },
      list: baseList,
      li: { ...baseLi, color: '#3f3f3f' },
      code: {
        backgroundColor: '#f6f8fa',
        padding: '2px 4px',
        borderRadius: '4px',
        color: '#d73a49',
        fontFamily: 'Consolas, Monaco, monospace',
        fontSize: '14px',
      },
      link: {
        color: '#1890ff',
        textDecoration: 'none',
        borderBottom: '1px dashed #1890ff',
      },
      strong: {
        color: '#1890ff',
        fontWeight: 'bold',
      },
    },
  },
  {
    id: 'elegant-green',
    name: '清新绿',
    colors: {
      primary: '#07c160',
      secondary: '#f0f9eb',
      text: '#333333',
      heading: '#2c3e50',
      background: '#ffffff',
      accent: '#05964c',
    },
    styles: {
      h1: {
        fontSize: '24px',
        fontWeight: 'bold',
        marginBottom: '30px',
        marginTop: '10px',
        textAlign: 'center',
        color: '#07c160',
        borderBottom: '3px solid #96e6a1',
        paddingBottom: '10px',
        lineHeight: '1.4',
        fontFamily: WECHAT_FONT_FAMILY,
      },
      h2: {
        fontSize: '18px',
        fontWeight: 'bold',
        marginBottom: '20px',
        marginTop: '30px',
        display: 'inline-block',
        backgroundColor: '#f0f9eb',
        color: '#07c160',
        padding: '5px 15px',
        borderRadius: '20px',
        border: '1px solid #d4fc79',
        lineHeight: '1.4',
        fontFamily: WECHAT_FONT_FAMILY,
      },
      h3: {
        fontSize: '17px',
        fontWeight: 'bold',
        marginBottom: '16px',
        marginTop: '24px',
        color: '#2c3e50',
        paddingLeft: '8px',
        borderLeft: '4px solid #07c160',
        lineHeight: '1.4',
        fontFamily: WECHAT_FONT_FAMILY,
      },
      p: { ...baseText, color: '#2c3e50' },
      blockquote: {
        borderTop: '2px solid #07c160',
        borderBottom: '2px solid #07c160',
        backgroundColor: '#fff',
        padding: '20px',
        color: '#555',
        margin: '20px 0',
        position: 'relative',
        fontSize: '15px',
        textAlign: 'center',
        lineHeight: '1.6',
        fontFamily: WECHAT_FONT_FAMILY,
      },
      list: { ...baseList, listStyleType: 'disc' },
      li: { ...baseLi, color: '#2c3e50' },
      code: {
        backgroundColor: '#fff5f5',
        padding: '2px 4px',
        borderRadius: '4px',
        color: '#c0392b',
        fontFamily: 'Consolas, Monaco, monospace',
        fontSize: '14px',
      },
      link: {
        color: '#07c160',
        textDecoration: 'none',
        fontWeight: 'bold',
        borderBottom: '1px solid #07c160',
      },
      strong: {
        color: '#07c160',
        fontWeight: 'bold',
      },
    },
  },
  {
    id: 'warm-orange',
    name: '暖阳橙',
    colors: {
      primary: '#fa8c16',
      secondary: '#fff7e6',
      text: '#4a4a4a',
      heading: '#d46b08',
      background: '#ffffff',
      accent: '#d46b08',
    },
    styles: {
      h1: {
        fontSize: '22px',
        fontWeight: 'bold',
        marginBottom: '24px',
        marginTop: '10px',
        textAlign: 'center',
        borderBottom: '3px solid #fa8c16',
        display: 'table',
        marginLeft: 'auto',
        marginRight: 'auto',
        padding: '0 10px 10px 10px',
        color: '#fa8c16',
        lineHeight: '1.4',
        fontFamily: WECHAT_FONT_FAMILY,
      },
      h2: {
        fontSize: '18px',
        fontWeight: 'bold',
        marginBottom: '20px',
        marginTop: '30px',
        color: '#ffffff',
        backgroundColor: '#fa8c16',
        padding: '8px 16px',
        borderRadius: '0 10px 10px 0',
        display: 'inline-block',
        borderRight: '3px solid #ffd591',
        borderBottom: '3px solid #ffd591',
        lineHeight: '1.4',
        fontFamily: WECHAT_FONT_FAMILY,
      },
      h3: {
        fontSize: '16px',
        fontWeight: 'bold',
        marginBottom: '16px',
        marginTop: '24px',
        color: '#d46b08',
        borderBottom: '1px solid #ffd591',
        paddingBottom: '4px',
        display: 'inline-block',
        lineHeight: '1.4',
        fontFamily: WECHAT_FONT_FAMILY,
      },
      p: { ...baseText, color: '#4a4a4a' },
      blockquote: {
        borderLeft: 'none',
        backgroundColor: '#fff7e6',
        padding: '20px',
        color: '#873800',
        borderRadius: '8px',
        margin: '20px 0',
        fontSize: '15px',
        border: '1px dashed #fa8c16',
        lineHeight: '1.6',
        fontFamily: WECHAT_FONT_FAMILY,
      },
      list: baseList,
      li: { ...baseLi, color: '#4a4a4a' },
      code: {
        backgroundColor: '#fff0f6',
        padding: '2px 4px',
        borderRadius: '4px',
        color: '#c41d7f',
        fontFamily: 'Consolas, Monaco, monospace',
        fontSize: '14px',
      },
      link: {
        color: '#fa8c16',
        textDecoration: 'none',
        borderBottom: '1px solid #fa8c16',
      },
      strong: {
        color: '#fa8c16',
        fontWeight: 'bold',
      },
    },
  },
  {
    id: 'noble-purple',
    name: '高贵紫',
    colors: {
      primary: '#722ed1',
      secondary: '#f9f0ff',
      text: '#333333',
      heading: '#531dab',
      background: '#ffffff',
      accent: '#b37feb',
    },
    styles: {
      h1: {
        fontSize: '22px',
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: '24px',
        color: '#531dab',
        borderBottom: '3px solid #722ed1',
        paddingBottom: '10px',
        lineHeight: '1.4',
        fontFamily: WECHAT_FONT_FAMILY,
      },
      h2: {
        fontSize: '18px',
        fontWeight: 'bold',
        marginBottom: '20px',
        marginTop: '30px',
        color: '#fff',
        backgroundColor: '#722ed1',
        padding: '6px 20px',
        borderRadius: '50px 0 50px 0',
        display: 'inline-block',
        border: '2px solid #b37feb',
        lineHeight: '1.4',
        fontFamily: WECHAT_FONT_FAMILY,
      },
      h3: {
        fontSize: '16px',
        fontWeight: 'bold',
        marginTop: '24px',
        marginBottom: '16px',
        color: '#722ed1',
        paddingLeft: '10px',
        borderLeft: '4px solid #722ed1',
        lineHeight: '1.4',
        fontFamily: WECHAT_FONT_FAMILY,
      },
      p: { ...baseText, color: '#333' },
      blockquote: {
        backgroundColor: '#f9f0ff',
        borderLeft: '4px solid #722ed1',
        padding: '16px',
        margin: '20px 0',
        borderRadius: '0 8px 8px 0',
        color: '#531dab',
        fontSize: '15px',
        lineHeight: '1.6',
        fontFamily: WECHAT_FONT_FAMILY,
      },
      list: baseList,
      li: { ...baseLi, color: '#333' },
      code: { 
          backgroundColor: '#f9f0ff', 
          color: '#722ed1', 
          padding: '2px 4px', 
          borderRadius: '4px', 
          fontFamily: 'Consolas, Monaco, monospace',
          fontSize: '14px',
      },
      link: { 
          color: '#722ed1', 
          textDecoration: 'none', 
          borderBottom: '1px solid #722ed1' 
      },
      strong: {
        color: '#722ed1',
        fontWeight: 'bold',
      },
    },
  },
  {
    id: 'minimalist-black',
    name: '极简黑',
    colors: {
      primary: '#000000',
      secondary: '#f5f5f5',
      text: '#222222',
      heading: '#000000',
      background: '#ffffff',
      accent: '#333333',
    },
    styles: {
      h1: {
        fontSize: '24px',
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: '30px',
        color: '#000',
        letterSpacing: '2px',
        borderTop: '2px solid #000',
        borderBottom: '2px solid #000',
        padding: '10px 20px',
        display: 'table',
        margin: '30px auto',
        lineHeight: '1.4',
        fontFamily: WECHAT_FONT_FAMILY,
      },
      h2: {
        fontSize: '18px',
        fontWeight: 'bold',
        marginBottom: '20px',
        marginTop: '30px',
        color: '#000',
        borderBottom: '3px solid #000',
        display: 'inline-block',
        paddingBottom: '4px',
        lineHeight: '1.4',
        fontFamily: WECHAT_FONT_FAMILY,
      },
      h3: {
        fontSize: '16px',
        fontWeight: 'bold',
        marginTop: '24px',
        marginBottom: '16px',
        backgroundColor: '#000',
        color: '#fff',
        padding: '4px 10px',
        display: 'inline-block',
        lineHeight: '1.4',
        fontFamily: WECHAT_FONT_FAMILY,
      },
      p: { ...baseText, color: '#222' },
      blockquote: {
        borderTop: '2px solid #000',
        borderBottom: '2px solid #000',
        padding: '20px',
        margin: '20px 0',
        color: '#444',
        textAlign: 'center',
        fontWeight: '500',
        backgroundColor: '#fff',
        fontSize: '15px',
        lineHeight: '1.6',
        fontFamily: WECHAT_FONT_FAMILY,
      },
      list: { ...baseList, listStyleType: 'disc' },
      li: { ...baseLi, color: '#222' },
      code: { 
          backgroundColor: '#f0f0f0', 
          color: '#000', 
          padding: '2px 4px', 
          borderRadius: '2px', 
          fontFamily: 'Consolas, Monaco, monospace', 
          fontWeight: 'bold',
          fontSize: '14px',
      },
      link: { 
          color: '#000', 
          textDecoration: 'underline', 
          fontWeight: 'bold' 
      },
      strong: {
        color: '#000',
        fontWeight: 'bold',
        backgroundColor: '#f5f5f5',
        padding: '0 2px',
      },
    },
  },
  {
    id: 'sakura-pink',
    name: '樱花粉',
    colors: {
      primary: '#eb2f96',
      secondary: '#fff0f6',
      text: '#555555',
      heading: '#c41d7f',
      background: '#ffffff',
      accent: '#ffadd2',
    },
    styles: {
      h1: {
        fontSize: '22px',
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: '24px',
        color: '#c41d7f',
        backgroundColor: '#fff0f6',
        padding: '15px',
        borderRadius: '12px',
        border: '2px dashed #ffadd2',
        lineHeight: '1.4',
        fontFamily: WECHAT_FONT_FAMILY,
      },
      h2: {
        fontSize: '18px',
        fontWeight: 'bold',
        marginBottom: '20px',
        marginTop: '30px',
        color: '#c41d7f',
        borderLeft: '5px solid #ffadd2',
        borderBottom: '1px solid #fff0f6',
        padding: '5px 0 5px 12px',
        backgroundColor: '#fff0f6',
        borderRadius: '0 8px 8px 0',
        lineHeight: '1.4',
        fontFamily: WECHAT_FONT_FAMILY,
      },
      h3: {
        fontSize: '16px',
        fontWeight: 'bold',
        marginTop: '24px',
        marginBottom: '16px',
        color: '#eb2f96',
        borderBottom: '2px solid #ffadd2',
        paddingBottom: '4px',
        display: 'inline-block',
        lineHeight: '1.4',
        fontFamily: WECHAT_FONT_FAMILY,
      },
      p: { ...baseText, color: '#555' },
      blockquote: {
        backgroundColor: '#fff0f6',
        borderRadius: '12px',
        padding: '16px',
        margin: '20px 0',
        color: '#c41d7f',
        border: '2px dotted #ffadd2',
        fontSize: '15px',
        lineHeight: '1.6',
        fontFamily: WECHAT_FONT_FAMILY,
      },
      list: baseList,
      li: { ...baseLi, color: '#555' },
      code: { 
          backgroundColor: '#fff0f6', 
          color: '#c41d7f', 
          padding: '2px 4px', 
          borderRadius: '4px', 
          fontFamily: 'Consolas, Monaco, monospace',
          fontSize: '14px',
      },
      link: { 
          color: '#eb2f96', 
          textDecoration: 'none', 
          borderBottom: '1px dotted #eb2f96' 
      },
      strong: {
        color: '#c41d7f',
        fontWeight: 'bold',
      },
    },
  },
];