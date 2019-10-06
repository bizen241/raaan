import { Column, RelationId } from "typeorm";
import { BaseEntityClass } from "./BaseEntityClass";

export abstract class BaseObjectionClass<E extends BaseEntityClass> extends BaseEntityClass {
  abstract target?: E;
  @RelationId((report: BaseObjectionClass<E>) => report.target)
  targetId!: string;

  @Column()
  comment: string = "";

  @Column()
  state: "pending" | "accepted" | "rejected" = "pending";
}
