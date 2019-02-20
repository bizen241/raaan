import { OpenAPIV3 } from "openapi-types";
import { join } from "path";
import { generateSchema, getProgramFromFiles } from "typescript-json-schema";

export const getSchema = (filePath: string, typeName: string) => {
  const program = getProgramFromFiles([join(process.cwd(), filePath)], {
    target: "es5",
    lib: ["dom", "esnext"]
  });
  const rawSchema = generateSchema(program, typeName, { ref: false });
  if (rawSchema == null) {
    throw new Error();
  }

  const { $schema, ...schema } = rawSchema;

  return schema as OpenAPIV3.SchemaObject;
};
