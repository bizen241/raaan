import { BaseEntityObject, UUID } from "./BaseEntityObject";

export interface ExerciseCommentSummary extends BaseEntityObject {
  authorId?: UUID;
  parentId: UUID;
  upvoteCount: number;
  downvoteCount: number;
}
