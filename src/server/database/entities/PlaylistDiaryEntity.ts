import { Column, Entity, ManyToOne, RelationId } from "typeorm";
import { BaseEntityClass } from "./BaseEntityClass";
import { PlaylistEntity } from "./PlaylistEntity";

@Entity("playlist_diaries")
export class PlaylistDiaryEntryEntity extends BaseEntityClass {
  type: "PlaylistDiaryEntry" = "PlaylistDiaryEntry";

  @ManyToOne(() => PlaylistEntity, {
    onDelete: "CASCADE"
  })
  playlist?: PlaylistEntity;
  @RelationId((playlistDiaryEntry: PlaylistDiaryEntryEntity) => playlistDiaryEntry.playlist)
  playlistId!: string;

  @Column("date")
  date: string;

  @Column()
  submittedCount: number = 0;

  @Column()
  typedCount: number = 0;

  constructor(playlist: PlaylistEntity, date: string) {
    super();

    this.playlist = playlist;
    this.date = date;
  }
}
