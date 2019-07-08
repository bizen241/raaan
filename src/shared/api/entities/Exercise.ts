import { BaseEntityObject, UUID } from "./BaseEntityObject";

export interface Tag {
  id: number;
  name: string;
}

export interface Question {
  id: number;
  format: "plain" | "code" | "math";
  lang: string;
  value: string;
  comment: string;
}

export const removeIds = <T extends { id: number }>(target: T[]) => target.map(({ id, ...item }) => item);

export type NavigationMode = "sequential" | "random";

export interface Exercise extends BaseEntityObject {
  authorId: UUID;
  summaryId: UUID;
  lang: string;
  title: string;
  tags: Tag[];
  description: string;
  rubric: string;
  comment: string;
  questions: Question[];
  isPrivate: boolean;
  isLocked: boolean;
}
