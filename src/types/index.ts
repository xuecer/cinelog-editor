// 统一导出所有类型

export * from "./editor";
export * from "./elements";
export * from "./text";

// Module Augmentation - 告诉 Slate 使用我们的自定义类型
import type { CustomEditor } from "./editor";
import type { CustomElement } from "./elements";
import type { CustomText } from "./text";

declare module "slate" {
  interface CustomTypes {
    Editor: CustomEditor;
    Element: CustomElement;
    Text: CustomText;
  }
}

