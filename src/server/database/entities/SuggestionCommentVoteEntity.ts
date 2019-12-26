import { Entity, ManyToOne } from "typeorm";
import { BaseVoteClass } from "./BaseVoteClass";
import { SuggestionCommentEntity } from "./SuggestionCommentEntity";
import { UserEntity } from "./UserEntity";

@Entity("suggestion_comment_votes")
export class SuggestionCommentVoteEntity extends BaseVoteClass<SuggestionCommentEntity> {
  type: "SuggestionCommentVote" = "SuggestionCommentVote";

  @ManyToOne(() => SuggestionCommentEntity, {
    onDelete: "CASCADE"
  })
  target?: SuggestionCommentEntity;

  constructor(target: SuggestionCommentEntity, voter: UserEntity, isUp: boolean) {
    super(voter, isUp);

    this.target = target;
  }
}
