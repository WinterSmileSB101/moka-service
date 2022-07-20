import Koa, { Context } from "koa";
// import Session from "koa-session";
// import Router from "koa-router";
import Cors from "koa2-cors";
import { isEmpty, trimEnd } from "lodash";
import path from "path";
import AddressIP from "ip";

import { corsHandler } from "./handlers/cors.handler";
import { MockConfig } from "./config/mock.config";
import { errorMiddleware } from "./middlewares";
import { AdditionMappingMiddleware } from "./middlewares/addition-mapping.middleware";
import { getFilePath } from "./utils";

const rootDir = __dirname;
const PORT = 8220;

const rootMockPath = path.join(rootDir, MockConfig.MockRootPath);
const rootMockAdditionMappingPath = path.join(
  rootDir,
  MockConfig.MockAdditionMappingPath
);

const app = new Koa();
// const router = new Router();

// app.use(Session())

app.use(Cors(corsHandler));

app.use((ctx, next) => {
  console.info(ctx.path);
  console.info(ctx.querystring);

  return next();
});

app.use(errorMiddleware(rootMockPath));

app.use(AdditionMappingMiddleware(rootMockAdditionMappingPath));

app.use(async (ctx, next) => {
  const filePath = getFilePath(rootMockPath, ctx.path);

  console.log('target file path: ', filePath);

  //const filePathWithQuery = path.join(rootMockPath, `${trimEnd(ctx.path+ctx.query, "/")}.json`)

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
