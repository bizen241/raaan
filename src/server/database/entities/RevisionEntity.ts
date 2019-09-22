import { Entity, ManyToOne, OneToOne, RelationId } from "typeorm";
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
}
