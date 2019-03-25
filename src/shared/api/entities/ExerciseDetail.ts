import { Question } from "../../content";
import { BaseEntityObject } from "./BaseEntityObject";

export type NavigationMode = "sequential" | "random";

export interface ExerciseDetail extends BaseEntityObject {
  lang: string;
  title: string;
  tags: string[];
  description: string;
  rubric: string;
  items: Question[];
  comment: string;
  navigationMode: NavigationMode;
}