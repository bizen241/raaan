import { EntityId } from ".";
import { BaseEntityObject } from "./BaseEntityObject";

export interface SuggestionCommentVote extends BaseEntityObject {
  targetId?: EntityId<"SuggestionComment">;
  targetSummaryId: EntityId<"SuggestionCommentSummary">;
  voterId?: EntityId<"User">;
  voterSummaryId: EntityId<"UserSummary">;
  isUp: boolean;
}
