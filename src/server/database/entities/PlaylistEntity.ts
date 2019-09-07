import { Column, Entity, ManyToOne, RelationId } from "typeorm";
import { BaseEntityClass } from "./BaseEntityClass";
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

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  isPrivate: boolean = true;

  constructor(author: UserEntity, title: string, description: string) {
    super();

    this.author = author;
    this.title = title;
    this.description = description;
  }
}
