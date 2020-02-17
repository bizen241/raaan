import { EntityId } from ".";
import { BaseEntityObject } from "./BaseEntityObject";

export interface SuggestionCommentSummary extends BaseEntityObject {
  parentId: EntityId<"SuggestionComment">;
  authorId?: EntityId<"User">;
  upvoteCount: number;
  downvoteCount: number;
}
