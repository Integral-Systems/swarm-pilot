import { Data } from "effect";
export class AppError extends Data.TaggedError('AppError') {
}
export class ScaleError extends Data.TaggedError('ScaleError') {
}
