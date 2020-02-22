import { EntityId } from ".";
import { BaseEntityObject } from "./BaseEntityObject";

export interface Group extends BaseEntityObject<"Group"> {
  summaryId: EntityId<"GroupSummary">;
  secretId: EntityId<"GroupSecret">;
  name: string;
  description: string;
}
