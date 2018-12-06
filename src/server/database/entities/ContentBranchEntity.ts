import { Column, Entity, ManyToOne, OneToOne } from "typeorm";
import { BaseEntity } from "./BaseEntity";
import { ContentEntity } from "./ContentEntity";
import { ContentRevisionEntity } from "./ContentRevisionEntity";

@Entity()
export class ContentBranchEntity extends BaseEntity<"ContentBranch"> {
  type: "ContentBranch" = "ContentBranch";

  @ManyToOne(() => ContentEntity)
  content!: ContentEntity;

  @OneToOne(() => ContentRevisionEntity)
  latest!: ContentRevisionEntity;

  @Column()
  lang!: string;
}

interface ContentBranchConstructor {
  id?: string;
  content: ContentEntity;
  latest: ContentRevisionEntity;
  lang: string;
}

export const createContentBranch = ({ id, content, latest, lang }: ContentBranchConstructor) => {
  const contentBranch = new ContentBranchEntity();

  if (id !== undefined) {
    contentBranch.id = id;
  }
  if (content !== undefined) {
    contentBranch.content = content;
  }
  if (latest !== undefined) {
    contentBranch.latest = latest;
  }
  if (lang !== undefined) {
    contentBranch.lang = lang;
  }

  return contentBranch;
};
