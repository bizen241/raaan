import { Store } from "express-rate-limit";
import { getManager, LessThan } from "typeorm";
import { RateLimitEntity } from "../database/entities/RateLimitEntity";

export class RateLimitStore implements Store {
  clearExpiredTimeout?: NodeJS.Timeout;

  constructor(readonly max: number, readonly windowMs: number) {
    this.clearExpired();
  }

  clearExpired() {
    if (this.clearExpiredTimeout !== undefined) {
      clearTimeout(this.clearExpiredTimeout);
    }

    this.clearExpiredTimeout = setTimeout(async () => {
      await getManager().delete(RateLimitEntity, {
        expireAt: LessThan(new Date(Date.now() - 60 * 60 * 1000)),
      });

      this.clearExpired();
    }, 5 * 60 * 1000);

    this.clearExpiredTimeout.unref();
  }

  calcExpireDate() {
    return new Date(new Date().getTime() + this.windowMs);
  }

  async incr(key: string, cb: any) {
    const manager = getManager();

    try {
      const rateLimit =
        (await manager.findOne(RateLimitEntity, key)) || new RateLimitEntity(key, this.calcExpireDate());

      if (rateLimit.expireAt.getTime() > Date.now()) {
        if (rateLimit.hits <= this.max) {
          rateLimit.hits += 1;

          await manager.save(rateLimit);
        }
      } else {
        rateLimit.hits = 1;
        rateLimit.expireAt = this.calcExpireDate();

        await manager.save(rateLimit);
      }

      cb(undefined, rateLimit.hits, rateLimit.expireAt);
    } catch (e) {
      cb(e);
    }
  }

  async decrement(key: string) {
    const manager = getManager();

    const rateLimit = await manager.findOne(RateLimitEntity, key);
    if (rateLimit === undefined) {
      return;
    }

    rateLimit.hits -= 1;

    await manager.save(rateLimit);
  }

  async resetKey(key: string) {
    await getManager().delete(RateLimitEntity, key);
  }

  async resetAll() {
    await getManager().clear(RateLimitEntity);
  }
}
