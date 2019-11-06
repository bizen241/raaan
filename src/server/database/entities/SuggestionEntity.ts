import { Entity, ManyToOne, OneToOne, RelationId } from "typeorm";
import { BaseExerciseClass } from "./BaseExerciseClass";
import { ExerciseEntity } from "./ExerciseEntity";
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

  @ManyToOne(() => ExerciseEntity, {
    onDelete: "CASCADE"
  })
  exercise?: ExerciseEntity;
  @RelationId((suggestion: SuggestionEntity) => suggestion.exercise)
  exerciseId!: string;

  @OneToOne(() => SuggestionSummaryEntity, suggestionSummary => suggestionSummary.suggestion, {
    cascade: ["insert"]
  })
  summary?: SuggestionSummaryEntity;
  @RelationId((suggestion: SuggestionEntity) => suggestion.summary)
  summaryId!: string;
}
