import type { Middleware, ErrorHandler } from './types';

export function withErrorHandler<Ctx>(
  mw: Middleware<Ctx>,
  handler: ErrorHandler<Ctx>,
): Middleware<Ctx> {
  return async (ctx, next) => {
    try {
      await mw(ctx, next);
    } catch (err) {
      await handler(err, ctx);
    }
  };
}
