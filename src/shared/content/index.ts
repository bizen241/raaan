interface Part {
  id: string;
  value: string;
  comment: string;
}

export interface TextPart extends Part {
  type: "text";
  lang: string;
  display: string;
}

export interface CodePart extends Part {
  type: "code";
  lang: string;
}

export interface MathPart extends Part {
  type: "math";
}

export type ContentPart = TextPart | CodePart | MathPart;

export interface ContentData {
  version: 1;
  title: string;
  lang: string;
  tags: string[];
  parts: ContentPart[];
  comment: string;
  shuffle: boolean;
}
