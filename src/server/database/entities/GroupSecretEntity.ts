import { Column, Entity, JoinColumn, OneToOne, RelationId } from "typeorm";
import { EntityId } from "../../../shared/api/entities";
import { BaseEntityClass } from "./BaseEntityClass";
import { GroupEntity } from "./GroupEntity";

@Entity("group_secrets")
export class GroupSecretEntity extends BaseEntityClass<"GroupSecret"> {
  readonly type = "GroupSecret";

  @OneToOne(() => GroupEntity, (group) => group.secret, {
    onDelete: "CASCADE",
  })
  @JoinColumn()
  group?: GroupEntity;
  @RelationId((groupSecret: GroupSecretEntity) => groupSecret.group)
  groupId!: EntityId<"Group">;

  @Column("uuid")
  value: string;

  @Column()
  expireAt: Date;

  constructor(value: string, expireAt: Date) {
    super();

    this.value = value;
    this.expireAt = expireAt;
  }
}
