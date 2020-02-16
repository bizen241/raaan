import { Entity, ManyToOne, RelationId } from "typeorm";
import { EntityId } from "../../../shared/api/entities";
import { BaseEntityClass } from "./BaseEntityClass";
import { GroupEntity } from "./GroupEntity";
import { UserEntity } from "./UserEntity";

@Entity("group_invitations")
export class GroupInvitationEntity extends BaseEntityClass<"GroupInvitation"> {
  readonly type = "GroupInvitation";

  @ManyToOne(() => GroupEntity, {
    onDelete: "CASCADE"
  })
  group?: GroupEntity;
  @RelationId((groupInvitation: GroupInvitationEntity) => groupInvitation.group)
  groupId!: EntityId<"Group">;

  @ManyToOne(() => UserEntity)
  target?: UserEntity;
  @RelationId((groupInvitation: GroupInvitationEntity) => groupInvitation.target)
  targetId!: EntityId<"User">;

  constructor(group: GroupEntity, target: UserEntity) {
    super();

    this.group = group;
    this.target = target;
  }
}
