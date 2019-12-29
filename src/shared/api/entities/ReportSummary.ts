import { UUID } from "./BaseEntityObject";
import { BaseEntityObject } from "./BaseEntityObject";
import { ReportState } from "./Report";

export interface ReportSummary extends BaseEntityObject {
  parentId: UUID;
  state: ReportState;
  commentCount: number;
}
