import { Column, Entity } from "typeorm";
import { BaseEntity } from "./BaseEntity";

@Entity()
export class ContentTagEntity extends BaseEntity<"ContentTag"> {
  type: "ContentTag" = "ContentTag";

  @Column()
  name!: string;
}

interface ContentTagConstructor {
  id?: string;
  name: string;
}

export const createContentTag = ({ id, name }: ContentTagConstructor) => {
  const contentTag = new ContentTagEntity();

  if (id !== undefined) {
    contentTag.id = id;
  }

  contentTag.name = name;

  return contentTag;
};
