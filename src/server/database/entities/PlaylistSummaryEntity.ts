import { Column, Entity, JoinColumn, OneToMany, OneToOne, RelationId } from "typeorm";
import { BaseEntityClass } from "./BaseEntityClass";
import { PlaylistEntity } from "./PlaylistEntity";
import { PlaylistTagEntity } from "./PlaylistTagEntity";

@Entity("playlist-summaries")
export class PlaylistSummaryEntity extends BaseEntityClass {
  type: "Playlist" = "Playlist";

  @OneToOne(() => PlaylistEntity, playlist => playlist.summary, {
    onDelete: "CASCADE"
  })
  @JoinColumn()
  playlist?: PlaylistEntity;
  @RelationId((playlistSummary: PlaylistSummaryEntity) => playlistSummary.playlist)
  playlistId!: string;

  @OneToMany(() => PlaylistTagEntity, playlistTag => playlistTag.playlistSummary, {
    cascade: ["insert"]
  })
  tags?: PlaylistTagEntity[];

  @OneToMany(() => PlaylistTagEntity, playlistTag => playlistTag.playlistSummary)
  tagsIndex?: PlaylistTagEntity[];

  @Column()
  itemCount: number = 0;

  constructor(tags?: PlaylistTagEntity[]) {
    super();

    if (tags !== undefined) {
      this.tags = tags;
    }
  }
}
