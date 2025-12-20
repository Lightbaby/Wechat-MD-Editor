import React from 'react';
import { EditorMode } from '../types';

interface ModeSwitchProps {
  mode: EditorMode;
  onChange: (mode: EditorMode) => void;
}

const ModeSwitch: React.FC<ModeSwitchProps> = ({ mode, onChange }) => {
  return (
    <div className="flex items-center bg-[#F5F5F5] rounded-lg p-1">
      <button
        onClick={() => onChange('wechat')}
        className={`
          flex items-center gap-2 px-4 py-1.5 rounded-md text-sm font-medium transition-all duration-200
          ${mode === 'wechat'
            ? 'bg-white text-[#333333] shadow-sm'
            : 'text-[#999999] hover:text-[#666666]'
          }
        `}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M8.5 11C9.32843 11 10 10.3284 10 9.5C10 8.67157 9.32843 8 8.5 8C7.67157 8 7 8.67157 7 9.5C7 10.3284 7.67157 11 8.5 11Z"
            fill={mode === 'wechat' ? '#07C160' : 'currentColor'}
          />
          <path
            d="M15.5 11C16.3284 11 17 10.3284 17 9.5C17 8.67157 16.3284 8 15.5 8C14.6716 8 14 8.67157 14 9.5C14 10.3284 14.6716 11 15.5 11Z"
            fill={mode === 'wechat' ? '#07C160' : 'currentColor'}
          />
          <path
            d="M12 2C6.47715 2 2 6.02944 2 11C2 13.6227 3.23053 15.9801 5.19838 17.5711L4.5 21L8.5 19.5C9.60947 19.8294 10.7847 20 12 20C17.5228 20 22 15.9706 22 11C22 6.02944 17.5228 2 12 2Z"
            stroke={mode === 'wechat' ? '#07C160' : 'currentColor'}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
        </svg>
        <span>公众号</span>
      </button>

      <button
        onClick={() => onChange('xiaohongshu')}
        className={`
          flex items-center gap-2 px-4 py-1.5 rounded-md text-sm font-medium transition-all duration-200
          ${mode === 'xiaohongshu'
            ? 'bg-white text-[#333333] shadow-sm'
            : 'text-[#999999] hover:text-[#666666]'
          }
        `}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect
            x="3" y="3" width="18" height="18" rx="4"
            stroke={mode === 'xiaohongshu' ? '#FF2442' : 'currentColor'}
            strokeWidth="2"
            fill="none"
          />
          <path
            d="M12 7V17M7 12H17"
            stroke={mode === 'xiaohongshu' ? '#FF2442' : 'currentColor'}
            strokeWidth="2.5"
            strokeLinecap="round"
          />
        </svg>
        <span>小红书</span>
      </button>
    </div>
  );
};

export default ModeSwitch;
