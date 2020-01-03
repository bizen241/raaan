import { UserEntity } from "../server/database/entities";

declare global {
  namespace Express {
    interface User extends UserEntity {}
  }
}
