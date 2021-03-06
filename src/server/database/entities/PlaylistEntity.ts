import { Column, Entity, ManyToOne, OneToOne, RelationId } from "typeorm";
import { EntityId, OrderBy, Playlist } from "../../../shared/api/entities";
import { Params } from "../../../shared/api/request/params";
import { BaseEntityClass } from "./BaseEntityClass";
import { PlaylistSummaryEntity } from "./PlaylistSummaryEntity";
import { UserEntity } from "./UserEntity";

@Entity("playlists")
export class PlaylistEntity extends BaseEntityClass<"Playlist"> {
  readonly type = "Playlist";

  @ManyToOne(() => UserEntity, {
    onDelete: "CASCADE",
  })
  author?: UserEntity;
  @RelationId((playlist: PlaylistEntity) => playlist.author)
  authorId!: EntityId<"User">;

  @OneToOne(() => PlaylistSummaryEntity, (playlistSummary) => playlistSummary.playlist, {
    cascade: ["insert"],
  })
  summary?: PlaylistSummaryEntity;
  @RelationId((playlist: PlaylistEntity) => playlist.summary)
  summaryId!: EntityId<"PlaylistSummary">;

  @Column()
  title: string = "";

  @Column("json")
  tags: string[] = [];

  @Column()
  description: string = "";

  @Column()
  orderBy: OrderBy = "manual-last";

  @Column()
  isPrivate: boolean = true;

  @Column()
  isLocked: boolean = false;

  constructor(author: UserEntity, summary: PlaylistSummaryEntity, params: Params<Playlist>) {
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
