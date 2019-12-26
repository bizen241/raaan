import { BaseEntityObject, UUID } from "./BaseEntityObject";

export interface SuggestionCommentSummary extends BaseEntityObject {
  parentId: UUID;
  upvoteCount: number;
  downvoteCount: number;
}
