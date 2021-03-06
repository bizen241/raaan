import { Column, Entity, Index, JoinColumn, JoinTable, ManyToMany, OneToOne, RelationId } from "typeorm";
import { EntityId, ExerciseContent } from "../../../shared/api/entities";
import { updateExerciseSummaryTexts } from "../../services/exercise-summaries";
import { BaseEntityClass } from "./BaseEntityClass";
import { ExerciseEntity } from "./ExerciseEntity";
import { TagEntity } from "./TagEntity";

@Entity("exercise_summaries")
export class ExerciseSummaryEntity extends BaseEntityClass<"ExerciseSummary"> {
  readonly type = "ExerciseSummary";

  @OneToOne(() => ExerciseEntity, (exercise) => exercise.summary, {
    onDelete: "CASCADE",
  })
  @JoinColumn()
  exercise?: ExerciseEntity;
  @RelationId((exerciseSummary: ExerciseSummaryEntity) => exerciseSummary.exercise)
  exerciseId!: EntityId<"Exercise">;

  @ManyToMany(() => TagEntity, {
    cascade: ["insert"],
  })
  @JoinTable({
    name: "exercises_tags",
  })
  tags?: TagEntity[];

  @Index({ fulltext: true, parser: "ngram" })
  @Column()
  text!: string;

  @Index({ fulltext: true, parser: "ngram" })
  @Column()
  title!: string;

  @Index({ fulltext: true, parser: "ngram" })
  @Column()
  questions!: string;

  @Column()
  maxTypeCount: number = 0;

  @Column()
  minTypeCount: number = 0;

  @Column()
  upvoteCount: number = 0;

  @Column()
  downvoteCount: number = 0;

  @Column()
  commentCount: number = 0;

  @Column()
  submittedCount: number = 0;

  @Column()
  typedCount: number = 0;

  constructor(params: Partial<ExerciseContent>) {
    super();

    if (params !== undefined) {
      updateExerciseSummaryTexts(this, params);
    }
  }
}
