import type { Middleware } from './types';

export function compose<Ctx>(...middlewares: Middleware<Ctx>[]): Middleware<Ctx> {
  return async (ctx: Ctx, next: () => Promise<void>) => {
    let index = -1;

    async function dispatch(i: number): Promise<void> {
      if (i <= index) throw new Error('next() called multiple times');
      index = i;

      const mw = i < middlewares.length ? middlewares[i] : next;
      if (!mw) return;

      await mw(ctx, () => dispatch(i + 1));
    }

    await dispatch(0);
  };
}
