import { Question } from "../../content";
import { BaseEntityObject } from "./BaseEntityObject";

export type NavigationMode = "sequential" | "random";

export interface ExerciseDetailObject extends BaseEntityObject {
  lang: string;
  title: string;
  tags: string[];
  description: string;
  rubric: string;
  questions: Question[];
  comment: string;
  navigationMode: NavigationMode;
}
