import { createApp } from "./app";
import { processEnv } from "./env";

const app = createApp();

const port = processEnv.serverPort || 3000;
const host = processEnv.serverHost || "localhost";

app.listen(port, host);
