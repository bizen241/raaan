import { getProcessEnv } from "./env";
import { startServer } from "./start";

const processEnv = getProcessEnv();

startServer(processEnv);
