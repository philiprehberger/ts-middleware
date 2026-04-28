# Changelog

## 0.2.0

- Add `withTimeout(mw, ms)` to reject with `MiddlewareTimeoutError` when a middleware exceeds its budget
- Add `tap(fn)` for fire-and-forget side-effects in a pipeline
- Fix README badge and Support links to use the correct `ts-middleware` repo slug

## 0.1.4

- Standardize README to 3-badge format with emoji Support section
- Update CI actions to v5 for Node.js 24 compatibility
- Add GitHub issue templates, dependabot config, and PR template

## 0.1.3

- Add Development section to README
- Fix CI badge to reference publish.yml
- Add test script to package.json

## 0.1.0 (2026-03-15)

- Initial release
- Koa-style onion middleware composition
- Pipeline builder with conditional middleware
- Branch middleware for conditional execution
- Error handler wrapper
