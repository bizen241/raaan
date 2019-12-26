import { BaseCommentObject } from "./BaseCommentObject";
import { UUID } from "./BaseEntityObject";

export interface ExerciseComment extends BaseCommentObject {
  summaryId: UUID;
}
