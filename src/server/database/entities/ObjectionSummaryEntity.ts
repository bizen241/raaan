import { Column, Entity, JoinColumn, OneToOne, RelationId } from "typeorm";
import { BaseEntityClass } from "./BaseEntityClass";
import { ObjectionEntity } from "./ObjectionEntity";

@Entity("objection_summaries")
export class ObjectionSummaryEntity extends BaseEntityClass {
  type: "ObjectionSummary" = "ObjectionSummary";

  @OneToOne(() => ObjectionEntity, objection => objection.summary, {
    onDelete: "CASCADE"
  })
  @JoinColumn()
  parent?: ObjectionEntity;
  @RelationId((objectionSummary: ObjectionSummaryEntity) => objectionSummary.parent)
  parentId!: string;

  @Column()
  commentCount: number = 0;
}
