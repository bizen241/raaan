import * as createError from "http-errors";
import { getManager } from "typeorm";
import { UserAccountEntity, UserConfigEntity, UserEntity } from "../entities";

export const setGuestUser = async () => {
  const manager = getManager();

  const result = await manager.findOne(UserEntity, { permission: "Guest" });

  if (result === undefined) {
    const guestUserAccount = new UserAccountEntity("github", "", "");
    const guestUserConfig = new UserConfigEntity();
    const guestUser = new UserEntity(guestUserAccount, guestUserConfig, "", "Guest");

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
