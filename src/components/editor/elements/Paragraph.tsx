import type { RenderElementProps } from "slate-react";

/**
 * 段落组件
 */
export const Paragraph = ({ attributes, children }: RenderElementProps) => {
  return (
    <p {...attributes} className="mb-2 leading-7">
      {children}
    </p>
  );
};
