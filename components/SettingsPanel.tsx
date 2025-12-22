import React, { useState, useEffect } from 'react';
import { AIConfig, DEFAULT_AI_CONFIG, saveAIConfig, loadAIConfig, isAIConfigured } from '../types';
import { Key, Globe, Cpu, Check, AlertCircle, Eye, EyeOff } from 'lucide-react';

interface SettingsPanelProps {
  onConfigChange?: (config: AIConfig) => void;
}

const SettingsPanel: React.FC<SettingsPanelProps> = ({ onConfigChange }) => {
  const [config, setConfig] = useState<AIConfig>(DEFAULT_AI_CONFIG);
  const [showApiKey, setShowApiKey] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const loaded = loadAIConfig();
    setConfig(loaded);
  }, []);

  const handleChange = (field: keyof AIConfig, value: string) => {
    const newConfig = { ...config, [field]: value };
    setConfig(newConfig);
  };

  const handleSave = () => {
    saveAIConfig(config);
    onConfigChange?.(config);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const isConfigured = isAIConfigured(config);

  // 预设的 API 端点
  const presetEndpoints = [
    { label: 'OpenAI', url: 'https://api.openai.com/v1' },
    { label: 'OpenRouter', url: 'https://openrouter.ai/api/v1' },
    { label: 'DeepSeek', url: 'https://api.deepseek.com/v1' },
    { label: 'Moonshot', url: 'https://api.moonshot.cn/v1' },
    { label: 'Qwen', url: 'https://dashscope.aliyuncs.com/compatible-mode/v1' },
    { label: '智谱 GLM', url: 'https://open.bigmodel.cn/api/paas/v4' },
    { label: 'SiliconFlow', url: 'https://api.siliconflow.cn/v1' },
  ];

  return (
    <div className="h-full overflow-y-auto p-6 no-scrollbar">
      <header className="mb-8">
        <h2 className="text-lg font-medium text-text-main mb-1">AI 设置</h2>
        <p className="text-sm text-text-sub font-light">配置 OpenAI 兼容的 API</p>
      </header>

      {/* Status Indicator */}
      <div className={`
        mb-6 p-3 rounded-lg flex items-center gap-3 text-sm
        ${isConfigured 
          ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' 
          : 'bg-amber-50 text-amber-700 border border-amber-100'
        }
      `}>
        {isConfigured ? (
          <>
            <Check size={16} />
            <span>AI 已配置，可以使用智能功能</span>
          </>
        ) : (
          <>
            <AlertCircle size={16} />
            <span>请配置 API 以启用 AI 功能</span>
          </>
        )}
      </div>

      <div className="space-y-6">
        {/* API Key */}
        <div>
          <label className="flex items-center gap-2 text-sm font-medium text-text-main mb-2">
            <Key size={14} className="text-text-sub" />
            API Key
          </label>
          <div className="relative">
            <input
              type={showApiKey ? 'text' : 'password'}
              value={config.apiKey}
              onChange={(e) => handleChange('apiKey', e.target.value)}
              placeholder="sk-..."
              className="
                w-full px-3 py-2.5 pr-10 rounded-lg border border-border-light text-sm text-text-main
                focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand
                placeholder:text-text-sub transition-all
                bg-bg-panel
              "
            />
            <button
              type="button"
              onClick={() => setShowApiKey(!showApiKey)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-text-sub hover:text-text-main"
            >
              {showApiKey ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
          <p className="mt-1.5 text-xs text-text-sub">
            密钥仅保存在本地浏览器，不会上传到任何服务器
          </p>
        </div>

        {/* API URL */}
        <div>
          <label className="flex items-center gap-2 text-sm font-medium text-text-main mb-2">
            <Globe size={14} className="text-text-sub" />
            API 端点
          </label>
          <input
            type="text"
            value={config.apiUrl}
            onChange={(e) => handleChange('apiUrl', e.target.value)}
            placeholder="https://api.openai.com/v1"
            className="
              w-full px-3 py-2.5 rounded-lg border border-border-light text-sm text-text-main
              focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand
              placeholder:text-text-sub transition-all
              bg-bg-panel
            "
          />
          {/* Preset Endpoints */}
          <div className="mt-2 flex flex-wrap gap-1.5">
            {presetEndpoints.map((preset) => (
              <button
                key={preset.label}
                onClick={() => handleChange('apiUrl', preset.url)}
                className={`
                  px-2 py-1 text-xs rounded-md transition-all
                  ${config.apiUrl === preset.url
                    ? 'bg-text-main text-white'
                    : 'bg-bg-hover text-text-sub hover:bg-border-light'
                  }
                `}
              >
                {preset.label}
              </button>
            ))}
          </div>
        </div>

        {/* Model */}
        <div>
          <label className="flex items-center gap-2 text-sm font-medium text-text-main mb-2">
            <Cpu size={14} className="text-text-sub" />
            模型
          </label>
          <input
            type="text"
            value={config.model}
            onChange={(e) => handleChange('model', e.target.value)}
            placeholder="输入模型 ID，如 gpt-4o-mini"
            className="
              w-full px-3 py-2.5 rounded-lg border border-border-light text-sm text-text-main
              focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand
              placeholder:text-text-sub transition-all
              bg-bg-panel
            "
          />
          <p className="mt-1.5 text-xs text-text-sub">
            请从服务商官网获取正确的模型 ID
          </p>
        </div>

        {/* Save Button */}
        <button
          onClick={handleSave}
          className={`
            w-full py-2.5 rounded-lg text-sm font-medium transition-all duration-300
            ${saved
              ? 'bg-emerald-500 text-white'
              : 'bg-brand text-white hover:bg-brand-hover shadow-elevation-1 hover:shadow-elevation-2'
            }
          `}
        >
          {saved ? (
            <span className="flex items-center justify-center gap-2">
              <Check size={16} />
              已保存
            </span>
          ) : (
            '保存设置'
          )}
        </button>
      </div>

      {/* Footer */}
      <div className="mt-8 pt-4 border-t border-border-light">
        <p className="text-xs text-text-sub leading-relaxed font-light">
          支持所有 OpenAI 兼容的 API，包括 OpenRouter、DeepSeek、Moonshot、通义千问、智谱 GLM 等。
        </p>
      </div>
    </div>
  );
};

export default SettingsPanel;

