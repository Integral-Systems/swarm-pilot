import { Effect } from "effect";
import { Config } from "./config.js";
export declare const check_usage_and_scale: Effect.Effect<void, import("./error.js").AppError | import("./error.js").ScaleError | import("effect/ParseResult").ParseError | null, Config>;
