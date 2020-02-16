import { Column, Entity, JoinColumn, OneToOne, RelationId } from "typeorm";
import { EntityId } from "../../../shared/api/entities";
import { BaseEntityClass } from "./BaseEntityClass";
import { ExerciseCommentEntity } from "./ExerciseCommentEntity";

@Entity("exercise_comment_summaries")
export class ExerciseCommentSummaryEntity extends BaseEntityClass<"ExerciseCommentSummary"> {
  readonly type = "ExerciseCommentSummary";

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
  parentId!: EntityId<"ExerciseComment">;

  @Column()
  upvoteCount: number = 0;

  @Column()
  downvoteCount: number = 0;
}
