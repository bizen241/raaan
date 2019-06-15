import { Column, Entity, ManyToOne, RelationId } from "typeorm";
import { BaseEntityClass } from "./BaseEntityClass";
import { ExerciseEntity } from "./ExerciseEntity";
import { UserEntity } from "./UserEntity";

@Entity("submissions")
export class SubmissionEntity extends BaseEntityClass {
  type: "Submission" = "Submission";

  @ManyToOne(() => UserEntity, {
    onDelete: "CASCADE"
  })
  user?: UserEntity;
  @RelationId((submission: SubmissionEntity) => submission.user)
  userId!: string;

  @ManyToOne(() => ExerciseEntity, {
    onDelete: "CASCADE"
  })
  exercise?: ExerciseEntity;
  @RelationId((submission: SubmissionEntity) => submission.exercise)
  exerciseId!: string;

  @Column()
  keystrokes: number;

  @Column()
  time: number;

  @Column()
  accuracy: number;

  constructor(user: UserEntity, exercise: ExerciseEntity, keystrokes: number, time: number, accuracy: number) {
    super();

    this.user = user;
    this.exercise = exercise;
    this.keystrokes = keystrokes;
    this.time = time;
    this.accuracy = accuracy;
  }
}
