import type { CustomText } from "./text";

// ==================== 基础块级元素 ====================

export type ParagraphElement = {
  type: "paragraph";
  children: CustomText[];
};

export type HeadingElement = {
  type: "heading-one" | "heading-two" | "heading-three";
  children: CustomText[];
};

export type BlockquoteElement = {
  type: "blockquote";
  children: CustomText[];
};

// ==================== CineLog 特色元素 ====================

// 电影卡片
export type MovieCardElement = {
  type: "movie-card";
  movieId: string;
  title: string;
  originalTitle?: string;
  posterPath: string;
  year?: number;
  rating?: number;
  overview?: string; // 电影简介
  children: CustomText[]; // Void 节点必须有 children
};

// 音乐卡片
export type MusicCardElement = {
  type: "music-card";
  title: string; // 曲名
  artist?: string; // 作曲家
  album?: string; // 专辑/电影
  audioUrl: string; // 音频链接或 Base64
  cover?: string; // 封面图
  duration?: number; // 时长（秒）
  children: CustomText[]; // Void 节点
};

// 图片
export type ImageElement = {
  type: "image";
  url: string; // 图片 URL 或 Base64
  alt?: string;
  caption?: string;
  width?: number;
  align?: "left" | "center" | "right";
  children: CustomText[]; // Void 节点
};

// 视频嵌入
export type VideoEmbedElement = {
  type: "video-embed";
  platform: "youtube" | "bilibili" | "local"; // 支持本地视频
  videoId?: string; // YouTube/Bilibili 的视频 ID
  url?: string; // 本地视频的 URL/Base64
  startTime?: number; // 从第几秒开始
  caption?: string;
  width?: number; // 视频宽度
  children: CustomText[]; // Void 节点
};

// 镜头对比
export type ShotComparisonElement = {
  type: "shot-comparison";
  mode: "side-by-side" | "sequence"; // 左右对比 或 序列对比
  title?: string;
  shots: Array<{
    image: string;
    caption?: string;
    timestamp?: string; // 序列模式下的时间点
    source?: string; // 来自哪部电影
  }>;
  children: CustomText[]; // Void 节点
};

// 台词引用
export type DialogueElement = {
  type: "dialogue";
  character?: string; // 角色名
  source?: string; // 电影名
  children: CustomText[];
};

// 分隔符
export type DividerElement = {
  type: "divider";
  style?: "solid" | "dashed" | "dotted"; // 样式
  label?: string; // 可选的文字
  children: CustomText[]; // Void 节点
};

// ==================== 汇总所有类型 ====================

export type CustomElement =
  // 基础元素
  | ParagraphElement
  | HeadingElement
  | BlockquoteElement
  // CineLog 特色元素
  | MovieCardElement
  | MusicCardElement
  | ImageElement
  | VideoEmbedElement
  | ShotComparisonElement
  | DialogueElement
  | DividerElement;
