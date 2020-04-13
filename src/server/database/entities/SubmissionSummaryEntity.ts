import { Column, Entity, JoinColumn, ManyToOne, OneToOne, RelationId } from "typeorm";
import { EntityId } from "../../../shared/api/entities";
import { BaseEntityClass } from "./BaseEntityClass";
import { ExerciseEntity } from "./ExerciseEntity";
import { SubmissionEntity } from "./SubmissionEntity";
import { UserEntity } from "./UserEntity";

@Entity("submission_summaries")
export class SubmissionSummaryEntity extends BaseEntityClass<"SubmissionSummary"> {
  readonly type = "SubmissionSummary";

  @ManyToOne(() => UserEntity, {
    onDelete: "CASCADE",
  })
  submitter?: UserEntity;
  @RelationId((submissionSummary: SubmissionSummaryEntity) => submissionSummary.submitter)
  submitterId!: EntityId<"User">;

  @ManyToOne(() => ExerciseEntity, {
    onDelete: "CASCADE",
  })
  exercise?: ExerciseEntity;
  @RelationId((submissionSummary: SubmissionSummaryEntity) => submissionSummary.exercise)
  exerciseId!: EntityId<"Exercise">;

  @OneToOne(() => SubmissionEntity, {
    cascade: true,
    onDelete: "CASCADE",
  })
  @JoinColumn()
  latest?: SubmissionEntity;
  @RelationId((submissionSummary: SubmissionSummaryEntity) => submissionSummary.latest)
  latestId!: EntityId<"Submission">;

  @Column()
  submitCount: number = 0;

  @Column()
  typeCount: number = 0;

  @Column()
  isRepeating: boolean = true;

  @Column()
  remindAt: Date = new Date(Date.now() + 1000 * 60 * 60 * 24);

  constructor(submitter: UserEntity, exercise: ExerciseEntity, submission: SubmissionEntity) {
    super();

    this.submitter = submitter;
    this.exercise = exercise;
    this.latest = submission;
  }
}
