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
import Editor from './components/Editor';
import Preview from './components/Preview';
import ThemePanel from './components/ThemePanel';
import SettingsPanel from './components/SettingsPanel';
import ModeSwitch from './components/ModeSwitch';
import XHSPreview from './components/XHSPreview';
import XHSPaginator from './components/XHSPaginator';
import XHSThemePanel from './components/XHSThemePanel';
import XHSAdjustPanel from './components/XHSAdjustPanel';
import { enhanceContent } from './services/aiService';
import {
  Sparkles,
  Copy,
  Check,
  Palette,
  PenLine,
  Settings,
  Wrench,
  Type,
  Wand2,
  Loader2,
  AlertCircle,
  Download,
  SlidersHorizontal
} from 'lucide-react';

type TabType = 'editor' | 'theme' | 'ai' | 'settings' | 'xhs-theme' | 'xhs-adjust';

const App: React.FC = () => {
  const [markdown, setMarkdown] = useState<string>(DEFAULT_MARKDOWN);
  const [currentTheme, setCurrentTheme] = useState<Theme>(THEMES[0]);
  const [activeTab, setActiveTab] = useState<TabType>('theme');
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
    // Reset tab based on mode
    if (mode === 'wechat') {
      setActiveTab('theme');
    } else {
      setActiveTab('xhs-theme');
    }
    setXHSCurrentPage(0);
  };

  // Handle XHS config change
  const handleXHSConfigChange = (updates: Partial<XHSConfig>) => {
    setXHSConfig(prev => ({ ...prev, ...updates }));
  };

  // Export XHS preview as image
  const handleExportImage = async () => {
    if (!xhsPreviewRef.current) return;

    setIsExporting(true);
    try {
      // Dynamic import html2canvas
      const html2canvas = (await import('html2canvas')).default;
      const canvas = await html2canvas(xhsPreviewRef.current, {
        scale: 2,
        backgroundColor: null,
        useCORS: true,
      });

      // Download image
      const link = document.createElement('a');
      link.download = `xiaohongshu-${Date.now()}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    } catch (error) {
      console.error('Export failed:', error);
    } finally {
      setIsExporting(false);
    }
  };

  const toggleTab = (tab: TabType) => {
    if (activeTab === tab) {
      setActiveTab('editor');
    } else {
      setActiveTab(tab);
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
      setActiveTab('settings');
      return;
    }

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
      const result = await enhanceContent(markdown, type, aiConfig);
      setAiResult(result);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : '未知错误';
      setAiResult(`AI 服务出错: ${errorMessage}`);
    } finally {
      setIsAiLoading(false);
    }
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

  // Reusable Sidebar Icon Component
  const NavButton = ({
    id,
    icon: Icon,
    label,
    isActive,
    onClick
  }: {
    id: TabType,
    icon: any,
    label: string,
    isActive: boolean,
    onClick: () => void
  }) => (
    <button
      onClick={onClick}
      className={`
        w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-200 group relative
        ${isActive
          ? 'bg-[#1677FF] text-white shadow-sm'
          : 'text-[#999999] hover:text-[#333333] hover:bg-[#F5F5F5]'
        }
      `}
      title={label}
    >
      <Icon size={20} strokeWidth={1.5} />
      {/* Tooltip */}
      <span className="
        absolute left-12 bg-[#333333] text-white text-xs px-2 py-1 rounded opacity-0
        group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50
        translate-x-[-5px] group-hover:translate-x-0 duration-200
      ">
        {label}
      </span>
    </button>
  );

  return (
    <div className="flex h-screen bg-white text-[#333333] overflow-hidden font-sans selection:bg-[#E5E5E5]">

      {/* 1. Sidebar Navigation - Ultra Minimal */}
      <aside className="w-[60px] bg-white flex flex-col items-center py-6 z-30 border-r border-[#E5E5E5] flex-shrink-0">
        <div className="mb-8">
           <img src="/logo.svg" alt="Logo" className="w-8 h-8" />
        </div>
        
        <nav className="flex flex-col w-full items-center gap-4">
          <NavButton
            id="editor"
            icon={PenLine}
            label="写作"
            isActive={activeTab === 'editor'}
            onClick={() => setActiveTab('editor')}
          />
          {editorMode === 'wechat' ? (
            <NavButton
              id="theme"
              icon={Palette}
              label="主题"
              isActive={activeTab === 'theme'}
              onClick={() => toggleTab('theme')}
            />
          ) : (
            <>
              <NavButton
                id="xhs-theme"
                icon={Palette}
                label="模板"
                isActive={activeTab === 'xhs-theme'}
                onClick={() => toggleTab('xhs-theme')}
              />
              <NavButton
                id="xhs-adjust"
                icon={SlidersHorizontal}
                label="调整"
                isActive={activeTab === 'xhs-adjust'}
                onClick={() => toggleTab('xhs-adjust')}
              />
            </>
          )}
          <NavButton
            id="ai"
            icon={Sparkles}
            label="智能"
            isActive={activeTab === 'ai'}
            onClick={() => toggleTab('ai')}
          />
        </nav>

        <div className="mt-auto flex flex-col gap-4 mb-2">
           <NavButton 
             id="settings" 
             icon={Settings} 
             label="设置" 
             isActive={activeTab === 'settings'} 
             onClick={() => toggleTab('settings')} 
           />
        </div>
      </aside>

      {/* 2. Side Drawer Panel - Clean & Crisp */}
      <div
        className={`
          bg-white border-r border-[#E5E5E5] flex-shrink-0 transition-all duration-300 ease-[cubic-bezier(0.25,0.1,0.25,1.0)] overflow-hidden z-20
          ${activeTab !== 'editor' ? 'w-[340px] opacity-100 translate-x-0' : 'w-0 opacity-0 -translate-x-4'}
        `}
      >
        <div className="w-[340px] h-full flex flex-col">
          {activeTab === 'theme' && (
            <ThemePanel
              themes={THEMES}
              currentTheme={currentTheme}
              onSelectTheme={setCurrentTheme}
            />
          )}

          {activeTab === 'xhs-theme' && (
            <XHSThemePanel
              currentTemplate={currentXHSTemplate}
              config={xhsConfig}
              onSelectTemplate={setCurrentXHSTemplate}
              onSelectColorVariant={(id) => handleXHSConfigChange({ colorVariantId: id })}
            />
          )}

          {activeTab === 'xhs-adjust' && (
            <XHSAdjustPanel
              config={xhsConfig}
              onConfigChange={handleXHSConfigChange}
            />
          )}
          
          {activeTab === 'ai' && (
            <div className="h-full p-6 flex flex-col">
              <header className="mb-8">
                <h2 className="text-lg font-medium text-[#333333] mb-1">智能助手</h2>
                <p className="text-sm text-[#999999] font-light">AI 驱动的写作增强工具</p>
              </header>

              {/* Warning if not configured */}
              {!aiConfigured && (
                <div className="mb-6 p-3 rounded-lg bg-amber-50 border border-amber-100 flex items-start gap-3">
                  <AlertCircle size={16} className="text-amber-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-amber-700">请先配置 AI 设置</p>
                    <button
                      onClick={() => setActiveTab('settings')}
                      className="text-xs text-amber-600 hover:text-amber-800 underline mt-1"
                    >
                      前往设置 →
                    </button>
                  </div>
                </div>
              )}

              <div className="flex flex-col gap-1">
                {[
                  { id: 'fix-markdown', icon: Wrench, title: '智能格式修复', desc: '修复 Markdown 语法错误' },
                  { id: 'polish', icon: Sparkles, title: '文章润色', desc: '优化语气与可读性' },
                  { id: 'title', icon: Type, title: '标题生成', desc: '生成 5 个吸引人的标题' },
                  { id: 'summary', icon: Wand2, title: '生成摘要', desc: '提炼核心内容' },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleAiAction(item.id as AIActionType)}
                    disabled={!aiConfigured}
                    className={`
                      group flex items-center gap-4 p-3 rounded-lg transition-all duration-200
                      text-left border border-transparent
                      ${aiConfigured
                        ? 'hover:bg-[#F5F5F5] hover:border-[#E5E5E5]'
                        : 'opacity-50 cursor-not-allowed'
                      }
                    `}
                  >
                    <div className={`transition-colors ${aiConfigured ? 'text-[#999999] group-hover:text-[#1677FF]' : 'text-[#CCCCCC]'}`}>
                      <item.icon size={18} strokeWidth={1.5} />
                    </div>
                    <div>
                      <div className={`text-sm font-medium ${aiConfigured ? 'text-[#666666] group-hover:text-[#333333]' : 'text-[#CCCCCC]'}`}>{item.title}</div>
                      <div className={`text-xs font-light ${aiConfigured ? 'text-[#999999] group-hover:text-[#666666]' : 'text-[#CCCCCC]'}`}>{item.desc}</div>
                    </div>
                  </button>
                ))}
              </div>

              <div className="mt-auto border-t border-[#E5E5E5] pt-4">
                <p className="text-xs text-[#999999] leading-relaxed font-light">
                  AI 生成内容仅供参考，请务必人工核对。
                </p>
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <SettingsPanel onConfigChange={handleAiConfigChange} />
          )}
        </div>
      </div>

      {/* 3. Main Content Area - Distraction Free */}
      <main className="flex-1 flex flex-col min-w-0 bg-white relative z-0">
        {/* Toolbar - Minimalist */}
        <header className="h-14 border-b border-[#E5E5E5] flex items-center justify-between px-8 bg-white flex-shrink-0">
          {/* Left: Mode Switch */}
          <ModeSwitch mode={editorMode} onChange={handleModeChange} />

          {/* Center: Current Theme/Template Name */}
          <div className="flex items-center gap-2 text-sm">
            <span className="text-[#999999] font-light">
              {editorMode === 'wechat' ? currentTheme.name : currentXHSTemplate.name}
            </span>
          </div>

          {/* Right: Action Button */}
          <div>
            {editorMode === 'wechat' ? (
              <button
                onClick={handleCopy}
                className={`
                  flex items-center gap-2 px-5 py-2 rounded-full text-sm font-medium transition-all duration-300
                  ${isCopied
                    ? 'bg-[#F5F5F5] text-[#333333]'
                    : 'bg-[#1677FF] text-white hover:bg-[#0958D9] hover:shadow-lg hover:-translate-y-0.5'
                  }
                `}
              >
                {isCopied ? <Check size={14} /> : <Copy size={14} />}
                {isCopied ? 'Copied' : 'Copy to WeChat'}
              </button>
            ) : (
              <button
                onClick={handleExportImage}
                disabled={isExporting}
                className={`
                  flex items-center gap-2 px-5 py-2 rounded-full text-sm font-medium transition-all duration-300
                  ${isExporting
                    ? 'bg-[#F5F5F5] text-[#999999] cursor-not-allowed'
                    : 'bg-[#FF2442] text-white hover:bg-[#E01F3D] hover:shadow-lg hover:-translate-y-0.5'
                  }
                `}
              >
                {isExporting ? <Loader2 size={14} className="animate-spin" /> : <Download size={14} />}
                {isExporting ? '导出中...' : '导出图片'}
              </button>
            )}
          </div>
        </header>

        {/* Editor & Preview Split */}
        <div className="flex-1 flex overflow-hidden">
          {/* Editor Pane */}
          <div className="flex-1 flex flex-col min-w-0 border-r border-[#E5E5E5]">
            <Editor value={markdown} onChange={setMarkdown} />
          </div>

          {/* Preview Pane */}
          <div className="flex-1 flex flex-col min-w-0 bg-[#F5F5F5] relative">
            {editorMode === 'wechat' ? (
              /* WeChat Preview */
              <div className="absolute inset-0 overflow-y-auto p-4 md:p-8 flex justify-center">
                <div className="w-full max-w-[420px] bg-white min-h-[800px] mb-20 transition-all duration-300 shadow-md border border-[#E5E5E5]">
                  <Preview
                    ref={previewRef}
                    content={markdown}
                    theme={currentTheme}
                  />
                </div>
              </div>
            ) : (
              /* XHS Preview */
              <div className="absolute inset-0 overflow-y-auto p-4 md:p-8 flex flex-col items-center">
                <div className="flex-shrink-0 transition-all duration-300 shadow-lg rounded-lg overflow-hidden">
                  <XHSPreview
                    ref={xhsPreviewRef}
                    content={markdown}
                    template={currentXHSTemplate}
                    config={xhsConfig}
                    currentPage={xhsCurrentPage}
                    onTotalPagesChange={setXHSTotalPages}
                  />
                </div>
                {xhsTotalPages > 1 && (
                  <XHSPaginator
                    currentPage={xhsCurrentPage}
                    totalPages={xhsTotalPages}
                    onPageChange={setXHSCurrentPage}
                  />
                )}
              </div>
            )}
          </div>
        </div>
      </main>

      {/* AI Result Modal - Clean */}
      {showAiModal && (
        <div className="fixed inset-0 bg-white/80 z-50 flex items-center justify-center p-4 backdrop-blur-sm transition-opacity">
          <div className="bg-white rounded-xl shadow-2xl ring-1 ring-black/5 w-full max-w-2xl overflow-hidden flex flex-col max-h-[85vh] animate-in fade-in zoom-in-95 duration-200">
            <div className="px-6 py-4 border-b border-[#E5E5E5] flex justify-between items-center">
              <h3 className="font-medium text-[#333333] flex items-center gap-2">
                {aiModalTitle.includes('格式') ? <Wrench size={16} className="text-[#999999]" /> : <Sparkles size={16} className="text-[#999999]" />}
                {aiModalTitle}
              </h3>
              <button onClick={() => setShowAiModal(false)} className="text-[#999999] hover:text-[#333333] transition-colors text-xl">
                &times;
              </button>
            </div>

            <div className="p-8 overflow-y-auto flex-1 min-h-[300px]">
              {isAiLoading ? (
                <div className="flex flex-col items-center justify-center h-full gap-4 text-[#999999]">
                  <Loader2 size={32} className="animate-spin text-[#1677FF]" strokeWidth={1.5} />
                  <p className="font-light text-sm tracking-wide">AI PROCESSING...</p>
                </div>
              ) : (
                <div className="prose prose-stone max-w-none text-[#666666] whitespace-pre-wrap leading-loose font-light">
                  {aiResult}
                </div>
              )}
            </div>

            <div className="p-6 border-t border-[#E5E5E5] bg-[#F5F5F5]/50 flex justify-end gap-4">
              <button
                onClick={() => setShowAiModal(false)}
                className="px-4 py-2 text-[#666666] hover:text-[#333333] text-sm font-medium transition-colors"
              >
                取消
              </button>
              {!isAiLoading && aiResult && (
                <button
                  onClick={applyAiContent}
                  className="px-6 py-2 bg-[#1677FF] hover:bg-[#0958D9] text-white rounded-lg text-sm font-medium transition-all shadow-sm hover:shadow-md"
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