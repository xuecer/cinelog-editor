import type { BaseEditor } from "slate";
import type { ReactEditor } from "slate-react";
import type { HistoryEditor } from "slate-history";

// 定义扩展后的编辑器类型
// 它结合了基础编辑器、React 能力和历史记录能力
export type CustomEditor = BaseEditor & ReactEditor & HistoryEditor;
