import { Entity, ManyToOne } from "typeorm";
import { ExerciseEntity } from ".";
import { BaseReportClass } from "./BaseReportClass";

@Entity("exercise_reports")
export class ExerciseReportEntity extends BaseReportClass<ExerciseEntity> {
  type: "ExerciseReport" = "ExerciseReport";

  @ManyToOne(() => ExerciseEntity, {
    onDelete: "SET NULL"
  })
  target?: ExerciseEntity;
}
