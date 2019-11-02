import { Entity, JoinColumn, OneToOne, RelationId } from "typeorm";
import { BaseEntityClass } from "./BaseEntityClass";
import { RevisionEntity } from "./RevisionEntity";

@Entity("revision_summaries")
export class RevisionSummaryEntity extends BaseEntityClass {
  type: "RevisionSummary" = "RevisionSummary";

  @OneToOne(() => RevisionEntity, revision => revision.summary, {
    onDelete: "CASCADE"
  })
  @JoinColumn()
  revision?: RevisionEntity;
  @RelationId((revisionSummary: RevisionSummaryEntity) => revisionSummary.revision)
  revisionId!: string;
}
