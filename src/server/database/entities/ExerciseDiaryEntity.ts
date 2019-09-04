import { Column, Entity, ManyToOne, RelationId } from "typeorm";
import { BaseEntityClass } from "./BaseEntityClass";
import { ExerciseEntity } from "./ExerciseEntity";

@Entity("exercise-diaries")
export class ExerciseDiaryEntity extends BaseEntityClass {
  type: "ExerciseDiary" = "ExerciseDiary";

  @ManyToOne(() => ExerciseEntity, {
    onDelete: "CASCADE"
  })
  exercise?: ExerciseEntity;
  @RelationId((exerciseDiary: ExerciseDiaryEntity) => exerciseDiary.exercise)
  exerciseId!: string;

  @Column("date")
  date: Date;

  @Column()
  submittedCount: number = 0;

  @Column()
  typedCount: number = 0;

  constructor(exercise: ExerciseEntity, date: Date) {
    super();

    this.exercise = exercise;
    this.date = date;
  }
}
