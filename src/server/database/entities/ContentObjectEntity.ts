import { Column, Entity } from "typeorm";
import { ContentItem } from "../../../shared/content";
import { BaseEntityClass } from "./BaseEntityClass";

@Entity()
export class ContentObjectEntity extends BaseEntityClass<"ContentObject"> {
  type: "ContentObject" = "ContentObject";

  @Column()
  lang!: string;

  @Column()
  title!: string;

  @Column()
  tags!: string[];

  @Column()
  summary!: string;

  @Column()
  comment!: string;

  @Column("json")
  items!: ContentItem[];

  @Column()
  isLinear!: boolean;
}

interface ContentObjectConstructor {
  id?: string;
  lang: string;
  title: string;
  tags: string[];
  summary: string;
  comment: string;
  items: ContentItem[];
  isLinear: boolean;
}

export const createContentObject = ({
  id,
  lang,
  title,
  tags,
  summary,
  comment,
  items,
  isLinear
}: ContentObjectConstructor) => {
  const contentObject = new ContentObjectEntity();

  if (id !== undefined) {
    contentObject.id = id;
  }

  contentObject.lang = lang;
  contentObject.title = title;
  contentObject.tags = tags;
  contentObject.summary = summary;
  contentObject.comment = comment;
  contentObject.items = items;
  contentObject.isLinear = isLinear;

  return contentObject;
};
