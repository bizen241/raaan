import { Entity, ManyToOne, RelationId } from "typeorm";
import { BaseEntityClass } from "./BaseEntityClass";
import { GroupEntity } from "./GroupEntity";
import { PlaylistEntity } from "./PlaylistEntity";

@Entity("group_playlists")
export class GroupPlaylistEntity extends BaseEntityClass {
  type: "GroupPlaylist" = "GroupPlaylist";

  @ManyToOne(() => GroupEntity, {
    onDelete: "CASCADE"
  })
  group?: GroupEntity;
  @RelationId((groupPlaylist: GroupPlaylistEntity) => groupPlaylist.group)
  groupId!: string;

  @ManyToOne(() => PlaylistEntity)
  playlist?: PlaylistEntity;
  @RelationId((groupPlaylist: GroupPlaylistEntity) => groupPlaylist.playlist)
  playlistId!: string;

  constructor(group: GroupEntity, playlist: PlaylistEntity) {
    super();

    this.group = group;
    this.playlist = playlist;
  }
}
