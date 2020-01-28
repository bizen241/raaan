// @ts-check

const path = require("path");
const fs = require("fs");
const TJS = require("typescript-json-schema");

const generateSchema = () => {
  const inputFilePath = path.join(process.cwd(), "src/shared/api/request/params.ts");
  const outputFilePath = path.join(process.cwd(), "src/server/api/schema.json");

  const program = TJS.getProgramFromFiles([inputFilePath], {
    target: "es5",
    lib: ["dom", "esnext"]
  });
  const schema = TJS.generateSchema(program, "EntityTypeToParams", {
    ref: false
  });

  fs.writeFileSync(outputFilePath, JSON.stringify(schema.properties, null, 2));
};

generateSchema();
