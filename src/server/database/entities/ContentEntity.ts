import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToOne } from "typeorm";
import { BaseEntityClass } from "./BaseEntityClass";
import { ContentDetailEntity } from "./ContentDetailEntity";
import { ContentTagEntity } from "./ContentTagEntity";
import { UserEntity } from "./UserEntity";

@Entity()
export class ContentEntity extends BaseEntityClass {
  type: "Content" = "Content";

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

  @OneToOne(() => ContentDetailEntity, contentDetail => contentDetail.content, {
    onDelete: "CASCADE"
  })
  @JoinColumn({
    name: "detailId"
  })
  detail?: ContentDetailEntity;

  @ManyToMany(() => ContentTagEntity)
  @JoinTable()
  tags?: ContentTagEntity[];

  @Column()
  isPrivate: boolean = true;

  @Column()
  isLocked: boolean = false;

  constructor(author: UserEntity, detail: ContentDetailEntity) {
    super();

    this.authorId = author.id;
    this.detailId = detail.id;
  }
}
