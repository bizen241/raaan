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
  date: Date;

  @Column()
  playCount: number = 1;

  @Column()
  typeCount: number;

  constructor(user: UserEntity, date: Date, typeCount: number) {
    super();

    this.user = user;
    this.date = date;
    this.typeCount = typeCount;
  }
}
