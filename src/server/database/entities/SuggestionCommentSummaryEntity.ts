import { Column, Entity, JoinColumn, OneToOne, RelationId } from "typeorm";
import { BaseEntityClass } from "./BaseEntityClass";
import { SuggestionCommentEntity } from "./SuggestionCommentEntity";

@Entity("suggestion_comment_summaries")
export class SuggestionCommentSummaryEntity extends BaseEntityClass {
  type: "SuggestionCommentSummary" = "SuggestionCommentSummary";

  @OneToOne(
    () => SuggestionCommentEntity,
    suggestionComment => suggestionComment.summary,
    {
      onDelete: "CASCADE"
    }
  )
  @JoinColumn()
  parent?: SuggestionCommentEntity;
  @RelationId((suggestionCommentSummary: SuggestionCommentSummaryEntity) => suggestionCommentSummary.parent)
  parentId!: string;

  @Column()
  upvoteCount: number = 0;

  @Column()
  downvoteCount: number = 0;
}
