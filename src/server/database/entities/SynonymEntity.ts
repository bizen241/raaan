import { Column, Entity } from "typeorm";
import { BaseEntityClass } from "./BaseEntityClass";

@Entity("synonyms")
export class SynonymEntity extends BaseEntityClass<"Synonym"> {
  readonly type = "Synonym";

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
