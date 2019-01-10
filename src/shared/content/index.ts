interface Item {
  id: string;
  comment: string;
}

export interface TextItem extends Item {
  type: "text";
  lang: string;
  text: string;
}

export interface KanjiItem extends Item {
  type: "kanji";
  kanji: string;
  kana: string;
}

export interface CodeItem extends Item {
  type: "code";
  lang: string;
  code: string;
}

export interface MathItem extends Item {
  type: "math";
  formula: string;
}

export type ContentItem = TextItem | KanjiItem | CodeItem | MathItem;

export interface ContentData {
  version: 1;
  title: string;
  lang: string;
  tags: string[];
  items: ContentItem[];
  comment: string;
  shuffle: boolean;
}
