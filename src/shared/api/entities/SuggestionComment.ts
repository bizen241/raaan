import { EntityId } from ".";
import { BaseEntityObject } from "./BaseEntityObject";

export interface SuggestionComment extends BaseEntityObject {
  summaryId: EntityId<"SuggestionCommentSummary">;
  targetId?: EntityId<"Suggestion">;
  targetSummaryId?: EntityId<"SuggestionSummary">;
  authorId: EntityId<"User">;
  body: string;
}
