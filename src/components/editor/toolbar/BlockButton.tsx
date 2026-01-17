import { useSlate } from "slate-react";
import { isBlockActive, toggleBlock } from "@/lib/editor-utils";
import { cn } from "@/lib/utils";

interface BlockButtonProps {
  format: string;
  icon: React.ReactNode;
  tooltip?: string;
}

/**
 * Block 按钮组件（用于标题、引用等块级元素）
 */
export const BlockButton = ({ format, icon, tooltip }: BlockButtonProps) => {
  const editor = useSlate();
  const isActive = isBlockActive(editor, format);

  return (
    <button
      type="button"
      onMouseDown={(event) => {
        event.preventDefault();
        toggleBlock(editor, format);
      }}
      className={cn(
        "p-2 rounded hover:bg-slate-100 transition-colors",
        isActive && "bg-slate-200 text-blue-600"
      )}
      title={tooltip}
    >
      {icon}
    </button>
  );
};
