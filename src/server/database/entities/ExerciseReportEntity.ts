import { Entity, ManyToOne, RelationId } from "typeorm";
import { ExerciseEntity, UserEntity } from ".";
import { BaseEntityClass } from "./BaseEntityClass";

@Entity("exercise-reports")
export class ExerciseReportEntity extends BaseEntityClass {
  type: "ExerciseReport" = "ExerciseReport";

  @ManyToOne(() => ExerciseEntity, {
    onDelete: "CASCADE"
  })
  target?: ExerciseEntity;
  @RelationId((exerciseReport: ExerciseReportEntity) => exerciseReport.target)
  targetId!: string;

  @ManyToOne(() => UserEntity, {
    onDelete: "CASCADE"
  })
  reporter?: UserEntity;
  @RelationId((exerciseReport: ExerciseReportEntity) => exerciseReport.reporter)
  reporterId!: string;

  constructor(reporter: UserEntity, target: ExerciseEntity) {
    super();

    this.target = target;
    this.reporter = reporter;
  }
}
