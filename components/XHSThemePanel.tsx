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
      <header className="p-6 pb-4 flex-shrink-0">
        <h2 className="text-lg font-medium text-[#333333] mb-1">模板库</h2>
        <p className="text-sm text-[#999999] font-light">选择适合的小红书风格模板</p>
      </header>

      <div className="flex-1 overflow-y-auto px-6 pb-6">
        {/* 当前模板颜色变体选择 */}
        <div className="mb-6 p-4 bg-[#F5F5F5] rounded-lg">
          <div className="text-sm font-medium text-[#333333] mb-3">
            {currentTemplate.name}
          </div>
          <div className="flex flex-wrap gap-2">
            {currentTemplate.colorVariants.map((variant) => (
              <button
                key={variant.id}
                onClick={() => onSelectColorVariant(variant.id)}
                className={`
                  relative w-8 h-8 rounded-full transition-all duration-200 border-2
                  ${config.colorVariantId === variant.id
                    ? 'border-[#1677FF] scale-110'
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
                    size={14}
                    className="absolute inset-0 m-auto"
                    style={{ color: variant.primary }}
                  />
                )}
              </button>
            ))}
          </div>
          <p className="text-xs text-[#999999] mt-2">{currentTemplate.description}</p>
        </div>

        {/* 分类展示模板 */}
        {Object.entries(groupedTemplates).map(([category, templates]) => (
          <div key={category} className="mb-6">
            <h3 className="text-xs font-medium text-[#999999] uppercase tracking-wider mb-3">
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
                        ? 'ring-2 ring-[#1677FF] ring-offset-2'
                        : 'hover:shadow-md'
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
                      <div className="absolute top-2 right-2 w-5 h-5 bg-[#1677FF] rounded-full flex items-center justify-center">
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
