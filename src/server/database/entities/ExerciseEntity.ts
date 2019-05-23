import { Column, Entity, ManyToOne, OneToOne, RelationId } from "typeorm";
import { Exercise, Question } from "../../../shared/api/entities";
import { SaveParams } from "../../../shared/api/request/save";
import { BaseEntityClass } from "./BaseEntityClass";
import { ExerciseSummaryEntity } from "./ExerciseSummaryEntity";
import { UserEntity } from "./UserEntity";

@Entity("exercises")
export class ExerciseEntity extends BaseEntityClass {
  type: "Exercise" = "Exercise";

  @ManyToOne(() => UserEntity, {
    cascade: ["remove"]
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

  @Column()
  lang: string = "en";

  @Column()
  title: string = "";

  @Column("json")
  tags: string = "";

  @Column()
  description: string = "";

  @Column()
  rubric: string = "";

  @Column("json")
  questions: Question[] = [];

  @Column()
  comment: string = "";

  @Column()
  isLinear: boolean = false;

  @Column()
  isPrivate: boolean = true;

  @Column()
  isLocked: boolean = false;

  constructor(author: UserEntity, summary: ExerciseSummaryEntity, params?: SaveParams<Exercise>) {
    super();

    this.author = author;
    this.summary = summary;

    if (params !== undefined) {
      this.lang = params.lang || "en";
      this.title = params.title || "";
      this.tags = params.tags || "";
      this.description = params.description || "";
      this.rubric = params.rubric || "";
      this.comment = params.comment || "";
      this.questions = params.questions || [];
    }
  }
}
