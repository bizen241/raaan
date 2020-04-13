import { Column, Entity, ManyToOne, RelationId } from "typeorm";
import { DateString, EntityId } from "../../../shared/api/entities";
import { BaseEntityClass } from "./BaseEntityClass";
import { TagEntity } from "./TagEntity";

@Entity("tag_diaries")
export class TagDiaryEntryEntity extends BaseEntityClass<"TagDiaryEntry"> {
  readonly type = "TagDiaryEntry";

  @ManyToOne(() => TagEntity, {
    onDelete: "CASCADE",
  })
  tag?: TagEntity;
  @RelationId((tagDiaryEntry: TagDiaryEntryEntity) => tagDiaryEntry.tag)
  tagId!: EntityId<"Tag">;

  @Column("date")
  date: DateString;

  @Column()
  submittedCount: number = 0;

  @Column()
  typedCount: number = 0;

  constructor(tag: TagEntity, date: DateString) {
    super();

    this.tag = tag;
    this.date = date;
  }
}
