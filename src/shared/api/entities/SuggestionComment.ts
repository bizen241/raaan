import { BaseCommentObject } from "./BaseCommentObject";
import { UUID } from "./BaseEntityObject";

export interface SuggestionComment extends BaseCommentObject {
  summaryId: UUID;
}
