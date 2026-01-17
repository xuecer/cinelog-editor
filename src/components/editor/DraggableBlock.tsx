import { useRef } from "react";
import { useSlateStatic, ReactEditor } from "slate-react";
import { Transforms, Path } from "slate";
import type { RenderElementProps } from "slate-react";
import { GripVertical } from "lucide-react";

/**
 * 可拖拽的块组件包装器 - 精简版
 */
export function DraggableBlock({
  attributes,
  children,
  element,
}: RenderElementProps) {
  const editor = useSlateStatic();
  const blockRef = useRef<HTMLDivElement>(null);

  const handleDragStart = (e: React.DragEvent) => {
    e.stopPropagation(); // 防止事件冒泡到父元素

    const path = ReactEditor.findPath(editor, element);
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData(
      "application/x-slate-node",
      JSON.stringify({ path })
    );

    // 自定义拖拽预览：显示整个块而不是只显示小图标
    // setDragImage(element, xOffset, yOffset)
    // - element: 用作预览的 DOM 元素（这里用整个块的容器）
    // - xOffset: 鼠标相对于预览图左上角的 X 偏移（0 = 对齐左边）
    // - yOffset: 鼠标相对于预览图左上角的 Y 偏移（0 = 对齐顶部）
    if (blockRef.current) {
      e.dataTransfer.setDragImage(blockRef.current, 0, 0);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault(); // 阻止浏览器默认行为（如打开文件）
    e.stopPropagation(); // 阻止事件冒泡（防止父元素也处理 drop）

    const data = e.dataTransfer.getData("application/x-slate-node");
    if (!data) return;

    try {
      const { path: fromPath } = JSON.parse(data);
      const toPath = ReactEditor.findPath(editor, element);

      // 如果是同一个节点，不处理
      if (Path.equals(fromPath, toPath)) return;

      // 确保只在根级别（编辑器的直接子节点）移动
      if (fromPath.length !== 1 || toPath.length !== 1) return;

      const fromIndex = fromPath[0];
      const toIndex = toPath[0];

      // 根据鼠标位置决定插入到目标上方还是下方
      const rect = blockRef.current?.getBoundingClientRect();
      if (!rect) return;

      const middleY = rect.top + rect.height / 2;
      const isAbove = e.clientY < middleY;

      // 计算最终位置
      let targetIndex = toIndex;
      if (!isAbove) {
        targetIndex += 1;
      }

      // 如果从上往下拖，需要调整索引
      if (fromIndex < targetIndex) {
        targetIndex -= 1;
      }

      // 执行移动
      Transforms.moveNodes(editor, {
        at: fromPath,
        to: [targetIndex],
      });
    } catch (error) {
      console.error("拖拽失败:", error);
    }
  };

  return (
    <div
      {...attributes}
      ref={blockRef}
      className="group relative"
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      {/* 拖拽手柄 - 简洁版 */}
      <div
        contentEditable={false}
        draggable // ★ 移到这里
        onDragStart={handleDragStart} // ★ 移到这里
        className="absolute -left-6 top-0 opacity-0 group-hover:opacity-100 transition-opacity cursor-grab active:cursor-grabbing"
      >
        <GripVertical className="h-4 w-4 text-gray-400" />
      </div>
      {children}
    </div>
  );
}
