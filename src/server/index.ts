import { getEnv } from "./env";
import { startServer } from "./start";

const env = getEnv();

startServer(env);
