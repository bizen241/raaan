import { Entity, ManyToOne, RelationId } from "typeorm";
import { BaseEntityClass } from "./BaseEntityClass";
import { ExerciseEntity } from "./ExerciseEntity";
import { GroupEntity } from "./GroupEntity";

@Entity("group_exercises")
export class GroupExerciseEntity extends BaseEntityClass {
  type: "GroupExercise" = "GroupExercise";

  @ManyToOne(() => GroupEntity, {
    onDelete: "CASCADE"
  })
  group?: GroupEntity;
  @RelationId((groupExercise: GroupExerciseEntity) => groupExercise.group)
  groupId!: string;

  @ManyToOne(() => ExerciseEntity)
  exercise?: ExerciseEntity;
  @RelationId((groupExercise: GroupExerciseEntity) => groupExercise.exercise)
  exerciseId!: string;

  constructor(group: GroupEntity, exercise: ExerciseEntity) {
    super();

    this.group = group;
    this.exercise = exercise;
  }
}
