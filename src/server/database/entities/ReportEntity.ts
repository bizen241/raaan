import { Column, Entity, ManyToOne, RelationId } from "typeorm";
import { ReportReason, ReportState } from "../../../shared/api/entities/BaseReportObject";
import { BaseEntityClass } from "./BaseEntityClass";
import { ExerciseEntity } from "./ExerciseEntity";
import { GroupEntity } from "./GroupEntity";
import { PlaylistEntity } from "./PlaylistEntity";
import { SynonymEntity } from "./SynonymEntity";
import { TagEntity } from "./TagEntity";
import { UserEntity } from "./UserEntity";

@Entity("reports")
export class ReportEntity extends BaseEntityClass {
  type: "Report" = "Report";

  @ManyToOne(() => UserEntity, {
    onDelete: "CASCADE"
  })
  reporter?: UserEntity;
  @RelationId((report: ReportEntity) => report.reporter)
  reporterId!: string;

  @ManyToOne(() => ExerciseEntity, {
    onDelete: "CASCADE"
  })
  targetExercise?: ExerciseEntity;
  @RelationId((report: ReportEntity) => report.targetExercise)
  targetExerciseId?: string;

  @ManyToOne(() => ExerciseEntity, {
    onDelete: "CASCADE"
  })
  targetGroup?: GroupEntity;
  @RelationId((report: ReportEntity) => report.targetGroup)
  targetGroupId?: string;

  @ManyToOne(() => PlaylistEntity, {
    onDelete: "CASCADE"
  })
  targetPlaylist?: PlaylistEntity;
  @RelationId((report: ReportEntity) => report.targetPlaylist)
  targetPlaylistId?: string;

  @ManyToOne(() => SynonymEntity, {
    onDelete: "CASCADE"
  })
  targetSynonym?: SynonymEntity;
  @RelationId((report: ReportEntity) => report.targetSynonym)
  targetSynonymId?: string;

  @ManyToOne(() => TagEntity, {
    onDelete: "CASCADE"
  })
  targetTag?: TagEntity;
  @RelationId((report: ReportEntity) => report.targetTag)
  targetTagId?: string;

  @ManyToOne(() => UserEntity, {
    onDelete: "CASCADE"
  })
  targetUser?: UserEntity;
  @RelationId((report: ReportEntity) => report.targetUser)
  targetUserId?: string;

  @Column()
  reason!: ReportReason;

  @Column()
  description: string = "";

  @Column()
  state: ReportState = "pending";

  @Column()
  comment: string = "";

  constructor(reporter: UserEntity, reason: ReportReason, description: string) {
    super();

    this.reporter = reporter;
    this.reason = reason;
    this.description = description;
  }
}
