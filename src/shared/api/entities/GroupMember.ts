import { BaseEntityObject, UUID } from "./BaseEntityObject";

export interface GroupMember extends BaseEntityObject {
  userSummaryId: UUID;
  permission: GroupMemberPermission;
}

export type GroupMemberPermission = "owner" | "admin" | "write" | "read";
