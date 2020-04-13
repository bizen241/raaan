import { Store } from "express-session";
import { getManager } from "typeorm";
import { UserSessionEntity } from "../database/entities";

export default class SessionStore extends Store {
  constructor() {
    super();
  }

  get = async (sessionId: string, callback: (error?: Error, session?: Express.SessionData) => void) => {
    const manager = getManager();

    try {
      const session = await manager.findOne(UserSessionEntity, {
        sessionId,
      });

      if (session !== undefined) {
        callback(undefined, session.data);
      } else {
        callback();
      }
    } catch (e) {
      callback(e);
    }
  };

  set = async (sessionId: string, data: Express.SessionData, callback?: (error?: any) => void) => {
    const manager = getManager();

    try {
      await manager.update(
        UserSessionEntity,
        {
          sessionId,
        },
        {
          data,
        }
      );

      if (callback !== undefined) {
        callback();
      }
    } catch (e) {
      if (callback !== undefined) {
        callback(e);
      }
    }
  };

  destroy = async (sessionId: string, callback?: (error?: any) => void) => {
    const manager = getManager();

    try {
      await manager.delete(UserSessionEntity, {
        sessionId,
      });

      if (callback !== undefined) {
        callback();
      }
    } catch (e) {
      if (callback !== undefined) {
        callback(e);
      }
    }
  };
}
