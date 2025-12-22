import React, { useState, useRef, useCallback, useEffect } from 'react';
import { THEMES, DEFAULT_MARKDOWN } from './constants';
import {
  Theme,
  AIActionType,
  AIConfig,
  loadAIConfig,
  isAIConfigured,
  EditorMode,
  XHSConfig,
  XHSTemplate,
  DEFAULT_XHS_CONFIG,
} from './types';
import { XHS_TEMPLATES, DEFAULT_XHS_TEMPLATE } from './themes/xiaohongshu';
// Editor is now inline in App.tsx for better AI action bar integration
import Preview from './components/Preview';
import ThemePanel from './components/ThemePanel';
import SettingsPanel from './components/SettingsPanel';
import ModeSwitch from './components/ModeSwitch';
import XHSPreview from './components/XHSPreview';
import XHSPaginator from './components/XHSPaginator';
import XHSThemePanel from './components/XHSThemePanel';
import XHSAdjustPanel from './components/XHSAdjustPanel';
import { enhanceContent, POLISH_STYLES, PolishStyle } from './services/aiService';
import {
  Sparkles,
  Copy,
  Check,
  Palette,
  SlidersHorizontal,
  Download,
  Loader2,
  Wand2,
  Type,
  Wrench,
  Settings,
  Monitor,
  Smartphone,
  X,
  ChevronRight
} from 'lucide-react';

// Settings modal state
type SettingsModalState = boolean;

const App: React.FC = () => {
  const [markdown, setMarkdown] = useState<string>(DEFAULT_MARKDOWN);
  const [currentTheme, setCurrentTheme] = useState<Theme>(THEMES[0]);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  // Editor Mode State
  const [editorMode, setEditorMode] = useState<EditorMode>('wechat');

  // XHS State
  const [currentXHSTemplate, setCurrentXHSTemplate] = useState<XHSTemplate>(DEFAULT_XHS_TEMPLATE);
  const [xhsConfig, setXHSConfig] = useState<XHSConfig>(DEFAULT_XHS_CONFIG);
  const [xhsCurrentPage, setXHSCurrentPage] = useState(0);
  const [xhsTotalPages, setXHSTotalPages] = useState(1);
  const [isExporting, setIsExporting] = useState(false);

  // AI State
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [aiResult, setAiResult] = useState<string | null>(null);
  const [showAiModal, setShowAiModal] = useState(false);
  const [aiModalTitle, setAiModalTitle] = useState("");

  // Polish Style Modal State
  const [showPolishModal, setShowPolishModal] = useState(false);
  const [selectedPolishStyle, setSelectedPolishStyle] = useState<PolishStyle | null>(null);
  const [customPolishPrompt, setCustomPolishPrompt] = useState("");

  // UI State
  const [xhsPanelTab, setXhsPanelTab] = useState<'templates' | 'adjust'>('templates');

  // AI Config State
  const [aiConfig, setAiConfig] = useState<AIConfig>(loadAIConfig());
  const aiConfigured = isAIConfigured(aiConfig);

  // Load AI config on mount
  useEffect(() => {
    setAiConfig(loadAIConfig());
  }, []);

  const handleAiConfigChange = (config: AIConfig) => {
    setAiConfig(config);
  };

  const previewRef = useRef<HTMLDivElement>(null);
  const xhsPreviewRef = useRef<HTMLDivElement>(null);

  // Handle mode change
  const handleModeChange = (mode: EditorMode) => {
    setEditorMode(mode);
    setXHSCurrentPage(0);
    // Ensure we are on a valid tab for the new mode if needed, 
    // but 'design', 'settings', 'ai' are universal.
  };

  // Handle XHS config change
  const handleXHSConfigChange = (updates: Partial<XHSConfig>) => {
    setXHSConfig(prev => ({ ...prev, ...updates }));
  };

  // Export XHS preview as images (each page separately)
  const handleExportImage = async () => {
    if (!xhsPreviewRef.current) return;

    setIsExporting(true);
    try {
      // Dynamic import html2canvas
      const html2canvas = (await import('html2canvas')).default;

      // Find all page elements
      const pages = xhsPreviewRef.current.querySelectorAll('.xhs-page');
      const timestamp = Date.now();

      // Export each page separately
      for (let i = 0; i < pages.length; i++) {
        const page = pages[i] as HTMLElement;
        const canvas = await html2canvas(page, {
          scale: 2,
          backgroundColor: null,
          useCORS: true,
        });

        // Download image
        const link = document.createElement('a');
        const pageNum = pages.length > 1 ? `-${i + 1}` : '';
        link.download = `xiaohongshu-${timestamp}${pageNum}.png`;
        link.href = canvas.toDataURL('image/png');
        link.click();

        // Small delay between downloads to avoid browser blocking
        if (i < pages.length - 1) {
          await new Promise(resolve => setTimeout(resolve, 300));
        }
      }
    } catch (error) {
      console.error('Export failed:', error);
    } finally {
      setIsExporting(false);
    }
  };

  const handleCopy = useCallback(async () => {
    if (previewRef.current) {
      try {
        const htmlContent = previewRef.current.innerHTML;
        const textContent = previewRef.current.innerText || '';

        if (navigator.clipboard && typeof ClipboardItem !== 'undefined') {
          const htmlBlob = new Blob([htmlContent], { type: 'text/html' });
          const textBlob = new Blob([textContent], { type: 'text/plain' });
          await navigator.clipboard.write([
            new ClipboardItem({
              'text/html': htmlBlob,
              'text/plain': textBlob,
            })
          ]);
          setIsCopied(true);
          setTimeout(() => setIsCopied(false), 2000);
        } else {
          const range = document.createRange();
          range.selectNode(previewRef.current);
          const selection = window.getSelection();
          if (selection) {
            selection.removeAllRanges();
            selection.addRange(range);
            document.execCommand('copy');
            selection.removeAllRanges();
            setIsCopied(true);
            setTimeout(() => setIsCopied(false), 2000);
          }
        }
      } catch (err) {
        console.error('Failed to copy', err);
      }
    }
  }, []);

  const handleAiAction = async (type: AIActionType) => {
    if (!aiConfigured) {
      setShowSettingsModal(true);
      return;
    }

    // 如果是润色，先显示风格选择弹窗
    if (type === 'polish') {
      setShowPolishModal(true);
      setSelectedPolishStyle(null);
      setCustomPolishPrompt("");
      return;
    }

    executeAiAction(type);
  };

  const executeAiAction = async (type: AIActionType, polishPrompt?: string) => {
    setIsAiLoading(true);
    setAiResult(null);
    setAiModalTitle(
      type === 'polish' ? 'AI 润色' :
        type === 'title' ? 'AI 标题生成' :
          type === 'summary' ? 'AI 摘要生成' :
            type === 'fix-markdown' ? '智能格式修复' :
              '语法检查'
    );
    setShowAiModal(true);

    try {
      const result = await enhanceContent(markdown, type, aiConfig, polishPrompt);
      setAiResult(result);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : '未知错误';
      setAiResult(`AI 服务出错: ${errorMessage}`);
    } finally {
      setIsAiLoading(false);
    }
  };

  const handlePolishConfirm = () => {
    const prompt = selectedPolishStyle?.prompt || customPolishPrompt;
    if (!prompt.trim()) {
      // 如果没有选择风格也没有自定义，使用默认
      executeAiAction('polish');
    } else {
      executeAiAction('polish', prompt);
    }
    setShowPolishModal(false);
  };

  const applyAiContent = () => {
    if (aiResult) {
      if (aiModalTitle.includes('标题') || aiModalTitle.includes('摘要')) {
        setMarkdown(`${aiResult}\n\n---\n\n${markdown}`);
      } else {
        setMarkdown(aiResult);
      }
      setShowAiModal(false);
    }
  };

  // Render the Right Panel Content (Design only)
  const renderRightPanel = () => {
    if (editorMode === 'wechat') {
      return (
        <div className="h-full flex flex-col">
          <ThemePanel
            themes={THEMES}
            currentTheme={currentTheme}
            onSelectTheme={setCurrentTheme}
          />
        </div>
      );
    } else {
      return (
        <div className="h-full flex flex-col overflow-hidden">
          {/* XHS Sub-tabs */}
          <div className="px-4 py-3 flex gap-2 border-b border-border-light bg-bg-app">
            <button
              onClick={() => setXhsPanelTab('templates')}
              className={`flex-1 py-1.5 text-xs font-medium rounded-md transition-all ${xhsPanelTab === 'templates'
                ? 'bg-bg-panel text-text-main shadow-elevation-1 ring-1 ring-border-light'
                : 'text-text-sub hover:bg-bg-hover'
                }`}
            >
              模板选择
            </button>
            <button
              onClick={() => setXhsPanelTab('adjust')}
              className={`flex-1 py-1.5 text-xs font-medium rounded-md transition-all ${xhsPanelTab === 'adjust'
                ? 'bg-bg-panel text-text-main shadow-elevation-1 ring-1 ring-border-light'
                : 'text-text-sub hover:bg-bg-hover'
                }`}
            >
              精细调整
            </button>
          </div>

          <div className="flex-1 overflow-y-auto">
            {xhsPanelTab === 'templates' ? (
              <XHSThemePanel
                currentTemplate={currentXHSTemplate}
                config={xhsConfig}
                onSelectTemplate={setCurrentXHSTemplate}
                onSelectColorVariant={(id) => handleXHSConfigChange({ colorVariantId: id })}
              />
            ) : (
              <XHSAdjustPanel
                config={xhsConfig}
                onConfigChange={handleXHSConfigChange}
              />
            )}
          </div>
        </div>
      );
    }
  };


  return (
    <div className="flex flex-col h-screen bg-bg-app text-text-main overflow-hidden font-sans">

      {/* 1. HEADER */}
      <header className="h-14 border-b border-border-light bg-bg-panel flex items-center justify-between px-4 md:px-6 flex-shrink-0 z-20 relative shadow-elevation-1">
        {/* Left: Logo & Title */}
        <div className="flex items-center gap-3">
          <img src="/logo.svg" alt="Logo" className="w-8 h-8" />
          <h1 className="font-semibold text-lg tracking-tight text-text-main">MD 排版神器</h1>
        </div>

        {/* Center: Mode Switch */}
        <div className="absolute left-1/2 transform -translate-x-1/2">
          <ModeSwitch mode={editorMode} onChange={handleModeChange} />
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-2">
          {/* Settings Button */}
          <button
            onClick={() => setShowSettingsModal(true)}
            className="w-8 h-8 rounded-md flex items-center justify-center text-text-sub hover:bg-bg-hover hover:text-text-main transition-all"
            title="设置"
          >
            <Settings size={18} strokeWidth={1.5} />
          </button>

          {editorMode === 'wechat' ? (
            <button
              onClick={handleCopy}
              className={`
                  flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-300
                  ${isCopied
                  ? 'bg-bg-hover text-text-main'
                  : 'bg-brand text-white hover:bg-brand-hover shadow-elevation-1 hover:shadow-elevation-2'
                }
                `}
            >
              {isCopied ? <Check size={14} /> : <Copy size={14} />}
              {isCopied ? '已复制' : '复制'}
            </button>
          ) : (
            <button
              onClick={handleExportImage}
              disabled={isExporting}
              className={`
                  flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-300
                  ${isExporting
                  ? 'bg-bg-hover text-text-sub cursor-not-allowed'
                  : 'bg-xhs-red text-white hover:bg-xhs-red-hover shadow-elevation-1 hover:shadow-elevation-2'
                }
                `}
            >
              {isExporting ? <Loader2 size={14} className="animate-spin" /> : <Download size={14} />}
              {isExporting ? '导出中...' : '导出图片'}
            </button>
          )}
        </div>
      </header>

      {/* 2. MAIN CONTENT */}
      <main className="flex-1 flex overflow-hidden">

        {/* Left Column: Editor with AI Action Bar */}
        <div className="w-[30%] min-w-[320px] max-w-[500px] border-r border-border-light flex flex-col bg-bg-panel relative">
          {/* Editor with bottom padding for action bar */}
          <div className="flex-1 overflow-hidden">
            <textarea
              className="w-full h-full p-6 pb-16 resize-none focus:outline-none bg-bg-panel text-text-main font-mono text-sm leading-relaxed selection:bg-brand/10 selection:text-brand"
              value={markdown}
              onChange={(e) => setMarkdown(e.target.value)}
              placeholder="# 在这里输入 Markdown 内容..."
              spellCheck={false}
            />
          </div>

          {/* AI Action Bar - Sticky Bottom */}
          <div className="absolute bottom-0 left-0 right-0 bg-bg-panel/95 backdrop-blur-sm px-4 py-3 border-t border-border-light">
            <div className="flex items-center gap-2">
              {/* Action Buttons */}
              {[
                { id: 'fix-markdown', icon: Wrench, label: '格式修复', color: 'bg-slate-600' },
                { id: 'polish', icon: Sparkles, label: '润色', color: 'bg-violet-600' },
                { id: 'title', icon: Type, label: '标题', color: 'bg-blue-600' },
                { id: 'summary', icon: Wand2, label: '摘要', color: 'bg-emerald-600' },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleAiAction(item.id as AIActionType)}
                  disabled={!aiConfigured}
                  className={`
                    flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all flex-shrink-0 shadow-elevation-1
                    ${aiConfigured
                      ? `${item.color} text-white hover:opacity-90 hover:shadow-elevation-2`
                      : 'bg-bg-hover text-text-sub cursor-not-allowed'
                    }
                  `}
                  title={!aiConfigured ? '请先配置 AI 设置' : item.label}
                >
                  <item.icon size={12} />
                  <span>{item.label}</span>
                </button>
              ))}

              {/* Settings hint if not configured */}
              {!aiConfigured && (
                <button
                  onClick={() => setShowSettingsModal(true)}
                  className="text-xs text-brand hover:text-brand-hover underline flex-shrink-0 ml-auto"
                >
                  配置 AI →
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Center Column: Preview */}
        <div className="flex-1 bg-bg-app flex flex-col relative min-w-[375px]">
          {/* Preview Toolbar / Info (Optional) */}
          <div className="h-10 flex items-center justify-center text-xs text-text-sub bg-bg-app select-none">
            {editorMode === 'wechat' ? (
              <span className="flex items-center gap-1"><Monitor size={12} /> 公众号预览</span>
            ) : (
              <span className="flex items-center gap-1"><Smartphone size={12} /> 小红书预览</span>
            )}
          </div>

          <div className="flex-1 overflow-y-auto overflow-x-hidden flex justify-center p-4 md:p-8">
            {/* Preview Container */}
            {editorMode === 'wechat' ? (
              <div className="w-full max-w-[420px] bg-bg-panel min-h-[800px] shadow-elevation-2 border border-border-light transition-all duration-200">
                <Preview
                  ref={previewRef}
                  content={markdown}
                  theme={currentTheme}
                />
              </div>
            ) : (
              <div className="flex flex-col items-center gap-4">
                <XHSPreview
                  ref={xhsPreviewRef}
                  content={markdown}
                  template={currentXHSTemplate}
                  config={xhsConfig}
                  currentPage={xhsCurrentPage}
                  onTotalPagesChange={setXHSTotalPages}
                />
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Design Panel Only */}
        <div className="w-[320px] flex-shrink-0 bg-bg-panel border-l border-border-light flex flex-col">
          {/* Panel Header */}
          <div className="h-10 flex items-center px-4 border-b border-border-light bg-bg-app">
            <Palette size={14} className="text-text-sub mr-2" />
            <span className="text-xs font-medium text-text-main">
              {editorMode === 'wechat' ? '主题样式' : '模板设计'}
            </span>
          </div>

          {/* Panel Content */}
          <div className="flex-1 overflow-hidden relative">
            {renderRightPanel()}
          </div>
        </div>

      </main>

      {/* Polish Style Selection Modal */}
      {showPolishModal && (
        <div className="fixed inset-0 bg-text-main/20 z-50 flex items-center justify-center p-4 backdrop-blur-[2px]">
          <div className="bg-bg-panel rounded-xl shadow-elevation-3 ring-1 ring-border-light w-full max-w-md overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            {/* Header */}
            <div className="px-6 py-4 border-b border-border-light flex justify-between items-center">
              <h3 className="font-medium text-text-main flex items-center gap-2">
                <Sparkles size={16} className="text-brand" />
                选择润色方向
              </h3>
              <button
                onClick={() => setShowPolishModal(false)}
                className="w-7 h-7 rounded-full flex items-center justify-center text-text-sub hover:text-text-main hover:bg-bg-hover transition-all"
              >
                <X size={16} />
              </button>
            </div>

            {/* Style Options */}
            <div className="p-4 max-h-[400px] overflow-y-auto">
              <div className="grid grid-cols-2 gap-2 mb-4">
                {POLISH_STYLES.map((style) => (
                  <button
                    key={style.id}
                    onClick={() => {
                      setSelectedPolishStyle(style);
                      setCustomPolishPrompt("");
                    }}
                    className={`
                      p-3 rounded-lg border-2 text-left transition-all duration-200
                      ${selectedPolishStyle?.id === style.id
                        ? 'border-brand bg-brand/5'
                        : 'border-border-light hover:border-brand/50 hover:bg-bg-hover'
                      }
                    `}
                  >
                    <div className={`text-sm font-medium mb-0.5 ${selectedPolishStyle?.id === style.id ? 'text-brand' : 'text-text-main'}`}>
                      {style.name}
                    </div>
                    <div className="text-xs text-text-sub">{style.description}</div>
                  </button>
                ))}
              </div>

              {/* Custom Prompt */}
              <div className="border-t border-border-light pt-4">
                <label className="block text-xs text-text-sub mb-2">或者输入自定义润色要求：</label>
                <textarea
                  value={customPolishPrompt}
                  onChange={(e) => {
                    setCustomPolishPrompt(e.target.value);
                    if (e.target.value) setSelectedPolishStyle(null);
                  }}
                  placeholder="例如：让文章更有幽默感，增加一些网络流行语..."
                  className="w-full h-20 px-3 py-2 text-sm border border-border-light rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand transition-all"
                />
              </div>
            </div>

            {/* Footer */}
            <div className="px-6 py-4 border-t border-border-light bg-bg-app flex justify-end gap-3">
              <button
                onClick={() => setShowPolishModal(false)}
                className="px-4 py-2 text-sm text-text-sub hover:text-text-main transition-colors"
              >
                取消
              </button>
              <button
                onClick={handlePolishConfirm}
                className="px-5 py-2 bg-brand hover:bg-brand-hover text-white rounded-lg text-sm font-medium transition-all shadow-elevation-1 hover:shadow-elevation-2 flex items-center gap-1.5"
              >
                开始润色
                <ChevronRight size={14} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Settings Modal */}
      {showSettingsModal && (
        <div className="fixed inset-0 bg-text-main/20 z-50 flex items-center justify-center p-4 backdrop-blur-[2px]">
          <div className="bg-bg-panel rounded-xl shadow-elevation-3 ring-1 ring-border-light w-full max-w-md overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            {/* Header */}
            <div className="px-6 py-4 border-b border-border-light flex justify-between items-center">
              <h3 className="font-medium text-text-main flex items-center gap-2">
                <Settings size={16} className="text-text-sub" />
                设置
              </h3>
              <button
                onClick={() => setShowSettingsModal(false)}
                className="w-7 h-7 rounded-full flex items-center justify-center text-text-sub hover:text-text-main hover:bg-bg-hover transition-all"
              >
                <X size={16} />
              </button>
            </div>
            {/* Content */}
            <div className="max-h-[70vh] overflow-y-auto">
              <SettingsPanel onConfigChange={handleAiConfigChange} />
            </div>
          </div>
        </div>
      )}

      {/* AI Modal (Global) */}
      {showAiModal && (
        <div className="fixed inset-0 bg-text-main/20 z-50 flex items-center justify-center p-4 backdrop-blur-[2px] transition-opacity">
          <div className="bg-bg-panel rounded-xl shadow-elevation-3 ring-1 ring-border-light w-full max-w-2xl overflow-hidden flex flex-col max-h-[85vh] animate-in fade-in zoom-in-95 duration-200">
            <div className="px-6 py-4 border-b border-border-light flex justify-between items-center">
              <h3 className="font-medium text-text-main flex items-center gap-2">
                {aiModalTitle.includes('格式') ? <Wrench size={16} className="text-text-sub" /> : <Sparkles size={16} className="text-text-sub" />}
                {aiModalTitle}
              </h3>
              <button onClick={() => setShowAiModal(false)} className="text-text-sub hover:text-text-main transition-colors text-xl">
                &times;
              </button>
            </div>

            <div className="p-8 overflow-y-auto flex-1 min-h-[300px]">
              {isAiLoading ? (
                <div className="flex flex-col items-center justify-center h-full gap-4 text-text-sub">
                  <Loader2 size={32} className="animate-spin text-brand" strokeWidth={1.5} />
                  <p className="font-light text-sm tracking-wide">AI 处理中...</p>
                </div>
              ) : (
                <div className="prose prose-stone max-w-none text-text-sub whitespace-pre-wrap leading-loose font-light">
                  {aiResult}
                </div>
              )}
            </div>

            <div className="p-6 border-t border-border-light bg-bg-app flex justify-end gap-4">
              <button
                onClick={() => setShowAiModal(false)}
                className="px-4 py-2 text-text-sub hover:text-text-main text-sm font-medium transition-colors"
              >
                取消
              </button>
              {!isAiLoading && aiResult && (
                <button
                  onClick={applyAiContent}
                  className="px-6 py-2 bg-brand hover:bg-brand-hover text-white rounded-lg text-sm font-medium transition-all shadow-elevation-1 hover:shadow-elevation-2"
                >
                  应用更改
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;