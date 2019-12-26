import { Column, ManyToOne, RelationId } from "typeorm";
import { BaseEntityClass } from "./BaseEntityClass";
import { UserEntity } from "./UserEntity";

export abstract class BaseVoteClass<E extends BaseEntityClass> extends BaseEntityClass {
  @ManyToOne(() => UserEntity, {
    onDelete: "CASCADE"
  })
  voter?: UserEntity;
  @RelationId((vote: BaseVoteClass<E>) => vote.voter)
  voterId!: string;

  target?: E;
  @RelationId((vote: BaseVoteClass<E>) => vote.target)
  targetId!: string;

  @Column()
  isUp: boolean;

  constructor(voter: UserEntity, isUp: boolean) {
    super();

    this.voter = voter;
    this.isUp = isUp;
  }
}
