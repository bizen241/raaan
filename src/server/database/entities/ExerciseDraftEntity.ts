import { Column, Entity, JoinColumn, OneToOne, RelationId } from "typeorm";
import { EntityId } from "../../../shared/api/entities";
import { BaseExerciseClass } from "./BaseExerciseClass";
import { ExerciseEntity } from "./ExerciseEntity";

@Entity("exercise_drafts")
export class ExerciseDraftEntity extends BaseExerciseClass<"ExerciseDraft"> {
  readonly type = "ExerciseDraft";

  @OneToOne(
    () => ExerciseEntity,
    exercise => exercise.draft,
    {
      onDelete: "CASCADE"
    }
  )
  @JoinColumn()
  exercise?: ExerciseEntity;
  @RelationId((exerciseDraft: ExerciseDraftEntity) => exerciseDraft.exercise)
  exerciseId!: EntityId<"Exercise">;

  @Column()
  isMerged: boolean = true;
}
