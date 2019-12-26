import { BaseEntityObject, UUID } from "./BaseEntityObject";

export interface ExerciseCommentSummary extends BaseEntityObject {
  parentId: UUID;
  upvoteCount: number;
  downvoteCount: number;
}
