import { Entity, ManyToOne, RelationId } from "typeorm";
import { PlaylistEntity, UserEntity } from ".";
import { BaseEntityClass } from "./BaseEntityClass";

@Entity("playlist-reports")
export class PlaylistReportEntity extends BaseEntityClass {
  type: "PlaylistReport" = "PlaylistReport";

  @ManyToOne(() => PlaylistEntity, {
    onDelete: "CASCADE"
  })
  target?: PlaylistEntity;
  @RelationId((playlistReport: PlaylistReportEntity) => playlistReport.target)
  targetId!: string;

  @ManyToOne(() => UserEntity, {
    onDelete: "CASCADE"
  })
  reporter?: UserEntity;
  @RelationId((playlistReport: PlaylistReportEntity) => playlistReport.reporter)
  reporterId!: string;

  constructor(reporter: UserEntity, target: PlaylistEntity) {
    super();

    this.target = target;
    this.reporter = reporter;
  }
}
