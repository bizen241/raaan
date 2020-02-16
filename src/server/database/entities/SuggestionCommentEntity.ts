import { Column, Entity, ManyToOne, OneToOne, RelationId } from "typeorm";
import { EntityId } from "../../../shared/api/entities";
import { BaseEntityClass } from "./BaseEntityClass";
import { SuggestionCommentSummaryEntity } from "./SuggestionCommentSummaryEntity";
import { SuggestionEntity } from "./SuggestionEntity";
import { UserEntity } from "./UserEntity";

@Entity("suggestion_comments")
export class SuggestionCommentEntity extends BaseEntityClass<"SuggestionComment"> {
  readonly type = "SuggestionComment";

  @OneToOne(
    () => SuggestionCommentSummaryEntity,
    suggestionCommentSummary => suggestionCommentSummary.parent,
    {
      cascade: true
    }
  )
  summary?: SuggestionCommentSummaryEntity;
  @RelationId((suggestionComment: SuggestionCommentEntity) => suggestionComment.summary)
  summaryId!: EntityId<"SuggestionCommentSummary">;

  @ManyToOne(() => SuggestionEntity, {
    onDelete: "CASCADE"
  })
  target?: SuggestionEntity;
  @RelationId((suggestionComment: SuggestionCommentEntity) => suggestionComment.target)
  targetId!: EntityId<"Exercise">;

  @ManyToOne(() => UserEntity, {
    onDelete: "CASCADE"
  })
  author?: UserEntity;
  @RelationId((suggestionComment: SuggestionCommentEntity) => suggestionComment.author)
  authorId!: EntityId<"User">;

  @Column()
  body: string;

  constructor(target: SuggestionEntity, author: UserEntity, body: string) {
    super();

    this.target = target;
    this.author = author;
    this.body = body;
  }
}
