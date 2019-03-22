import { Permission, User } from "../../shared/api/entities";
import { editBuffer } from "../reducers/buffers";

const updateName = (id: string, name: string) =>
  editBuffer<User>("User", id, () => ({
    name
  }));

const updatePermission = (id: string, permission: Permission) =>
  editBuffer<User>("User", id, () => ({
    permission
  }));

export const userActions = {
  updateName,
  updatePermission
};
