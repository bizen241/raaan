import { Column, Entity, ManyToOne, RelationId } from "typeorm";
import { BaseEntityClass } from "./BaseEntityClass";
import { PlaylistEntity } from "./PlaylistEntity";
import { UserEntity } from "./UserEntity";

@Entity("playlist-bookmarks")
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
  memo: string;

  constructor(user: UserEntity, playlist: PlaylistEntity, memo: string) {
    super();

    this.user = user;
    this.playlist = playlist;
    this.memo = memo;
  }
}
