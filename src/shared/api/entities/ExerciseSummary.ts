import { BaseEntityObject } from "./BaseEntityObject";

export interface ExerciseSummary extends BaseEntityObject {
  lang: string;
  title: string;
  description: string;
}
