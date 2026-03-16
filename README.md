# @philiprehberger/ts-middleware

[![CI](https://github.com/philiprehberger/ts-middleware/actions/workflows/publish.yml/badge.svg)](https://github.com/philiprehberger/ts-middleware/actions/workflows/publish.yml)
[![npm version](https://img.shields.io/npm/v/@philiprehberger/ts-middleware.svg)](https://www.npmjs.com/package/@philiprehberger/ts-middleware)
[![License](https://img.shields.io/github/license/philiprehberger/ts-middleware)](LICENSE)

Framework-agnostic middleware composition engine.

## Installation

```bash
npm install @philiprehberger/ts-middleware
```

## Usage

```ts
import { compose, createPipeline } from '@philiprehberger/ts-middleware';

type Ctx = { req: Request; user?: User };

const app = createPipeline<Ctx>()
  .use(logger)
  .useIf(requiresAuth, auth)
  .use(handler)
  .build();

await app({ req: new Request('/api') });
```

### Conditional Branching

```ts
import { branch } from '@philiprehberger/ts-middleware';

const authBranch = branch(
  (ctx) => ctx.req.url.startsWith('/api'),
  authMiddleware,
  publicMiddleware,
);
```

## API

| Function | Description |
|----------|-------------|
| `compose(...middlewares)` | Compose into single middleware |
| `createPipeline<Ctx>()` | Builder with `.use()` and `.useIf()` |
| `branch(condition, trueMw, falseMw?)` | Conditional middleware |
| `withErrorHandler(mw, handler)` | Wrap with error catching |


## Development

```bash
npm install
npm run build
npm test
```

## License

MIT
