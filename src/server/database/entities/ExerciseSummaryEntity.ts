import { Entity, JoinColumn, JoinTable, ManyToMany, OneToOne, RelationId } from "typeorm";
import { BaseEntityClass } from "./BaseEntityClass";
import { ExerciseEntity } from "./ExerciseEntity";
import { ExerciseTagEntity } from "./ExerciseTagEntity";

@Entity("exercise-summaries")
export class ExerciseSummaryEntity extends BaseEntityClass {
  type: "ExerciseSummary" = "ExerciseSummary";

  @OneToOne(() => ExerciseEntity, exercise => exercise.summary, {
    onDelete: "CASCADE"
  })
  @JoinColumn()
  exercise?: ExerciseEntity;
  @RelationId((exerciseSummary: ExerciseSummaryEntity) => exerciseSummary.exercise)
  exerciseId!: string;

  @ManyToMany(() => ExerciseTagEntity)
  @JoinTable({
    name: "exercises_exercise_tags"
  })
  tags?: ExerciseTagEntity[];

  constructor() {
    super();
  }
}