import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToOne } from "typeorm";
import { BaseEntity } from "./BaseEntity";
import { ContentRevisionEntity } from "./ContentRevisionEntity";
import { ContentTagEntity } from "./ContentTagEntity";
import { UserEntity } from "./UserEntity";

@Entity()
export class ContentEntity extends BaseEntity<"Content"> {
  type: "Content" = "Content";

  @ManyToOne(() => UserEntity)
  owner!: UserEntity;

  @OneToOne(() => ContentRevisionEntity)
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
  owner: UserEntity;
}

export const createContent = ({ id, owner }: ContentConstructor) => {
  const content = new ContentEntity();

  if (id !== undefined) {
    content.id = id;
  }

  content.owner = owner;
  content.isPrivate = true;
  content.isArchived = false;
  content.isLocked = false;

  return content;
};
