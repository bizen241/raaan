import { BaseEntityObject, UUID } from "./BaseEntityObject";

export interface SuggestionCommentSummary extends BaseEntityObject {
  authorId?: UUID;
  parentId: UUID;
  upvoteCount: number;
  downvoteCount: number;
}
