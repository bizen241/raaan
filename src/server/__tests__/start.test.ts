import { strict as assert } from "assert";
import { getManager } from "typeorm";
import { UserEntity } from "../database/entities";
import { startServer } from "../start";
import { testEnv } from "./helpers";

test("start", async () => {
  const { server, database } = await startServer(testEnv);

  const guestUser = await getManager().findOne(UserEntity, { permission: "Guest" });
  assert.notEqual(guestUser, undefined);

  const ownerUser = await getManager().findOne(UserEntity, { permission: "Owner" });
  assert.notEqual(ownerUser, undefined);

  await database.close();

  return new Promise(resolve => {
    server.close(() => resolve());
  });
});
