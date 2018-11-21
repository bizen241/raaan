import { OpenAPIV2 } from "openapi-types";
import { Permission } from "../../shared/api/entities";

type Tag = "user" | "users";

interface Parameters {
  summary: string;
  tag: Tag;
  permission: Permission;
}

const responses: OpenAPIV2.ResponsesObject = {
  200: {
    description: "OK",
    schema: {
      $ref: "#/definitions/Response"
    }
  },
  default: {
    description: "Error",
    schema: {
      $ref: "#/definitions/Error"
    }
  }
};

export const createApiDoc = ({ summary, tag, permission }: Parameters): OpenAPIV2.OperationObject => ({
  summary,
  tags: [tag],
  responses,
  security: [
    {
      [permission]: []
    }
  ]
});
