// 定义文本（Text）类型
// 包含文本内容以及可选的格式属性

export type FormattedText = {
  text: string;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  strikethrough?: boolean;
  highlight?: boolean; // 高亮
};

export type CustomText = FormattedText;

