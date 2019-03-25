import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToOne } from "typeorm";
import { BaseEntityClass } from "./BaseEntityClass";
import { ExerciseDetailEntity } from "./ExerciseDetailEntity";
import { ExerciseTagEntity } from "./ExerciseTagEntity";
import { UserEntity } from "./UserEntity";

@Entity()
export class ExerciseEntity extends BaseEntityClass {
  type: "Exercise" = "Exercise";

  @Column("uuid")
  authorId: string;

  @ManyToOne(() => UserEntity, {
    onDelete: "CASCADE"
  })
  @JoinColumn({
    name: "authorId"
  })
  author?: UserEntity;

  @Column("uuid")
  detailId: string;

  @OneToOne(() => ExerciseDetailEntity, contentDetail => contentDetail.content, {
    onDelete: "CASCADE"
  })
  @JoinColumn({
    name: "detailId"
  })
  detail?: ExerciseDetailEntity;

  @ManyToMany(() => ExerciseTagEntity)
  @JoinTable()
  tags?: ExerciseTagEntity[];

  @Column()
  isPrivate: boolean = true;

  @Column()
  isLocked: boolean = false;

  constructor(author: UserEntity, detail: ExerciseDetailEntity) {
    super();

    this.authorId = author.id;
    this.detailId = detail.id;
  }
}
