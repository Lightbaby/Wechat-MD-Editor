import React, { forwardRef, useMemo, useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { XHSTemplate, XHSConfig, XHS_FONT_SIZE_MAP, XHS_ASPECT_RATIO_MAP } from '../types';

interface XHSPreviewProps {
  content: string;
  template: XHSTemplate;
  config: XHSConfig;
  currentPage: number; // Deprecated for display, kept for type compatibility
  onTotalPagesChange?: (total: number) => void;
}

const XHSPreview = forwardRef<HTMLDivElement, XHSPreviewProps>(({
  content,
  template,
  config,
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

  // 分页逻辑 (Retained heuristic logic)
  useEffect(() => {
    // 粗略估算每页字符数
    const charsPerPage = Math.floor((dimensions.height - config.padding * 2) / (parseInt(fontSizes.body) * config.lineHeight) * 35);

    if (content.length <= charsPerPage) {
      setPages([content]);
      onTotalPagesChange?.(1);
    } else {
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

  // 卡片基础样式
  const cardBaseStyle: React.CSSProperties = {
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
    boxShadow: '0 8px 16px -4px rgba(0, 0, 0, 0.1)', // Softer, more premium shadow
    marginBottom: '32px', // Comfortable gap
    flexShrink: 0,
    transition: 'all 0.3s ease',
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

  // Components Configuration
  const components = useMemo(() => ({
    h1: ({ children }: any) => <h1 style={titleStyle}>{children}</h1>,
    h2: ({ children }: any) => (
      <h2 style={{
        ...template.styles.heading,
        fontSize: `calc(${titleFontSizes.title} * 0.85)`,
        borderColor: colorVariant.accent || colorVariant.primary,
      }}>{children}</h2>
    ),
    h3: ({ children }: any) => (
      <h3 style={{
        ...template.styles.heading,
        fontSize: `calc(${titleFontSizes.title} * 0.75)`,
        borderColor: colorVariant.accent || colorVariant.primary,
      }}>{children}</h3>
    ),
    h4: ({ children }: any) => (
      <h4 style={{
        ...template.styles.heading,
        fontSize: `calc(${titleFontSizes.title} * 0.65)`,
        marginTop: '20px',
        marginBottom: '10px',
        borderColor: colorVariant.accent || colorVariant.primary,
      }}>{children}</h4>
    ),
    h5: ({ children }: any) => (
      <h5 style={{
        ...template.styles.heading,
        fontSize: `calc(${titleFontSizes.title} * 0.55)`,
        marginTop: '16px',
        marginBottom: '8px',
        borderColor: colorVariant.accent || colorVariant.primary,
      }}>{children}</h5>
    ),
    h6: ({ children }: any) => (
      <h6 style={{
        ...template.styles.heading,
        fontSize: `calc(${titleFontSizes.title} * 0.5)`,
        marginTop: '16px',
        marginBottom: '8px',
        borderColor: colorVariant.accent || colorVariant.primary,
      }}>{children}</h6>
    ),
    p: ({ children }: any) => (
      <p style={{ ...bodyStyle, marginBottom: '16px' }}>{children}</p>
    ),
    ul: ({ children }: any) => (
      <ul style={{ ...template.styles.list, color: colorVariant.secondary || colorVariant.primary }}>{children}</ul>
    ),
    ol: ({ children }: any) => (
      <ol style={{ ...template.styles.list, color: colorVariant.secondary || colorVariant.primary }}>{children}</ol>
    ),
    li: ({ children }: any) => (
      <li style={{ ...template.styles.listItem, fontSize: fontSizes.body }}>{children}</li>
    ),
    blockquote: ({ children }: any) => (
      <blockquote style={{
        ...template.styles.blockquote,
        borderColor: colorVariant.accent || colorVariant.primary,
        color: colorVariant.secondary || colorVariant.primary,
      }}>{children}</blockquote>
    ),
    code: ({ inline, children }: any) => {
      if (inline) {
        return <code style={{ ...template.styles.code, color: colorVariant.accent || colorVariant.primary }}>{children}</code>;
      }
      return (
        <pre style={{ ...template.styles.code, padding: '16px', borderRadius: '8px', overflow: 'auto', fontSize: '0.85em', margin: '16px 0' }}>
          <code>{children}</code>
        </pre>
      );
    },
    a: ({ children, href }: any) => (
      <a href={href} style={{ ...template.styles.link, color: colorVariant.accent || colorVariant.primary }}>{children}</a>
    ),
    strong: ({ children }: any) => (
      <strong style={{ ...template.styles.strong, color: colorVariant.primary }}>{children}</strong>
    ),
    hr: () => (
      <hr style={{ ...template.styles.divider, border: 'none', backgroundColor: colorVariant.accent || colorVariant.secondary || colorVariant.primary, opacity: 0.2 }} />
    ),
    img: ({ src, alt }: any) => (
      <div style={{ margin: '20px 0', textAlign: 'center' as const }}>
        <img src={src} alt={alt} style={{ maxWidth: '100%', height: 'auto', borderRadius: '4px' }} />
        {alt && <p style={{ fontSize: '12px', color: colorVariant.secondary, marginTop: '8px', opacity: 0.8 }}>{alt}</p>}
      </div>
    ),
  }), [template, colorVariant, titleFontSizes, fontSizes, bodyStyle, titleStyle]);

  return (
    <div
      ref={ref}
      className="xhs-preview-list flex flex-col items-center pb-20 w-full"
    >
      {pages.map((pageContent, index) => (
        <div key={index} className="relative group">
          <div style={cardBaseStyle} className="xhs-card">
            <div style={{ height: '100%', overflow: 'hidden' }}>
              <ReactMarkdown components={components}>
                {pageContent}
              </ReactMarkdown>
            </div>

            {/* Page Number Indicator */}
            <div style={{
              position: 'absolute',
              bottom: '12px',
              right: '16px',
              fontSize: '11px',
              opacity: 0.3,
              fontWeight: 600,
              pointerEvents: 'none',
              fontFamily: 'sans-serif'
            }}>
              {index + 1} / {pages.length}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
});

XHSPreview.displayName = 'XHSPreview';

export default XHSPreview;
