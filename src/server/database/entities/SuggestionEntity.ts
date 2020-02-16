import { Column, Entity, ManyToOne, OneToOne, RelationId } from "typeorm";
import { EntityId, ExerciseContent, SuggestionState } from "../../../shared/api/entities";
import { BaseExerciseClass } from "./BaseExerciseClass";
import { RevisionEntity } from "./RevisionEntity";
import { SuggestionSummaryEntity } from "./SuggestionSummaryEntity";
import { UserEntity } from "./UserEntity";

@Entity("suggestions")
export class SuggestionEntity extends BaseExerciseClass<"Suggestion"> {
  readonly type = "Suggestion";

  @OneToOne(
    () => SuggestionSummaryEntity,
    suggestionSummary => suggestionSummary.suggestion,
    {
      cascade: ["insert"]
    }
  )
  summary?: SuggestionSummaryEntity;
  @RelationId((suggestion: SuggestionEntity) => suggestion.summary)
  summaryId!: EntityId<"SuggestionSummary">;

  @ManyToOne(() => UserEntity, {
    onDelete: "CASCADE"
  })
  author?: UserEntity;
  @RelationId((suggestion: SuggestionEntity) => suggestion.author)
  authorId!: EntityId<"User">;

  @ManyToOne(() => RevisionEntity, {
    onDelete: "CASCADE"
  })
  revision?: RevisionEntity;
  @RelationId((suggestion: SuggestionEntity) => suggestion.revision)
  revisionId!: EntityId<"Revision">;

  @Column()
  messageSubject: string;

  @Column()
  messageBody: string;

  @Column()
  state: SuggestionState = "pending";

  constructor(
    summary: SuggestionSummaryEntity,
    author: UserEntity,
    revision: RevisionEntity,
    params: ExerciseContent,
    messageSubject: string,
    messageBody: string
  ) {
    super(params);

    this.summary = summary;
    this.author = author;
    this.revision = revision;
    this.messageSubject = messageSubject;
    this.messageBody = messageBody;
  }
}
