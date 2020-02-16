import { Entity, ManyToOne, RelationId } from "typeorm";
import { EntityId } from "../../../shared/api/entities";
import { BaseEntityClass } from "./BaseEntityClass";
import { ExerciseEntity } from "./ExerciseEntity";
import { GroupEntity } from "./GroupEntity";

@Entity("group_exercises")
export class GroupExerciseEntity extends BaseEntityClass<"GroupExercise"> {
  readonly type = "GroupExercise";

  @ManyToOne(() => GroupEntity, {
    onDelete: "CASCADE"
  })
  group?: GroupEntity;
  @RelationId((groupExercise: GroupExerciseEntity) => groupExercise.group)
  groupId!: EntityId<"Group">;

  @ManyToOne(() => ExerciseEntity, {
    onDelete: "CASCADE"
  })
  exercise?: ExerciseEntity;
  @RelationId((groupExercise: GroupExerciseEntity) => groupExercise.exercise)
  exerciseId!: EntityId<"Exercise">;

  constructor(group: GroupEntity, exercise: ExerciseEntity) {
    super();

    this.group = group;
    this.exercise = exercise;
  }
}
