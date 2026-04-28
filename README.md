# @philiprehberger/middleware-ts

[![CI](https://github.com/philiprehberger/ts-middleware/actions/workflows/ci.yml/badge.svg)](https://github.com/philiprehberger/ts-middleware/actions/workflows/ci.yml)
[![npm version](https://img.shields.io/npm/v/@philiprehberger/middleware-ts.svg)](https://www.npmjs.com/package/@philiprehberger/middleware-ts)
[![Last updated](https://img.shields.io/github/last-commit/philiprehberger/ts-middleware)](https://github.com/philiprehberger/ts-middleware/commits/main)

Framework-agnostic middleware composition engine

## Installation

```bash
npm install @philiprehberger/middleware-ts
```

## Usage

```ts
import { compose, createPipeline } from '@philiprehberger/middleware-ts';

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
import { branch } from '@philiprehberger/middleware-ts';

const authBranch = branch(
  (ctx) => ctx.req.url.startsWith('/api'),
  authMiddleware,
  publicMiddleware,
);
```

### Timeout

```ts
import { withTimeout, MiddlewareTimeoutError } from '@philiprehberger/middleware-ts';

const slowOp = withTimeout(async (ctx, next) => {
  await fetchSomethingSlow(ctx);
  await next();
}, 5000);
```

### Tap (Side Effects)

```ts
import { tap } from '@philiprehberger/middleware-ts';

const logger = tap<Ctx>((ctx) => {
  console.log(`[req] ${ctx.req.url}`);
});
```

## API

| Function | Description |
|----------|-------------|
| `compose(...middlewares)` | Compose into single middleware |
| `createPipeline<Ctx>()` | Builder with `.use()` and `.useIf()` |
| `branch(condition, trueMw, falseMw?)` | Conditional middleware |
| `withErrorHandler(mw, handler)` | Wrap with error catching |
| `withTimeout(mw, ms)` | Reject with `MiddlewareTimeoutError` if `mw` exceeds `ms` |
| `tap(fn)` | Run a side-effect and continue the pipeline |

## Development

```bash
npm install
npm run build
npm test
```

## Support

If you find this project useful:

⭐ [Star the repo](https://github.com/philiprehberger/ts-middleware)

🐛 [Report issues](https://github.com/philiprehberger/ts-middleware/issues?q=is%3Aissue+is%3Aopen+label%3Abug)

💡 [Suggest features](https://github.com/philiprehberger/ts-middleware/issues?q=is%3Aissue+is%3Aopen+label%3Aenhancement)

❤️ [Sponsor development](https://github.com/sponsors/philiprehberger)

🌐 [All Open Source Projects](https://philiprehberger.com/open-source-packages)

💻 [GitHub Profile](https://github.com/philiprehberger)

🔗 [LinkedIn Profile](https://www.linkedin.com/in/philiprehberger)

## License

[MIT](LICENSE)
