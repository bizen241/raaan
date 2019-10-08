import { Column, Entity, ManyToOne, RelationId } from "typeorm";
import { BaseEntityClass } from "./BaseEntityClass";
import { UserEntity } from "./UserEntity";

@Entity("groups")
export class GroupEntity extends BaseEntityClass {
  type: "Group" = "Group";

  @ManyToOne(() => UserEntity, {
    onDelete: "CASCADE"
  })
  owner?: UserEntity;
  @RelationId((group: GroupEntity) => group.owner)
  ownerId!: string;

  @Column()
  name: string;

  @Column()
  description: string = "";

  constructor(owner: UserEntity, name: string) {
    super();

    this.owner = owner;
    this.name = name;
  }
}
