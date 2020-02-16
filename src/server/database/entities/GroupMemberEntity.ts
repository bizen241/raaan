import { Column, Entity, ManyToOne, RelationId } from "typeorm";
import { EntityId, GroupMemberPermission } from "../../../shared/api/entities";
import { BaseEntityClass } from "./BaseEntityClass";
import { GroupEntity } from "./GroupEntity";
import { UserEntity } from "./UserEntity";

@Entity("group_member")
export class GroupMemberEntity extends BaseEntityClass<"GroupMember"> {
  readonly type = "GroupMember";

  @ManyToOne(() => GroupEntity, {
    onDelete: "CASCADE"
  })
  group?: GroupEntity;
  @RelationId((groupMember: GroupMemberEntity) => groupMember.group)
  groupId!: EntityId<"Group">;

  @ManyToOne(() => UserEntity, {
    onDelete: "CASCADE"
  })
  user?: UserEntity;
  @RelationId((groupMember: GroupMemberEntity) => groupMember.user)
  userId!: EntityId<"User">;

  @Column()
  permission: GroupMemberPermission = "read";

  constructor(group: GroupEntity, user: UserEntity) {
    super();

    this.group = group;
    this.user = user;
  }
}
