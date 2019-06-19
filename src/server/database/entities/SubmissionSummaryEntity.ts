import { Column, Entity, JoinColumn, ManyToOne, OneToOne, RelationId } from "typeorm";
import { BaseEntityClass } from "./BaseEntityClass";
import { ExerciseEntity } from "./ExerciseEntity";
import { SubmissionEntity } from "./SubmissionEntity";
import { UserEntity } from "./UserEntity";

@Entity("submission-summaries")
export class SubmissionSummaryEntity extends BaseEntityClass {
  type: "SubmissionSummary" = "SubmissionSummary";

  @ManyToOne(() => UserEntity, {
    onDelete: "CASCADE"
  })
  user?: UserEntity;
  @RelationId((submissionSummary: SubmissionSummaryEntity) => submissionSummary.user)
  userId!: string;

  @ManyToOne(() => ExerciseEntity, {
    onDelete: "CASCADE"
  })
  exercise?: ExerciseEntity;
  @RelationId((submissionSummary: SubmissionSummaryEntity) => submissionSummary.exercise)
  exerciseId!: string;

  @OneToOne(() => SubmissionEntity, {
    cascade: true
  })
  @JoinColumn()
  latest: SubmissionEntity;
  @RelationId((submissionSummary: SubmissionSummaryEntity) => submissionSummary.latest)
  latestId!: string;

  @OneToOne(() => SubmissionEntity, {
    cascade: true
  })
  @JoinColumn()
  best: SubmissionEntity;
  @RelationId((submissionSummary: SubmissionSummaryEntity) => submissionSummary.best)
  bestId!: string;

  @Column()
  submitCount: number = 1;

  constructor(user: UserEntity, exercise: ExerciseEntity, submission: SubmissionEntity) {
    super();

    this.user = user;
    this.exercise = exercise;
    this.latest = submission;
    this.best = submission;
  }
}
