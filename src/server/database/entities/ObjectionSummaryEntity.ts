import { Column, Entity, JoinColumn, OneToOne, RelationId } from "typeorm";
import { EntityId } from "../../../shared/api/entities";
import { BaseEntityClass } from "./BaseEntityClass";
import { ObjectionEntity } from "./ObjectionEntity";

@Entity("objection_summaries")
export class ObjectionSummaryEntity extends BaseEntityClass<"ObjectionSummary"> {
  readonly type = "ObjectionSummary";

  @OneToOne(() => ObjectionEntity, (objection) => objection.summary, {
    onDelete: "CASCADE",
  })
  @JoinColumn()
  parent?: ObjectionEntity;
  @RelationId((objectionSummary: ObjectionSummaryEntity) => objectionSummary.parent)
  parentId!: EntityId<"Objection">;

  @Column()
  commentCount: number = 0;
}
