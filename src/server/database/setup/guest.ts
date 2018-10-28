import { getManager } from "typeorm";
import * as uuid from "uuid";
import { createUser, UserEntity } from "../entities";

export const guestUser = createUser({
  id: uuid(),
  name: "Guest",
  permission: "Guest"
});

export const setGuestUser = async () => {
  const manager = getManager();

  const result = await manager.findOne(UserEntity, { permission: "Guest" });

  if (result === undefined) {
    manager.save(guestUser);
  }
};
