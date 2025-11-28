# 更新日志

所有重要的项目变更都会记录在此文件中。

格式遵循 [Keep a Changelog](https://keepachangelog.com/zh-CN/1.0.0/)，
版本号遵循 [Semantic Versioning](https://semver.org/lang/zh-CN/)。

---

## [Unreleased]

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

