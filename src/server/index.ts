import { getProcessEnv } from "./env";
import { start } from "./start";

const processEnv = getProcessEnv();

start(processEnv);
