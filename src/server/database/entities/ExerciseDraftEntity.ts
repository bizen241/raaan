import { Column, Entity, JoinColumn, OneToOne, RelationId } from "typeorm";
import { BaseExerciseClass } from "./BaseExerciseClass";
import { ExerciseEntity } from "./ExerciseEntity";

@Entity("exercise-drafts")
export class ExerciseDraftEntity extends BaseExerciseClass {
  type: "ExerciseDraft" = "ExerciseDraft";

  @OneToOne(() => ExerciseEntity, exercise => exercise.draft, {
    onDelete: "CASCADE"
  })
  @JoinColumn()
  exercise?: ExerciseEntity;
  @RelationId((exerciseDraft: ExerciseDraftEntity) => exerciseDraft.exercise)
  exerciseId!: string;

  @Column()
  isMerged: boolean = true;
}
