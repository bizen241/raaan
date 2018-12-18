import { Column, Entity, ManyToOne } from "typeorm";
import { ContentData } from "../../../shared/content";
import { BaseEntity } from "./BaseEntity";
import { ContentEntity } from "./ContentEntity";
import { UserEntity } from "./UserEntity";

@Entity()
export class ContentRevisionEntity extends BaseEntity<"ContentRevision"> {
  type: "ContentRevision" = "ContentRevision";

  @ManyToOne(() => UserEntity)
  author!: UserEntity;

  @ManyToOne(() => ContentEntity, {
    onDelete: "CASCADE"
  })
  content!: ContentEntity;

  @Column()
  version!: number;

  @Column()
  comment!: string;

  @Column({ type: "json" })
  data!: ContentData;

  @Column()
  isProposed!: boolean;

  @Column()
  isMerged!: boolean;
}

interface ContentRevisionConstructor {
  id?: string;
  content: ContentEntity;
  author: UserEntity;
  version: number;
  comment: string;
  data: ContentData;
}

export const createContentRevision = ({ id, content, author, version, comment, data }: ContentRevisionConstructor) => {
  const contentRevision = new ContentRevisionEntity();

  if (id !== undefined) {
    contentRevision.id = id;
  }

  contentRevision.content = content;
  contentRevision.author = author;
  contentRevision.version = version;
  contentRevision.comment = comment;
  contentRevision.data = data;
  contentRevision.isProposed = false;
  contentRevision.isMerged = false;

  return contentRevision;
};
