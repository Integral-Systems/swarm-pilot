import { Effect } from "effect";
import { Config } from "./config.js";
export declare const notify: (message: string) => Effect.Effect<void, null, Config>;
