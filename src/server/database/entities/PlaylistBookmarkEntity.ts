import { Column, Entity, ManyToOne, RelationId } from "typeorm";
import { BaseEntityClass } from "./BaseEntityClass";
import { PlaylistEntity } from "./PlaylistEntity";
import { UserEntity } from "./UserEntity";

@Entity("playlist_bookmarks")
export class PlaylistBookmarkEntity extends BaseEntityClass {
  type: "PlaylistBookmark" = "PlaylistBookmark";

  @ManyToOne(() => UserEntity, {
    onDelete: "CASCADE"
  })
  user?: UserEntity;
  @RelationId((submission: PlaylistBookmarkEntity) => submission.user)
  userId!: string;

  @ManyToOne(() => PlaylistEntity, {
    onDelete: "CASCADE"
  })
  playlist?: PlaylistEntity;
  @RelationId((submission: PlaylistBookmarkEntity) => submission.playlist)
  playlistId!: string;

  @Column()
  isPrivate: boolean;

  constructor(user: UserEntity, playlist: PlaylistEntity, isPrivate: boolean) {
    super();

    this.user = user;
    this.playlist = playlist;
    this.isPrivate = isPrivate;
  }
}
