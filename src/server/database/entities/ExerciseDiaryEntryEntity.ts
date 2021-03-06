import { Column, Entity, ManyToOne, RelationId } from "typeorm";
import { DateString, EntityId } from "../../../shared/api/entities";
import { BaseEntityClass } from "./BaseEntityClass";
import { ExerciseEntity } from "./ExerciseEntity";

@Entity("exercise_diaries")
export class ExerciseDiaryEntryEntity extends BaseEntityClass<"ExerciseDiaryEntry"> {
  readonly type = "ExerciseDiaryEntry";

  @ManyToOne(() => ExerciseEntity, {
    onDelete: "CASCADE",
  })
  exercise?: ExerciseEntity;
  @RelationId((exerciseDiaryEntry: ExerciseDiaryEntryEntity) => exerciseDiaryEntry.exercise)
  exerciseId!: EntityId<"Exercise">;

  @Column("date")
  date: DateString;

  @Column()
  submittedCount: number = 0;

  @Column()
  typedCount: number = 0;

  constructor(exercise: ExerciseEntity, date: DateString) {
    super();

    this.exercise = exercise;
    this.date = date;
  }
}
