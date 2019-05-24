import { strict as assert } from "assert";
import { getManager } from "typeorm";
import { UserEntity } from "../database/entities";
import { startServer } from "../start";
import { testProcessEnv } from "./helpers";

test("start", async () => {
  const { server, database } = await startServer(testProcessEnv);

  const guestUser = await getManager().findOne(UserEntity, { permission: "Guest" });
  assert.notEqual(guestUser, undefined);

  const adminUser = await getManager().findOne(UserEntity, { permission: "Admin" });
  assert.notEqual(adminUser, undefined);

  await database.close();

  return new Promise(resolve => {
    server.close(() => resolve());
  });
});
