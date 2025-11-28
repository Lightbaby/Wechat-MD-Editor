import React, { useState, useRef, useCallback } from 'react';
import { THEMES, DEFAULT_MARKDOWN } from './constants';
import { Theme, AIActionType } from './types';
import Editor from './components/Editor';
import Preview from './components/Preview';
import ThemePanel from './components/ThemePanel';
import { enhanceContent } from './services/geminiService';
import { 
  Sparkles, 
  Copy, 
  Check, 
  Palette, 
  PenLine,
  Settings,
  ChevronRight,
  Wrench,
  Type,
  Wand2,
  Loader2,
  Command
} from 'lucide-react';

type TabType = 'editor' | 'theme' | 'ai';

const App: React.FC = () => {
  const [markdown, setMarkdown] = useState<string>(DEFAULT_MARKDOWN);
  const [currentTheme, setCurrentTheme] = useState<Theme>(THEMES[0]);
  const [activeTab, setActiveTab] = useState<TabType>('theme'); 
  const [isCopied, setIsCopied] = useState(false);
  
  // AI State
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [aiResult, setAiResult] = useState<string | null>(null);
  const [showAiModal, setShowAiModal] = useState(false);
  const [aiModalTitle, setAiModalTitle] = useState("");
  
  const previewRef = useRef<HTMLDivElement>(null);

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
          ? 'bg-gray-900 text-white shadow-sm' 
          : 'text-gray-400 hover:text-gray-900 hover:bg-gray-100'
        }
      `}
      title={label}
    >
      <Icon size={20} strokeWidth={1.5} />
      {/* Tooltip */}
      <span className="
        absolute left-12 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 
        group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50
        translate-x-[-5px] group-hover:translate-x-0 duration-200
      ">
        {label}
      </span>
    </button>
  );

  return (
    <div className="flex h-screen bg-white text-slate-800 overflow-hidden font-sans selection:bg-gray-200">
      
      {/* 1. Sidebar Navigation - Ultra Minimal */}
      <aside className="w-[60px] bg-white flex flex-col items-center py-6 z-30 border-r border-gray-100 flex-shrink-0">
        <div className="mb-8 text-gray-900">
           <Command size={24} strokeWidth={1.5} />
        </div>
        
        <nav className="flex flex-col w-full items-center gap-4">
          <NavButton 
            id="editor" 
            icon={PenLine} 
            label="写作" 
            isActive={activeTab === 'editor'} 
            onClick={() => setActiveTab('editor')} 
          />
          <NavButton 
            id="theme" 
            icon={Palette} 
            label="主题" 
            isActive={activeTab === 'theme'} 
            onClick={() => toggleTab('theme')} 
          />
          <NavButton 
            id="ai" 
            icon={Sparkles} 
            label="智能" 
            isActive={activeTab === 'ai'} 
            onClick={() => toggleTab('ai')} 
          />
        </nav>

        <div className="mt-auto flex flex-col gap-4 mb-2">
           <button className="w-10 h-10 flex items-center justify-center rounded-lg text-gray-400 hover:text-gray-900 hover:bg-gray-100 transition-colors">
             <Settings size={20} strokeWidth={1.5} />
           </button>
        </div>
      </aside>

      {/* 2. Side Drawer Panel - Clean & Crisp */}
      <div 
        className={`
          bg-white border-r border-gray-100 flex-shrink-0 transition-all duration-300 ease-[cubic-bezier(0.25,0.1,0.25,1.0)] overflow-hidden z-20
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
          
          {activeTab === 'ai' && (
            <div className="h-full p-6 flex flex-col">
               <header className="mb-8">
                 <h2 className="text-lg font-medium text-gray-900 mb-1">智能助手</h2>
                 <p className="text-sm text-gray-500 font-light">Gemini 驱动的写作增强工具</p>
               </header>
               
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
                      className="
                        group flex items-center gap-4 p-3 rounded-lg transition-all duration-200
                        hover:bg-gray-50 text-left border border-transparent hover:border-gray-100
                      "
                    >
                        <div className="text-gray-400 group-hover:text-gray-900 transition-colors">
                          <item.icon size={18} strokeWidth={1.5} />
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-700 group-hover:text-gray-900">{item.title}</div>
                          <div className="text-xs text-gray-400 group-hover:text-gray-500 font-light">{item.desc}</div>
                        </div>
                    </button>
                  ))}
               </div>

               <div className="mt-auto border-t border-gray-100 pt-4">
                  <p className="text-xs text-gray-400 leading-relaxed font-light">
                    AI 生成内容仅供参考，请务必人工核对。
                  </p>
               </div>
            </div>
          )}
        </div>
      </div>

      {/* 3. Main Content Area - Distraction Free */}
      <main className="flex-1 flex flex-col min-w-0 bg-white relative z-0">
        {/* Toolbar - Minimalist */}
        <header className="h-14 border-b border-gray-100 flex items-center justify-between px-8 bg-white flex-shrink-0">
           <div className="flex items-center gap-2 text-sm">
              <span className="font-medium text-gray-900">WeChat Editor</span>
              <span className="text-gray-300">/</span>
              <span className="text-gray-500 font-light">{currentTheme.name}</span>
           </div>
           
           <div>
              <button
                  onClick={handleCopy}
                  className={`
                    flex items-center gap-2 px-5 py-2 rounded-full text-sm font-medium transition-all duration-300
                    ${isCopied 
                      ? 'bg-gray-100 text-gray-900' 
                      : 'bg-gray-900 text-white hover:bg-gray-800 hover:shadow-lg hover:-translate-y-0.5'
                    }
                  `}
              >
                  {isCopied ? <Check size={14} /> : <Copy size={14} />}
                  {isCopied ? 'Copied' : 'Copy to WeChat'}
              </button>
           </div>
        </header>

        {/* Editor & Preview Split */}
        <div className="flex-1 flex overflow-hidden">
           {/* Editor Pane */}
           <div className="flex-1 flex flex-col min-w-0 border-r border-gray-100">
              <Editor value={markdown} onChange={setMarkdown} />
           </div>
           
           {/* Preview Pane */}
           <div className="flex-1 flex flex-col min-w-0 bg-[#f9f9f9] relative">
              <div className="absolute inset-0 overflow-y-auto p-4 md:p-8 flex justify-center">
                   <div className="w-full max-w-[420px] bg-white min-h-[800px] mb-20 transition-all duration-300 shadow-sm border border-gray-200/50">
                        <Preview 
                            ref={previewRef} 
                            content={markdown} 
                            theme={currentTheme} 
                        />
                   </div>
              </div>
           </div>
        </div>
      </main>

      {/* AI Result Modal - Clean */}
      {showAiModal && (
        <div className="fixed inset-0 bg-white/80 z-50 flex items-center justify-center p-4 backdrop-blur-sm transition-opacity">
            <div className="bg-white rounded-xl shadow-2xl ring-1 ring-black/5 w-full max-w-2xl overflow-hidden flex flex-col max-h-[85vh] animate-in fade-in zoom-in-95 duration-200">
                <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
                    <h3 className="font-medium text-gray-900 flex items-center gap-2">
                        {aiModalTitle.includes('格式') ? <Wrench size={16} className="text-gray-400"/> : <Sparkles size={16} className="text-gray-400"/>}
                        {aiModalTitle}
                    </h3>
                    <button onClick={() => setShowAiModal(false)} className="text-gray-400 hover:text-gray-900 transition-colors">
                        &times;
                    </button>
                </div>
                
                <div className="p-8 overflow-y-auto flex-1 min-h-[300px]">
                    {isAiLoading ? (
                        <div className="flex flex-col items-center justify-center h-full gap-4 text-gray-400">
                            <Loader2 size={32} className="animate-spin text-gray-900" strokeWidth={1.5} />
                            <p className="font-light text-sm tracking-wide">AI PROCESSING...</p>
                        </div>
                    ) : (
                        <div className="prose prose-stone max-w-none text-gray-600 whitespace-pre-wrap leading-loose font-light">
                            {aiResult}
                        </div>
                    )}
                </div>

                <div className="p-6 border-t border-gray-50 bg-gray-50/50 flex justify-end gap-4">
                    <button 
                        onClick={() => setShowAiModal(false)}
                        className="px-4 py-2 text-gray-500 hover:text-gray-900 text-sm font-medium transition-colors"
                    >
                        Cancel
                    </button>
                    {!isAiLoading && aiResult && (
                         <button 
                            onClick={applyAiContent}
                            className="px-6 py-2 bg-gray-900 hover:bg-black text-white rounded-lg text-sm font-medium transition-all shadow-sm hover:shadow-md"
                        >
                            Apply Changes
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