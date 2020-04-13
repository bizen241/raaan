import { Column, Entity, JoinColumn, JoinTable, ManyToMany, OneToOne, RelationId } from "typeorm";
import { EntityId } from "../../../shared/api/entities";
import { BaseEntityClass } from "./BaseEntityClass";
import { PlaylistEntity } from "./PlaylistEntity";
import { TagEntity } from "./TagEntity";

@Entity("playlist_summaries")
export class PlaylistSummaryEntity extends BaseEntityClass<"PlaylistSummary"> {
  readonly type = "PlaylistSummary";

  @OneToOne(() => PlaylistEntity, (playlist) => playlist.summary, {
    onDelete: "CASCADE",
  })
  @JoinColumn()
  playlist?: PlaylistEntity;
  @RelationId((playlistSummary: PlaylistSummaryEntity) => playlistSummary.playlist)
  playlistId!: EntityId<"Playlist">;

  @ManyToMany(() => TagEntity, {
    cascade: ["insert"],
  })
  @JoinTable({
    name: "playlists_tags",
  })
  tags?: TagEntity[];

  @Column()
  itemCount: number = 0;

  @Column()
  commentCount: number = 0;

  @Column()
  submittedCount: number = 0;

  @Column()
  typedCount: number = 0;
}
