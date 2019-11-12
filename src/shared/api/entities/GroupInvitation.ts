import { BaseEntityObject, UUID } from "./BaseEntityObject";

export interface GroupInvitation extends BaseEntityObject {
  groupId: UUID;
  targetId?: UUID;
  groupSummaryId: UUID;
  targetSummaryId: UUID;
  ownerId?: UUID;
}
