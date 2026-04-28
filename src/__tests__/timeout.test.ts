import { describe, it } from 'node:test';
import assert from 'node:assert/strict';

const { withTimeout, MiddlewareTimeoutError, compose } = await import('../../dist/index.js');

describe('withTimeout', () => {
  it('passes through when middleware completes in time', async () => {
    const mw = withTimeout(async (_ctx, next) => { await next(); }, 50);
    let reached = false;
    await compose(mw, async (_ctx, next) => { reached = true; await next(); })({}, async () => {});
    assert.equal(reached, true);
  });

  it('throws MiddlewareTimeoutError when middleware exceeds the budget', async () => {
    const slow = withTimeout(async () => {
      await new Promise((r) => setTimeout(r, 50));
    }, 10);
    await assert.rejects(() => slow({}, async () => {}), MiddlewareTimeoutError);
  });
});

describe('tap', () => {
  it('runs the side-effect and continues', async () => {
    const mod = await import('../../dist/index.js');
    let called = 0;
    const pipeline = mod.compose(
      mod.tap<{ n: number }>((ctx) => { called = ctx.n; }),
      async (_ctx, next) => { await next(); },
    );
    await pipeline({ n: 7 }, async () => {});
    assert.equal(called, 7);
  });
});
