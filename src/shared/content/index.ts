interface BaseItem {
  id: string;
  value: string;
  comment: string;
}

export interface TextItem extends BaseItem {
  type: "text";
  lang: string;
}

export interface KanjiItem extends BaseItem {
  type: "kanji";
  kanji: string;
}

export interface CodeItem extends BaseItem {
  type: "code";
  lang: string;
}

export interface MathItem extends BaseItem {
  type: "math";
}

export type ContentItem = TextItem | KanjiItem | CodeItem | MathItem;

export interface ContentData {
  version: 1;
  title: string;
  lang: string;
  tags: string[];
  items: ContentItem[];
  summary: string;
  comment: string;
  shuffle: boolean;
}
