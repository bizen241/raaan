import { getManager } from "typeorm";
import * as uuid from "uuid/v4";
import { Permission } from "../../../shared/api/entities";
import {
  ExerciseDetailEntity,
  ExerciseEntity,
  UserAccountEntity,
  UserConfigEntity,
  UserEntity,
  UserSessionEntity
} from "../../database/entities";

export const insertUser = async (permission: Permission) => {
  const manager = getManager();

  const user = await manager.save(new UserEntity(permission, permission));
  const account = await manager.save(new UserAccountEntity(user, "github", uuid(), uuid()));
  const config = await manager.save(new UserConfigEntity(user));

  return { account, config, user };
};

export const insertSession = async (user: UserEntity) => {
  const manager = getManager();

  const session = new UserSessionEntity(user, uuid(), new Date());
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

  const detail = await manager.save(new ExerciseDetailEntity());
  const exercise = await manager.save(new ExerciseEntity(user, detail));

  return { detail, exercise };
};
