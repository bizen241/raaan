import { Column, Entity, JoinColumn, ManyToOne, OneToOne, RelationId } from "typeorm";
import { EntityId } from "../../../shared/api/entities";
import { BaseEntityClass } from "./BaseEntityClass";
import { ExerciseEntity } from "./ExerciseEntity";
import { PlaylistEntity } from "./PlaylistEntity";

@Entity("playlist_items")
export class PlaylistItemEntity extends BaseEntityClass<"PlaylistItem"> {
  readonly type = "PlaylistItem";

  @ManyToOne(() => PlaylistEntity, {
    onDelete: "CASCADE"
  })
  playlist?: PlaylistEntity;
  @RelationId((playlistItem: PlaylistItemEntity) => playlistItem.playlist)
  playlistId!: EntityId<"Playlist">;

  @ManyToOne(() => ExerciseEntity)
  exercise?: ExerciseEntity | null;
  @RelationId((playlistItem: PlaylistItemEntity) => playlistItem.exercise)
  exerciseId!: EntityId<"Exercise">;

  @OneToOne(() => PlaylistItemEntity, {
    onDelete: "SET NULL"
  })
  @JoinColumn()
  next?: PlaylistItemEntity | null;
  @RelationId((playlistItem: PlaylistItemEntity) => playlistItem.next)
  nextId!: EntityId<"PlaylistItem">;

  @Column()
  memo: string;

  constructor(playlist: PlaylistEntity, exercise: ExerciseEntity, memo: string) {
    super();

    this.playlist = playlist;
    this.exercise = exercise;
    this.memo = memo;
  }
}
