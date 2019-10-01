import { Column, Entity, JoinColumn, JoinTable, ManyToMany, OneToOne, RelationId } from "typeorm";
import { BaseEntityClass } from "./BaseEntityClass";
import { PlaylistEntity } from "./PlaylistEntity";
import { TagEntity } from "./TagEntity";

@Entity("playlist-summaries")
export class PlaylistSummaryEntity extends BaseEntityClass {
  type: "PlaylistSummary" = "PlaylistSummary";

  @OneToOne(() => PlaylistEntity, playlist => playlist.summary, {
    onDelete: "CASCADE"
  })
  @JoinColumn()
  playlist?: PlaylistEntity;
  @RelationId((playlistSummary: PlaylistSummaryEntity) => playlistSummary.playlist)
  playlistId!: string;

  @ManyToMany(() => TagEntity, {
    cascade: ["insert"]
  })
  @JoinTable({
    name: "playlists_tags"
  })
  tags?: TagEntity[];

  @Column()
  itemCount: number = 0;
}
