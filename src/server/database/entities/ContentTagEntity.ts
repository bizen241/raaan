import { Column, Entity } from "typeorm";
import { BaseEntityClass } from "./BaseEntityClass";

@Entity()
export class ContentTagEntity extends BaseEntityClass {
  type: "ContentTag" = "ContentTag";

  @Column()
  name: string;

  constructor(name: string) {
    super();

    this.name = name;
  }
}
