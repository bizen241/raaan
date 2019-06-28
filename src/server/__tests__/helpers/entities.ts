import { getManager } from "typeorm";
import * as uuid from "uuid/v4";
import { Permission } from "../../../shared/api/entities";
import {
  ExerciseEntity,
  ExerciseSummaryEntity,
  UserAccountEntity,
  UserConfigEntity,
  UserEntity,
  UserSessionEntity,
  UserSummaryEntity
} from "../../database/entities";

export const insertUser = async (permission: Permission) => {
  const manager = getManager();

  const account = new UserAccountEntity("github", uuid(), uuid());
  const config = new UserConfigEntity();
  const summary = new UserSummaryEntity();
  const user = await manager.save(new UserEntity(account, config, summary, permission, permission));

  return { account, config, user };
};

export const insertSession = async (user: UserEntity) => {
  const manager = getManager();

  const session = new UserSessionEntity(user, uuid());
  session.data = {
    cookie: {
      path: "/",
      _expires: null,
      originalMaxAge: null,
      httpOnly: true,
      sameSite: "strict",
      secure: false
    },
    passport: {
      user: user.id
    }
  };

  await manager.save(session);

  return session;
};

export const insertExercise = async (user: UserEntity) => {
  const manager = getManager();

  const exerciseSummary = new ExerciseSummaryEntity(0, 0);
  const exercise = await manager.save(new ExerciseEntity(user, exerciseSummary, {}));

  return { exercise, exerciseSummary };
};
