import { Column, Entity } from "typeorm";
import { BaseEntityClass } from "./BaseEntityClass";

@Entity("synonyms")
export class SynonymEntity extends BaseEntityClass {
  type: "Synonym" = "Synonym";

  @Column()
  name: string;

  @Column()
  target: string;

  constructor(name: string, target: string) {
    super();

    this.name = name;
    this.target = target;
  }
}
