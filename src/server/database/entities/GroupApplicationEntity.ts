import { Entity, ManyToOne, RelationId } from "typeorm";
import { BaseEntityClass } from "./BaseEntityClass";
import { GroupEntity } from "./GroupEntity";
import { UserEntity } from "./UserEntity";

@Entity("group_applications")
export class GroupApplicationEntity extends BaseEntityClass {
  type: "GroupApplication" = "GroupApplication";

  @ManyToOne(() => GroupEntity, {
    onDelete: "CASCADE"
  })
  group?: GroupEntity;
  @RelationId((groupApplication: GroupApplicationEntity) => groupApplication.group)
  groupId!: string;

  @ManyToOne(() => UserEntity)
  applicant?: UserEntity;
  @RelationId((groupApplication: GroupApplicationEntity) => groupApplication.applicant)
  applicantId!: string;

  constructor(group: GroupEntity, applicant: UserEntity) {
    super();

    this.group = group;
    this.applicant = applicant;
  }
}
