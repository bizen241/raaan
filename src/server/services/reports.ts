import * as createError from "http-errors";
import { EntityManager } from "typeorm";
import { ReportTargetType } from "../../shared/api/entities";
import {
  ExerciseEntity,
  PlaylistEntity,
  ReportEntity,
  SynonymEntity,
  TagEntity,
  UserEntity
} from "../database/entities";

export const getDefendant = async (manager: EntityManager, targetType: ReportTargetType, targetId: string) => {
  switch (targetType) {
    case "Exercise": {
      const exercise = await manager.findOne(ExerciseEntity, targetId, {
        relations: ["author"]
      });
      if (exercise === undefined || exercise.author === undefined) {
        throw createError(400);
      }

      return exercise.author;
    }
    case "Playlist": {
      const playlist = await manager.findOne(PlaylistEntity, targetId, {
        relations: ["author"]
      });
      if (playlist === undefined || playlist.author === undefined) {
        throw createError(400);
      }

      return playlist.author;
    }
    case "Synonym": {
      const synonym = await manager.findOne(SynonymEntity, targetId);
      if (synonym === undefined) {
        throw createError(400);
      }

      const owner = await manager.findOne(UserEntity, {
        permission: "Owner"
      });
      if (owner === undefined) {
        throw createError(500);
      }

      return owner;
    }
    case "Tag": {
      const tag = await manager.findOne(TagEntity, targetId);
      if (tag === undefined) {
        throw createError(400);
      }

      const owner = await manager.findOne(UserEntity, {
        permission: "Owner"
      });
      if (owner === undefined) {
        throw createError(500);
      }

      return owner;
    }
    case "User": {
      const user = await manager.findOne(UserEntity, targetId);
      if (user === undefined) {
        throw createError(400);
      }

      return user;
    }
  }
};

export const lockReportTarget = async (manager: EntityManager, { targetType, targetId }: ReportEntity) => {
  switch (targetType) {
    case "Exercise": {
      const exercise = await manager.findOne(ExerciseEntity, targetId);
      if (exercise === undefined) {
        throw createError(500);
      }

      exercise.isPrivate = true;
      exercise.isLocked = true;

      manager.save(exercise);

      break;
    }
    case "Playlist": {
      const playlist = await manager.findOne(PlaylistEntity, targetId);
      if (playlist === undefined) {
        throw createError(500);
      }

      playlist.isPrivate = true;
      playlist.isLocked = true;

      manager.save(playlist);

      break;
    }
    case "User": {
      const user = await manager.findOne(UserEntity, targetId);
      if (user === undefined) {
        throw createError(400);
      }

      user.permission = "Read";

      manager.save(user);

      break;
    }
  }
};
