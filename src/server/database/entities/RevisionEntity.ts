import { Column, Entity, ManyToOne, OneToOne, RelationId } from "typeorm";
import { EntityId, ExerciseContent } from "../../../shared/api/entities";
import { BaseExerciseClass } from "./BaseExerciseClass";
import { ExerciseEntity } from "./ExerciseEntity";
import { RevisionSummaryEntity } from "./RevisionSummaryEntity";

@Entity("revisions")
export class RevisionEntity extends BaseExerciseClass<"Revision"> {
  readonly type = "Revision";

  @ManyToOne(() => ExerciseEntity, {
    onDelete: "CASCADE"
  })
  exercise?: ExerciseEntity;
  @RelationId((revision: RevisionEntity) => revision.exercise)
  exerciseId!: EntityId<"Exercise">;

  @OneToOne(
    () => RevisionSummaryEntity,
    revisionSummary => revisionSummary.revision,
    {
      cascade: ["insert"]
    }
  )
  summary?: RevisionSummaryEntity;
  @RelationId((revision: RevisionEntity) => revision.summary)
  summaryId!: EntityId<"RevisionSummary">;

  @Column()
  messageSubject: string;

  @Column()
  messageBody: string;

  @Column()
  isPrivate: boolean;

  constructor(
    summary: RevisionSummaryEntity,
    exercise: ExerciseEntity,
    params: ExerciseContent | undefined,
    messageSubject: string,
    messageBody: string,
    isPrivate: boolean
  ) {
    super(params);

    this.summary = summary;
    this.exercise = exercise;
    this.messageSubject = messageSubject;
    this.messageBody = messageBody;
    this.isPrivate = isPrivate;
  }
}
