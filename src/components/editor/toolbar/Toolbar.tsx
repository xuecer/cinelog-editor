import { useState } from "react";
import {
  Bold,
  Italic,
  Underline,
  Highlighter,
  Heading1,
  Heading2,
  Heading3,
  SquarePlus,
} from "lucide-react";
import { MarkButton } from "./MarkButton";
import { BlockButton } from "./BlockButton";
import { InsertCardDialog } from "./InsertCardDialog";
import { InsertImageDialog } from "./InsertImageDialog";
import { InsertVideoDialog } from "./InsertVideoDialog";
import { ExportButton } from "./ExportButton";
import { MARK_TYPES, BLOCK_TYPES } from "@/lib/constants";
import { Button } from "@/components/ui/button";

/**
 * 编辑器工具栏
 */
export const Toolbar = () => {
  const [cardDialogOpen, setCardDialogOpen] = useState(false);

  return (
    <>
      <div className="border-b bg-slate-50 p-2 flex items-center gap-1 flex-wrap">
        {/* 标题组 */}
        <div className="flex items-center gap-0.5 border-r pr-2 mr-2">
          <BlockButton
            format={BLOCK_TYPES.HEADING_ONE}
            icon={<Heading1 size={18} />}
            tooltip="标题 1"
          />
          <BlockButton
            format={BLOCK_TYPES.HEADING_TWO}
            icon={<Heading2 size={18} />}
            tooltip="标题 2"
          />
          <BlockButton
            format={BLOCK_TYPES.HEADING_THREE}
            icon={<Heading3 size={18} />}
            tooltip="标题 3"
          />
        </div>

        {/* 文本样式组 */}
        <div className="flex items-center gap-0.5 border-r pr-2 mr-2">
          <MarkButton
            format={MARK_TYPES.BOLD}
            icon={<Bold size={18} />}
            tooltip="加粗 (Ctrl+B)"
          />
          <MarkButton
            format={MARK_TYPES.ITALIC}
            icon={<Italic size={18} />}
            tooltip="斜体 (Ctrl+I)"
          />
          <MarkButton
            format={MARK_TYPES.UNDERLINE}
            icon={<Underline size={18} />}
            tooltip="下划线 (Ctrl+U)"
          />
          <MarkButton
            format={MARK_TYPES.HIGHLIGHT}
            icon={<Highlighter size={18} />}
            tooltip="高亮 (Ctrl+H)"
          />
        </div>

        {/* 媒体插入组 */}
        <div className="flex items-center gap-0.5 border-r pr-2 mr-2">
          <InsertImageDialog />
          <InsertVideoDialog />
        </div>

        {/* CineLog 特色功能组 */}
        <div className="flex items-center gap-0.5 border-r pr-2 mr-2">
          <Button
            variant="ghost"
            size="sm"
            className="h-8 px-3"
            onClick={() => setCardDialogOpen(true)}
            title="插入书影音卡片"
          >
            <SquarePlus className="h-4 w-4 mr-1.5" />
            <span className="text-sm">插入卡片</span>
          </Button>
        </div>

        {/* 导出功能 */}
        <div className="flex items-center gap-0.5">
          <ExportButton />
        </div>
      </div>

      {/* 卡片插入弹窗 */}
      <InsertCardDialog
        open={cardDialogOpen}
        onClose={() => setCardDialogOpen(false)}
      />
    </>
  );
};
