import { EntityId } from ".";
import { BaseEntityObject } from "./BaseEntityObject";

export interface GroupSecret extends BaseEntityObject<"GroupSecret"> {
  groupId: EntityId<"Group">;
  groupSummaryId: EntityId<"GroupSummary">;
  value: string;
  expireAt: number;
}
