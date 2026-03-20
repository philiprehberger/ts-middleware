import { describe, it } from 'node:test';
import assert from 'node:assert/strict';

const mod = await import('../../dist/index.js');

describe('middleware-ts', () => {
  it('should export compose', () => {
    assert.ok(mod.compose);
  });

  it('should export createPipeline', () => {
    assert.ok(mod.createPipeline);
  });

  it('should export branch', () => {
    assert.ok(mod.branch);
  });

  it('should export withErrorHandler', () => {
    assert.ok(mod.withErrorHandler);
  });
});
