import { EntityId } from ".";
import { BaseEntityObject } from "./BaseEntityObject";

export interface ObjectionComment extends BaseEntityObject {
  targetId?: EntityId<"Objection">;
  targetSummaryId?: EntityId<"ObjectionSummary">;
  authorId: EntityId<"User">;
  body: string;
}
