# CineLog Editor

基于 Slate.js 的专业影评富文本编辑器，支持全局块级拖拽、媒体实时缩放、电影/音乐卡片插入等功能。

## 技术栈

- **前端框架**: React 19 + TypeScript
- **编辑器内核**: Slate.js + Slate React
- **构建工具**: Vite
- **样式方案**: Tailwind CSS v4
- **UI 组件**: Radix UI

## 核心功能

### 基础编辑

- 文本编辑（段落、多级标题）
- 富文本样式（加粗、斜体、下划线、高亮）

### 拖拽系统

- 全局块级元素拖拽重排
- 根节点路径校验防止非法嵌套
- 动态索引补偿算法解决数组塌缩问题

### 媒体功能

- 图片/视频插入与实时缩放
- 双层状态分离策略优化高频交互性能
- 拖拽手柄与预览分离

### 专业卡片

- 电影卡片（集成 TMDB API）
- 音乐卡片（集成 iTunes Search API）
- 防抖搜索优化用户体验

### 导出功能

- JSON 格式导出（保留完整 AST 结构）
- HTML 格式导出
- 长图导出（基于 html2canvas）

## 技术亮点

### 1. Slate.js 数据驱动

- 基于 AST（抽象语法树）的数据模型
- 通过 `ReactEditor.findPath` 实现 DOM → AST 逆向映射
- 使用 `Transforms` API 保证操作的原子性和一致性

### 2. 性能优化

- React.lazy 组件级懒加载
- Vite manualChunks 分包策略（react/slate/ui 三层拆分）
- Terser 压缩 + Tree Shaking（打包体积 155KB gzip）
- 媒体缩放采用本地 state + 最终提交 AST 的双层策略

### 3. 插件化架构

- `withVoidElements`: 统一管理 Void 节点（电影卡片、音乐卡片等）
- `withInlineElements`: 管理内联元素
- `withHistory`: 历史记录支持

### 4. TypeScript 类型系统

- Module Augmentation 扩展 Slate 类型定义
- 10 种自定义 Element 类型（基础文本、富媒体、影评专业三层）
- 严格的类型校验确保编辑器状态一致性

## 项目结构

```
src/
├── types/                        # TypeScript 类型定义
│   ├── editor.ts                 # CustomEditor
│   ├── elements.ts               # 自定义元素类型
│   ├── text.ts                   # FormattedText
│   └── index.ts                  # Module Augmentation
├── lib/
│   ├── api/                      # 外部 API 封装
│   │   ├── tmdb.ts              # TMDB 电影 API
│   │   └── music.ts             # iTunes 音乐 API
│   ├── constants.ts              # 常量定义
│   ├── editor-utils.ts           # 编辑器工具函数
│   └── utils.ts                  # 通用工具
├── components/
│   ├── editor/
│   │   ├── CineLogEditor.tsx    # 主编辑器
│   │   ├── DraggableBlock.tsx   # 拖拽包装组件
│   │   ├── elements/            # 自定义元素渲染组件
│   │   ├── plugins/             # Slate 插件
│   │   └── toolbar/             # 工具栏组件
│   └── ui/                       # UI 基础组件（Shadcn）
└── App.tsx                       # 应用入口
```

## 快速开始

### 环境要求

- Node.js 20.19+ 或 22.12+
- pnpm 8+

### 安装依赖

```bash
pnpm install
```

### 本地开发

```bash
pnpm dev
```

### 构建生产版本

```bash
pnpm build
```

### 环境变量配置

创建 `.env.local` 文件：

```env
VITE_TMDB_API_KEY=your_tmdb_api_key
VITE_MUSIC_API_BASE=https://itunes.apple.com
```

## License

MIT
