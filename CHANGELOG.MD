# 更新日志

所有重要的项目变更都会记录在此文件中。

格式遵循 [Keep a Changelog](https://keepachangelog.com/zh-CN/1.0.0/)，
版本号遵循 [Semantic Versioning](https://semver.org/lang/zh-CN/)。

---

## [Unreleased]

### Added
- **AI 设置面板** - 用户可自行配置 API Key、API 端点和模型
  - 新增 `components/SettingsPanel.tsx` - 设置界面组件
  - 支持多种 OpenAI 兼容 API（OpenAI、OpenRouter、DeepSeek、Moonshot、通义千问、智谱 GLM、SiliconFlow 等）
  - 预设常用 API 端点快速选择
  - 配置保存在 localStorage，安全存储在本地
- 新增 `services/aiService.ts` - OpenAI SDK 兼容的 AI 服务
- 新增 OpenRouter 支持 - API 聚合平台，可访问 400+ AI 模型

### Changed
- **AI 服务重构** - 从 Gemini SDK 迁移到 OpenAI 兼容格式
  - 移除 `@google/genai` 依赖
  - 删除 `services/geminiService.ts`
  - 使用原生 fetch 调用 OpenAI 兼容 API
- **配置方式变更** - 无需环境变量，前端用户自行配置
  - 移除 `vite.config.ts` 中的环境变量注入
  - 无需 `.env.local` 文件
  - 适合部署到 Cloudflare Pages 等静态托管平台

### Removed
- 移除 `@google/genai` 依赖
- 移除 Gemini API 相关代码

---

## [0.1.0] - 2025-11-28

### Added
- 初始化 Cursor Rules 配置
  - 创建 `.cursor/rules/` 目录
  - 添加 `changlogs.mdc` - 自动记录更新日志规则
  - 添加 `git-commit.mdc` - Git 提交规范
  - 添加 `progress.mdc` - 进度文档同步规范
  - 添加 `script-docstring.mdc` - Python 脚本文档规范
  - 创建 `CHANGELOG.MD` 文件

---

## 日志格式说明

### 变更类型

- **Added** - 新增功能
- **Changed** - 功能变更
- **Deprecated** - 即将废弃的功能
- **Removed** - 已删除的功能
- **Fixed** - Bug 修复
- **Security** - 安全相关修复

### 示例格式

```markdown
## [1.0.0] - 2025-11-28

### Added
- 新增用户邀请功能
- 添加积分奖励系统

### Fixed
- 修复用户列表排序错误
- 修复登录状态异常问题
```

