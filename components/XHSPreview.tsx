import React, { forwardRef, useMemo, useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { XHSTemplate, XHSConfig, XHS_FONT_SIZE_MAP, XHS_ASPECT_RATIO_MAP } from '../types';

interface XHSPreviewProps {
  content: string;
  template: XHSTemplate;
  config: XHSConfig;
  currentPage: number;
  onTotalPagesChange?: (total: number) => void;
}

const XHSPreview = forwardRef<HTMLDivElement, XHSPreviewProps>(({
  content,
  template,
  config,
  currentPage,
  onTotalPagesChange,
}, ref) => {
  // 获取当前颜色变体
  const colorVariant = useMemo(() => {
    return template.colorVariants.find(v => v.id === config.colorVariantId) || template.colorVariants[0];
  }, [template, config.colorVariantId]);

  // 获取尺寸
  const dimensions = XHS_ASPECT_RATIO_MAP[config.aspectRatio];
  const fontSizes = XHS_FONT_SIZE_MAP[config.bodyFontSize];
  const titleFontSizes = XHS_FONT_SIZE_MAP[config.titleFontSize];

  // 分页内容
  const [pages, setPages] = useState<string[]>([content]);
  const contentRef = React.useRef<HTMLDivElement>(null);

  // 简单分页逻辑：根据字符数估算
  useEffect(() => {
    // 计算每页大约能容纳的字符数（粗略估算）
    const charsPerPage = Math.floor((dimensions.height - config.padding * 2) / (parseInt(fontSizes.body) * config.lineHeight) * 35);

    if (content.length <= charsPerPage) {
      setPages([content]);
      onTotalPagesChange?.(1);
    } else {
      // 按段落分页
      const paragraphs = content.split(/\n\n+/);
      const newPages: string[] = [];
      let currentPageContent = '';
      let currentLength = 0;

      paragraphs.forEach((para) => {
        if (currentLength + para.length > charsPerPage && currentPageContent) {
          newPages.push(currentPageContent.trim());
          currentPageContent = para;
          currentLength = para.length;
        } else {
          currentPageContent += (currentPageContent ? '\n\n' : '') + para;
          currentLength += para.length;
        }
      });

      if (currentPageContent) {
        newPages.push(currentPageContent.trim());
      }

      setPages(newPages.length > 0 ? newPages : [content]);
      onTotalPagesChange?.(newPages.length || 1);
    }
  }, [content, dimensions.height, fontSizes.body, config.lineHeight, config.padding, onTotalPagesChange]);

  // 当前页内容
  const currentContent = pages[currentPage] || pages[0] || '';

  // 容器样式
  const containerStyle: React.CSSProperties = {
    width: `${dimensions.width}px`,
    height: `${dimensions.height}px`,
    padding: `${config.padding}px`,
    background: colorVariant.background,
    color: colorVariant.primary,
    textAlign: config.textAlign,
    lineHeight: config.lineHeight,
    letterSpacing: `${config.letterSpacing}px`,
    overflow: 'hidden',
    position: 'relative',
    ...template.styles.container,
  };

  // 标题样式
  const titleStyle: React.CSSProperties = {
    ...template.styles.title,
    fontSize: titleFontSizes.title,
    color: colorVariant.primary,
  };

  // 正文样式
  const bodyStyle: React.CSSProperties = {
    ...template.styles.body,
    fontSize: fontSizes.body,
    color: colorVariant.secondary || colorVariant.primary,
  };

  // Markdown 组件配置
  const components = useMemo(() => ({
    h1: ({ children }: any) => (
      <h1 style={titleStyle}>{children}</h1>
    ),
    h2: ({ children }: any) => (
      <h2 style={{
        ...template.styles.heading,
        fontSize: `calc(${titleFontSizes.title} * 0.85)`,
        color: colorVariant.primary,
        borderColor: colorVariant.accent || colorVariant.primary,
      }}>
        {children}
      </h2>
    ),
    h3: ({ children }: any) => (
      <h3 style={{
        ...template.styles.heading,
        fontSize: `calc(${titleFontSizes.title} * 0.75)`,
        color: colorVariant.primary,
      }}>
        {children}
      </h3>
    ),
    p: ({ children }: any) => (
      <p style={{
        ...bodyStyle,
        marginBottom: '12px',
      }}>
        {children}
      </p>
    ),
    ul: ({ children }: any) => (
      <ul style={{
        ...template.styles.list,
        color: colorVariant.secondary || colorVariant.primary,
      }}>
        {children}
      </ul>
    ),
    ol: ({ children }: any) => (
      <ol style={{
        ...template.styles.list,
        color: colorVariant.secondary || colorVariant.primary,
      }}>
        {children}
      </ol>
    ),
    li: ({ children }: any) => (
      <li style={{
        ...template.styles.listItem,
        fontSize: fontSizes.body,
      }}>
        {children}
      </li>
    ),
    blockquote: ({ children }: any) => (
      <blockquote style={{
        ...template.styles.blockquote,
        borderColor: colorVariant.accent || colorVariant.primary,
        color: colorVariant.secondary || colorVariant.primary,
      }}>
        {children}
      </blockquote>
    ),
    code: ({ inline, children }: any) => {
      if (inline) {
        return (
          <code style={{
            ...template.styles.code,
            color: colorVariant.accent || colorVariant.primary,
          }}>
            {children}
          </code>
        );
      }
      return (
        <pre style={{
          ...template.styles.code,
          padding: '12px',
          borderRadius: '8px',
          overflow: 'auto',
          fontSize: '0.85em',
        }}>
          <code>{children}</code>
        </pre>
      );
    },
    a: ({ children, href }: any) => (
      <a
        href={href}
        style={{
          ...template.styles.link,
          color: colorVariant.accent || colorVariant.primary,
        }}
      >
        {children}
      </a>
    ),
    strong: ({ children }: any) => (
      <strong style={{
        ...template.styles.strong,
        color: colorVariant.primary,
      }}>
        {children}
      </strong>
    ),
    hr: () => (
      <hr style={{
        ...template.styles.divider,
        border: 'none',
        backgroundColor: colorVariant.accent || colorVariant.secondary || colorVariant.primary,
        opacity: 0.3,
      }} />
    ),
    img: ({ src, alt }: any) => (
      <div style={{ margin: '16px 0', textAlign: 'center' as const }}>
        <img
          src={src}
          alt={alt}
          style={{
            maxWidth: '100%',
            height: 'auto',
            borderRadius: '8px',
          }}
        />
        {alt && (
          <p style={{
            fontSize: '12px',
            color: colorVariant.secondary,
            marginTop: '8px',
          }}>
            {alt}
          </p>
        )}
      </div>
    ),
  }), [template, colorVariant, titleFontSizes, fontSizes, bodyStyle, titleStyle]);

  return (
    <div
      ref={ref}
      style={containerStyle}
      className="xhs-preview"
    >
      <div ref={contentRef} style={{ height: '100%', overflow: 'hidden' }}>
        <ReactMarkdown components={components}>
          {currentContent}
        </ReactMarkdown>
      </div>
    </div>
  );
});

XHSPreview.displayName = 'XHSPreview';

export default XHSPreview;
