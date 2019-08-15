import { strict as assert } from "assert";
import { connectDatabase } from "..";
import { testEnv } from "../../__tests__/helpers";

test("connect", async () => {
  const database = await connectDatabase(testEnv);

  assert(database.isConnected);

  await database.close();

  assert(!database.isConnected);
});
