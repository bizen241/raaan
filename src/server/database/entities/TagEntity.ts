import { Column, Entity, OneToOne, RelationId } from "typeorm";
import { EntityId } from "../../../shared/api/entities";
import { BaseEntityClass } from "./BaseEntityClass";
import { TagSummaryEntity } from "./TagSummaryEntity";

@Entity("tags")
export class TagEntity extends BaseEntityClass<"Tag"> {
  readonly type = "Tag";

  @OneToOne(
    () => TagSummaryEntity,
    tagSummary => tagSummary.tag,
    {
      cascade: ["insert"]
    }
  )
  summary?: TagSummaryEntity;
  @RelationId((tag: TagEntity) => tag.summary)
  summaryId!: EntityId<"TagSummary">;

  @Column({
    unique: true
  })
  name!: string;

  @Column()
  description: string = "";

  @Column("datetime")
  checkedAt!: Date;

  constructor(name: string) {
    super();

    this.name = name;
  }
}
