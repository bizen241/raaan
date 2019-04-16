export interface Question {
  id: string;
  format: "plain" | "code" | "math";
  lang: string;
  value: string;
  comment: string;
}
