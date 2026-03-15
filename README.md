# @philiprehberger/middleware-ts

Framework-agnostic middleware composition engine.

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

## API

| Function | Description |
|----------|-------------|
| `compose(...middlewares)` | Compose into single middleware |
| `createPipeline<Ctx>()` | Builder with `.use()` and `.useIf()` |
| `branch(condition, trueMw, falseMw?)` | Conditional middleware |
| `withErrorHandler(mw, handler)` | Wrap with error catching |

## License

MIT
