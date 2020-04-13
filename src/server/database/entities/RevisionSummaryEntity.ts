import { Entity, JoinColumn, OneToOne, RelationId } from "typeorm";
import { EntityId } from "../../../shared/api/entities";
import { BaseEntityClass } from "./BaseEntityClass";
import { RevisionEntity } from "./RevisionEntity";

@Entity("revision_summaries")
export class RevisionSummaryEntity extends BaseEntityClass<"RevisionSummary"> {
  readonly type = "RevisionSummary";

  @OneToOne(() => RevisionEntity, (revision) => revision.summary, {
    onDelete: "CASCADE",
  })
  @JoinColumn()
  revision?: RevisionEntity;
  @RelationId((revisionSummary: RevisionSummaryEntity) => revisionSummary.revision)
  revisionId!: EntityId<"Revision">;
}
