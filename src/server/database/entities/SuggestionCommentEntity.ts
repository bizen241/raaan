import { Entity, ManyToOne, OneToOne, RelationId } from "typeorm";
import { BaseCommentClass } from "./BaseCommentClass";
import { SuggestionCommentSummaryEntity } from "./SuggestionCommentSummaryEntity";
import { SuggestionEntity } from "./SuggestionEntity";
import { UserEntity } from "./UserEntity";

@Entity("suggestion_comments")
export class SuggestionCommentEntity extends BaseCommentClass<SuggestionEntity> {
  type: "SuggestionComment" = "SuggestionComment";

  @OneToOne(
    () => SuggestionCommentSummaryEntity,
    exerciseCommentSummary => exerciseCommentSummary.parent,
    {
      cascade: true
    }
  )
  summary?: SuggestionCommentSummaryEntity;
  @RelationId((exercise: SuggestionEntity) => exercise.summary)
  summaryId!: string;

  @ManyToOne(() => SuggestionEntity, {
    onDelete: "CASCADE"
  })
  target?: SuggestionEntity;

  constructor(target: SuggestionEntity, author: UserEntity, body: string) {
    super(author, body);

    this.target = target;
  }
}
