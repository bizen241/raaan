import { getManager } from "typeorm";
import { TestDatabase } from "../../__tests__/TestDatabase";
import { createUser, UserEntity } from "../UserEntity";

const testDatabase = new TestDatabase();

beforeAll(async () => {
  await testDatabase.connect();
});
beforeEach(async () => {
  await testDatabase.reset();
});
afterAll(async () => {
  await testDatabase.close();
});

test("users", async () => {
  const userRepository = getManager().getRepository(UserEntity);
  const user = createUser({ name: "name", role: "Admin" });
  await userRepository.save(user);

  const users = await userRepository.find();

  expect(users.length).toBe(1);
});
