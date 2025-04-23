import { Effect } from "effect";
import { Config } from "./config.js";
export declare const check_usage_and_scale: Effect.Effect<void, import("./error.js").AppError | import("effect/ParseResult").ParseError | import("./error.js").ScaleError | null, Config>;
