import type { Middleware } from './types';
import { compose } from './compose';

export interface MiddlewarePipeline<Ctx> {
  use(mw: Middleware<Ctx>): MiddlewarePipeline<Ctx>;
  useIf(condition: boolean | ((ctx: Ctx) => boolean), mw: Middleware<Ctx>): MiddlewarePipeline<Ctx>;
  build(): (ctx: Ctx) => Promise<void>;
}

export function createPipeline<Ctx>(): MiddlewarePipeline<Ctx> {
  const stack: Middleware<Ctx>[] = [];

  const pipeline: MiddlewarePipeline<Ctx> = {
    use(mw: Middleware<Ctx>) {
      stack.push(mw);
      return pipeline;
    },

    useIf(condition: boolean | ((ctx: Ctx) => boolean), mw: Middleware<Ctx>) {
      if (typeof condition === 'boolean') {
        if (condition) stack.push(mw);
      } else {
        stack.push(async (ctx, next) => {
          if (condition(ctx)) {
            await mw(ctx, next);
          } else {
            await next();
          }
        });
      }
      return pipeline;
    },

    build() {
      const composed = compose(...stack);
      return async (ctx: Ctx) => {
        await composed(ctx, async () => {});
      };
    },
  };

  return pipeline;
}
