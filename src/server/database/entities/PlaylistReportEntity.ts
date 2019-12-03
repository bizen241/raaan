import { Entity, ManyToOne } from "typeorm";
import { PlaylistEntity } from ".";
import { BaseReportClass } from "./BaseReportClass";

@Entity("playlist_reports")
export class PlaylistReportEntity extends BaseReportClass<PlaylistEntity> {
  type: "PlaylistReport" = "PlaylistReport";

  @ManyToOne(() => PlaylistEntity, {
    onDelete: "SET NULL"
  })
  target?: PlaylistEntity;
}
