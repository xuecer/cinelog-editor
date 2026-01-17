import type { CustomEditor } from "@/types";
import { INLINE_TYPES } from "@/lib/constants";

/**
 * 插件：处理 Inline 元素
 * Inline 元素和文字在同一行显示（如时间码、标签）
 */
export const withInlineElements = (editor: CustomEditor) => {
  const { isInline } = editor;

  editor.isInline = (element) => {
    // 如果 INLINE_TYPES 为空，直接使用默认行为
    if (INLINE_TYPES.length === 0) {
      return isInline(element);
    }
    return (INLINE_TYPES as readonly string[]).includes(element.type)
      ? true
      : isInline(element);
  };

  return editor;
};

