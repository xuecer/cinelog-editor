import type { RenderElementProps } from "slate-react";
import type { HeadingElement } from "@/types";

/**
 * 标题组件
 */
export const Heading = ({
  attributes,
  children,
  element,
}: RenderElementProps) => {
  const headingElement = element as HeadingElement;

  switch (headingElement.type) {
    case "heading-one":
      return (
        <h1 {...attributes} className="text-3xl font-bold mb-4 mt-6">
          {children}
        </h1>
      );
    case "heading-two":
      return (
        <h2 {...attributes} className="text-2xl font-semibold mb-3 mt-5">
          {children}
        </h2>
      );
    case "heading-three":
      return (
        <h3 {...attributes} className="text-xl font-semibold mb-2 mt-4">
          {children}
        </h3>
      );
    default:
      return (
        <p {...attributes} className="mb-2">
          {children}
        </p>
      );
  }
};
