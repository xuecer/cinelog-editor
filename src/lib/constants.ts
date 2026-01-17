// 编辑器常量定义

// ==================== 快捷键 ====================

export const HOTKEYS = {
  "mod+b": "bold",
  "mod+i": "italic",
  "mod+u": "underline",
  "mod+h": "highlight", // 高亮
} as const;

// ==================== Block 类型 ====================

export const BLOCK_TYPES = {
  // 基础
  PARAGRAPH: "paragraph",
  HEADING_ONE: "heading-one",
  HEADING_TWO: "heading-two",
  HEADING_THREE: "heading-three",
  BLOCKQUOTE: "blockquote",

  // CineLog 特色
  MOVIE_CARD: "movie-card",
  MUSIC_CARD: "music-card",
  IMAGE: "image",
  VIDEO_EMBED: "video-embed",
  SHOT_COMPARISON: "shot-comparison",
  DIALOGUE: "dialogue",
  DIVIDER: "divider",
} as const;

// ==================== Mark 类型 ====================

export const MARK_TYPES = {
  BOLD: "bold",
  ITALIC: "italic",
  UNDERLINE: "underline",
  HIGHLIGHT: "highlight",
} as const;

// ==================== Void 元素列表 ====================

// 这些元素是 Void 节点，光标无法进入内部
export const VOID_TYPES = [
  BLOCK_TYPES.MOVIE_CARD,
  BLOCK_TYPES.MUSIC_CARD,
  BLOCK_TYPES.IMAGE,
  BLOCK_TYPES.VIDEO_EMBED,
  BLOCK_TYPES.SHOT_COMPARISON,
  BLOCK_TYPES.DIVIDER,
] as const;

// ==================== Inline 元素列表 ====================

// 这些元素是 Inline 节点，和文字在同一行（暂时没有）
export const INLINE_TYPES = [] as const;
