import { Column, Entity, ManyToOne, OneToOne, RelationId } from "typeorm";
import { Exercise } from "../../../shared/api/entities";
import { SaveParams } from "../../../shared/api/request/save";
import { BaseExerciseClass } from "./BaseExerciseClass";
import { ExerciseDraftEntity } from "./ExerciseDraftEntity";
import { ExerciseSummaryEntity } from "./ExerciseSummaryEntity";
import { UserEntity } from "./UserEntity";

@Entity("exercises")
export class ExerciseEntity extends BaseExerciseClass {
  type: "Exercise" = "Exercise";

  @ManyToOne(() => UserEntity, {
    onDelete: "CASCADE"
  })
  author?: UserEntity;
  @RelationId((exercise: ExerciseEntity) => exercise.author)
  authorId!: string;

  @OneToOne(() => ExerciseSummaryEntity, exerciseSummary => exerciseSummary.exercise, {
    cascade: ["insert"]
  })
  summary?: ExerciseSummaryEntity;
  @RelationId((exercise: ExerciseEntity) => exercise.summary)
  summaryId!: string;

  @OneToOne(() => ExerciseDraftEntity, exerciseDraft => exerciseDraft.exercise, {
    cascade: ["insert"]
  })
  draft?: ExerciseDraftEntity;
  @RelationId((exercise: ExerciseEntity) => exercise.draft)
  draftId!: string;

  @Column()
  isDraft: boolean = true;

  @Column()
  isPrivate: boolean = true;

  @Column()
  isLocked: boolean = false;
}
