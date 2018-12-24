import { createMigrate } from "redux-persist";

export const migrate = createMigrate({}, { debug: true });
