import { Column, Entity, ManyToOne, OneToOne, RelationId } from "typeorm";
import { EntityId } from "../../../shared/api/entities";
import { BaseEntityClass } from "./BaseEntityClass";
import { ExerciseCommentSummaryEntity } from "./ExerciseCommentSummaryEntity";
import { ExerciseEntity } from "./ExerciseEntity";
import { UserEntity } from "./UserEntity";

@Entity("exercise_comments")
export class ExerciseCommentEntity extends BaseEntityClass<"ExerciseComment"> {
  readonly type = "ExerciseComment";

  @OneToOne(
    () => ExerciseCommentSummaryEntity,
    exerciseCommentSummary => exerciseCommentSummary.parent,
    {
      cascade: true
    }
  )
  summary?: ExerciseCommentSummaryEntity;
  @RelationId((exerciseComment: ExerciseCommentEntity) => exerciseComment.summary)
  summaryId!: EntityId<"ExerciseCommentSummary">;

  @ManyToOne(() => ExerciseEntity, {
    onDelete: "CASCADE"
  })
  target?: ExerciseEntity;
  @RelationId((exerciseComment: ExerciseCommentEntity) => exerciseComment.target)
  targetId!: EntityId<"Exercise">;

  @ManyToOne(() => UserEntity, {
    onDelete: "CASCADE"
  })
  author?: UserEntity;
  @RelationId((exerciseComment: ExerciseCommentEntity) => exerciseComment.author)
  authorId!: EntityId<"User">;

  @Column()
  body: string;

  constructor(target: ExerciseEntity, author: UserEntity, body: string) {
    super();

    this.target = target;
    this.author = author;
    this.body = body;
  }
}
