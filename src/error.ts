import { Data } from "effect";

export class AppError extends Data.TaggedError('AppError')<{cause: Error, message: string}> {}
export class ScaleError extends Data.TaggedError('ScaleError')<{cause: Error, message: string}> {}