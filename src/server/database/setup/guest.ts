import * as createError from "http-errors";
import { getManager } from "typeorm";
import { UserConfigEntity, UserEntity } from "../entities";

export const setGuestUser = async () => {
  const manager = getManager();

  const result = await manager.findOne(UserEntity, { permission: "Guest" });

  if (result === undefined) {
    const guestUserConfig = new UserConfigEntity();
    await manager.save(guestUserConfig);

    const guestUser = new UserEntity("", "Guest", guestUserConfig);
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
