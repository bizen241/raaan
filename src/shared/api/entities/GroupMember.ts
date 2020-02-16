import { EntityId } from ".";
import { BaseEntityObject } from "./BaseEntityObject";

export interface GroupMember extends BaseEntityObject<"GroupMember"> {
  userId?: EntityId<"User">;
  userSummaryId: EntityId<"UserSummary">;
  groupId?: EntityId<"Group">;
  groupSummaryId: EntityId<"GroupSummary">;
  permission: GroupMemberPermission;
}

export type GroupMemberPermission = "owner" | "admin" | "write" | "read" | "guest";
