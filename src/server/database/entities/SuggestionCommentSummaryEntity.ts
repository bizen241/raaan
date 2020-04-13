import { Column, Entity, JoinColumn, OneToOne, RelationId } from "typeorm";
import { EntityId } from "../../../shared/api/entities";
import { BaseEntityClass } from "./BaseEntityClass";
import { SuggestionCommentEntity } from "./SuggestionCommentEntity";

@Entity("suggestion_comment_summaries")
export class SuggestionCommentSummaryEntity extends BaseEntityClass<"SuggestionCommentSummary"> {
  readonly type = "SuggestionCommentSummary";

  @OneToOne(() => SuggestionCommentEntity, (suggestionComment) => suggestionComment.summary, {
    onDelete: "CASCADE",
  })
  @JoinColumn()
  parent?: SuggestionCommentEntity;
  @RelationId((suggestionCommentSummary: SuggestionCommentSummaryEntity) => suggestionCommentSummary.parent)
  parentId!: EntityId<"SuggestionComment">;

  @Column()
  upvoteCount: number = 0;

  @Column()
  downvoteCount: number = 0;
}
