import { Column, Entity, Index, ManyToOne } from "typeorm";
import { BaseEntityClass } from "./BaseEntityClass";
import { PlaylistSummaryEntity } from "./PlaylistSummaryEntity";

@Entity("playlist-tags")
export class PlaylistTagEntity extends BaseEntityClass {
  type: "PlaylistTag" = "PlaylistTag";

  @ManyToOne(() => PlaylistSummaryEntity, playlistSummary => playlistSummary.tags, {
    onDelete: "CASCADE"
  })
  playlistSummary?: PlaylistSummaryEntity;

  @Column()
  @Index()
  name: string;

  constructor(name: string) {
    super();

    this.name = name;
  }
}
