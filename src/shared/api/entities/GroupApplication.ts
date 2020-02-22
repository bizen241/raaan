import { EntityId } from ".";
import { BaseEntityObject } from "./BaseEntityObject";

export interface GroupApplication extends BaseEntityObject<"GroupApplication"> {
  groupId: EntityId<"Group">;
  groupSummaryId: EntityId<"GroupSummary">;
  applicantId: EntityId<"User">;
  applicantSummaryId: EntityId<"UserSummary">;
  /**
   * @format uuid
   */
  secret?: string;
}
