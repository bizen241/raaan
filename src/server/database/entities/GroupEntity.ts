import { Column, Entity, ManyToOne, OneToOne, RelationId } from "typeorm";
import { BaseEntityClass } from "./BaseEntityClass";
import { GroupSummaryEntity } from "./GroupSummaryEntity";
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

  @OneToOne(() => GroupSummaryEntity, groupSummary => groupSummary.group, {
    cascade: true
  })
  summary?: GroupSummaryEntity;
  @RelationId((group: GroupEntity) => group.summary)
  summaryId!: string;

  @Column()
  name: string;

  @Column()
  description: string = "";

  constructor(owner: UserEntity, summary: GroupSummaryEntity, name: string) {
    super();

    this.owner = owner;
    this.summary = summary;
    this.name = name;
  }
}
