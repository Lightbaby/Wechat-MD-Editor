import React from 'react';
import { Theme } from '../types';
import { Check } from 'lucide-react';

interface ThemePanelProps {
  themes: Theme[];
  currentTheme: Theme;
  onSelectTheme: (theme: Theme) => void;
}

const ThemePanel: React.FC<ThemePanelProps> = ({ themes, currentTheme, onSelectTheme }) => {
  return (
    <div className="h-full overflow-y-auto p-6 no-scrollbar">
      <header className="mb-8">
        <h2 className="text-lg font-medium text-[#333333] mb-1">主题库</h2>
        <p className="text-sm text-[#999999] font-light">选择一种风格以开始</p>
      </header>

      <div className="grid grid-cols-1 gap-3">
        {themes.map((theme) => (
          <button
            key={theme.id}
            onClick={() => onSelectTheme(theme)}
            className={`
              relative group flex items-center justify-between p-3 rounded-lg transition-all duration-200
              border hover:border-[#CCCCCC]
              ${currentTheme.id === theme.id
                ? 'bg-[#F5F5F5] border-[#E5E5E5] ring-1 ring-[#1677FF]'
                : 'bg-white border-[#E5E5E5]'
              }
            `}
          >
            <div className="flex items-center gap-4">
              {/* Minimal Palette Preview */}
              <div className="flex -space-x-2">
                <div className="w-6 h-6 rounded-full border-2 border-white shadow-sm" style={{ backgroundColor: theme.colors.primary }} />
                <div className="w-6 h-6 rounded-full border-2 border-white shadow-sm" style={{ backgroundColor: theme.colors.secondary }} />
                <div className="w-6 h-6 rounded-full border-2 border-white shadow-sm" style={{ backgroundColor: theme.colors.heading }} />
              </div>

              <span className={`text-sm font-medium ${currentTheme.id === theme.id ? 'text-[#333333]' : 'text-[#666666] group-hover:text-[#333333]'}`}>
                {theme.name}
              </span>
            </div>

            {currentTheme.id === theme.id && (
              <div className="text-[#1677FF]">
                <Check size={14} strokeWidth={2} />
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ThemePanel;