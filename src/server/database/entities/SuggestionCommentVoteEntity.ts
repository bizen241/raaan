import { Column, Entity, ManyToOne, RelationId } from "typeorm";
import { EntityId } from "../../../shared/api/entities";
import { BaseEntityClass } from "./BaseEntityClass";
import { SuggestionCommentEntity } from "./SuggestionCommentEntity";
import { UserEntity } from "./UserEntity";

@Entity("suggestion_comment_votes")
export class SuggestionCommentVoteEntity extends BaseEntityClass<"SuggestionCommentVote"> {
  readonly type = "SuggestionCommentVote";

  @ManyToOne(() => UserEntity, {
    onDelete: "CASCADE"
  })
  voter?: UserEntity;
  @RelationId((suggestionCommentVote: SuggestionCommentVoteEntity) => suggestionCommentVote.voter)
  voterId!: EntityId<"User">;

  @ManyToOne(() => SuggestionCommentEntity, {
    onDelete: "CASCADE"
  })
  target?: SuggestionCommentEntity;
  @RelationId((suggestionCommentVote: SuggestionCommentVoteEntity) => suggestionCommentVote.target)
  targetId!: EntityId<"SuggestionComment">;

  @Column()
  isUp: boolean;

  constructor(target: SuggestionCommentEntity, voter: UserEntity, isUp: boolean) {
    super();

    this.voter = voter;
    this.target = target;
    this.isUp = isUp;
  }
}
