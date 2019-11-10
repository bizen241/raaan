import { Entity, ManyToOne, RelationId } from "typeorm";
import { BaseEntityClass } from "./BaseEntityClass";
import { GroupEntity } from "./GroupEntity";
import { UserEntity } from "./UserEntity";

@Entity("group_invitations")
export class GroupInvitationEntity extends BaseEntityClass {
  type: "GroupInvitation" = "GroupInvitation";

  @ManyToOne(() => GroupEntity, {
    onDelete: "CASCADE"
  })
  group?: GroupEntity;
  @RelationId((groupInvitation: GroupInvitationEntity) => groupInvitation.group)
  groupId!: string;

  @ManyToOne(() => UserEntity)
  target?: UserEntity;
  @RelationId((groupInvitation: GroupInvitationEntity) => groupInvitation.target)
  targetId!: string;

  constructor(group: GroupEntity, target: UserEntity) {
    super();

    this.group = group;
    this.target = target;
  }
}
