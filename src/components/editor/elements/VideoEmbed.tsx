import { useState, useRef } from "react";
import {
  useFocused,
  useSelected,
  useSlateStatic,
  ReactEditor,
} from "slate-react";
import { Transforms } from "slate";
import type { RenderElementProps } from "slate-react";
import type { VideoEmbedElement } from "@/types/elements";

export function VideoEmbed({
  attributes,
  children,
  element,
}: RenderElementProps & { element: VideoEmbedElement }) {
  const editor = useSlateStatic();
  const selected = useSelected();
  const focused = useFocused();
  const [width, setWidth] = useState(element.width || 800);
  const [isResizing, setIsResizing] = useState(false);
  const startX = useRef(0);
  const startWidth = useRef(0);

  const embedUrl = element.videoId
    ? `https://player.bilibili.com/player.html?bvid=${element.videoId}&high_quality=1&danmaku=0`
    : "";

  const handleResize =
    (direction: "left" | "right") => (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setIsResizing(true);
      startX.current = e.clientX;
      startWidth.current = width;

      let finalWidth = width;

      const onMove = (moveEvent: MouseEvent) => {
        const delta = moveEvent.clientX - startX.current;
        const newWidth = Math.max(
          400,
          Math.min(
            1200,
            startWidth.current +
              (direction === "right" ? delta * 2 : -delta * 2)
          )
        );
        finalWidth = newWidth;
        setWidth(newWidth);
      };

      const onUp = () => {
        setIsResizing(false);
        const path = ReactEditor.findPath(editor, element);
        Transforms.setNodes(editor, { width: finalWidth }, { at: path });
        document.removeEventListener("mousemove", onMove);
        document.removeEventListener("mouseup", onUp);
      };

      document.addEventListener("mousemove", onMove);
      document.addEventListener("mouseup", onUp);
    };

  const isActive = selected && focused;

  return (
    <div {...attributes} className="my-6">
      <div className="hidden">{children}</div>
      <div className="group flex justify-center">
        <div
          className="relative"
          style={{ width: `${width}px`, maxWidth: "100%" }}
        >
          <div className="aspect-video rounded-md overflow-hidden bg-gray-100">
            {embedUrl ? (
              <iframe
                src={embedUrl}
                className="w-full h-full"
                style={{ pointerEvents: isResizing ? "none" : "auto" }}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title="Bilibili Video"
              />
            ) : (
              <div className="flex items-center justify-center w-full h-full">
                <p className="text-gray-400">无法加载视频</p>
              </div>
            )}
          </div>
          {isActive && (
            <>
              <div
                contentEditable={false}
                className="absolute -left-1 top-1/2 -translate-y-1/2 w-2 h-8 bg-blue-400 rounded-full cursor-ew-resize opacity-0 group-hover:opacity-100 z-10"
                onMouseDown={handleResize("left")}
              />
              <div
                contentEditable={false}
                className="absolute -right-1 top-1/2 -translate-y-1/2 w-2 h-8 bg-blue-400 rounded-full cursor-ew-resize opacity-0 group-hover:opacity-100 z-10"
                onMouseDown={handleResize("right")}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
}
