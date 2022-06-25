import Koa, { Context } from "koa";
// import Session from "koa-session";
// import Router from "koa-router";
import Cors from "koa2-cors";
import { trimEnd } from "lodash";
import path from "path";
import AddressIP from "ip";

import { corsHandler } from "./handlers/cors.handler";
import { MockConfig } from "./config/mock.config";
import { errorMiddleware } from "./middlewares";

const rootDir = __dirname;
const PORT = 8220;

const rootMockPath = path.join(rootDir, MockConfig.MockRootPath);

const app = new Koa();
// const router = new Router();

// app.use(Session())

app.use(Cors(corsHandler));

app.use(errorMiddleware(rootMockPath));

app.use(async (ctx, next) => {
  console.info(ctx.path);
  const filePath = path.join(rootMockPath, `${trimEnd(ctx.path, "/")}.json`);

  try {
    ctx.body = require(filePath);
  } catch (err) {
    throw new Error(
      "Can't find any matched mock data, pls make sure you has added mock file below mock folder!"
    );
  }
});

app.listen(PORT, () => {
  console.log(`http://${AddressIP.address()}:${PORT} is running.`);
});
