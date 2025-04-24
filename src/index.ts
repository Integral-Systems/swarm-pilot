#!/usr/bin/env node
import { Chunk, Duration, Effect, pipe, Schedule, Array, Ref } from "effect";
import { build_runtime } from "./runtime.js";
import { get_metrics, get_nodes, get_service_tasks, get_services, inspect_node, inspect_service } from "./commands.js";
import { get_args } from "./args.js";
import 'dotenv/config'
import { check_usage_and_scale } from "./actions.js";
import { notify } from "./notify.js";
import { Config } from "./config.js";
import { ServiceInspectState } from "./states.js";


const autoscaler = pipe(
    Effect.gen(function* () {
        const config = yield* Config;
        const state = yield* ServiceInspectState;
        const schedule = Schedule.spaced(`${config.config.autoscaler_interval} seconds`)
        const schedule2 = Schedule.spaced(`2 seconds`)
        const t = yield* Ref.get(state)
        yield* Effect.all([
            Effect.repeat(check_usage_and_scale, schedule),
            Effect.repeat(Effect.logInfo(t), schedule2),
        ],{
            concurrency: 'unbounded',
        })
    }),
    Effect.catchTags({
        AppError: (error) => {
            return Effect.all([
                notify(`‼️ AppError: ${error.message}`),
                Effect.logError(`AppError: ${error.message} - ${error.cause}`),
            ])
        },
        ParseError: (error) => {
            return Effect.all([
                notify(`‼️ ParseError: ${error}`),
                Effect.logError(`ParseError: ${error.message} - ${error.issue}`),
            ])
        },
        ScaleError: (error) => {
            return Effect.all([
                notify(`‼️ ScaleError: ${error}`),
                Effect.logError(`ScaleError: ${error} - ${error.cause}`),
            ])
        },
    })
)

async function main() {
    const args = await get_args();
    const runtime= build_runtime(args);
    if(args.s) {
        runtime.runPromise(autoscaler).catch((error) => {
            console.error("Error:", error);
        }) 
    }
}

main().catch((error) => {
    console.error("Error:", error);
    process.exit(1);
});