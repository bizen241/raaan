import { Router } from "express";
import createError from "http-errors";
import { getManager } from "typeorm";
import { UserEntity } from "../database/entities";
import { insertUser, insertUserDiaryEntry } from "../__tests__/helpers";

export const testRouter = Router();

testRouter.get("/", async (_, res, next) => {
  if (process.env.NODE_ENV === "production") {
    return next(createError(403));
  }

  const manager = getManager();

  await Promise.all(
    [...Array(100).keys()].map(async () => {
      await insertUser();
    })
  );

  const users = await manager.find(UserEntity);

  await Promise.all(
    users.map(async (user) => {
      await Promise.all(
        [...Array(10).keys()].map(async (_, index) => {
          await insertUserDiaryEntry({
            user,
            date: new Date(Date.now() - index * 24 * 60 * 60 * 1000),
          });
        })
      );
    })
  );

  res.status(200).send();
});
