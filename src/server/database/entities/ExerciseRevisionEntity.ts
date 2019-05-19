import { Entity, ManyToOne, OneToOne, RelationId } from "typeorm";
import { BaseEntityClass } from "./BaseEntityClass";
import { ExerciseEntity } from "./ExerciseEntity";
import { ExerciseRevisionDetailEntity } from "./ExerciseRevisionDetailEntity";

@Entity("exercise_revisions")
export class ExerciseRevisionEntity extends BaseEntityClass {
  type: "ExerciseRevision" = "ExerciseRevision";

  @ManyToOne(() => ExerciseEntity, {
    onDelete: "CASCADE"
  })
  exercise?: ExerciseEntity;
  @RelationId((exerciseRevision: ExerciseRevisionEntity) => exerciseRevision.exercise)
  exerciseId!: string;

  @OneToOne(() => ExerciseRevisionDetailEntity, exerciseRevisionDetail => exerciseRevisionDetail.revision)
  detail?: ExerciseRevisionDetailEntity;
  @RelationId((exerciseRevision: ExerciseRevisionEntity) => exerciseRevision.detail)
  detailId!: string;

  constructor(exercise: ExerciseEntity) {
    super();

    this.exercise = exercise;
  }
}
