import { Column, Entity, ManyToOne, OneToOne, RelationId } from "typeorm";
import { Playlist } from "../../../shared/api/entities";
import { SaveParams } from "../../../shared/api/request/save";
import { BaseEntityClass } from "./BaseEntityClass";
import { PlaylistSummaryEntity } from "./PlaylistSummaryEntity";
import { UserEntity } from "./UserEntity";

@Entity("playlists")
export class PlaylistEntity extends BaseEntityClass {
  type: "Playlist" = "Playlist";

  @ManyToOne(() => UserEntity, {
    onDelete: "CASCADE"
  })
  author?: UserEntity;
  @RelationId((playlist: PlaylistEntity) => playlist.author)
  authorId!: string;

  @OneToOne(() => PlaylistSummaryEntity, playlistSummary => playlistSummary.playlist, {
    cascade: ["insert"]
  })
  summary?: PlaylistSummaryEntity;
  @RelationId((playlist: PlaylistEntity) => playlist.summary)
  summaryId!: string;

  @Column()
  title: string = "";

  @Column("json")
  tags: string[] = [];

  @Column()
  description: string = "";

  @Column()
  isPrivate: boolean = true;

  @Column()
  isLocked: boolean = false;

  constructor(author: UserEntity, summary: PlaylistSummaryEntity, params: SaveParams<Playlist>) {
    super();

    this.author = author;
    this.summary = summary;

    if (params !== undefined) {
      this.title = params.title || "";
      this.tags = params.tags || [];
      this.description = params.description || "";
    }
  }
}
