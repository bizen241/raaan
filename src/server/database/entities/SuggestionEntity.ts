import { Entity, ManyToOne, OneToOne, RelationId } from "typeorm";
import { BaseExerciseClass } from "./BaseExerciseClass";
import { RevisionEntity } from "./RevisionEntity";
import { SuggestionSummaryEntity } from "./SuggestionSummaryEntity";
import { UserEntity } from "./UserEntity";

@Entity("suggestions")
export class SuggestionEntity extends BaseExerciseClass {
  type: "Suggestion" = "Suggestion";

  @ManyToOne(() => UserEntity, {
    onDelete: "CASCADE"
  })
  author?: UserEntity;
  @RelationId((suggestion: SuggestionEntity) => suggestion.author)
  authorId!: string;

  @ManyToOne(() => RevisionEntity, {
    onDelete: "CASCADE"
  })
  revision?: RevisionEntity;
  @RelationId((suggestion: SuggestionEntity) => suggestion.revision)
  revisionId!: string;

  @OneToOne(() => SuggestionSummaryEntity, suggestionSummary => suggestionSummary.suggestion, {
    cascade: ["insert"]
  })
  summary?: SuggestionSummaryEntity;
  @RelationId((suggestion: SuggestionEntity) => suggestion.summary)
  summaryId!: string;
}
