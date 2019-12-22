import { Column, Entity, ManyToOne, RelationId } from "typeorm";
import { ObjectionState, ObjectionTargetType } from "../../../shared/api/entities/Objection";
import { BaseEntityClass } from "./BaseEntityClass";
import { UserEntity } from "./UserEntity";

@Entity("objections")
export class ObjectionEntity extends BaseEntityClass {
  type: "Objection" = "Objection";

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

  @Column()
  comment: string = "";

  constructor(objector: UserEntity, description: string) {
    super();

    this.objector = objector;
    this.description = description;
  }
}
