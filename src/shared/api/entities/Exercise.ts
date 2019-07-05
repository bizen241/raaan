import { BaseEntityObject, UUID } from "./BaseEntityObject";

export interface Question {
  id: string;
  format: "plain" | "code" | "math";
  lang: string;
  value: string;
  comment: string;
}

export type NavigationMode = "sequential" | "random";

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
