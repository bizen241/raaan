import { EntityId } from ".";
import { BaseEntityObject } from "./BaseEntityObject";

export interface Tag extends BaseEntityObject {
  summaryId: EntityId<"TagSummary">;
  name: string;
  description: string;
}
