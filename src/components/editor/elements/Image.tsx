import { useState, useRef } from "react";
import {
  useFocused,
  useSelected,
  useSlateStatic,
  ReactEditor,
} from "slate-react";
import { Transforms } from "slate";
import type { RenderElementProps } from "slate-react";
import type { ImageElement } from "@/types/elements";

export function Image({
  attributes,
  children,
  element,
}: RenderElementProps & { element: ImageElement }) {
  const editor = useSlateStatic();
  const selected = useSelected();
  const focused = useFocused();
  const [width, setWidth] = useState(element.width || 250);
  const startX = useRef(0);
  const startWidth = useRef(0);

  const handleResize =
    (direction: "left" | "right") => (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      startX.current = e.clientX;
      startWidth.current = width;

      let finalWidth = width;

      const onMove = (moveEvent: MouseEvent) => {
        const delta = moveEvent.clientX - startX.current;
        const newWidth = Math.max(
          200,
          Math.min(
            1000,
            startWidth.current +
              (direction === "right" ? delta * 2 : -delta * 2)
          )
        );
        finalWidth = newWidth;
        setWidth(newWidth);
      };

      const onUp = () => {
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
    <div {...attributes} className="my-4">
      <div className="hidden">{children}</div>
      <div className="group flex justify-center">
        <div
          className="relative"
          style={{ width: `${width}px`, maxWidth: "100%" }}
        >
          <img
            src={element.url}
            alt={element.alt || ""}
            className="w-full h-auto rounded-md"
            draggable={false}
          />
          {isActive && (
            <>
              <div
                contentEditable={false}
                className="absolute -left-1 top-1/2 -translate-y-1/2 w-2 h-8 bg-blue-400 rounded-full cursor-ew-resize opacity-0 group-hover:opacity-100"
                onMouseDown={handleResize("left")}
              />
              <div
                contentEditable={false}
                className="absolute -right-1 top-1/2 -translate-y-1/2 w-2 h-8 bg-blue-400 rounded-full cursor-ew-resize opacity-0 group-hover:opacity-100"
                onMouseDown={handleResize("right")}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
}
