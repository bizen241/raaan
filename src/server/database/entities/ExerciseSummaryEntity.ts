import { Column, Entity, JoinColumn, OneToMany, OneToOne, RelationId } from "typeorm";
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

  @OneToMany(() => ExerciseTagEntity, exerciseTag => exerciseTag.exerciseSummary, {
    cascade: ["insert"]
  })
  tags?: ExerciseTagEntity[];

  @OneToMany(() => ExerciseTagEntity, exerciseTag => exerciseTag.exerciseSummary)
  tagsIndex?: ExerciseTagEntity[];

  @Column()
  maxTypeCount!: number;

  @Column()
  minTypeCount!: number;

  @Column()
  upvoteCount: number = 0;

  @Column()
  submittedCount: number = 0;

  @Column()
  typedCount: number = 0;
}
