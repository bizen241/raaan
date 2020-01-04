import { Column, Entity, ManyToOne, OneToOne, RelationId } from "typeorm";
import { ObjectionState, ObjectionTargetType } from "../../../shared/api/entities/Objection";
import { BaseEntityClass } from "./BaseEntityClass";
import { ObjectionSummaryEntity } from "./ObjectionSummaryEntity";
import { UserEntity } from "./UserEntity";

@Entity("objections")
export class ObjectionEntity extends BaseEntityClass {
  type: "Objection" = "Objection";

  @OneToOne(
    () => ObjectionSummaryEntity,
    objectionSummary => objectionSummary.parent,
    {
      cascade: ["insert"]
    }
  )
  summary?: ObjectionSummaryEntity;
  @RelationId((objection: ObjectionEntity) => objection.summary)
  summaryId!: string;

  @ManyToOne(() => UserEntity, {
    onDelete: "CASCADE"
  })
  objector?: UserEntity;
  @RelationId((report: ObjectionEntity) => report.objector)
  objectorId!: string;

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
