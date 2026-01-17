# CineLog Editor

一个专为电影评论和拉片分析设计的富文本编辑器。

## 项目结构

```
src/
├── types/                      # TypeScript 类型定义
│   ├── editor.ts              # CustomEditor 类型
│   ├── elements.ts            # 所有 Element 类型定义
│   ├── text.ts                # Text 类型定义
│   └── index.ts               # 统一导出
│
├── lib/                       # 工具函数
│   ├── utils.ts               # 通用工具（cn）
│   ├── editor-utils.ts        # 编辑器工具函数
│   └── constants.ts           # 常量定义
│
├── components/
│   └── editor/
│       ├── CineLogEditor.tsx  # 主编辑器组件
│       ├── elements/          # 自定义元素组件
│       │   ├── Paragraph.tsx
│       │   ├── Heading.tsx
│       │   ├── MovieCard.tsx
│       │   └── index.ts
│       ├── plugins/           # Slate 插件
│       │   ├── withVoidElements.ts
│       │   ├── withInlineElements.ts
│       │   └── index.ts
│       ├── toolbar/           # 工具栏（待实现）
│       └── hooks/             # 自定义 Hooks（待实现）
│
├── App.tsx
└── main.tsx
```

## 核心功能

### 已实现
- ✅ 基础文本编辑（段落、标题）
- ✅ 文本样式（加粗、斜体、代码）
- ✅ 电影卡片
- ✅ Void 元素处理
- ✅ 历史记录（撤销/重做）

### 待实现
- ⏳ 工具栏
- ⏳ 剧透警告块
- ⏳ 台词块
- ⏳ 时间码标记
- ⏳ 场景分隔符
- ⏳ 胶卷模式
- ⏳ 快捷键支持

## 开发指南

### 添加新的 Element 类型

1. 在 `src/types/elements.ts` 中定义类型
2. 在 `src/lib/constants.ts` 中添加常量
3. 在 `src/components/editor/elements/` 中创建组件
4. 在 `CineLogEditor.tsx` 的 `renderElement` 中添加 case
5. 如果是 Void 节点，更新 `constants.ts` 的 `VOID_TYPES`

### 添加新的插件

1. 在 `src/components/editor/plugins/` 中创建插件文件
2. 在 `plugins/index.ts` 中导出
3. 在 `CineLogEditor.tsx` 中应用插件

## 技术栈

- React 19
- TypeScript
- Slate.js (富文本编辑器核心)
- Tailwind CSS
- Vite

## 开发命令

```bash
# 安装依赖
pnpm install

# 启动开发服务器
pnpm dev

# 构建生产版本
pnpm build
```
