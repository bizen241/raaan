import { Column, Entity, ManyToOne } from "typeorm";
import { ContentItem } from "../../../shared/content";
import { BaseEntityClass } from "./BaseEntityClass";
import { ContentEntity } from "./ContentEntity";

@Entity()
export class ContentRevisionEntity extends BaseEntityClass<"ContentRevision"> {
  type: "ContentRevision" = "ContentRevision";

  @ManyToOne(() => ContentEntity, {
    onDelete: "CASCADE"
  })
  content!: ContentEntity;

  @Column()
  lang!: string;

  @Column()
  title!: string;

  @Column("json")
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

interface ContentRevisionConstructor {
  id?: string;
  content?: ContentEntity;
  lang: string | undefined;
  title: string | undefined;
  tags: string[] | undefined;
  summary: string | undefined;
  comment: string | undefined;
  items: ContentItem[] | undefined;
  isLinear: boolean | undefined;
}

export const createContentRevisionEntity = ({
  id,
  content,
  lang,
  title,
  tags,
  summary,
  comment,
  items,
  isLinear
}: ContentRevisionConstructor) => {
  const contentRevision = new ContentRevisionEntity();

  if (id !== undefined) {
    contentRevision.id = id;
  }
  if (content !== undefined) {
    contentRevision.content = content;
  }

  contentRevision.lang = lang || "en";
  contentRevision.title = title || "";
  contentRevision.tags = tags || [];
  contentRevision.summary = summary || "";
  contentRevision.comment = comment || "";
  contentRevision.items = items || [];
  contentRevision.isLinear = isLinear || false;

  return contentRevision;
};
