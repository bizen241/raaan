import { CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { EntityType, EntityId } from "../../../shared/api/entities";

export abstract class BaseEntityClass<T extends EntityType> {
  abstract type: T;

  @PrimaryGeneratedColumn("uuid")
  id!: EntityId<T>;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
