import { strict as assert } from "assert";
import { connectDatabase } from "..";
import { testProcessEnv } from "../../__tests__/helpers";

test("connect", async () => {
  const database = await connectDatabase(testProcessEnv);

  assert(database.isConnected);

  await database.close();

  assert(!database.isConnected);
});
