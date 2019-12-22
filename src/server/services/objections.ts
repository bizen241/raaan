import * as createError from "http-errors";
import { EntityManager } from "typeorm";
import { ObjectionTargetType } from "../../shared/api/entities";
import { ExerciseEntity, ObjectionEntity, PlaylistEntity, UserEntity } from "../database/entities";

export const checkObjectionTarget = async (
  manager: EntityManager,
  currentUser: UserEntity,
  targetType: ObjectionTargetType,
  targetId: string
) => {
  switch (targetType) {
    case "Exercise": {
      const exercise = await manager.findOne(ExerciseEntity, targetId, {
        relations: ["author"]
      });
      if (exercise === undefined) {
        throw createError(400);
      }
      if (exercise.authorId !== currentUser.id || !exercise.isLocked) {
        throw createError(403);
      }

      break;
    }
    case "Playlist": {
      const playlist = await manager.findOne(PlaylistEntity, targetId, {
        relations: ["author"]
      });
      if (playlist === undefined) {
        throw createError(400);
      }
      if (playlist.authorId !== currentUser.id || !playlist.isLocked) {
        throw createError(403);
      }

      break;
    }
    case "User": {
      const user = await manager.findOne(UserEntity, targetId);
      if (user === undefined) {
        throw createError(400);
      }
      if (user.id !== currentUser.id || user.permission !== "Read") {
        throw createError(403);
      }

      break;
    }
  }
};

export const unlockObjectionTarget = async (manager: EntityManager, { targetType, targetId }: ObjectionEntity) => {
  switch (targetType) {
    case "Exercise": {
      const exercise = await manager.findOne(ExerciseEntity, targetId);
      if (exercise === undefined) {
        throw createError(500);
      }

      exercise.isLocked = false;

      manager.save(exercise);

      break;
    }
    case "Playlist": {
      const playlist = await manager.findOne(PlaylistEntity, targetId);
      if (playlist === undefined) {
        throw createError(500);
      }

      playlist.isLocked = false;

      manager.save(playlist);

      break;
    }
    case "User": {
      const user = await manager.findOne(UserEntity, targetId);
      if (user === undefined) {
        throw createError(400);
      }

      user.permission = "Write";

      manager.save(user);

      break;
    }
  }
};
