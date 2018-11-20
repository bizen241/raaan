import { SecurityHandler } from "openapi-security-handler";
import { OpenAPIV2 } from "openapi-types";
import { Permission } from "../../shared/api/entities";

const securityScheme: OpenAPIV2.SecuritySchemeApiKey = {
  type: "apiKey",
  name: "cookie",
  in: "header"
};

export const securityDefinitions: { [P in Permission]: OpenAPIV2.SecuritySchemeApiKey } = {
  Owner: securityScheme,
  Admin: securityScheme,
  Write: securityScheme,
  Read: securityScheme,
  Guest: securityScheme,
  Ghost: securityScheme
};

const Ghost: Permission[] = ["Ghost"];
const Guest: Permission[] = ["Guest", ...Ghost];
const Read: Permission[] = ["Read", ...Guest];
const Write: Permission[] = ["Write", ...Read];
const Admin: Permission[] = ["Admin", ...Write];
const Owner: Permission[] = ["Owner", ...Admin];

const permissionMap: { [P in Permission]: Permission[] } = {
  Owner,
  Admin,
  Write,
  Read,
  Guest,
  Ghost
};

const createSecurityHandler = (permission: Permission): SecurityHandler => req => {
  return permissionMap[permission].includes(req.session.user.permission);
};

export const securityHandlers: { [P in Permission]: SecurityHandler } = {
  Owner: createSecurityHandler("Owner"),
  Admin: createSecurityHandler("Admin"),
  Write: createSecurityHandler("Write"),
  Read: createSecurityHandler("Read"),
  Guest: createSecurityHandler("Guest"),
  Ghost: createSecurityHandler("Ghost")
};
