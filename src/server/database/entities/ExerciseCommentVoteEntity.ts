import { Entity, ManyToOne } from "typeorm";
import { BaseVoteClass } from "./BaseVoteClass";
import { ExerciseCommentEntity } from "./ExerciseCommentEntity";
import { UserEntity } from "./UserEntity";

@Entity("exercise_comment_votes")
export class ExerciseCommentVoteEntity extends BaseVoteClass<ExerciseCommentEntity> {
  type: "ExerciseCommentVote" = "ExerciseCommentVote";

  @ManyToOne(() => ExerciseCommentEntity, {
    onDelete: "CASCADE"
  })
  target?: ExerciseCommentEntity;

  constructor(target: ExerciseCommentEntity, voter: UserEntity, isUp: boolean) {
    super(voter, isUp);

    this.target = target;
  }
}
