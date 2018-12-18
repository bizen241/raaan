export interface Sentence {
  id: string;
  value: string;
  display: string;
}

export interface ContentData {
  title: string;
  description: string;
  sentences: Sentence[];
}
