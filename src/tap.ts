import type { Middleware } from './types';

export function tap<Ctx>(fn: (ctx: Ctx) => void | Promise<void>): Middleware<Ctx> {
  return async (ctx, next) => {
    await fn(ctx);
    await next();
  };
}
