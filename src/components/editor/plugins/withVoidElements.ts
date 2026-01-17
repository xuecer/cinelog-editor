import type { CustomEditor } from "@/types";
import { VOID_TYPES } from "@/lib/constants";

/**
 * 插件：处理 Void 元素
 * Void 元素是"空心"的，光标无法进入内部，只能跳过
 */
export const withVoidElements = (editor: CustomEditor) => {
  const { isVoid } = editor;

  editor.isVoid = (element) => {
    return VOID_TYPES.includes(element.type as any) ? true : isVoid(element);
  };

  return editor;
};

