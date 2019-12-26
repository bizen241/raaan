import { Entity, ManyToOne, OneToOne, RelationId } from "typeorm";
import { BaseCommentClass } from "./BaseCommentClass";
import { ExerciseCommentSummaryEntity } from "./ExerciseCommentSummaryEntity";
import { ExerciseEntity } from "./ExerciseEntity";
import { UserEntity } from "./UserEntity";

@Entity("exercise_comments")
export class ExerciseCommentEntity extends BaseCommentClass<ExerciseEntity> {
  type: "ExerciseComment" = "ExerciseComment";

  @OneToOne(() => ExerciseCommentSummaryEntity, exerciseCommentSummary => exerciseCommentSummary.parent, {
    cascade: true
  })
  summary?: ExerciseCommentSummaryEntity;
  @RelationId((exercise: ExerciseEntity) => exercise.summary)
  summaryId!: string;

  @ManyToOne(() => ExerciseEntity, {
    onDelete: "CASCADE"
  })
  target?: ExerciseEntity;

  constructor(target: ExerciseEntity, author: UserEntity, body: string) {
    super(author, body);

    this.target = target;
  }
}
