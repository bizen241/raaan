import { EntityId } from ".";
import { BaseEntityObject } from "./BaseEntityObject";

export interface ExerciseSummary extends BaseEntityObject<"ExerciseSummary"> {
  authorId: EntityId<"User">;
  authorName: string;
  exerciseId: EntityId<"Exercise">;
  lang: string;
  title: string;
  tags: string;
  description: string;
  upvoteCount: number;
  downvoteCount: number;
  commentCount: number;
  submitCount: number;
  isDraft: boolean;
  isEditing: boolean;
  isPrivate: boolean;
  isLocked: boolean;
  text?: string;
  questions?: string;
  searchSort?: "createdAt";
}
