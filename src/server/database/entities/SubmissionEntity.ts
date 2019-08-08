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
  submitter?: UserEntity;
  @RelationId((submission: SubmissionEntity) => submission.submitter)
  submitterId!: string;

  @ManyToOne(() => ExerciseEntity, {
    onDelete: "CASCADE"
  })
  exercise?: ExerciseEntity;
  @RelationId((submission: SubmissionEntity) => submission.exercise)
  exerciseId!: string;

  @Column()
  typeCount: number;

  @Column()
  time: number;

  @Column()
  accuracy: number;

  constructor(submitter: UserEntity, exercise: ExerciseEntity, typeCount: number, time: number, accuracy: number) {
    super();

    this.submitter = submitter;
    this.exercise = exercise;
    this.typeCount = typeCount;
    this.time = time;
    this.accuracy = accuracy;
  }
}
