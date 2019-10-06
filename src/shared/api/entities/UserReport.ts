import { UUID } from "./BaseEntityObject";
import { BaseReportObject } from "./BaseReportObject";

export interface UserReport extends BaseReportObject {
  userSummaryId?: UUID;
}
