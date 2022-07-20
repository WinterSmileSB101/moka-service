import { Context, Next } from "koa";

interface MiddlewareFunc<T = any> {
  (rootMokaPath: string): (ctx: Context, next: Next) => Promise<T>;
}

export { MiddlewareFunc };
