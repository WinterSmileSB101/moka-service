import { Context } from "koa";
import { Options } from "koa2-cors";

export const corsHandler: Options = {
  origin: function (ctx: Context) {
    return "*";
  },
  exposeHeaders: ["Authorization"],
  maxAge: 5 * 24 * 60 * 60,
  allowMethods: ["GET", "POST", "OPTIONS", "DELETE"],
};
