import { UUID } from "./BaseEntityObject";
import { BaseReportObject } from "./BaseReportObject";

export interface SynonymReport extends BaseReportObject {
  synonymId?: UUID;
}
