import { Column, Entity, ManyToOne, RelationId } from "typeorm";
import { BaseEntityClass } from "./BaseEntityClass";
import { TagEntity } from "./TagEntity";

@Entity("tag_diaries")
export class TagDiaryEntity extends BaseEntityClass {
  type: "TagDiary" = "TagDiary";

  @ManyToOne(() => TagEntity, {
    onDelete: "CASCADE"
  })
  tag?: TagEntity;
  @RelationId((tagDiary: TagDiaryEntity) => tagDiary.tag)
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
