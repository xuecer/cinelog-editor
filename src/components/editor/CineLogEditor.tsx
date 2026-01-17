import { useState, useCallback } from "react";
import { createEditor } from "slate";
import type { Descendant } from "slate";
import { Slate, Editable, withReact } from "slate-react";
import type { RenderElementProps, RenderLeafProps } from "slate-react";
import { withHistory } from "slate-history";
import isHotkey from "is-hotkey";
import { withVoidElements, withInlineElements } from "./plugins";
import {
  Paragraph,
  Heading,
  MovieCard,
  MusicCard,
  Image,
  VideoEmbed,
} from "./elements";
import { Toolbar } from "./toolbar";
import { DraggableBlock } from "./DraggableBlock";
import { toggleMark } from "@/lib/editor-utils";
import { HOTKEYS } from "@/lib/constants";
import { cn } from "@/lib/utils";
import type { ImageElement, VideoEmbedElement } from "@/types/elements";

// 初始内容（空文档，placeholder 会显示）
const initialValue: Descendant[] = [
  {
    type: "paragraph",
    children: [{ text: "" }],
  },
];

/**
 * CineLog 编辑器主组件
 */
const CineLogEditor = () => {
  // 创建编辑器实例（插件顺序：withHistory 最外层）
  const [editor] = useState(() =>
    withHistory(withInlineElements(withVoidElements(withReact(createEditor()))))
  );

  // 文档内容状态（可用于持久化）
  const [value, setValue] = useState<Descendant[]>(initialValue);

  // 渲染 Element 节点（所有块级元素都可以拖拽）
  const renderElement = useCallback((props: RenderElementProps) => {
    let content;

    switch (props.element.type) {
      case "heading-one":
      case "heading-two":
      case "heading-three":
        content = <Heading {...props} />;
        break;

      case "movie-card":
        content = <MovieCard {...props} />;
        break;

      case "music-card":
        content = <MusicCard {...props} />;
        break;

      case "image":
        content = <Image {...props} element={props.element as ImageElement} />;
        break;

      case "video-embed":
        content = (
          <VideoEmbed {...props} element={props.element as VideoEmbedElement} />
        );
        break;

      case "paragraph":
      default:
        content = <Paragraph {...props} />;
        break;
    }

    // 所有块级元素包装 DraggableBlock
    return <DraggableBlock {...props}>{content}</DraggableBlock>;
  }, []);

  // 渲染 Text 节点
  const renderLeaf = useCallback((props: RenderLeafProps) => {
    let { children } = props;

    // 样式叠加
    if (props.leaf.bold) {
      children = <strong>{children}</strong>;
    }
    if (props.leaf.italic) {
      children = <em>{children}</em>;
    }
    if (props.leaf.underline) {
      children = <u>{children}</u>;
    }
    if (props.leaf.highlight) {
      children = <mark className="bg-yellow-200 px-0.5">{children}</mark>;
    }

    return (
      <span
        {...props.attributes}
        className={cn(props.leaf.text === "" ? "pl-[0.1px]" : "")}
      >
        {children}
      </span>
    );
  }, []);

  // 处理键盘快捷键
  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      for (const hotkey in HOTKEYS) {
        if (isHotkey(hotkey, event)) {
          event.preventDefault();
          const mark = HOTKEYS[hotkey as keyof typeof HOTKEYS];
          toggleMark(editor, mark);
        }
      }
    },
    [editor]
  );

  return (
    <div className="max-w-4xl mx-auto border rounded-lg shadow-sm min-h-[900px] bg-white">
      <Slate
        editor={editor}
        initialValue={value}
        onChange={(value) => setValue(value)}
      >
        {/* 工具栏 */}
        <Toolbar />

        {/* 编辑区域 */}
        <div className="p-4 pl-10 editor-content">
          <Editable
            renderElement={renderElement}
            renderLeaf={renderLeaf}
            onKeyDown={handleKeyDown}
            placeholder="开始写作..."
            className="outline-none prose prose-slate max-w-none min-h-[400px]"
            spellCheck
            autoFocus
          />
        </div>
      </Slate>
    </div>
  );
};

export default CineLogEditor;
