import { Entity, JoinColumn, OneToOne, RelationId } from "typeorm";
import { BaseEntityClass } from "./BaseEntityClass";
import { GroupEntity } from "./GroupEntity";

@Entity("group_summaries")
export class GroupSummaryEntity extends BaseEntityClass {
  type: "GroupSummary" = "GroupSummary";

  @OneToOne(
    () => GroupEntity,
    group => group.summary,
    {
      onDelete: "CASCADE"
    }
  )
  @JoinColumn()
  group?: GroupEntity;
  @RelationId((groupSummary: GroupSummaryEntity) => groupSummary.group)
  groupId!: string;
}
