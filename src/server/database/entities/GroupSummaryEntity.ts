import { Entity, JoinColumn, OneToOne, RelationId } from "typeorm";
import { EntityId } from "../../../shared/api/entities";
import { BaseEntityClass } from "./BaseEntityClass";
import { GroupEntity } from "./GroupEntity";

@Entity("group_summaries")
export class GroupSummaryEntity extends BaseEntityClass<"GroupSummary"> {
  readonly type = "GroupSummary";

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
  groupId!: EntityId<"Group">;
}
