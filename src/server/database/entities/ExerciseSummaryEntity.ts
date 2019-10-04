import { Column, Entity, JoinColumn, JoinTable, ManyToMany, OneToOne, RelationId } from "typeorm";
import { BaseEntityClass } from "./BaseEntityClass";
import { ExerciseEntity } from "./ExerciseEntity";
import { TagEntity } from "./TagEntity";

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

  @ManyToMany(() => TagEntity, {
    cascade: ["insert"]
  })
  @JoinTable({
    name: "exercises_tags"
  })
  tags?: TagEntity[];

  @Column()
  maxTypeCount: number = 0;

  @Column()
  minTypeCount: number = 0;

  @Column()
  upvoteCount: number = 0;

  @Column()
  submittedCount: number = 0;

  @Column()
  typedCount: number = 0;
}
