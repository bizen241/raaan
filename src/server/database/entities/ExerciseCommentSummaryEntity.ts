import { Column, Entity, JoinColumn, OneToOne, RelationId } from "typeorm";
import { BaseEntityClass } from "./BaseEntityClass";
import { ExerciseCommentEntity } from "./ExerciseCommentEntity";

@Entity("exercise_comment_summaries")
export class ExerciseCommentSummaryEntity extends BaseEntityClass {
  type: "ExerciseCommentSummary" = "ExerciseCommentSummary";

  @OneToOne(
    () => ExerciseCommentEntity,
    exerciseComment => exerciseComment.summary,
    {
      onDelete: "CASCADE"
    }
  )
  @JoinColumn()
  parent?: ExerciseCommentEntity;
  @RelationId((exerciseCommentSummary: ExerciseCommentSummaryEntity) => exerciseCommentSummary.parent)
  parentId!: string;

  @Column()
  upvoteCount: number = 0;

  @Column()
  downvoteCount: number = 0;
}
