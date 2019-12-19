import { Column, Entity, ManyToOne, OneToOne, RelationId } from "typeorm";
import { Exercise, SuggestionState } from "../../../shared/api/entities";
import { Params } from "../../../shared/api/request/params";
import { BaseExerciseClass } from "./BaseExerciseClass";
import { RevisionEntity } from "./RevisionEntity";
import { SuggestionSummaryEntity } from "./SuggestionSummaryEntity";
import { UserEntity } from "./UserEntity";

@Entity("suggestions")
export class SuggestionEntity extends BaseExerciseClass {
  type: "Suggestion" = "Suggestion";

  @OneToOne(() => SuggestionSummaryEntity, suggestionSummary => suggestionSummary.suggestion, {
    cascade: ["insert"]
  })
  summary?: SuggestionSummaryEntity;
  @RelationId((suggestion: SuggestionEntity) => suggestion.summary)
  summaryId!: string;

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

  @Column()
  state: SuggestionState = "pending";

  constructor(
    summary: SuggestionSummaryEntity,
    author: UserEntity,
    revision: RevisionEntity,
    params: Params<Exercise>
  ) {
    super(params);

    this.summary = summary;
    this.author = author;
    this.revision = revision;
  }
}
