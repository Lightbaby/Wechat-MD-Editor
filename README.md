<div align="center">
  <img src="public/logo.svg" alt="WeChat MD Editor Logo" width="120" height="120" />
  
  <h1>微信公众号 Markdown 编辑器</h1>
  
  <p>一款优雅的微信公众号排版工具，支持多种主题样式和 AI 辅助写作。</p>
  
  <p>
    <a href="https://wechat-md-editor.pages.dev">🔗 在线体验</a>
  </p>
</div>

## ✨ 功能特性

- 📝 **Markdown 编辑** - 实时预览，所见即所得
- 🎨 **多主题支持** - 内置 14+ 精美主题样式
- 🤖 **AI 辅助写作** - 支持文章润色、标题生成、摘要提取、格式修复
- 📋 **一键复制** - 直接粘贴到微信公众号后台
- 🔒 **隐私安全** - 所有数据仅保存在本地浏览器

## 🚀 本地开发

**前置条件**: Node.js 18+

```bash
# 克隆仓库
git clone https://github.com/Lightbaby/Wechat-MD-Editor.git
cd Wechat-MD-Editor

# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 打开浏览器访问 http://localhost:3000
```

## 🤖 配置 AI 功能

本应用支持所有 **OpenAI 兼容** 的 API 服务：

1. 点击左侧边栏的 **设置** 图标
2. 填写你的 API 配置：
   - **API Key**: 你的 API 密钥
   - **API 端点**: API 服务地址
   - **模型**: 输入模型 ID

> 💡 配置仅保存在本地浏览器的 localStorage 中，不会上传到任何服务器。

### 支持的 API 服务

| 服务 | 端点 |
|------|------|
| OpenAI | `https://api.openai.com/v1` |
| OpenRouter | `https://openrouter.ai/api/v1` |
| DeepSeek | `https://api.deepseek.com/v1` |
| Moonshot | `https://api.moonshot.cn/v1` |
| 通义千问 | `https://dashscope.aliyuncs.com/compatible-mode/v1` |
| 智谱 GLM | `https://open.bigmodel.cn/api/paas/v4` |
| SiliconFlow | `https://api.siliconflow.cn/v1` |

> 💡 **OpenRouter** 是一个 API 聚合平台，可通过一个端点访问 400+ AI 模型

## 🛠️ 技术栈

- **框架**: React 19 + TypeScript
- **构建工具**: Vite 6
- **样式**: Tailwind CSS
- **图标**: Lucide React
- **AI**: OpenAI 兼容 API

## 📁 项目结构

```
wechat-md-editor/
├── components/
│   ├── Editor.tsx        # Markdown 编辑器
│   ├── Preview.tsx       # 预览组件
│   ├── ThemePanel.tsx    # 主题选择面板
│   └── SettingsPanel.tsx # AI 设置面板
├── services/
│   └── aiService.ts      # OpenAI 兼容 API 服务
├── App.tsx               # 主应用组件
├── types.ts              # 类型定义
├── constants.ts          # 常量和主题配置
└── index.tsx             # 入口文件
```

## 🎯 路线图

- [x] 基础编辑器功能
- [x] 主题切换（14+ 主题）
- [x] AI 辅助写作
- [x] 用户自定义 AI 配置
- [ ] 更多主题样式
- [ ] 图片上传支持
- [ ] 历史记录功能

## 📄 License

MIT
