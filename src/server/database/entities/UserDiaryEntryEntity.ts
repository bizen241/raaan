import { Column, Entity, ManyToOne, RelationId } from "typeorm";
import { BaseEntityClass } from "./BaseEntityClass";
import { UserEntity } from "./UserEntity";

@Entity("user_diaries")
export class UserDiaryEntryEntity extends BaseEntityClass {
  type: "UserDiaryEntry" = "UserDiaryEntry";

  @ManyToOne(() => UserEntity, {
    onDelete: "CASCADE"
  })
  user?: UserEntity;
  @RelationId((userDiaryEntry: UserDiaryEntryEntity) => userDiaryEntry.user)
  userId!: string;

  @Column("date")
  date: string;

  @Column()
  submitCount: number = 0;

  @Column()
  typeCount: number = 0;

  @Column()
  submittedCount: number = 0;

  @Column()
  typedCount: number = 0;

  @Column()
  createCount: number = 0;

  @Column()
  editCount: number = 0;

  constructor(user: UserEntity, date: string) {
    super();

    this.user = user;
    this.date = date;
  }
}