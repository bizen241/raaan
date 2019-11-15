import { BaseEntityObject, UUID } from "./BaseEntityObject";

export interface GroupApplication extends BaseEntityObject {
  groupId: UUID;
  applicantId: UUID;
  groupSummaryId: UUID;
  applicantSummaryId: UUID;
  secret?: UUID;
}
