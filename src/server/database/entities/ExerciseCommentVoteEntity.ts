import { Column, Entity, ManyToOne, RelationId } from "typeorm";
import { EntityId } from "../../../shared/api/entities";
import { BaseEntityClass } from "./BaseEntityClass";
import { ExerciseCommentEntity } from "./ExerciseCommentEntity";
import { UserEntity } from "./UserEntity";

@Entity("exercise_comment_votes")
export class ExerciseCommentVoteEntity extends BaseEntityClass<"ExerciseCommentVote"> {
  readonly type = "ExerciseCommentVote";

  @ManyToOne(() => UserEntity, {
    onDelete: "CASCADE"
  })
  voter?: UserEntity;
  @RelationId((exerciseCommentVote: ExerciseCommentVoteEntity) => exerciseCommentVote.voter)
  voterId!: EntityId<"User">;

  @ManyToOne(() => ExerciseCommentEntity, {
    onDelete: "CASCADE"
  })
  target?: ExerciseCommentEntity;
  @RelationId((exerciseCommentVote: ExerciseCommentVoteEntity) => exerciseCommentVote.target)
  targetId!: EntityId<"ExerciseComment">;

  @Column()
  isUp: boolean;

  constructor(target: ExerciseCommentEntity, voter: UserEntity, isUp: boolean) {
    super();

    this.voter = voter;
    this.target = target;
    this.isUp = isUp;
  }
}
