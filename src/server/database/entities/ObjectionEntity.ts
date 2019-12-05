import { Column, Entity, JoinColumn, ManyToOne, OneToOne, RelationId } from "typeorm";
import { ObjectionState } from "../../../shared/api/entities/Objection";
import { BaseEntityClass } from "./BaseEntityClass";
import { ExerciseEntity } from "./ExerciseEntity";
import { GroupEntity } from "./GroupEntity";
import { PlaylistEntity } from "./PlaylistEntity";
import { UserEntity } from "./UserEntity";

@Entity("objections")
export class ObjectionEntity extends BaseEntityClass {
  type: "Objection" = "Objection";

  @ManyToOne(() => UserEntity, {
    onDelete: "CASCADE"
  })
  reporter?: UserEntity;
  @RelationId((report: ObjectionEntity) => report.reporter)
  reporterId!: string;

  @OneToOne(() => ExerciseEntity, {
    onDelete: "CASCADE"
  })
  @JoinColumn()
  targetExercise?: ExerciseEntity;
  @RelationId((report: ObjectionEntity) => report.targetExercise)
  targetExerciseId?: string;

  @OneToOne(() => GroupEntity, {
    onDelete: "CASCADE"
  })
  @JoinColumn()
  targetGroup?: GroupEntity;
  @RelationId((report: ObjectionEntity) => report.targetGroup)
  targetGroupId?: string;

  @OneToOne(() => PlaylistEntity, {
    onDelete: "CASCADE"
  })
  @JoinColumn()
  targetPlaylist?: PlaylistEntity;
  @RelationId((report: ObjectionEntity) => report.targetPlaylist)
  targetPlaylistId?: string;

  @OneToOne(() => UserEntity, {
    onDelete: "CASCADE"
  })
  @JoinColumn()
  targetUser?: UserEntity;
  @RelationId((report: ObjectionEntity) => report.targetUser)
  targetUserId?: string;

  @Column()
  description: string = "";

  @Column()
  state: ObjectionState = "pending";

  @Column()
  comment: string = "";

  constructor(description: string) {
    super();

    this.description = description;
  }
}
