import type { Middleware } from './types';

export function branch<Ctx>(
  condition: (ctx: Ctx) => boolean,
  trueMw: Middleware<Ctx>,
  falseMw?: Middleware<Ctx>,
): Middleware<Ctx> {
  return async (ctx, next) => {
    if (condition(ctx)) {
      await trueMw(ctx, next);
    } else if (falseMw) {
      await falseMw(ctx, next);
    } else {
      await next();
    }
  };
}
