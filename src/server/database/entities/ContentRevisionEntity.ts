import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from "typeorm";
import { BaseEntityClass } from "./BaseEntityClass";
import { ContentEntity } from "./ContentEntity";
import { ContentObjectEntity } from "./ContentObjectEntity";
import { UserEntity } from "./UserEntity";

@Entity()
export class ContentRevisionEntity extends BaseEntityClass<"ContentRevision"> {
  type: "ContentRevision" = "ContentRevision";

  @ManyToOne(() => ContentEntity, {
    onDelete: "CASCADE"
  })
  content!: ContentEntity;

  @ManyToOne(() => ContentRevisionEntity)
  parent!: ContentRevisionEntity;

  @ManyToOne(() => UserEntity)
  author!: UserEntity;

  @OneToOne(() => ContentObjectEntity)
  @JoinColumn()
  object!: ContentObjectEntity;

  @Column()
  version!: number;

  @Column()
  title!: string;

  @Column()
  comment!: string;

  @Column()
  isProposed!: boolean;

  @Column()
  isMerged!: boolean;
}

interface ContentRevisionConstructor {
  id?: string;
  author: UserEntity;
  content: ContentEntity;
  parent?: ContentRevisionEntity;
  object: ContentObjectEntity;
  version: number;
  title: string;
  comment: string;
}

export const createContentRevision = ({
  id,
  author,
  content,
  parent,
  object,
  version,
  title,
  comment
}: ContentRevisionConstructor) => {
  const contentRevision = new ContentRevisionEntity();

  if (id !== undefined) {
    contentRevision.id = id;
  }
  if (parent !== undefined) {
    contentRevision.parent = parent;
  }

  contentRevision.author = author;
  contentRevision.content = content;
  contentRevision.object = object;
  contentRevision.version = version;
  contentRevision.title = title;
  contentRevision.comment = comment;
  contentRevision.isProposed = false;
  contentRevision.isMerged = false;

  return contentRevision;
};
