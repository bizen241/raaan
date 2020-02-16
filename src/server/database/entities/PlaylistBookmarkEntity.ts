import { Column, Entity, ManyToOne, RelationId } from "typeorm";
import { EntityId } from "../../../shared/api/entities";
import { BaseEntityClass } from "./BaseEntityClass";
import { PlaylistEntity } from "./PlaylistEntity";
import { UserEntity } from "./UserEntity";

@Entity("playlist_bookmarks")
export class PlaylistBookmarkEntity extends BaseEntityClass<"PlaylistBookmark"> {
  readonly type = "PlaylistBookmark";

  @ManyToOne(() => UserEntity, {
    onDelete: "CASCADE"
  })
  user?: UserEntity;
  @RelationId((submission: PlaylistBookmarkEntity) => submission.user)
  userId!: EntityId<"User">;

  @ManyToOne(() => PlaylistEntity, {
    onDelete: "CASCADE"
  })
  playlist?: PlaylistEntity;
  @RelationId((submission: PlaylistBookmarkEntity) => submission.playlist)
  playlistId!: EntityId<"Playlist">;

  @Column()
  isPrivate: boolean;

  constructor(user: UserEntity, playlist: PlaylistEntity, isPrivate: boolean) {
    super();

    this.user = user;
    this.playlist = playlist;
    this.isPrivate = isPrivate;
  }
}
