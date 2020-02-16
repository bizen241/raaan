import { EntityId } from ".";
import { BaseEntityObject } from "./BaseEntityObject";

export interface GroupApplication extends BaseEntityObject<"GroupApplication"> {
  groupId: EntityId<"Group">;
  applicantId: EntityId<"GroupApplication">;
  groupSummaryId: EntityId<"GroupSummary">;
  applicantSummaryId: EntityId<"UserSummary">;
  /**
   * @format uuid
   */
  secret?: string;
}
