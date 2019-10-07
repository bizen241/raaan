import { Column, Entity, ManyToOne, RelationId } from "typeorm";
import { SynonymStatus } from "../../../shared/api/entities/Synonym";
import { BaseEntityClass } from "./BaseEntityClass";
import { UserEntity } from "./UserEntity";

@Entity("synonyms")
export class SynonymEntity extends BaseEntityClass {
  type: "Synonym" = "Synonym";

  @ManyToOne(() => UserEntity, {
    onDelete: "SET NULL"
  })
  creator?: UserEntity;
  @RelationId((synonym: SynonymEntity) => synonym.creator)
  creatorId!: string;

  @Column()
  name: string;

  @Column()
  target: string;

  @Column()
  state: SynonymStatus = "pending";

  constructor(name: string, target: string) {
    super();

    this.name = name;
    this.target = target;
  }
}
