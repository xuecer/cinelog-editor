import { useState } from "react";
import { useSlate } from "slate-react";
import { Transforms } from "slate";
import { Video } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { VideoEmbedElement } from "@/types/elements";

/**
 * Bilibili 视频插入对话框（简化版）
 */
export function InsertVideoDialog() {
  const editor = useSlate();
  const [open, setOpen] = useState(false);
  const [bilibiliUrl, setBilibiliUrl] = useState("");

  // 从 Bilibili URL 提取 BV 号
  const extractBilibiliId = (url: string): string | null => {
    const patterns = [
      /bilibili\.com\/video\/(BV[a-zA-Z0-9]+)/,
      /b23\.tv\/(BV[a-zA-Z0-9]+)/,
      /(BV[a-zA-Z0-9]+)/,
    ];

    for (const pattern of patterns) {
      const match = url.match(pattern);
      if (match && match[1]) {
        return match[1];
      }
    }
    return null;
  };

  // 插入视频到编辑器
  const insertVideo = (videoId: string) => {
    const video: VideoEmbedElement = {
      type: "video-embed",
      platform: "bilibili",
      videoId,
      children: [{ text: "" }],
    };

    Transforms.insertNodes(editor, video);
    Transforms.insertNodes(editor, {
      type: "paragraph",
      children: [{ text: "" }],
    });

    // 重置并关闭
    setBilibiliUrl("");
    setOpen(false);
  };

  // 处理插入
  const handleInsert = () => {
    const videoId = extractBilibiliId(bilibiliUrl);
    if (!videoId) {
      alert("无效的 Bilibili 链接（需要 BV 号）");
      return;
    }
    insertVideo(videoId);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm" title="插入 Bilibili 视频">
          <Video className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[450px]">
        <DialogHeader>
          <DialogTitle>插入 Bilibili 视频</DialogTitle>
          <DialogDescription>粘贴 Bilibili 视频链接或 BV 号</DialogDescription>
        </DialogHeader>

        <div className="space-y-4 pt-4">
          <Input
            placeholder="https://www.bilibili.com/video/BV... 或 BV..."
            value={bilibiliUrl}
            onChange={(e) => setBilibiliUrl(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleInsert();
              }
            }}
            autoFocus
          />

          <Button onClick={handleInsert} className="w-full">
            插入视频
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
