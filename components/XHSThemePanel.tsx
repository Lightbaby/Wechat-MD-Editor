import React from 'react';
import { Check } from 'lucide-react';
import { XHSTemplate, XHSConfig } from '../types';
import { XHS_TEMPLATES } from '../themes/xiaohongshu';

interface XHSThemePanelProps {
  currentTemplate: XHSTemplate;
  config: XHSConfig;
  onSelectTemplate: (template: XHSTemplate) => void;
  onSelectColorVariant: (variantId: string) => void;
}

// 分类标签映射
const CATEGORY_LABELS: Record<string, string> = {
  minimal: '极简风',
  handcraft: '手账风',
  nature: '自然风',
  tool: '工具风',
  fantasy: '梦幻风',
  chinese: '国风',
  retro: '复古风',
  tech: '科技风',
  modern: '现代风',
};

const XHSThemePanel: React.FC<XHSThemePanelProps> = ({
  currentTemplate,
  config,
  onSelectTemplate,
  onSelectColorVariant,
}) => {
  // 按分类分组模板
  const groupedTemplates = React.useMemo(() => {
    const groups: Record<string, XHSTemplate[]> = {};
    XHS_TEMPLATES.forEach(t => {
      if (!groups[t.category]) {
        groups[t.category] = [];
      }
      groups[t.category].push(t);
    });
    return groups;
  }, []);

  return (
    <div className="h-full flex flex-col">
      {/* 吸顶区域：标题 + 颜色选择 */}
      <div className="flex-shrink-0 bg-bg-panel sticky top-0 z-10 border-b border-border-light">
        <header className="px-6 pt-4 pb-2">
          <h2 className="text-lg font-medium text-text-main mb-0.5">模板库</h2>
          <p className="text-xs text-text-sub font-light">选择适合的小红书风格模板</p>
        </header>

        {/* 当前模板颜色变体选择 - 吸顶 */}
        <div className="px-6 pb-4">
          <div className="p-3 bg-bg-hover rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-text-main">{currentTemplate.name}</span>
              <span className="text-[10px] text-text-sub">{currentTemplate.colorVariants.length} 种配色</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {currentTemplate.colorVariants.map((variant) => (
                <button
                  key={variant.id}
                  onClick={() => onSelectColorVariant(variant.id)}
                  className={`
                    relative w-7 h-7 rounded-full transition-all duration-200 border-2
                    ${config.colorVariantId === variant.id
                      ? 'border-brand scale-110'
                      : 'border-transparent hover:scale-105'
                    }
                  `}
                  style={{
                    background: variant.background.includes('gradient')
                      ? variant.background
                      : variant.background,
                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                  }}
                  title={variant.name}
                >
                  {config.colorVariantId === variant.id && (
                    <Check
                      size={12}
                      className="absolute inset-0 m-auto"
                      style={{ color: variant.primary }}
                    />
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-6 pb-6 pt-4">

        {/* 分类展示模板 */}
        {Object.entries(groupedTemplates).map(([category, templates]) => (
          <div key={category} className="mb-6">
            <h3 className="text-xs font-medium text-text-sub uppercase tracking-wider mb-3">
              {CATEGORY_LABELS[category] || category}
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {templates.map((template) => {
                const isSelected = currentTemplate.id === template.id;
                const firstVariant = template.colorVariants[0];

                return (
                  <button
                    key={template.id}
                    onClick={() => {
                      onSelectTemplate(template);
                      onSelectColorVariant(template.colorVariants[0].id);
                    }}
                    className={`
                      relative group rounded-lg overflow-hidden transition-all duration-200
                      ${isSelected
                        ? 'ring-2 ring-brand ring-offset-2'
                        : 'hover:shadow-elevation-1'
                      }
                    `}
                  >
                    {/* 模板预览 */}
                    <div
                      className="aspect-[3/4] p-3"
                      style={{
                        background: firstVariant.background,
                        ...template.styles.container,
                      }}
                    >
                      {/* 模拟内容 */}
                      <div
                        className="h-3 w-3/4 rounded mb-2"
                        style={{ backgroundColor: firstVariant.primary, opacity: 0.8 }}
                      />
                      <div
                        className="h-2 w-full rounded mb-1"
                        style={{ backgroundColor: firstVariant.secondary || firstVariant.primary, opacity: 0.4 }}
                      />
                      <div
                        className="h-2 w-5/6 rounded mb-1"
                        style={{ backgroundColor: firstVariant.secondary || firstVariant.primary, opacity: 0.4 }}
                      />
                      <div
                        className="h-2 w-4/6 rounded"
                        style={{ backgroundColor: firstVariant.secondary || firstVariant.primary, opacity: 0.4 }}
                      />
                    </div>

                    {/* 模板名称 */}
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-2">
                      <span className="text-xs text-white font-medium">{template.name}</span>
                    </div>

                    {/* 选中标记 */}
                    {isSelected && (
                      <div className="absolute top-2 right-2 w-5 h-5 bg-brand rounded-full flex items-center justify-center">
                        <Check size={12} className="text-white" />
                      </div>
                    )}

                    {/* 颜色变体预览 */}
                    <div className="absolute bottom-8 left-2 flex -space-x-1">
                      {template.colorVariants.slice(0, 3).map((v, i) => (
                        <div
                          key={v.id}
                          className="w-3 h-3 rounded-full border border-white"
                          style={{
                            background: v.background.includes('gradient') ? v.background : v.background,
                            zIndex: 3 - i,
                          }}
                        />
                      ))}
                      {template.colorVariants.length > 3 && (
                        <div className="w-3 h-3 rounded-full bg-gray-200 border border-white flex items-center justify-center text-[8px] text-gray-500">
                          +{template.colorVariants.length - 3}
                        </div>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default XHSThemePanel;
