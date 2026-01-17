import { Editor, Element, Transforms } from "slate";
import type { CustomEditor } from "@/types";

// ==================== Mark 操作 ====================

/**
 * 检查当前选区的 Mark 是否激活
 */
export const isMarkActive = (editor: CustomEditor, format: string) => {
  const marks = Editor.marks(editor) as Record<string, boolean> | null;
  return marks ? marks[format] === true : false;
};

/**
 * 切换 Mark 状态（加粗/斜体等）
 */
export const toggleMark = (editor: CustomEditor, format: string) => {
  const isActive = isMarkActive(editor, format);

  if (isActive) {
    Editor.removeMark(editor, format);
  } else {
    Editor.addMark(editor, format, true);
  }
};

// ==================== Block 操作 ====================

/**
 * 检查当前选区的 Block 类型是否激活
 */
export const isBlockActive = (
  editor: CustomEditor,
  format: string,
  blockType = "type"
) => {
  const { selection } = editor;
  if (!selection) return false;

  const [match] = Array.from(
    Editor.nodes(editor, {
      at: Editor.unhangRange(editor, selection),
      match: (n) =>
        !Editor.isEditor(n) &&
        Element.isElement(n) &&
        (n as Record<string, unknown>)[blockType] === format,
    })
  );

  return !!match;
};

/**
 * 切换 Block 类型（段落/标题等）
 */
export const toggleBlock = (editor: CustomEditor, format: string) => {
  const isActive = isBlockActive(editor, format);

  Transforms.setNodes(
    editor,
    { type: isActive ? "paragraph" : format } as Partial<Element>,
    { match: (n) => Element.isElement(n) && Editor.isBlock(editor, n) }
  );
};

// ==================== 插入操作 ====================

/**
 * 插入电影卡片
 * @param editor 编辑器实例
 * @param movieData 电影数据
 */
export const insertMovieCard = (
  editor: CustomEditor,
  movieData: {
    movieId: string;
    title: string;
    originalTitle?: string;
    posterPath: string;
    year?: number;
    rating?: number;
    overview?: string;
  }
) => {
  const movieCard = {
    type: "movie-card" as const,
    ...movieData,
    children: [{ text: "" }],
  };

  Transforms.insertNodes(editor, movieCard);
  // 在卡片后插入一个空段落，方便继续编辑
  Transforms.insertNodes(editor, {
    type: "paragraph" as const,
    children: [{ text: "" }],
  });
};

/**
 * 插入音乐卡片
 * @param editor 编辑器实例
 * @param musicData 音乐数据
 */
export const insertMusicCard = (
  editor: CustomEditor,
  musicData: {
    title: string;
    artist?: string;
    album?: string;
    audioUrl: string;
    cover?: string;
    duration?: number;
  }
) => {
  const musicCard = {
    type: "music-card" as const,
    ...musicData,
    children: [{ text: "" }],
  };

  Transforms.insertNodes(editor, musicCard);
  // 在卡片后插入一个空段落，方便继续编辑
  Transforms.insertNodes(editor, {
    type: "paragraph" as const,
    children: [{ text: "" }],
  });
};

// ==================== 预留：更多工具函数 ====================

// TODO: insertImage() - 插入图片
// TODO: insertVideoEmbed() - 插入视频嵌入
// TODO: insertShotComparison() - 插入镜头对比
// TODO: insertDialogue() - 插入台词引用
// TODO: insertDivider() - 插入分隔符
