interface Item {
  id: string;
  value: string;
  comment: string;
}

export interface TextItem extends Item {
  type: "text";
  lang: string;
  display: string;
}

export interface CodeItem extends Item {
  type: "code";
  lang: string;
}

export interface MathItem extends Item {
  type: "math";
}

export type ContentItem = TextItem | CodeItem | MathItem;

export interface ContentData {
  version: 1;
  title: string;
  lang: string;
  tags: string[];
  items: ContentItem[];
  comment: string;
  shuffle: boolean;
}
