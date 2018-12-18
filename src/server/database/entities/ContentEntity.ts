import { Entity, JoinColumn, OneToOne } from "typeorm";
import { BaseEntity } from "./BaseEntity";
import { ContentRevisionEntity } from "./ContentRevisionEntity";

@Entity()
export class ContentEntity extends BaseEntity<"Content"> {
  type: "Content" = "Content";

  @OneToOne(() => ContentRevisionEntity)
  @JoinColumn()
  latest!: ContentRevisionEntity;
}

interface ContentConstructor {
  id?: string;
}

export const createContent = ({ id }: ContentConstructor) => {
  const content = new ContentEntity();

  if (id !== undefined) {
    content.id = id;
  }

  return content;
};
