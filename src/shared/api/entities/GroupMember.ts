import { BaseEntityObject, UUID } from "./BaseEntityObject";

export interface GroupMember extends BaseEntityObject {
  userId?: UUID;
  groupId?: UUID;
  groupSummaryId: UUID;
  userSummaryId: UUID;
  permission: GroupMemberPermission;
}

export type GroupMemberPermission = "owner" | "admin" | "write" | "read";
