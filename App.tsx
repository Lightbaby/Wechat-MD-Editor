import React, { useState, useRef, useCallback } from 'react';
import { THEMES, DEFAULT_MARKDOWN } from './constants';
import { Theme, AIActionType } from './types';
import Editor from './components/Editor';
import Preview from './components/Preview';
import { enhanceContent } from './services/geminiService';
import { 
  Sparkles, 
  Copy, 
  Check, 
  Paintbrush, 
  Type, 
  FileText, 
  Wand2,
  Loader2,
  Wrench,
  ScanFace
} from 'lucide-react';

const App: React.FC = () => {
  const [markdown, setMarkdown] = useState<string>(DEFAULT_MARKDOWN);
  const [currentTheme, setCurrentTheme] = useState<Theme>(THEMES[0]);
  const [isCopied, setIsCopied] = useState(false);
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [aiResult, setAiResult] = useState<string | null>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const [showAiModal, setShowAiModal] = useState(false);
  const [aiModalTitle, setAiModalTitle] = useState("");

  const handleCopy = useCallback(async () => {
    if (previewRef.current) {
      try {
        // 获取预览区域的 HTML 内容
        const htmlContent = previewRef.current.innerHTML;
        // 获取纯文本内容作为后备
        const textContent = previewRef.current.innerText || '';
        
        // 使用现代 Clipboard API 写入富文本
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
          // 降级方案：使用旧的 execCommand（兼容旧浏览器）
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
        // 错误时也尝试降级方案
        try {
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
        } catch (fallbackErr) {
          console.error('Fallback copy also failed', fallbackErr);
        }
      }
    }
  }, []);

  const handleAiAction = async (type: AIActionType) => {
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
      const result = await enhanceContent(markdown, type);
      setAiResult(result);
    } catch (error) {
      setAiResult("AI 服务暂时不可用，请检查网络或 API Key 设置。");
    } finally {
      setIsAiLoading(false);
    }
  };

  const applyAiContent = () => {
    if (aiResult) {
        // If it's a title or summary, we might just append it or copy it. 
        // For simplicity, if it's 'polish' or 'grammar' or 'fix-markdown', we replace the text.
        // If it's title/summary, we append to the top.
        if (aiModalTitle.includes('标题') || aiModalTitle.includes('摘要')) {
             setMarkdown(`${aiResult}\n\n---\n\n${markdown}`);
        } else {
             setMarkdown(aiResult);
        }
        setShowAiModal(false);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100 text-slate-800">
      {/* Header / Toolbar */}
      <header className="flex-none bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between shadow-sm z-10">
        <div className="flex items-center gap-3">
          <div className="bg-gradient-to-br from-green-500 to-emerald-600 text-white p-2 rounded-lg">
            <FileText size={20} />
          </div>
          <h1 className="text-lg font-bold text-gray-800 hidden md:block">公众号排版神器</h1>
        </div>

        <div className="flex items-center gap-4 flex-1 justify-end min-w-0">
            {/* Theme Selector */}
            <div className="flex items-center gap-2 mr-2 overflow-hidden flex-shrink">
                <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider hidden xl:inline">Theme</span>
                <div className="flex bg-gray-100 p-1 rounded-lg overflow-x-auto no-scrollbar gap-1 max-w-[150px] sm:max-w-[300px] md:max-w-[400px] xl:max-w-none">
                    {THEMES.map((theme) => (
                        <button
                            key={theme.id}
                            onClick={() => setCurrentTheme(theme)}
                            className={`px-3 py-1.5 text-sm rounded-md transition-all flex-shrink-0 flex items-center gap-2 ${
                                currentTheme.id === theme.id 
                                ? 'bg-white shadow-sm text-gray-900 font-medium' 
                                : 'text-gray-500 hover:text-gray-700'
                            }`}
                        >
                            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: theme.colors.primary }}></div>
                            <span className="hidden sm:inline whitespace-nowrap">{theme.name}</span>
                        </button>
                    ))}
                </div>
            </div>

            {/* AI Tools */}
            <div className="flex items-center gap-2 border-l pl-4 border-gray-200 flex-shrink-0">
                <button 
                    onClick={() => handleAiAction('fix-markdown')}
                    className="p-2 hover:bg-emerald-50 text-emerald-600 rounded-md transition-colors tooltip flex items-center gap-2"
                    title="智能格式修复 (自动修复语法并优化结构)"
                >
                    <Wrench size={18} />
                    <span className="text-xs font-medium hidden lg:inline">智能格式</span>
                </button>
                <div className="h-6 w-px bg-gray-200 mx-1"></div>
                <button 
                    onClick={() => handleAiAction('polish')}
                    className="p-2 hover:bg-purple-50 text-purple-600 rounded-md transition-colors tooltip"
                    title="AI 润色"
                >
                    <Sparkles size={18} />
                </button>
                <button 
                    onClick={() => handleAiAction('title')}
                    className="p-2 hover:bg-blue-50 text-blue-600 rounded-md transition-colors"
                    title="生成标题"
                >
                    <Type size={18} />
                </button>
                <button 
                    onClick={() => handleAiAction('summary')}
                    className="p-2 hover:bg-amber-50 text-amber-600 rounded-md transition-colors"
                    title="生成摘要"
                >
                    <Wand2 size={18} />
                </button>
            </div>

            {/* Action Buttons */}
            <div className="ml-4 flex-shrink-0">
                <button
                    onClick={handleCopy}
                    className={`flex items-center gap-2 px-5 py-2 rounded-lg font-medium transition-all transform active:scale-95 whitespace-nowrap ${
                        isCopied 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-gray-900 text-white hover:bg-gray-800 shadow-md hover:shadow-lg'
                    }`}
                >
                    {isCopied ? <Check size={18} /> : <Copy size={18} />}
                    {isCopied ? '已复制 (防丢格式)' : '复制到公众号'}
                </button>
            </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 flex overflow-hidden">
        {/* Editor Pane */}
        <div className="flex-1 border-r border-gray-200 flex flex-col min-w-0">
            <div className="bg-gray-50 border-b border-gray-200 px-4 py-2 text-xs font-mono text-gray-400 uppercase">
                Markdown Source
            </div>
            <Editor value={markdown} onChange={setMarkdown} />
        </div>

        {/* Preview Pane */}
        <div className="flex-1 bg-gray-100 flex flex-col min-w-0 overflow-hidden relative">
             <div className="bg-white border-b border-gray-200 px-4 py-2 text-xs font-mono text-gray-400 uppercase flex justify-between">
                <span>Preview (WeChat Style)</span>
                <span style={{ color: currentTheme.colors.primary }}>{currentTheme.name} Mode</span>
            </div>
            <div className="flex-1 overflow-y-auto p-4 md:p-8 flex justify-center">
                {/* Phone Simulator Container */}
                <div className="w-full max-w-[480px] bg-white shadow-xl min-h-[800px] mb-20 transition-all duration-300">
                    <Preview 
                        ref={previewRef} 
                        content={markdown} 
                        theme={currentTheme} 
                    />
                </div>
            </div>
        </div>
      </main>

      {/* AI Modal */}
      {showAiModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[80vh]">
                <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
                    <h3 className="font-semibold text-gray-800 flex items-center gap-2">
                        {aiModalTitle.includes('格式') ? <Wrench size={16} className="text-emerald-500"/> : <Sparkles size={16} className="text-purple-500"/>}
                        {aiModalTitle}
                    </h3>
                    <button onClick={() => setShowAiModal(false)} className="text-gray-400 hover:text-gray-600">
                        &times;
                    </button>
                </div>
                
                <div className="p-6 overflow-y-auto flex-1">
                    {isAiLoading ? (
                        <div className="flex flex-col items-center justify-center py-12 gap-4 text-gray-500">
                            <Loader2 size={32} className="animate-spin text-purple-500" />
                            <p>Gemini 正在分析您的文章结构...</p>
                        </div>
                    ) : (
                        <div className="prose prose-sm max-w-none text-gray-700 whitespace-pre-wrap">
                            {aiResult}
                        </div>
                    )}
                </div>

                <div className="p-4 border-t border-gray-100 bg-gray-50 flex justify-end gap-3">
                    <button 
                        onClick={() => setShowAiModal(false)}
                        className="px-4 py-2 text-gray-600 hover:bg-gray-200 rounded-lg text-sm font-medium transition-colors"
                    >
                        关闭
                    </button>
                    {!isAiLoading && aiResult && (
                         <button 
                            onClick={applyAiContent}
                            className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg text-sm font-medium transition-colors flex items-center gap-2"
                        >
                            <Check size={16} />
                            应用修改
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