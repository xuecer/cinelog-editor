import { useSlate } from "slate-react";
import { isMarkActive, toggleMark } from "@/lib/editor-utils";
import { cn } from "@/lib/utils";

interface MarkButtonProps {
  format: string;
  icon: React.ReactNode;
  tooltip?: string;
}

/**
 * Mark 按钮组件（用于加粗、斜体等文本样式）
 */
export const MarkButton = ({ format, icon, tooltip }: MarkButtonProps) => {
  const editor = useSlate();
  const isActive = isMarkActive(editor, format);

  return (
    <button
      type="button"
      onMouseDown={(event) => {
        event.preventDefault();
        toggleMark(editor, format);
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
