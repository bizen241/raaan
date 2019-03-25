import { getManager } from "typeorm";
import { users } from "../../../session/__tests__/helpers";
import { ExerciseDetailEntity } from "../ExerciseDetailEntity";
import { ExerciseEntity } from "../ExerciseEntity";

export const insertExercise = async (_?: string) => {
  const manager = getManager();

  await manager.save(users.Write);

  const detail = new ExerciseDetailEntity();
  const exercise = new ExerciseEntity(users.Write, detail);

  await manager.save(detail);
  await manager.save(exercise);
};
