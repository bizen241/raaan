import { Column, Entity, JoinColumn, OneToOne, RelationId } from "typeorm";
import { EntityId } from "../../../shared/api/entities";
import { BaseEntityClass } from "./BaseEntityClass";
import { SuggestionEntity } from "./SuggestionEntity";

@Entity("suggestion_summaries")
export class SuggestionSummaryEntity extends BaseEntityClass<"SuggestionSummary"> {
  readonly type = "SuggestionSummary";

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
  suggestionId!: EntityId<"Suggestion">;

  @Column()
  commentCount: number = 0;
}
