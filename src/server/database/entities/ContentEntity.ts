import { Entity, OneToOne } from "typeorm";
import { BaseEntity } from "./BaseEntity";
import { ContentBranchEntity } from "./ContentBranchEntity";

@Entity()
export class ContentEntity extends BaseEntity<"Content"> {
  type: "Content" = "Content";

  @OneToOne(() => ContentBranchEntity)
  source!: ContentBranchEntity;
}

interface ContentConstructor {
  id?: string;
  source: ContentBranchEntity;
}

export const createContent = ({ id, source }: ContentConstructor) => {
  const content = new ContentEntity();

  if (id !== undefined) {
    content.id = id;
  }
  if (source !== undefined) {
    content.source = source;
  }

  return content;
};
