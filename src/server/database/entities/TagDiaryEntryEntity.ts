import { Column, Entity, ManyToOne, RelationId } from "typeorm";
import { BaseEntityClass } from "./BaseEntityClass";
import { TagEntity } from "./TagEntity";

@Entity("tag_diaries")
export class TagDiaryEntryEntity extends BaseEntityClass {
  type: "TagDiaryEntry" = "TagDiaryEntry";

  @ManyToOne(() => TagEntity, {
    onDelete: "CASCADE"
  })
  tag?: TagEntity;
  @RelationId((tagDiaryEntry: TagDiaryEntryEntity) => tagDiaryEntry.tag)
  tagId!: string;

  @Column("date")
  date: string;

  @Column()
  submittedCount: number = 0;

  @Column()
  typedCount: number = 0;

  constructor(tag: TagEntity, date: string) {
    super();

    this.tag = tag;
    this.date = date;
  }
}
