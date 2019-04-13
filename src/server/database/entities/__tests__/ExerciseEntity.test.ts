import { getManager } from "typeorm";
import { insertExercise, insertUser, TestDatabase } from "../../../__tests__/helpers";
import { ExerciseEntity } from "../ExerciseEntity";

const testDatabase = new TestDatabase();

beforeAll(async () => {
  await testDatabase.connect();
});
afterAll(async () => {
  await testDatabase.close();
});

test("ExerciseEntity", async () => {
  const { user } = await insertUser("Write");
  await insertExercise(user);

  const contents = await getManager().find(ExerciseEntity);

  expect(contents.length).toBe(1);
});
