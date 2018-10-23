import { connectDatabase } from "..";
import { testProcessEnv } from "../../__tests__/helpers";

test("connect", async () => {
  const testDatabase = await connectDatabase(testProcessEnv);

  expect(testDatabase.isConnected).toBe(true);

  await testDatabase.close();

  expect(testDatabase.isConnected).toBe(false);
});
