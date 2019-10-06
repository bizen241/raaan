import { UUID } from "./BaseEntityObject";
import { BaseReportObject } from "./BaseReportObject";

export interface ExerciseReport extends BaseReportObject {
  exerciseSummaryId?: UUID;
}
