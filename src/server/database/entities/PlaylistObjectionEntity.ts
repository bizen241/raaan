import { Entity, OneToOne } from "typeorm";
import { BaseObjectionClass } from "./BaseObjectionClass";
import { PlaylistEntity } from "./PlaylistEntity";

@Entity("playlist-objection")
export class PlaylistObjectionEntity extends BaseObjectionClass<PlaylistEntity> {
  type: "PlaylistObjection" = "PlaylistObjection";

  @OneToOne(() => PlaylistEntity, {
    onDelete: "CASCADE"
  })
  target?: PlaylistEntity;
}
