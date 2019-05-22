import { BaseEntityObject, UUID } from "./BaseEntityObject";

export interface ExerciseSummary extends BaseEntityObject {
  authorId: UUID;
  exerciseId: UUID;
  tagIds: UUID[];
  lang: string;
  title: string;
  tags: string;
  description: string;
}
