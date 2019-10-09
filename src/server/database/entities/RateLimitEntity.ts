import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity("rate-limits")
export class RateLimitEntity {
  @PrimaryColumn()
  key: string;

  @Column()
  hits: number = 0;

  @Column()
  expireAt: Date;

  constructor(key: string, expireAt: Date) {
    this.key = key;
    this.expireAt = expireAt;
  }
}
