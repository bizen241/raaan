import { Question } from "../../content";

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
