import { Column, Entity, ManyToOne, RelationId } from "typeorm";
import { BaseEntityClass } from "./BaseEntityClass";
import { ExerciseEntity } from "./ExerciseEntity";

@Entity("exercise_diaries")
export class ExerciseDiaryEntryEntity extends BaseEntityClass {
  type: "ExerciseDiaryEntry" = "ExerciseDiaryEntry";

  @ManyToOne(() => ExerciseEntity, {
    onDelete: "CASCADE"
  })
  exercise?: ExerciseEntity;
  @RelationId((exerciseDiaryEntry: ExerciseDiaryEntryEntity) => exerciseDiaryEntry.exercise)
  exerciseId!: string;

  @Column("date")
  date: string;

  @Column()
  submittedCount: number = 0;

  @Column()
  typedCount: number = 0;

  constructor(exercise: ExerciseEntity, date: string) {
    super();

    this.exercise = exercise;
    this.date = date;
  }
}
