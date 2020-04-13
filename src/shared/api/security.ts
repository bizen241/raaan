import { Permission } from "./entities";

const Owner: Permission[] = ["Owner"];
const Admin: Permission[] = ["Admin", ...Owner];
const Write: Permission[] = ["Write", ...Admin];
const Read: Permission[] = ["Read", ...Write];
const Guest: Permission[] = ["Guest", ...Read];

const permissionMap: { [P in Permission]: Permission[] } = {
  Owner,
  Admin,
  Write,
  Read,
  Guest,
};

export const hasPermission = (user: { permission: Permission } | undefined, permission: Permission) => {
  if (user === undefined) {
    return permission === "Guest";
  }

  return permissionMap[permission].includes(user.permission);
};
