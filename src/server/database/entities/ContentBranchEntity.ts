import { Column, Entity, ManyToOne } from "typeorm";
import { BaseEntity } from "./BaseEntity";
import { ContentEntity } from "./ContentEntity";

@Entity()
export class ContentBranchEntity extends BaseEntity<"ContentBranch"> {
  type: "ContentBranch" = "ContentBranch";

  @ManyToOne(() => ContentEntity)
  content!: ContentEntity;

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
  if (content !== undefined) {
    contentBranch.content = content;
  }
  if (lang !== undefined) {
    contentBranch.lang = lang;
  }

  return contentBranch;
};
