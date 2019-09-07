import { Column, Entity, ManyToOne, RelationId } from "typeorm";
import { BaseEntityClass } from "./BaseEntityClass";
import { ExerciseEntity } from "./ExerciseEntity";
import { PlaylistEntity } from "./PlaylistEntity";

@Entity("playlist-items")
export class PlaylistItemEntity extends BaseEntityClass {
  type: "PlaylistItem" = "PlaylistItem";

  @ManyToOne(() => PlaylistEntity, {
    onDelete: "CASCADE"
  })
  playlist?: PlaylistEntity;
  @RelationId((playlistItem: PlaylistItemEntity) => playlistItem.playlist)
  playlistId!: string;

  @ManyToOne(() => ExerciseEntity, {
    onDelete: "CASCADE"
  })
  exercise?: ExerciseEntity;
  @RelationId((playlistItem: PlaylistItemEntity) => playlistItem.exercise)
  exerciseId!: string;

  @Column()
  index: number;

  @Column()
  memo: string;

  constructor(playlist: PlaylistEntity, exercise: ExerciseEntity, index: number, memo: string) {
    super();

    this.playlist = playlist;
    this.exercise = exercise;
    this.index = index;
    this.memo = memo;
  }
}
