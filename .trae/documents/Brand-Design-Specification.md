# AI词汇大师 - 品牌设计规范手册

## 一、品牌概述

### 1.1 品牌定位

**品牌名称**：AI词汇大师

**品牌标语**：智能记忆，让每个单词过目不忘

**品牌定位**：新一代AI智能背单词应用，将先进的大语言模型技术融入传统记忆法，为用户打造个性化、有趣、高效的词汇学习体验。

### 1.2 品牌个性

| 特质 | 描述 | 表达方式 |
|------|------|----------|
| **智能** | 科技感强，AI赋能 | 使用科技蓝、渐变色、几何图形 |
| **温暖** | 亲切友好，以用户为中心 | 圆润边角、暖色调、流畅动效 |
| **专业** | 科学方法，系统学习 | 清晰结构、数据可视化、简洁排版 |
| **趣味** | 学习不枯燥，激励持续 | 游戏化元素、成就系统、动态反馈 |

### 1.3 目标用户画像

- **核心用户**：18-35岁在校学生和职场人士
- **用户特征**：有一定的英语基础，希望高效提升词汇量
- **使用场景**：碎片时间（通勤、排队）、专注学习（自习室、图书馆）、睡前复习
- **情感诉求**：成就感、掌控感、轻松有趣

## 二、视觉设计原则

### 2.1 设计理念

**核心理念**：智慧与温暖的融合

- 以深蓝色为主基调，传达专业、可靠的品牌形象
- 以橙色作为点缀色，传递活力、温暖的学习氛围
- 大量使用圆角和柔和阴影，营造亲和力
- 适度融入渐变和几何图形，体现AI科技感

### 2.2 设计关键词

- **智能**：渐变、几何图形、数据可视化
- **简洁**：大量留白、信息层级清晰、减少视觉噪音
- **温暖**：暖色调、圆润边角、流畅动效
- **现代**：扁平化设计、卡片式布局、清晰排版

### 2.3 设计风格参考

```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│   科技感 ✦ 温暖感                                           │
│                                                             │
│   • 深蓝+渐变 ────────────────────→ 暖橙+柔和                │
│   • 几何图形 ────────────────────→ 圆润卡片                  │
│   • 简洁线条 ────────────────────→ 流畅动效                  │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

## 三、色彩系统

### 3.1 主色板

| 颜色名称 | 色值 | 用途说明 |
|----------|------|----------|
| **智慧蓝（主色）** | #1E3A8A | Logo主色、主要按钮、导航栏 |
| **天空蓝** | #3B82F6 | 链接文字、次要按钮、图标 |
| **科技青** | #06B6D4 | AI功能标识、数据图表强调 |
| **暖阳橙** | #F59E0B | 重要提示、成就徽章、进度激励 |
| **活力红** | #EF4444 | 错误提示、紧急提醒 |
| **成功绿** | #10B981 | 成功反馈、正确状态 |
| **中性灰** | #6B7280 | 次要文字、分割线 |

### 3.2 主色板详细规范

```css
:root {
  /* 主色系 - 蓝色 */
  --color-primary-900: #1E3A8A;  /* 智慧蓝 - 主色 */
  --color-primary-700: #2563EB;  /* 深蓝 */
  --color-primary-500: #3B82F6;  /* 天蓝 - 强调 */
  --color-primary-300: #93C5FD;  /* 浅蓝 */
  --color-primary-100: #DBEAFE;  /* 极浅蓝 - 背景 */

  /* 科技色系 - 青色 */
  --color-cyan-600: #0891B2;
  --color-cyan-500: #06B6D4;  /* AI功能标识 */
  --color-cyan-300: #67E8F9;

  /* 暖色系 - 橙色 */
  --color-warm-600: #D97706;
  --color-warm-500: #F59E0B;  /* 成就激励 */
  --color-warm-300: #FCD34D;
  --color-warm-100: #FEF3C7;

  /* 功能色 */
  --color-success: #10B981;   /* 成功绿 */
  --color-warning: #F59E0B;   /* 警告橙 */
  --color-error: #EF4444;     /* 错误红 */
  --color-info: #3B82F6;      /* 信息蓝 */

  /* 中性色 */
  --color-gray-900: #111827;
  --color-gray-700: #374151;
  --color-gray-500: #6B7280;  /* 次要文字 */
  --color-gray-300: #D1D5DB;
  --color-gray-100: #F3F4F6;
  --color-white: #FFFFFF;
}
```

### 3.3 语义化色彩使用

| 场景 | 颜色 | 色值 | 示例 |
|------|------|------|------|
| **主要按钮** | 智慧蓝 | #1E3A8A | 开始学习按钮 |
| **次要按钮** | 天蓝 | #3B82F6 | 查看详情按钮 |
| **AI功能标识** | 科技青 | #06B6D4 | AI生成内容标签 |
| **成就激励** | 暖阳橙 | #F59E0B | 连续学习徽章 |
| **成功状态** | 成功绿 | #10B981 | 正确反馈、已掌握单词 |
| **错误提示** | 活力红 | #EF4444 | 输入错误、网络异常 |
| **背景色** | 极浅蓝 | #F8FAFC | 页面背景 |
| **卡片背景** | 纯白 | #FFFFFF | 内容卡片 |

### 3.4 渐变色规范

```css
/* 主渐变 - 智慧渐变 */
.gradient-primary {
  background: linear-gradient(135deg, #1E3A8A 0%, #3B82F6 50%, #06B6D4 100%);
}

/* 科技渐变 - AI功能 */
.gradient-tech {
  background: linear-gradient(135deg, #06B6D4 0%, #3B82F6 100%);
}

/* 温暖渐变 - 成就激励 */
.gradient-warm {
  background: linear-gradient(135deg, #F59E0B 0%, #EF4444 100%);
}

/* 背景渐变 */
.gradient-bg {
  background: linear-gradient(180deg, #F8FAFC 0%, #EFF6FF 100%);
}

/* 卡片悬浮渐变 */
.gradient-card-hover {
  background: linear-gradient(180deg, rgba(59,130,246,0.05) 0%, rgba(6,182,212,0.05) 100%);
}
```

## 四、字体系统

### 4.1 字体家族

| 字体用途 | 字体名称 | 备选字体 | 字重 |
|----------|----------|----------|------|
| **中文字体** | 思源黑体 (Source Han Sans) | 苹方-简、Noto Sans SC | Regular/Medium/Bold |
| **英文字体** | Inter | SF Pro Display、Arial | Regular/Medium/Semibold/Bold |
| **数字字体** | DM Sans | Roboto | Medium/Bold |
| **代码字体** | JetBrains Mono | Fira Code | Regular |

### 4.2 字体使用规范

```css
:root {
  /* 字体大小 */
  --font-size-xs: 12px;
  --font-size-sm: 14px;
  --font-size-base: 16px;
  --font-size-lg: 18px;
  --font-size-xl: 20px;
  --font-size-2xl: 24px;
  --font-size-3xl: 30px;
  --font-size-4xl: 36px;
  --font-size-5xl: 48px;

  /* 行高 */
  --line-height-tight: 1.25;   /* 紧凑 - 标题 */
  --line-height-normal: 1.5;   /* 正常 - 正文 */
  --line-height-relaxed: 1.75; /* 宽松 - 阅读 */

  /* 字重 */
  --font-weight-regular: 400;
  --font-weight-medium: 500;
  --font-weight-semibold: 600;
  --font-weight-bold: 700;
}
```

### 4.3 排版层级

| 层级 | 字号 | 字重 | 行高 | 用途 | 示例 |
|------|------|------|------|------|------|
| **H1** | 36px | Bold (700) | 1.2 | 页面大标题 | 学习报告 |
| **H2** | 30px | Bold (700) | 1.25 | 页面标题 | 今日任务 |
| **H3** | 24px | Semibold (600) | 1.3 | 卡片标题 | 单词详情 |
| **H4** | 20px | Semibold (600) | 1.4 | 区块标题 | 学习统计 |
| **H5** | 18px | Medium (500) | 1.5 | 小标题 | 功能说明 |
| **Body** | 16px | Regular (400) | 1.5 | 正文内容 | 释义说明 |
| **Small** | 14px | Regular (400) | 1.5 | 次要文字 | 标签说明 |
| **Caption** | 12px | Regular (400) | 1.5 | 辅助文字 | 版权信息 |

### 4.4 字体颜色规范

| 用途 | 颜色 | 色值 | 透明度 |
|------|------|------|--------|
| **主要文字** | 深灰色 | #111827 | 100% |
| **次要文字** | 中灰色 | #6B7280 | 100% |
| **辅助文字** | 浅灰色 | #9CA3AF | 100% |
| **禁用文字** | 浅灰色 | #D1D5DB | 100% |
| **高亮文字** | 主蓝色 | #1E3A8A | 100% |

## 五、Logo设计规范

### 5.1 Logo设计概念

**设计理念**：智慧之光，词汇之舟

- **图形元素**：融合书本、灯泡（智慧）和波浪（记忆曲线）的抽象图形
- **色彩运用**：蓝色主体渐变，橙色点缀
- **整体风格**：简洁、现代、易识别

### 5.2 Logo图形规范

```
┌────────────────────────────────────────┐
│                                        │
│         ┌─────────────────┐            │
│         │                 │            │
│         │    ★ 书本       │            │
│         │     ╲  ╱        │            │
│         │      ╲╱         │            │
│         │    波浪曲线      │            │
│         │                 │            │
│         └─────────────────┘            │
│                                        │
│           AI · 词汇大师                │
│                                        │
└────────────────────────────────────────┘
```

### 5.3 Logo使用规范

```css
/* Logo最小尺寸 */
.logo-min {
  width: 120px;
  height: auto;
}

/* Logo标准尺寸 */
.logo-normal {
  width: 160px;
  height: auto;
}

/* Logo大尺寸 */
.logo-large {
  width: 240px;
  height: auto;
}

/* Logo保护空间 */
.logo-padding {
  padding: 10px;
}

/* Logo背景规范 */
.logo-bg-light {
  background: #FFFFFF;
}

.logo-bg-dark {
  background: #1E3A8A;
}
```

### 5.4 Logo禁止事项

- ❌ 禁止拉伸或扭曲Logo
- ❌ 禁止改变Logo颜色
- ❌ 禁止添加Logo阴影或特效
- ❌ 禁止在Logo周围添加装饰元素
- ❌ 禁止在保护空间内放置其他元素

## 六、图标系统

### 6.1 图标设计原则

| 原则 | 说明 | 示例 |
|------|------|------|
| **一致性** | 所有图标保持统一的视觉风格 | 2px描边、圆角端点 |
| **可识别性** | 图标含义直观易懂 | 首页用房子、学习用书本 |
| **简洁性** | 去除不必要的细节 | 简化复杂的图形 |
| **可扩展性** | 适配不同尺寸和场景 | 16px-48px |

### 6.2 图标网格规范

```
┌──────────────────────┐
│                      │
│    ┌──────────────┐  │
│    │              │  │
│    │    有效区域  │  │  ← 20×20px
│    │   (建议留白) │  │
│    │              │  │
│    └──────────────┘  │
│                      │
│         24px         │  ← 图标整体尺寸
│                      │
└──────────────────────┘
```

### 6.3 核心图标库

| 图标名称 | 用途 | 推荐尺寸 |
|----------|------|----------|
| **首页** | 导航入口 | 24px |
| **学习** | 学习功能 | 24px |
| **复习** | 复习任务 | 24px |
| **词库** | 词库管理 | 24px |
| **我的** | 个人中心 | 24px |
| **搜索** | 搜索功能 | 20px |
| **收藏** | 收藏单词 | 20px |
| **设置** | 设置页面 | 20px |
| **通知** | 消息提醒 | 20px |
| **返回** | 返回上级 | 20px |

### 6.4 图标颜色使用

| 状态 | 颜色 | 说明 |
|------|------|------|
| **默认** | #6B7280 | 中灰色，未选中状态 |
| **选中** | #1E3A8A | 主蓝色，选中状态 |
| **激活** | #3B82F6 | 亮蓝色，悬浮状态 |
| **禁用** | #D1D5DB | 浅灰色，禁用状态 |

## 七、组件设计规范

### 7.1 按钮设计

#### 主要按钮

```css
.btn-primary {
  /* 尺寸 */
  height: 48px;
  padding: 0 24px;
  border-radius: 24px;  /* 圆角 = 高度的一半 */

  /* 颜色 */
  background: linear-gradient(135deg, #1E3A8A 0%, #3B82F6 100%);
  color: #FFFFFF;
  box-shadow: 0 4px 12px rgba(30, 58, 138, 0.3);

  /* 文字 */
  font-size: 16px;
  font-weight: 600;

  /* 交互 */
  transition: all 0.2s ease;
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(30, 58, 138, 0.4);
}

.btn-primary:active {
  transform: translateY(0);
  box-shadow: 0 2px 8px rgba(30, 58, 138, 0.3);
}
```

#### 次要按钮

```css
.btn-secondary {
  height: 48px;
  padding: 0 24px;
  border-radius: 24px;
  border: 2px solid #3B82F6;
  background: transparent;
  color: #3B82F6;
}

.btn-secondary:hover {
  background: rgba(59, 130, 246, 0.1);
}
```

#### 按钮尺寸变体

| 尺寸 | 高度 | 内边距 | 字号 | 用途 |
|------|------|--------|------|------|
| **大** | 48px | 0 24px | 16px | 主要操作 |
| **中** | 40px | 0 20px | 14px | 一般操作 |
| **小** | 32px | 0 16px | 12px | 次要操作 |
| **特大** | 56px | 0 32px | 18px | 重要CTA |

### 7.2 卡片设计

```css
.card {
  /* 基础样式 */
  background: #FFFFFF;
  border-radius: 16px;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  border: 1px solid rgba(0, 0, 0, 0.06);

  /* 交互 */
  transition: all 0.3s ease;
}

.card:hover {
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
  transform: translateY(-4px);
}

/* 单词卡片专用 */
.card-word {
  background: linear-gradient(180deg, #FFFFFF 0%, #F8FAFC 100%);
  border-radius: 20px;
  padding: 32px;
  min-height: 280px;
}
```

### 7.3 输入框设计

```css
.input {
  /* 尺寸 */
  height: 48px;
  padding: 0 16px;
  border-radius: 12px;

  /* 边框 */
  border: 2px solid #E5E7EB;
  background: #FFFFFF;

  /* 文字 */
  font-size: 16px;
  color: #111827;

  /* 交互 */
  transition: border-color 0.2s ease;
}

.input:focus {
  border-color: #3B82F6;
  outline: none;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.input::placeholder {
  color: #9CA3AF;
}

.input-error {
  border-color: #EF4444;
}

.input-error:focus {
  box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);
}
```

### 7.4 进度指示器

#### 环形进度

```css
.progress-ring {
  width: 120px;
  height: 120px;
  position: relative;
}

.progress-ring-circle {
  stroke: #E5E7EB;  /* 背景轨道 */
  stroke-width: 8;
  fill: transparent;
}

.progress-ring-progress {
  stroke: url(#gradient-primary);
  stroke-width: 8;
  stroke-linecap: round;
  transform: rotate(-90deg);
  transform-origin: center;
  transition: stroke-dashoffset 0.5s ease;
}

.progress-ring-text {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 24px;
  font-weight: 700;
  color: #1E3A8A;
}
```

#### 线性进度

```css
.progress-bar {
  height: 8px;
  background: #E5E7EB;
  border-radius: 4px;
  overflow: hidden;
}

.progress-bar-fill {
  height: 100%;
  background: linear-gradient(90deg, #1E3A8A 0%, #3B82F6 100%);
  border-radius: 4px;
  transition: width 0.3s ease;
}
```

### 7.5 徽章设计

```css
.badge {
  /* 基础样式 */
  display: inline-flex;
  align-items: center;
  padding: 4px 12px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 500;

  /* 变体 */
}

.badge-primary {
  background: rgba(30, 58, 138, 0.1);
  color: #1E3A8A;
}

.badge-success {
  background: rgba(16, 185, 129, 0.1);
  color: #10B981;
}

.badge-warning {
  background: rgba(245, 158, 11, 0.1);
  color: #F59E0B;
}

.badge-info {
  background: rgba(6, 182, 212, 0.1);
  color: #06B6D4;  /* AI功能标识色 */
}
```

## 八、动效设计规范

### 8.1 动效原则

| 原则 | 说明 | 示例 |
|------|------|------|
| **自然** | 模拟物理世界的运动规律 | 弹性缓动、惯性效果 |
| **克制** | 动效服务于功能，不喧宾夺主 | 关键节点使用动效 |
| **一致** | 相同的交互使用相同的动效 | 按钮点击反馈统一 |
| **流畅** | 帧率稳定，避免卡顿 | 60fps优先 |

### 8.2 缓动函数

```css
:root {
  /* 标准缓动 */
  --ease-default: cubic-bezier(0.4, 0, 0.2, 1);

  /* 进入缓动 */
  --ease-in: cubic-bezier(0.4, 0, 1, 1);

  /* 退出缓动 */
  --ease-out: cubic-bezier(0, 0, 0.2, 1);

  /* 弹性缓动 */
  --ease-bounce: cubic-bezier(0.68, -0.55, 0.265, 1.55);
}
```

### 8.3 动效时长规范

| 动效类型 | 时长 | 说明 | 示例 |
|----------|------|------|------|
| **即时反馈** | 100ms | 微交互、按钮点击 | 按钮按下效果 |
| **快速切换** | 200ms | 标签切换、开关状态 | Tab切换 |
| **标准过渡** | 300ms | 页面切换、弹窗 | 模态框出现 |
| **强调动效** | 500ms | 成就达成、重要提示 | 徽章获得 |
| **装饰动效** | 1000ms+ | 背景动画、加载 | Loading动画 |

### 8.4 核心动效示例

#### 卡片翻转动效

```css
.card-flip {
  perspective: 1000px;
}

.card-flip-inner {
  transition: transform 0.6s;
  transform-style: preserve-3d;
}

.card-front,
.card-back {
  backface-visibility: hidden;
}

.card-back {
  transform: rotateY(180deg);
}

.card-flip.flipped .card-flip-inner {
  transform: rotateY(180deg);
}
```

#### 列表项进入

```css
.list-item {
  opacity: 0;
  transform: translateY(20px);
  animation: listItemEnter 0.3s ease forwards;
}

@keyframes listItemEnter {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* 依次延迟进入 */
.list-item:nth-child(1) { animation-delay: 0ms; }
.list-item:nth-child(2) { animation-delay: 50ms; }
.list-item:nth-child(3) { animation-delay: 100ms; }
.list-item:nth-child(4) { animation-delay: 150ms; }
.list-item:nth-child(5) { animation-delay: 200ms; }
```

#### 成功反馈动效

```css
.success-check {
  animation: successPop 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

@keyframes successPop {
  0% {
    transform: scale(0);
    opacity: 0;
  }
  50% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}
```

## 九、响应式设计规范

### 9.1 断点设计

| 断点名称 | 屏幕宽度 | 设备类型 | 布局策略 |
|----------|----------|----------|----------|
| **xs** | < 640px | 手机竖屏 | 单列布局、底部导航 |
| **sm** | 640px - 768px | 手机横屏/小平板 | 自适应单列 |
| **md** | 768px - 1024px | 平板 | 双列布局、侧边导航 |
| **lg** | 1024px - 1280px | 小桌面 | 三列布局 |
| **xl** | ≥ 1280px | 大桌面 | 完整三列+侧边栏 |

### 9.2 布局模板

```css
/* 手机布局 */
.layout-mobile {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.layout-mobile .header {
  position: sticky;
  top: 0;
  z-index: 100;
}

.layout-mobile .content {
  flex: 1;
  padding: 16px;
}

.layout-mobile .bottom-nav {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
}

/* 平板/桌面布局 */
.layout-desktop {
  display: grid;
  grid-template-columns: 240px 1fr;
  grid-template-rows: auto 1fr;
  min-height: 100vh;
}

.layout-desktop .sidebar {
  grid-row: 1 / -1;
  position: sticky;
  top: 0;
  height: 100vh;
}

.layout-desktop .header {
  position: sticky;
  top: 0;
}

.layout-desktop .content {
  padding: 24px;
}
```

### 9.3 组件响应式

```css
/* 单词卡片响应式 */
.word-card {
  /* 手机端 */
  width: 100%;
  padding: 20px;
  font-size: 24px;
}

@media (min-width: 768px) {
  .word-card {
    width: 80%;
    max-width: 600px;
    padding: 32px;
    font-size: 32px;
  }
}

@media (min-width: 1024px) {
  .word-card {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 24px;
  }
}

/* 按钮响应式 */
.btn {
  /* 手机端 */
  width: 100%;
  height: 48px;
}

@media (min-width: 768px) {
  .btn {
    width: auto;
    min-width: 120px;
  }
}
```

## 十、平台适配规范

### 10.1 微信小程序适配

| 元素 | 规范 | 说明 |
|------|------|------|
| **导航栏** | 高度44px，颜色#1E3A8A | 统一顶部导航 |
| **标签栏** | 高度56px，图标24px | 底部Tab切换 |
| **安全区域** | 适配iPhone X等刘海屏 | 使用safe-area组件 |
| **字体** | 使用系统字体 | 避免自定义字体加载 |

### 10.2 App适配（iOS/Android）

| 元素 | iOS规范 | Android规范 |
|------|---------|-------------|
| **状态栏** | 白色文字+透明背景 | 深色文字+透明背景 |
| **导航栏** | 系统原生或自定义 | Material Design |
| **手势** | 支持侧滑返回 | 支持物理返回键 |
| **图标** | 3倍图优先 | xxhdpi优先 |

### 10.3 Web端特殊处理

| 场景 | 处理方式 |
|------|----------|
| **字体加载** | 使用@font-face，定义fallback |
| **图片** | 使用WebP格式，定义PNG fallback |
| **动画** | 使用CSS动画，JavaScript动画作为降级 |
| **交互** | 鼠标悬浮效果，触摸设备适配 |

## 十一、品牌应用示例

### 11.1 首页设计

```
┌─────────────────────────────────────────┐
│  ┌─────────────────────────────────┐   │
│  │ 🔔        AI词汇大师      👤    │   │  ← 导航栏
│  └─────────────────────────────────┘   │
│                                         │
│  ┌─────────────────────────────────┐   │
│  │  👋 早上好，张同学                │   │  ← 问候卡片
│  │  今天是学习的第 15 天              │   │
│  │  ┌─────────────────────────┐    │   │
│  │  │      🔥 连续学习 7 天     │    │   │  ← 成就徽章
│  │  └─────────────────────────┘    │   │
│  └─────────────────────────────────┘   │
│                                         │
│  ┌─────────────────────────────────┐   │
│  │  📊 今日进度                     │   │  ← 进度卡片
│  │      ┌───────┐                  │   │
│  │      │  65%  │  13/20词         │   │
│  │      │  ◯    │                  │   │
│  │      └───────┘                  │   │
│  └─────────────────────────────────┘   │
│                                         │
│  ┌─────────┐  ┌─────────┐              │
│  │  📚     │  │  🔄     │              │  ← 功能卡片
│  │  学习    │  │  复习    │              │
│  └─────────┘  └─────────┘              │
│                                         │
│  ┌─────────────────────────────────┐   │
│  │  💡 推荐复习                      │   │  ← 推荐卡片
│  │  ephemeral - 短暂的              │   │
│  │  ubiquitous - 无处不在的          │   │
│  └─────────────────────────────────┘   │
│                                         │
│  ┌───┐ ┌───┐ ┌───┐ ┌───┐ ┌───┐       │
│  │ 🏠│ │ 📚│ │ 🔄│ │ 📖│ │ 👤│       │  ← 底部导航
│  └───┘ └───┘ └───┘ └───┘ └───┘       │
└─────────────────────────────────────────┘
```

### 11.2 学习页面设计

```
┌─────────────────────────────────────────┐
│  ← 返回                    3/20         │
├─────────────────────────────────────────┤
│                                         │
│  ┌─────────────────────────────────┐   │
│  │                                 │   │
│  │      ephemeral                  │   │  ← 单词显示
│  │      /ɪˈfem(ə)rəl/             │   │  ← 音标
│  │                                 │   │
│  │  ─────────────────────────────  │   │
│  │                                 │   │
│  │  adj. 短暂的；瞬息的             │   │  ← 释义
│  │                                 │   │
│  │  ┌─────────────────────────┐   │   │
│  │  │ 🤖 AI记忆口诀            │   │   │
│  │  │ e费-m灭-r如-a啊-l了     │   │   │
│  │  │ 费了灭如了啊才记住~     │   │   │
│  │  └─────────────────────────┘   │   │  ← AI内容
│  │                                 │   │
│  │  ┌─────────────────────────┐   │   │
│  │  │ 📝 例句                  │   │   │
│  │  │ Fashion trends are...   │   │   │
│  │  └─────────────────────────┘   │   │
│  │                                 │   │
│  └─────────────────────────────────┘   │
│                                         │
│  ┌─────────┐ ┌─────────┐ ┌─────────┐   │
│  │  ❌     │ │  🤔     │ │  ✅     │   │
│  │ 不认识  │ │  模糊   │ │  认识   │   │  ← 反馈按钮
│  └─────────┘ └─────────┘ └─────────┘   │
│                                         │
└─────────────────────────────────────────┘
```

### 11.3 成就页面设计

```
┌─────────────────────────────────────────┐
│  我的成就                               │
├─────────────────────────────────────────┤
│                                         │
│  ┌─────────────────────────────────┐   │
│  │  🏆 已获得 12/30                 │   │
│  │  ████████████░░░░░░░░░░░░░░░   │   │  ← 成就进度
│  └─────────────────────────────────┘   │
│                                         │
│  ┌────────────────┐ ┌────────────────┐  │
│  │ 🔥 连续7天     │ │ 📚 学习100词   │  │
│  │                │ │                │  │  ← 已获得徽章
│  │  2024.01.20   │ │  2024.01.15   │  │
│  └────────────────┘ └────────────────┘  │
│                                         │
│  ┌────────────────┐ ┌────────────────┐  │
│  │ ⭐ 学习达人    │ │ 🎯 完美一天    │  │
│  │    🔒         │ │    🔒         │  │
│  │  还差3天       │ │  今日已达成    │  │  ← 未获得徽章
│  └────────────────┘ └────────────────┘  │
│                                         │
└─────────────────────────────────────────┘
```

## 十二、附录

### 12.1 图标资源获取

图标使用以下开源图标库：

- **Heroicons**：https://heroicons.com/
- **Phosphor Icons**：https://phosphoricons.com/
- **Lucide Icons**：https://lucide.dev/

下载时选择：

- 描边风格（Stroke）
- 2px线条粗细
- 24×24px尺寸

### 12.2 品牌资源清单

| 资源类型 | 文件格式 | 命名规范 | 用途 |
|----------|----------|----------|------|
| **Logo** | SVG/PNG | logo-{size}.{ext} | 各类场景使用 |
| **图标** | SVG | icon-{name}.svg | 开发使用 |
| **插画** | SVG/PNG | illustration-{name}.{ext} | 品牌展示 |
| **启动图** | PNG | splash-{platform}.png | App启动页 |
| **应用图标** | PNG | icon-{platform}.png | 各平台图标 |

### 12.3 联系方式

如对品牌规范有疑问，请联系：

- **品牌负责人**：产品设计团队
- **技术支持**：前端开发团队
- **文档更新**：请参考最新版本

---

**版本信息**

| 版本 | 日期 | 更新内容 |
|------|------|----------|
| v1.0 | 2026-05-07 | 初始版本发布 |
