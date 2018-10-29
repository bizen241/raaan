import * as createError from "http-errors";
import { getManager } from "typeorm";
import * as uuid from "uuid";
import { createUser, UserEntity } from "../entities";

export const setGuestUser = async () => {
  const manager = getManager();

  const result = await manager.findOne(UserEntity, { permission: "Guest" });

  if (result === undefined) {
    const guestUser = createUser({
      id: uuid(),
      name: "Guest",
      permission: "Guest"
    });

    await manager.save(guestUser);
  }
};

export const getGuestUser = async () => {
  const result = await getManager().findOne(UserEntity, { permission: "Guest" });
  if (result === undefined) {
    throw createError(500);
  }

  return result;
};
