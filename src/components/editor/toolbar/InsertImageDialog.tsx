import { useState, useRef } from "react";
import { useSlate } from "slate-react";
import { Transforms } from "slate";
import { ImageIcon, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { ImageElement } from "@/types/elements";

/**
 * 图片插入按钮（简化版 - 只支持上传）
 */
export function InsertImageDialog() {
  const editor = useSlate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);

  // 插入图片到编辑器
  const insertImage = (url: string) => {
    const image: ImageElement = {
      type: "image",
      url,
      children: [{ text: "" }],
    };

    Transforms.insertNodes(editor, image);
    Transforms.insertNodes(editor, {
      type: "paragraph",
      children: [{ text: "" }],
    });
  };

  // 处理文件上传
  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // 检查文件类型
    if (!file.type.startsWith("image/")) {
      alert("请选择图片文件");
      return;
    }

    // 检查文件大小（限制 5MB）
    if (file.size > 5 * 1024 * 1024) {
      alert("图片大小不能超过 5MB");
      return;
    }

    setIsUploading(true);

    // 转换为 Base64
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      if (result) {
        insertImage(result);
      }
      setIsUploading(false);
      // 重置 input
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    };
    reader.onerror = () => {
      alert("读取文件失败");
      setIsUploading(false);
    };
    reader.readAsDataURL(file);
  };

  return (
    <>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileUpload}
        disabled={isUploading}
      />
      <Button
        variant="ghost"
        size="sm"
        title="插入图片"
        onClick={() => fileInputRef.current?.click()}
        disabled={isUploading}
      >
        {isUploading ? (
          <Upload className="h-4 w-4 animate-pulse" />
        ) : (
          <ImageIcon className="h-4 w-4" />
        )}
      </Button>
    </>
  );
}
