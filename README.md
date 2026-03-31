# @philiprehberger/middleware-ts

[![CI](https://github.com/philiprehberger/middleware-ts/actions/workflows/ci.yml/badge.svg)](https://github.com/philiprehberger/middleware-ts/actions/workflows/ci.yml)
[![npm version](https://img.shields.io/npm/v/@philiprehberger/middleware-ts.svg)](https://www.npmjs.com/package/@philiprehberger/middleware-ts)
[![Last updated](https://img.shields.io/github/last-commit/philiprehberger/middleware-ts)](https://github.com/philiprehberger/middleware-ts/commits/main)

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

## Support

If you find this project useful:

⭐ [Star the repo](https://github.com/philiprehberger/middleware-ts)

🐛 [Report issues](https://github.com/philiprehberger/middleware-ts/issues?q=is%3Aissue+is%3Aopen+label%3Abug)

💡 [Suggest features](https://github.com/philiprehberger/middleware-ts/issues?q=is%3Aissue+is%3Aopen+label%3Aenhancement)

❤️ [Sponsor development](https://github.com/sponsors/philiprehberger)

🌐 [All Open Source Projects](https://philiprehberger.com/open-source-packages)

💻 [GitHub Profile](https://github.com/philiprehberger)

🔗 [LinkedIn Profile](https://www.linkedin.com/in/philiprehberger)

## License

[MIT](LICENSE)
