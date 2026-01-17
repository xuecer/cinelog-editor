import { useState } from "react";
import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ExportButton() {
  const [isExporting, setIsExporting] = useState(false);

  const handleExport = () => {
    setIsExporting(true);

    try {
      const editorContent = document.querySelector(".editor-content");
      if (!editorContent) {
        alert("未找到编辑器内容");
        return;
      }

      // 获取所有样式
      const styles = Array.from(
        document.querySelectorAll('style, link[rel="stylesheet"]')
      )
        .map((el) => el.outerHTML)
        .join("\n");

      // 构建完整的HTML文档
      const html = `<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>CineLog - 导出内容</title>
  ${styles}
  <style>
    body { margin: 0; padding: 20px; background: #f8fafc; }
    .editor-content { max-width: 800px; margin: 0 auto; background: white; padding: 2rem; box-shadow: 0 1px 3px rgba(0,0,0,0.1); }
    [class*="grip"] { display: none !important; }
  </style>
</head>
<body>
  ${editorContent.outerHTML}
</body>
</html>`;

      // 创建Blob并下载
      const blob = new Blob([html], { type: "text/html;charset=utf-8" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.download = `cinelog-${Date.now()}.html`;
      link.href = url;
      link.click();
      URL.revokeObjectURL(url);
    } catch (error) {
      alert("导出失败，请重试");
      console.error(error);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={handleExport}
      disabled={isExporting}
      title="导出为HTML"
    >
      <Download className="h-4 w-4" />
    </Button>
  );
}
