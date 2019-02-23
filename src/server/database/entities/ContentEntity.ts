import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToOne } from "typeorm";
import { BaseEntityClass } from "./BaseEntityClass";
import { ContentRevisionEntity } from "./ContentRevisionEntity";
import { ContentTagEntity } from "./ContentTagEntity";
import { UserEntity } from "./UserEntity";

@Entity()
export class ContentEntity extends BaseEntityClass<"Content"> {
  type: "Content" = "Content";

  @ManyToOne(() => UserEntity, {
    onDelete: "CASCADE"
  })
  author!: UserEntity;

  @OneToOne(() => ContentRevisionEntity, {
    onDelete: "CASCADE"
  })
  @JoinColumn()
  latest!: ContentRevisionEntity;

  @ManyToMany(() => ContentTagEntity)
  @JoinTable()
  tags!: ContentTagEntity[];

  @Column()
  isPrivate!: boolean;

  @Column()
  isArchived!: boolean;

  @Column()
  isLocked!: boolean;
}

interface ContentConstructor {
  id?: string;
  author: UserEntity;
}

export const createContentEntity = ({ id, author }: ContentConstructor) => {
  const content = new ContentEntity();

  if (id !== undefined) {
    content.id = id;
  }

  content.author = author;
  content.isPrivate = true;
  content.isArchived = false;
  content.isLocked = false;

  return content;
};
