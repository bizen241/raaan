import { EntityId } from ".";
import { BaseEntityObject } from "./BaseEntityObject";

export interface GroupSecret extends BaseEntityObject {
  groupId: EntityId<"Group">;
  groupSummaryId: EntityId<"GroupSummary">;
  value: string;
  expireAt: number;
}
