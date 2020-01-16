import { BaseEntityObject, UUID } from "./BaseEntityObject";

export interface ExerciseSummary extends BaseEntityObject {
  authorId: UUID;
  authorName: string;
  exerciseId: UUID;
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
