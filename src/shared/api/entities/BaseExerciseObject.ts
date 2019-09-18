import { BaseEntityObject } from "./BaseEntityObject";

export interface BaseExerciseObject extends BaseEntityObject {
  lang: string;
  title: string;
  tags: string[];
  description: string;
  questions: Question[];
  isRandom: boolean;
}

export interface Question {
  id: number;
  lang: string;
  format: string;
  value: string;
  comment: string;
}
