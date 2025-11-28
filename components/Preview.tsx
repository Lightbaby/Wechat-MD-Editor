import React, { forwardRef } from 'react';
import ReactMarkdown from 'react-markdown';
import { Theme } from '../types';

interface PreviewProps {
  content: string;
  theme: Theme;
}

// Helper to extract typography properties that must be preserved on inner spans
const getTypography = (style: React.CSSProperties) => ({
    color: style.color,
    fontSize: style.fontSize,
    fontWeight: style.fontWeight,
    fontFamily: style.fontFamily,
    lineHeight: style.lineHeight,
    letterSpacing: style.letterSpacing,
    textDecoration: style.textDecoration,
    fontStyle: style.fontStyle,
});

const Preview = forwardRef<HTMLDivElement, PreviewProps>(({ content, theme }, ref) => {
  return (
    <section 
      ref={ref}
      style={{
        padding: '20px',
        backgroundColor: '#ffffff',
        minHeight: '100%',
        fontFamily: theme.styles.p.fontFamily, 
        fontSize: '16px',
        color: theme.colors.text,
        lineHeight: '1.75',
        textAlign: 'justify',
      }}
    >
      <ReactMarkdown
        components={{
          // Header renderers: Wrap content in span to protect typography
          h1: ({ node, children, ...props }) => (
            <h1 style={theme.styles.h1} {...props}>
                <span style={getTypography(theme.styles.h1)}>{children}</span>
            </h1>
          ),
          h2: ({ node, children, ...props }) => (
            <h2 style={theme.styles.h2} {...props}>
                <span style={getTypography(theme.styles.h2)}>{children}</span>
            </h2>
          ),
          h3: ({ node, children, ...props }) => (
            <h3 style={theme.styles.h3} {...props}>
                <span style={getTypography(theme.styles.h3)}>{children}</span>
            </h3>
          ),
          // Paragraph: Wrap content in span
          p: ({ node, children, ...props }) => (
            <p style={theme.styles.p} {...props}>
                <span style={getTypography(theme.styles.p)}>{children}</span>
            </p>
          ),
          // Blockquote: Ensure internal p uses blockquote text color if possible
          blockquote: ({ node, children, ...props }) => (
            <blockquote style={theme.styles.blockquote} {...props}>
                {/* We can't easily wrap children here because they are blocks, but the P renderer above handles the span. 
                    We just need to make sure the P inside inherits the color. */}
                {React.Children.map(children, (child) => {
                     if (React.isValidElement(child) && child.type === 'p') {
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        return React.cloneElement(child as any, { 
                            style: { 
                                ...theme.styles.p, 
                                margin: 0, 
                                color: theme.styles.blockquote.color // Force inherit blockquote color
                            } 
                        });
                    }
                    return child;
                })}
            </blockquote>
          ),
          ul: ({ node, ...props }) => <ul style={{...theme.styles.list, listStyleType: 'disc'}} {...props} />,
          ol: ({ node, ...props }) => <ol style={{...theme.styles.list, listStyleType: 'decimal'}} {...props} />,
          li: ({ node, children, ...props }) => (
            <li style={theme.styles.li} {...props}>
                 {/* 
                  Double Protection: 
                  1. Check for P tags and strip their margin, but apply typography.
                  2. If raw text, wrap in span with LI typography.
                 */}
                 {React.Children.map(children, (child) => {
                    if (React.isValidElement(child) && child.type === 'p') {
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        return React.cloneElement(child as any, { 
                            style: { 
                                ...theme.styles.p, 
                                margin: 0, 
                                padding: 0,
                                fontSize: theme.styles.li.fontSize, // Ensure matches LI
                            } 
                        });
                    }
                    if (typeof child === 'string' || typeof child === 'number') {
                         return <span style={getTypography(theme.styles.li)}>{child}</span>;
                    }
                    return child;
                 })}
            </li>
          ),
          strong: ({ node, ...props }) => <strong style={theme.styles.strong} {...props} />,
          code: ({ node, className, ...props }) => {
            const isBlock = /language-(\w+)/.exec(className || '');
            if (isBlock) {
               return (
                <section style={{
                    backgroundColor: '#282c34',
                    padding: '15px',
                    borderRadius: '5px',
                    margin: '1.5em 0',
                    overflowX: 'auto',
                    fontSize: '13px',
                    lineHeight: '1.5',
                    color: '#abb2bf',
                    fontFamily: 'Consolas, Monaco, "Andale Mono", "Ubuntu Mono", monospace',
                    border: '1px solid #eee'
                }}>
                    <code style={{ fontFamily: 'inherit', color: 'inherit', backgroundColor: 'transparent', padding: 0 }} {...props} />
                </section>
               );
            }
            return <code style={theme.styles.code} {...props} />;
          },
          a: ({ node, ...props }) => <a style={theme.styles.link} {...props} />,
          img: ({ node, ...props }) => (
            <span style={{ display: 'block', textAlign: 'center', margin: '20px 0', clear: 'both' }}>
                <img 
                    style={{ 
                        maxWidth: '100%',
                        width: 'auto',
                        borderRadius: '6px', 
                        border: '1px solid #eee',
                        display: 'inline-block',
                        margin: '0 auto',
                        visibility: 'visible',
                        verticalAlign: 'middle',
                    }} 
                    {...props} 
                    alt={props.alt || 'image'}
                />
                {props.alt && (
                    <span style={{ 
                        display: 'block', 
                        fontSize: '12px', 
                        color: '#888', 
                        marginTop: '6px',
                        textAlign: 'center',
                        lineHeight: '1.4',
                        fontFamily: theme.styles.p.fontFamily
                    }}>
                        {props.alt}
                    </span>
                )}
            </span>
          ),
          hr: ({node, ...props}) => (
            <hr style={{
                border: 0,
                borderTop: `1px dashed ${theme.colors.primary}`,
                margin: '40px 0'
            }} {...props} />
          )
        }}
      >
        {content}
      </ReactMarkdown>
      
      {/* Footer signature */}
      <section style={{ marginTop: '50px', textAlign: 'center', fontSize: '12px', color: '#ccc' }}>
        <p style={{ margin: 0, fontFamily: theme.styles.p.fontFamily }}>Generated by WeChat MD Editor</p>
      </section>
    </section>
  );
});

Preview.displayName = 'Preview';

export default Preview;