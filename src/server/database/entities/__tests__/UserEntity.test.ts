import { getManager } from "typeorm";
import * as uuid from "uuid";
import { TestDatabase } from "../../__tests__/helpers";
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

test("without id", async () => {
  const userRepository = getManager().getRepository(UserEntity);
  const user = createUser({ name: "name", permission: "Admin" });
  await userRepository.save(user);

  const users = await userRepository.find();

  expect(users.length).toBe(1);
});

test("with id", async () => {
  const userRepository = getManager().getRepository(UserEntity);
  const userId = uuid();
  const user = createUser({ id: userId, name: "name", permission: "Admin" });
  await userRepository.save(user);

  const savedUser = await userRepository.findOne(userId);

  expect(savedUser && savedUser.id).toBe(userId);
});
