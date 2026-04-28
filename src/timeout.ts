import type { Middleware } from './types';

export class MiddlewareTimeoutError extends Error {
  public readonly timeoutMs: number;
  constructor(timeoutMs: number) {
    super(`Middleware timed out after ${timeoutMs}ms`);
    this.name = 'MiddlewareTimeoutError';
    this.timeoutMs = timeoutMs;
  }
}

export function withTimeout<Ctx>(mw: Middleware<Ctx>, ms: number): Middleware<Ctx> {
  return async (ctx, next) => {
    let timer: ReturnType<typeof setTimeout> | undefined;
    try {
      await Promise.race([
        mw(ctx, next),
        new Promise<never>((_, reject) => {
          timer = setTimeout(() => reject(new MiddlewareTimeoutError(ms)), ms);
        }),
      ]);
    } finally {
      if (timer) clearTimeout(timer);
    }
  };
}
