import { EntityId } from ".";
import { BaseEntityObject } from "./BaseEntityObject";

export interface ExerciseCommentSummary extends BaseEntityObject<"ExerciseCommentSummary"> {
  authorId?: EntityId<"User">;
  parentId: EntityId<"ExerciseComment">;
  upvoteCount: number;
  downvoteCount: number;
}
