interface BaseItem {
  id: string;
  value: string;
  comment: string;
}

export interface TextItem extends BaseItem {
  type: "text";
  lang: string;
}

export interface KanaItem extends BaseItem {
  type: "kana";
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

export type Question = TextItem | KanaItem | KanjiItem | CodeItem | MathItem;
