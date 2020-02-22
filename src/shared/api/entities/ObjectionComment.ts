import { EntityId } from ".";
import { BaseEntityObject } from "./BaseEntityObject";

export interface ObjectionComment extends BaseEntityObject<"ObjectionComment"> {
  targetId?: EntityId<"Objection">;
  targetSummaryId?: EntityId<"ObjectionSummary">;
  authorId: EntityId<"User">;
  body: string;
}
