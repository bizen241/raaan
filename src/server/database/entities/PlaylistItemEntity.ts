import { Column, Entity, JoinColumn, ManyToOne, OneToOne, RelationId } from "typeorm";
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

  @OneToOne(() => PlaylistItemEntity, {
    onDelete: "SET NULL"
  })
  @JoinColumn()
  next?: PlaylistItemEntity;
  @RelationId((playlistItem: PlaylistItemEntity) => playlistItem.next)
  nextId!: string;

  @Column()
  memo: string;

  constructor(playlist: PlaylistEntity, exercise: ExerciseEntity, memo: string) {
    super();

    this.playlist = playlist;
    this.exercise = exercise;
    this.memo = memo;
  }
}
