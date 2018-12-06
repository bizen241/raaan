import { Column, Entity, ManyToOne } from "typeorm";
import { BaseEntity } from "./BaseEntity";
import { ContentBranchEntity } from "./ContentBranchEntity";
import { UserEntity } from "./UserEntity";

@Entity()
export class ContentRevisionEntity extends BaseEntity<"ContentRevision"> {
  type: "ContentRevision" = "ContentRevision";

  @ManyToOne(() => ContentBranchEntity)
  branch!: ContentBranchEntity;

  @ManyToOne(() => ContentRevisionEntity)
  parent!: ContentRevisionEntity;

  @ManyToOne(() => UserEntity)
  author!: UserEntity;

  @Column()
  version!: string;

  @Column()
  comment!: string;

  @Column()
  object!: unknown;

  @Column()
  isDraft!: boolean;
}

interface ContentRevisionConstructor {
  id?: string;
  branch: ContentBranchEntity;
  parent: ContentRevisionEntity;
  author: UserEntity;
  version: string;
  comment: string;
  object: unknown;
  isDraft: boolean;
}

export const createContentRevision = ({
  id,
  branch,
  parent,
  author,
  version,
  comment,
  object,
  isDraft
}: ContentRevisionConstructor) => {
  const contentRevision = new ContentRevisionEntity();

  if (id !== undefined) {
    contentRevision.id = id;
  }
  if (branch !== undefined) {
    contentRevision.branch = branch;
  }
  if (parent !== undefined) {
    contentRevision.parent = parent;
  }
  if (author !== undefined) {
    contentRevision.author = author;
  }
  if (version !== undefined) {
    contentRevision.version = version;
  }
  if (comment !== undefined) {
    contentRevision.comment = comment;
  }
  if (object !== undefined) {
    contentRevision.object = object;
  }
  if (isDraft !== undefined) {
    contentRevision.isDraft = isDraft;
  }

  return contentRevision;
};
