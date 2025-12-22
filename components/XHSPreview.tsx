import React, { forwardRef, useMemo, useEffect, useState, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import { XHSTemplate, XHSConfig, XHS_FONT_SIZE_MAP, XHS_ASPECT_RATIO_MAP } from '../types';

interface XHSPreviewProps {
  content: string;
  template: XHSTemplate;
  config: XHSConfig;
  currentPage: number;
  onTotalPagesChange?: (total: number) => void;
}

/**
 * 将 Markdown 内容分割成不可分割的块
 * 确保代码块、列表、引用等不会被切断
 * 标题会和紧跟它的内容合并在一起
 */
function splitContentIntoBlocks(content: string): string[] {
  const lines = content.split('\n');
  const rawBlocks: string[] = [];
  let currentBlock: string[] = [];
  let inCodeBlock = false;
  let inList = false;

  const flushBlock = () => {
    if (currentBlock.length > 0) {
      rawBlocks.push(currentBlock.join('\n'));
      currentBlock = [];
    }
  };

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmedLine = line.trim();

    // 代码块开始/结束
    if (trimmedLine.startsWith('```')) {
      if (inCodeBlock) {
        currentBlock.push(line);
        flushBlock();
        inCodeBlock = false;
      } else {
        flushBlock();
        currentBlock.push(line);
        inCodeBlock = true;
      }
      continue;
    }

    if (inCodeBlock) {
      currentBlock.push(line);
      continue;
    }

    // 空行
    if (trimmedLine === '') {
      if (inList) {
        flushBlock();
        inList = false;
      } else if (currentBlock.length > 0) {
        flushBlock();
      }
      continue;
    }

    // 标题
    if (/^#{1,6}\s/.test(trimmedLine)) {
      flushBlock();
      rawBlocks.push(line);
      inList = false;
      continue;
    }

    // 分隔线
    if (/^(-{3,}|\*{3,}|_{3,})$/.test(trimmedLine)) {
      flushBlock();
      rawBlocks.push(line);
      inList = false;
      continue;
    }

    // 引用块
    if (trimmedLine.startsWith('>')) {
      if (currentBlock.length > 0 && !currentBlock[0].trim().startsWith('>')) {
        flushBlock();
      }
      currentBlock.push(line);
      continue;
    }

    // 列表项
    if (/^[-*+]\s/.test(trimmedLine) || /^\d+\.\s/.test(trimmedLine)) {
      if (!inList && currentBlock.length > 0) {
        flushBlock();
      }
      currentBlock.push(line);
      inList = true;
      continue;
    }

    // 普通段落
    if (inList) {
      flushBlock();
      inList = false;
    }
    currentBlock.push(line);
  }

  flushBlock();

  // 将标题和紧跟它的内容合并
  const blocks: string[] = [];
  for (let i = 0; i < rawBlocks.length; i++) {
    const block = rawBlocks[i];
    const trimmed = block.trim();

    // 如果是标题，尝试和下一个块合并
    if (/^#{1,6}\s/.test(trimmed) && i + 1 < rawBlocks.length) {
      const nextBlock = rawBlocks[i + 1];
      // 下一个块不是标题和分隔线时，合并
      if (!/^#{1,6}\s/.test(nextBlock.trim()) && !/^(-{3,}|\*{3,}|_{3,})$/.test(nextBlock.trim())) {
        blocks.push(block + '\n\n' + nextBlock);
        i++; // 跳过下一个块
        continue;
      }
    }
    blocks.push(block);
  }

  return blocks.filter(b => b.trim() !== '');
}

const XHSPreview = forwardRef<HTMLDivElement, XHSPreviewProps>(({
  content,
  template,
  config,
  onTotalPagesChange,
}, ref) => {
  const measureContainerRef = useRef<HTMLDivElement>(null);
  const [pages, setPages] = useState<string[]>([content]);

  // 获取当前颜色变体
  const colorVariant = useMemo(() => {
    return template.colorVariants.find(v => v.id === config.colorVariantId) || template.colorVariants[0];
  }, [template, config.colorVariantId]);

  // 获取尺寸
  const dimensions = XHS_ASPECT_RATIO_MAP[config.aspectRatio];
  const fontSizes = XHS_FONT_SIZE_MAP[config.bodyFontSize];
  const titleFontSizes = XHS_FONT_SIZE_MAP[config.titleFontSize];

  // 解析模板容器的 padding
  const containerPadding = useMemo(() => {
    const templatePadding = template.styles.container.padding;
    if (typeof templatePadding === 'string') {
      const parts = templatePadding.split(' ').map(p => parseInt(p) || 0);
      return {
        top: parts[0] || 0,
        right: parts[1] ?? parts[0] ?? 0,
        bottom: parts[2] ?? parts[0] ?? 0,
        left: parts[3] ?? parts[1] ?? parts[0] ?? 0,
      };
    } else if (typeof templatePadding === 'number') {
      return { top: templatePadding, right: templatePadding, bottom: templatePadding, left: templatePadding };
    }
    return { top: config.padding, right: config.padding, bottom: config.padding, left: config.padding };
  }, [template.styles.container.padding, config.padding]);

  // 可用内容高度
  const availableHeight = dimensions.height - containerPadding.top - containerPadding.bottom - 40;
  const contentWidth = dimensions.width - containerPadding.left - containerPadding.right;

  // 卡片基础样式
  const cardBaseStyle: React.CSSProperties = useMemo(() => ({
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
    boxShadow: '0 8px 16px -4px rgba(0, 0, 0, 0.1)',
    marginBottom: '32px',
    flexShrink: 0,
  }), [dimensions, config, colorVariant, template.styles.container]);

  // 标题样式
  const titleStyle: React.CSSProperties = useMemo(() => ({
    ...template.styles.title,
    fontSize: titleFontSizes.title,
    color: colorVariant.primary,
  }), [template.styles.title, titleFontSizes.title, colorVariant.primary]);

  // 正文样式
  const bodyStyle: React.CSSProperties = useMemo(() => ({
    ...template.styles.body,
    fontSize: fontSizes.body,
    color: colorVariant.secondary || colorVariant.primary,
  }), [template.styles.body, fontSizes.body, colorVariant]);

  // Markdown 渲染组件
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

  // 估算块的高度
  const estimateBlockHeight = (block: string): number => {
    const lineHeight = config.lineHeight * parseInt(fontSizes.body);
    const trimmed = block.trim();

    // 检查是否是合并块（标题 + 内容）
    const parts = block.split('\n\n');
    if (parts.length > 1) {
      // 合并块：计算每个部分的高度总和
      let totalHeight = 0;
      for (const part of parts) {
        totalHeight += estimateSingleBlockHeight(part.trim(), lineHeight);
      }
      return totalHeight;
    }

    return estimateSingleBlockHeight(trimmed, lineHeight);
  };

  // 估算单个块的高度（不含合并）
  const estimateSingleBlockHeight = (trimmed: string, lineHeight: number): number => {
    // 标题
    if (trimmed.startsWith('# ')) {
      return parseInt(titleFontSizes.title) * 2.5 + 24;
    }
    if (trimmed.startsWith('## ')) {
      return parseInt(titleFontSizes.title) * 0.85 * 2.2 + 20;
    }
    if (trimmed.startsWith('### ')) {
      return parseInt(titleFontSizes.title) * 0.75 * 2 + 16;
    }
    if (/^#{4,6}\s/.test(trimmed)) {
      return parseInt(titleFontSizes.title) * 0.6 * 1.8 + 12;
    }

    // 引用块
    if (trimmed.startsWith('>')) {
      const lines = trimmed.split('\n').length;
      return lines * lineHeight + 48;
    }

    // 代码块
    if (trimmed.startsWith('```')) {
      const lines = trimmed.split('\n').length;
      return lines * lineHeight * 0.85 + 48;
    }

    // 列表
    if (/^[-*+]\s/.test(trimmed) || /^\d+\.\s/.test(trimmed)) {
      const items = trimmed.split('\n').length;
      return items * lineHeight + 24;
    }

    // 分隔线
    if (/^(-{3,}|\*{3,}|_{3,})$/.test(trimmed)) {
      return 48;
    }

    // 普通段落
    const charPerLine = Math.floor(contentWidth / parseInt(fontSizes.body) * 1.6);
    const textLength = trimmed.replace(/\n/g, '').length;
    const lines = Math.max(1, Math.ceil(textLength / charPerLine));
    return lines * lineHeight + 20;
  };

  // 分页逻辑
  useEffect(() => {
    const blocks = splitContentIntoBlocks(content);

    if (blocks.length === 0) {
      setPages([content]);
      onTotalPagesChange?.(1);
      return;
    }

    const newPages: string[] = [];
    let currentPageBlocks: string[] = [];
    let currentHeight = 0;

    for (const block of blocks) {
      const blockHeight = estimateBlockHeight(block);

      if (currentHeight + blockHeight > availableHeight && currentPageBlocks.length > 0) {
        // 当前页已满，保存并开始新页
        newPages.push(currentPageBlocks.join('\n\n'));
        currentPageBlocks = [block];
        currentHeight = blockHeight;
      } else {
        currentPageBlocks.push(block);
        currentHeight += blockHeight;
      }
    }

    // 保存最后一页
    if (currentPageBlocks.length > 0) {
      newPages.push(currentPageBlocks.join('\n\n'));
    }

    if (newPages.length === 0) {
      newPages.push(content);
    }

    setPages(newPages);
    onTotalPagesChange?.(newPages.length);
  }, [content, availableHeight, contentWidth, config.lineHeight, fontSizes, titleFontSizes, onTotalPagesChange]);

  return (
    <>
      {/* 隐藏的测量容器 */}
      <div
        ref={measureContainerRef}
        style={{
          position: 'absolute',
          visibility: 'hidden',
          pointerEvents: 'none',
          width: `${contentWidth}px`,
          padding: '0',
          fontFamily: template.styles.body.fontFamily || 'inherit',
          fontSize: fontSizes.body,
          lineHeight: config.lineHeight,
          letterSpacing: `${config.letterSpacing}px`,
        }}
      />

      {/* 预览内容 */}
      <div
        ref={ref}
        className="xhs-preview-list flex flex-col items-center pb-20 w-full"
      >
        {pages.map((pageContent, pageIndex) => (
          <div key={pageIndex} className="relative group xhs-page" data-page={pageIndex + 1}>
            <div style={cardBaseStyle} className="xhs-card">
              <div style={{ height: '100%', overflow: 'hidden' }}>
                <ReactMarkdown components={components}>
                  {pageContent}
                </ReactMarkdown>
              </div>

              {/* 页码指示器 */}
              {pages.length > 1 && (
                <div style={{
                  position: 'absolute',
                  bottom: '12px',
                  right: '16px',
                  fontSize: '11px',
                  opacity: 0.4,
                  fontWeight: 600,
                  pointerEvents: 'none',
                  fontFamily: 'sans-serif'
                }}>
                  {pageIndex + 1} / {pages.length}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </>
  );
});

XHSPreview.displayName = 'XHSPreview';

export default XHSPreview;
