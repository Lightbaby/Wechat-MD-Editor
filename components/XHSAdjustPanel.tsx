import React from 'react';
import { XHSConfig, XHSAspectRatio, XHSFontSize, XHSTextAlign } from '../types';
import { AlignLeft, AlignCenter, AlignRight } from 'lucide-react';

interface XHSAdjustPanelProps {
  config: XHSConfig;
  onConfigChange: (config: Partial<XHSConfig>) => void;
}

const ASPECT_RATIO_OPTIONS: { value: XHSAspectRatio; label: string }[] = [
  { value: '3:4', label: '3:4' },
  { value: '3:5', label: '3:5' },
  { value: '4:5', label: '4:5' },
  { value: '1:1', label: '1:1' },
];

const FONT_SIZE_OPTIONS: { value: XHSFontSize; label: string }[] = [
  { value: 'xs', label: '最小' },
  { value: 'sm', label: '小' },
  { value: 'md', label: '中' },
  { value: 'lg', label: '大' },
  { value: 'xl', label: '最大' },
];

const TEXT_ALIGN_OPTIONS: { value: XHSTextAlign; icon: React.ReactNode }[] = [
  { value: 'left', icon: <AlignLeft size={16} /> },
  { value: 'center', icon: <AlignCenter size={16} /> },
  { value: 'right', icon: <AlignRight size={16} /> },
];

const XHSAdjustPanel: React.FC<XHSAdjustPanelProps> = ({
  config,
  onConfigChange,
}) => {
  return (
    <div className="h-full flex flex-col">
      <header className="p-6 pb-4 flex-shrink-0">
        <h2 className="text-lg font-medium text-text-main mb-1">调整</h2>
        <p className="text-sm text-text-sub font-light">精细调节排版参数</p>
      </header>

      <div className="flex-1 overflow-y-auto px-6 pb-6 space-y-6">
        {/* 卡片比例 */}
        <div>
          <label className="block text-sm font-medium text-text-main mb-3">卡片比例</label>
          <div className="grid grid-cols-4 gap-2">
            {ASPECT_RATIO_OPTIONS.map((option) => (
              <button
                key={option.value}
                onClick={() => onConfigChange({ aspectRatio: option.value })}
                className={`
                  py-2 px-3 rounded-lg text-sm font-medium transition-all duration-200
                  ${config.aspectRatio === option.value
                    ? 'bg-brand text-white'
                    : 'bg-bg-hover text-text-sub hover:bg-border-light'
                  }
                `}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        {/* 标题字号 */}
        <div>
          <label className="block text-sm font-medium text-text-main mb-3">标题字号</label>
          <div className="grid grid-cols-5 gap-2">
            {FONT_SIZE_OPTIONS.map((option) => (
              <button
                key={option.value}
                onClick={() => onConfigChange({ titleFontSize: option.value })}
                className={`
                  py-2 px-2 rounded-lg text-xs font-medium transition-all duration-200
                  ${config.titleFontSize === option.value
                    ? 'bg-brand text-white'
                    : 'bg-bg-hover text-text-sub hover:bg-border-light'
                  }
                `}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        {/* 正文字号 */}
        <div>
          <label className="block text-sm font-medium text-text-main mb-3">正文字号</label>
          <div className="grid grid-cols-5 gap-2">
            {FONT_SIZE_OPTIONS.map((option) => (
              <button
                key={option.value}
                onClick={() => onConfigChange({ bodyFontSize: option.value })}
                className={`
                  py-2 px-2 rounded-lg text-xs font-medium transition-all duration-200
                  ${config.bodyFontSize === option.value
                    ? 'bg-brand text-white'
                    : 'bg-bg-hover text-text-sub hover:bg-border-light'
                  }
                `}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        {/* 对齐方式 */}
        <div>
          <label className="block text-sm font-medium text-text-main mb-3">对齐方式</label>
          <div className="flex gap-2">
            {TEXT_ALIGN_OPTIONS.map((option) => (
              <button
                key={option.value}
                onClick={() => onConfigChange({ textAlign: option.value })}
                className={`
                  flex-1 py-2 rounded-lg flex items-center justify-center transition-all duration-200
                  ${config.textAlign === option.value
                    ? 'bg-brand text-white'
                    : 'bg-bg-hover text-text-sub hover:bg-border-light'
                  }
                `}
              >
                {option.icon}
              </button>
            ))}
          </div>
        </div>

        {/* 行高 */}
        <div>
          <div className="flex justify-between items-center mb-3">
            <label className="text-sm font-medium text-text-main">行高</label>
            <span className="text-sm text-text-sub">{config.lineHeight.toFixed(1)}</span>
          </div>
          <input
            type="range"
            min="1.4"
            max="2.2"
            step="0.1"
            value={config.lineHeight}
            onChange={(e) => onConfigChange({ lineHeight: parseFloat(e.target.value) })}
            className="w-full h-2 bg-border-light rounded-lg appearance-none cursor-pointer accent-brand"
          />
          <div className="flex justify-between text-xs text-text-sub mt-1">
            <span>紧凑</span>
            <span>宽松</span>
          </div>
        </div>

        {/* 字间距 */}
        <div>
          <div className="flex justify-between items-center mb-3">
            <label className="text-sm font-medium text-text-main">字间距</label>
            <span className="text-sm text-text-sub">{config.letterSpacing.toFixed(1)}px</span>
          </div>
          <input
            type="range"
            min="0"
            max="2"
            step="0.1"
            value={config.letterSpacing}
            onChange={(e) => onConfigChange({ letterSpacing: parseFloat(e.target.value) })}
            className="w-full h-2 bg-border-light rounded-lg appearance-none cursor-pointer accent-brand"
          />
          <div className="flex justify-between text-xs text-text-sub mt-1">
            <span>标准</span>
            <span>宽松</span>
          </div>
        </div>

        {/* 内边距 */}
        <div>
          <div className="flex justify-between items-center mb-3">
            <label className="text-sm font-medium text-text-main">内边距</label>
            <span className="text-sm text-text-sub">{config.padding}px</span>
          </div>
          <input
            type="range"
            min="16"
            max="48"
            step="4"
            value={config.padding}
            onChange={(e) => onConfigChange({ padding: parseInt(e.target.value) })}
            className="w-full h-2 bg-border-light rounded-lg appearance-none cursor-pointer accent-brand"
          />
          <div className="flex justify-between text-xs text-text-sub mt-1">
            <span>紧凑</span>
            <span>宽松</span>
          </div>
        </div>

        {/* 重置按钮 */}
        <button
          onClick={() => onConfigChange({
            aspectRatio: '3:4',
            titleFontSize: 'lg',
            bodyFontSize: 'md',
            textAlign: 'left',
            lineHeight: 1.8,
            letterSpacing: 0.5,
            padding: 24,
          })}
          className="w-full py-2 text-sm text-text-sub hover:text-text-main transition-colors"
        >
          恢复默认设置
        </button>
      </div>
    </div>
  );
};

export default XHSAdjustPanel;
