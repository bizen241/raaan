import { BaseEntityObject } from "./BaseEntityObject";

export interface BaseExerciseObject extends BaseEntityObject {
  lang: string;
  title: string;
  tags: string[];
  description: string;
  questions: Question[];
  references: Reference[];
  isRandom: boolean;
}

export interface Question {
  id: number;
  lang: string;
  format: string;
  value: string;
  comment: string;
}

export interface Reference {
  title: string;
  url: string;
  author: string;
  licenseName: string;
  licenseUrl: string;
}
