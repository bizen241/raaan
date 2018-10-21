import { createApp } from "./app";
import { getProcessEnv } from "./env";

const app = createApp();

const processEnv = getProcessEnv();
const port = processEnv.serverPort || 3000;
const host = processEnv.serverHost || "localhost";

app.listen(port, host);
