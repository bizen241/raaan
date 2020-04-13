import { Entity, ManyToOne, RelationId } from "typeorm";
import { EntityId } from "../../../shared/api/entities";
import { BaseEntityClass } from "./BaseEntityClass";
import { GroupEntity } from "./GroupEntity";
import { UserEntity } from "./UserEntity";

@Entity("group_applications")
export class GroupApplicationEntity extends BaseEntityClass<"GroupApplication"> {
  readonly type = "GroupApplication";

  @ManyToOne(() => GroupEntity, {
    onDelete: "CASCADE",
  })
  group?: GroupEntity;
  @RelationId((groupApplication: GroupApplicationEntity) => groupApplication.group)
  groupId!: EntityId<"Group">;

  @ManyToOne(() => UserEntity)
  applicant?: UserEntity;
  @RelationId((groupApplication: GroupApplicationEntity) => groupApplication.applicant)
  applicantId!: EntityId<"User">;

  constructor(group: GroupEntity, applicant: UserEntity) {
    super();

    this.group = group;
    this.applicant = applicant;
  }
}
