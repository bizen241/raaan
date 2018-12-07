import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from "typeorm";
import { BaseEntity } from "./BaseEntity";
import { ContentEntity } from "./ContentEntity";
import { ContentRevisionEntity } from "./ContentRevisionEntity";

@Entity()
export class ContentBranchEntity extends BaseEntity<"ContentBranch"> {
  type: "ContentBranch" = "ContentBranch";

  @ManyToOne(() => ContentEntity)
  content!: ContentEntity;

  @OneToOne(() => ContentRevisionEntity)
  @JoinColumn()
  latest!: ContentRevisionEntity;

  @Column()
  lang!: string;
}

interface ContentBranchConstructor {
  id?: string;
  content: ContentEntity;
  lang: string;
}

export const createContentBranch = ({ id, content, lang }: ContentBranchConstructor) => {
  const contentBranch = new ContentBranchEntity();

  if (id !== undefined) {
    contentBranch.id = id;
  }

  contentBranch.content = content;
  contentBranch.lang = lang;

  return contentBranch;
};
