import { Column, Entity, ManyToOne, OneToOne, RelationId } from "typeorm";
import { EntityId } from "../../../shared/api/entities";
import { BaseEntityClass } from "./BaseEntityClass";
import { GroupSecretEntity } from "./GroupSecretEntity";
import { GroupSummaryEntity } from "./GroupSummaryEntity";
import { UserEntity } from "./UserEntity";

@Entity("groups")
export class GroupEntity extends BaseEntityClass<"Group"> {
  readonly type = "Group";

  @ManyToOne(() => UserEntity, {
    onDelete: "CASCADE"
  })
  owner?: UserEntity;
  @RelationId((group: GroupEntity) => group.owner)
  ownerId!: EntityId<"User">;

  @OneToOne(
    () => GroupSummaryEntity,
    groupSummary => groupSummary.group,
    {
      cascade: true
    }
  )
  summary?: GroupSummaryEntity;
  @RelationId((group: GroupEntity) => group.summary)
  summaryId!: EntityId<"GroupSummary">;

  @OneToOne(
    () => GroupSecretEntity,
    groupSecret => groupSecret.group,
    {
      cascade: true
    }
  )
  secret?: GroupSecretEntity;
  @RelationId((group: GroupEntity) => group.secret)
  secretId!: EntityId<"GroupSecret">;

  @Column()
  name: string;

  @Column()
  description: string = "";

  constructor(owner: UserEntity, summary: GroupSummaryEntity, secret: GroupSecretEntity, name: string) {
    super();

    this.owner = owner;
    this.summary = summary;
    this.secret = secret;
    this.name = name;
  }
}
