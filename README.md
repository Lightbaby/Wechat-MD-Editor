<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# 微信公众号 Markdown 编辑器

一款优雅的微信公众号排版工具，支持多种主题样式和 AI 辅助写作。

## ✨ 功能特性

- 📝 **Markdown 编辑** - 实时预览，所见即所得
- 🎨 **多主题支持** - 内置多种精美主题样式
- 🤖 **AI 辅助写作** - 支持文章润色、标题生成、摘要提取、格式修复
- 📋 **一键复制** - 直接粘贴到微信公众号后台

## 🚀 快速开始

### 本地运行

**前置条件**: Node.js 18+

```bash
# 1. 安装依赖
npm install

# 2. 启动开发服务器
npm run dev

# 3. 打开浏览器访问 http://localhost:3000
```

### 配置 AI 功能

本应用支持所有 **OpenAI 兼容** 的 API 服务：

1. 点击左侧边栏的 **设置** 图标
2. 填写你的 API 配置：
   - **API Key**: 你的 API 密钥
   - **API 端点**: API 服务地址（支持 OpenAI、DeepSeek、Moonshot、通义千问、智谱 GLM 等）
   - **模型**: 选择要使用的模型

> 💡 配置仅保存在本地浏览器的 localStorage 中，不会上传到任何服务器。

## 🔗 支持的 API 服务

| 服务 | 端点 |
|------|------|
| OpenAI | `https://api.openai.com/v1` |
| OpenRouter | `https://openrouter.ai/api/v1` |
| DeepSeek | `https://api.deepseek.com/v1` |
| Moonshot | `https://api.moonshot.cn/v1` |
| 通义千问 | `https://dashscope.aliyuncs.com/compatible-mode/v1` |
| 智谱 GLM | `https://open.bigmodel.cn/api/paas/v4` |
| SiliconFlow | `https://api.siliconflow.cn/v1` |

> 💡 **OpenRouter** 是一个 API 聚合平台，可通过一个端点访问 400+ AI 模型（OpenAI、Anthropic、Google 等）

## ☁️ 部署到 Cloudflare Pages

本项目是纯前端应用，非常适合部署到 Cloudflare Pages：

### 方式一：通过 Git 仓库

1. 将代码推送到 GitHub/GitLab
2. 登录 [Cloudflare Dashboard](https://dash.cloudflare.com/) → Pages → Create a project
3. 连接你的 Git 仓库
4. 配置构建设置：
   - **Framework preset**: `Vite`
   - **Build command**: `npm run build`
   - **Build output directory**: `dist`

### 方式二：使用 Wrangler CLI

```bash
# 安装 wrangler
npm install -g wrangler

# 登录 Cloudflare
wrangler login

# 构建并部署
npm run build
wrangler pages deploy dist --project-name=wechat-md-editor
```

## 🛠️ 技术栈

- **框架**: React 19 + TypeScript
- **构建工具**: Vite 6
- **样式**: Tailwind CSS
- **图标**: Lucide React
- **AI**: OpenAI 兼容 API（原生 fetch）

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
- [x] 主题切换
- [x] AI 辅助写作
- [x] 用户自定义 AI 配置
- [x] Cloudflare Pages 部署支持
- [ ] 更多主题样式
- [ ] 图片上传支持
- [ ] 历史记录功能

## 📄 License

MIT
