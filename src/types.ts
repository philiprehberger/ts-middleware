export type Middleware<Ctx> = (ctx: Ctx, next: () => Promise<void>) => Promise<void>;

export type ErrorHandler<Ctx> = (err: unknown, ctx: Ctx) => Promise<void> | void;
