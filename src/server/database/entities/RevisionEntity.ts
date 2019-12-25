import { Column, Entity, ManyToOne, OneToOne, RelationId } from "typeorm";
import { Exercise } from "../../../shared/api/entities";
import { Params } from "../../../shared/api/request/params";
import { BaseExerciseClass } from "./BaseExerciseClass";
import { ExerciseEntity } from "./ExerciseEntity";
import { RevisionSummaryEntity } from "./RevisionSummaryEntity";

@Entity("revisions")
export class RevisionEntity extends BaseExerciseClass {
  type: "Revision" = "Revision";

  @ManyToOne(() => ExerciseEntity, {
    onDelete: "CASCADE"
  })
  exercise?: ExerciseEntity;
  @RelationId((revision: RevisionEntity) => revision.exercise)
  exerciseId!: string;

  @OneToOne(() => RevisionSummaryEntity, revisionSummary => revisionSummary.revision, {
    cascade: ["insert"]
  })
  summary?: RevisionSummaryEntity;
  @RelationId((revision: RevisionEntity) => revision.summary)
  summaryId!: string;

  @Column()
  message: string;

  @Column()
  isPrivate: boolean;

  constructor(
    summary: RevisionSummaryEntity,
    exercise: ExerciseEntity,
    params: Params<Exercise> | undefined,
    message: string,
    isPrivate: boolean
  ) {
    super(params);

    this.summary = summary;
    this.exercise = exercise;
    this.message = message;
    this.isPrivate = isPrivate;
  }
}
