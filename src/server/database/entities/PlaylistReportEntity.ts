import { Entity, ManyToOne } from "typeorm";
import { PlaylistEntity, UserEntity } from ".";
import { BaseReportClass } from "./BaseReportClass";

@Entity("playlist_reports")
export class PlaylistReportEntity extends BaseReportClass<PlaylistEntity> {
  type: "PlaylistReport" = "PlaylistReport";

  @ManyToOne(() => PlaylistEntity, {
    onDelete: "SET NULL"
  })
  target?: PlaylistEntity;

  constructor(reporter: UserEntity, target: PlaylistEntity) {
    super(reporter);

    this.target = target;
  }
}
