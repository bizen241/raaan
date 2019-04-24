export interface Question {
  id: string;
  format: "plain" | "code" | "math";
  lang: string;
  value: string;
  comment: string;
}

export type NavigationMode = "sequential" | "random";

export interface ExerciseDetailObject {
  lang: string;
  title: string;
  tags: string[];
  description: string;
  rubric: string;
  questions: Question[];
  comment: string;
  navigationMode: NavigationMode;
}
