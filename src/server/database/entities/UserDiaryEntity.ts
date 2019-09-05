import { Column, Entity, ManyToOne, RelationId } from "typeorm";
import { BaseEntityClass } from "./BaseEntityClass";
import { UserEntity } from "./UserEntity";

@Entity("user-diaries")
export class UserDiaryEntity extends BaseEntityClass {
  type: "UserDiary" = "UserDiary";

  @ManyToOne(() => UserEntity, {
    onDelete: "CASCADE"
  })
  user?: UserEntity;
  @RelationId((userDiary: UserDiaryEntity) => userDiary.user)
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

  constructor(user: UserEntity, date: Date) {
    super();

    this.user = user;
    this.date = date && `${date.getUTCFullYear()}-${date.getUTCMonth()}-${date.getUTCDate()}`;
  }
}
