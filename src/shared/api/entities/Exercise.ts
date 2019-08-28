import { BaseEntityObject, UUID } from "./BaseEntityObject";

export interface Exercise extends BaseEntityObject {
  authorId: UUID;
  summaryId: UUID;
  lang: string;
  title: string;
  tags: string[];
  description: string;
  rubric: string;
  comment: string;
  questions: Question[];
  isPrivate: boolean;
  isLocked: boolean;
}

export interface Question {
  id: number;
  lang: string;
  format: string;
  value: string;
  comment: string;
}

export type NavigationMode = "sequential" | "random";
