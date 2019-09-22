import { Entity, JoinColumn, OneToOne, RelationId } from "typeorm";
import { BaseEntityClass } from "./BaseEntityClass";
import { ExerciseEntity } from "./ExerciseEntity";
import { RevisionEntity } from "./RevisionEntity";

@Entity("revision-summaries")
export class RevisionSummaryEntity extends BaseEntityClass {
  type: "RevisionSummary" = "RevisionSummary";

  @OneToOne(() => RevisionEntity, revision => revision.summary, {
    onDelete: "CASCADE"
  })
  @JoinColumn()
  revision?: ExerciseEntity;
  @RelationId((revisionSummary: RevisionSummaryEntity) => revisionSummary.revision)
  revisionId!: string;
}
