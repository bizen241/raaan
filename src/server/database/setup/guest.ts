import * as createError from "http-errors";
import { getManager } from "typeorm";
import { UserConfigEntity, UserEntity } from "../entities";

export const setGuestUser = async () => {
  const manager = getManager();

  const result = await manager.findOne(UserEntity, { permission: "Guest" });

  if (result === undefined) {
    const guestUserConfig = new UserConfigEntity();
    const guestUser = new UserEntity("Guest", "Guest", guestUserConfig);

    await manager.save(guestUserConfig);
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
