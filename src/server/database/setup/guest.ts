import * as uuid from "uuid";
import { createUser } from "../entities";

export const guestUser = createUser({
  id: uuid(),
  name: "Guest",
  permission: "Guest"
});
