import { Column, Entity, ManyToOne } from "typeorm";
import { BaseEntity } from "./BaseEntity";
import { ContentBranchEntity } from "./ContentBranchEntity";
import { UserEntity } from "./UserEntity";

@Entity()
export class ContentRevisionEntity extends BaseEntity<"ContentRevision"> {
  type: "ContentRevision" = "ContentRevision";

  @ManyToOne(() => ContentBranchEntity, {
    onDelete: "CASCADE"
  })
  branch!: ContentBranchEntity;

  @ManyToOne(() => UserEntity)
  author!: UserEntity;

  @Column()
  version!: number;

  @Column()
  comment!: string;

  @Column({ type: "json" })
  object!: object;

  @Column()
  isDraft!: boolean;
}

interface ContentRevisionConstructor {
  id?: string;
  branch: ContentBranchEntity;
  author: UserEntity;
  version: number;
  comment: string;
  object: object;
  isDraft: boolean;
}

export const createContentRevision = ({
  id,
  branch,
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

  contentRevision.branch = branch;
  contentRevision.author = author;
  contentRevision.version = version;
  contentRevision.comment = comment;
  contentRevision.object = object;
  contentRevision.isDraft = isDraft;

  return contentRevision;
};
