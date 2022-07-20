import { Context, Next } from "koa";

import { MiddlewareFunc } from "./middleware.types";

export const errorMiddleware: MiddlewareFunc =
  (rootMokaPath: string) => (ctx: Context, next: Next) => {
    return next().catch((err) => {
      if (err.code == null) {
        //logger.error(err.stack)
      }
      if (err.status === 401) {
        ctx.status = 401;
        ctx.body =
          "Protected resource, use Authorization header to get access\n";
      } else {
        ctx.body = {
          code: err.code || -1,
          data: null,
          msg: err.message.trim()?.replace(rootMokaPath, "") || "失败",
        };
        // 保证返回状态是 200, 这样前端不会抛出异常
        ctx.status = 200;
      }
      return Promise.resolve();
    });
  };
