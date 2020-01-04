import { Column, Entity, JoinColumn, OneToOne, RelationId } from "typeorm";
import { BaseEntityClass } from "./BaseEntityClass";
import { SuggestionEntity } from "./SuggestionEntity";

@Entity("suggestion_summaries")
export class SuggestionSummaryEntity extends BaseEntityClass {
  type: "SuggestionSummary" = "SuggestionSummary";

  @OneToOne(
    () => SuggestionEntity,
    suggestion => suggestion.summary,
    {
      onDelete: "CASCADE"
    }
  )
  @JoinColumn()
  suggestion?: SuggestionEntity;
  @RelationId((suggestionSummary: SuggestionSummaryEntity) => suggestionSummary.suggestion)
  suggestionId!: string;

  @Column()
  commentCount: number = 0;
}
