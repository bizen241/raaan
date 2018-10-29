import { CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { EntityType } from "../../../shared/entities";

export interface BaseEntityConstructor {
  id?: string;
}

export abstract class BaseEntity<T extends EntityType> {
  abstract type: T;

  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  constructor(id: string | undefined) {
    if (id !== undefined) {
      this.id = id;
    }
  }
}
