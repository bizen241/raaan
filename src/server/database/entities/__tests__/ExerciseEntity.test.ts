import { strict as assert } from "assert";
import { getManager } from "typeorm";
import { close, connect, insertExercise, insertUser, reset } from "../../../__tests__/helpers";
import { ExerciseEntity } from "../ExerciseEntity";
import { ExerciseSummaryEntity } from "../ExerciseSummaryEntity";

beforeAll(async () => connect());
beforeEach(async () => reset());
afterAll(async () => close());

test("ExerciseEntity", async () => {
  const { user } = await insertUser("Write");

  await insertExercise(user);

  const exercises = await getManager().find(ExerciseEntity);
  assert.equal(exercises.length, 1);

  const exerciseSummaries = await getManager().find(ExerciseSummaryEntity);
  assert.equal(exerciseSummaries.length, 1);
});
