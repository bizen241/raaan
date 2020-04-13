import { Column, Entity, ManyToOne, OneToOne, RelationId } from "typeorm";
import { EntityId } from "../../../shared/api/entities";
import { ObjectionState, ObjectionTargetType } from "../../../shared/api/entities/Objection";
import { BaseEntityClass } from "./BaseEntityClass";
import { ObjectionSummaryEntity } from "./ObjectionSummaryEntity";
import { UserEntity } from "./UserEntity";

@Entity("objections")
export class ObjectionEntity extends BaseEntityClass<"Objection"> {
  readonly type = "Objection";

  @OneToOne(() => ObjectionSummaryEntity, (objectionSummary) => objectionSummary.parent, {
    cascade: ["insert"],
  })
  summary?: ObjectionSummaryEntity;
  @RelationId((objection: ObjectionEntity) => objection.summary)
  summaryId!: EntityId<"ObjectionSummary">;

  @ManyToOne(() => UserEntity, {
    onDelete: "CASCADE",
  })
  objector?: UserEntity;
  @RelationId((report: ObjectionEntity) => report.objector)
  objectorId!: EntityId<"User">;

  @Column()
  targetType!: ObjectionTargetType;

  @Column("uuid")
  targetId!: string;

  @Column()
  description: string = "";

  @Column()
  state: ObjectionState = "pending";

  constructor(objector: UserEntity, description: string) {
    super();

    this.summary = new ObjectionSummaryEntity();
    this.objector = objector;
    this.description = description;
  }
}
