import { strict as assert } from "assert";
import { connect } from "..";
import { testEnv } from "../../__tests__/helpers";

test("connect", async () => {
  const database = await connect(testEnv);

  assert(database.isConnected);

  await database.close();

  assert(!database.isConnected);
});
