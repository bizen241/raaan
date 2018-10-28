import { testProcessEnv } from "../../__tests__/helpers";

export const authTestHelpers = {
  sessionId: "9cc8d99f-c7e0-4f97-96c9-ae3e4d431b3e",
  state: "9cc8d99f-c7e0-4f97-96c9-ae3e4d431b3e.cnNHbxcZzIEU2KwGFv3iBPho7j3WbSqJvmLkrSRslGU",
  code: "1234567890",
  accessToken: "1234567890123456789012345678901234567890",
  secret: testProcessEnv.sessionSecret
};
