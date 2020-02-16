import { Column, Entity, ManyToOne, RelationId } from "typeorm";
import { EntityId } from "../../../shared/api/entities";
import { BaseEntityClass } from "./BaseEntityClass";
import { ExerciseEntity } from "./ExerciseEntity";
import { GroupEntity } from "./GroupEntity";

@Entity("contests")
export class ContestEntity extends BaseEntityClass<"Contest"> {
  readonly type = "Contest";

  @ManyToOne(() => GroupEntity, {
    onDelete: "CASCADE"
  })
  group?: GroupEntity;
  @RelationId((contest: ContestEntity) => contest.group)
  groupId!: EntityId<"Group">;

  @ManyToOne(() => ExerciseEntity, {
    onDelete: "CASCADE"
  })
  exercise?: ExerciseEntity;
  @RelationId((contest: ContestEntity) => contest.exercise)
  exerciseId!: EntityId<"Exercise">;

  @Column()
  title: string;

  @Column()
  startAt: Date;

  @Column()
  finishAt: Date;

  constructor(group: GroupEntity, exercise: ExerciseEntity, title: string, startAt: Date, finishAt: Date) {
    super();

    this.group = group;
    this.exercise = exercise;
    this.title = title;
    this.startAt = startAt;
    this.finishAt = finishAt;
  }
}
