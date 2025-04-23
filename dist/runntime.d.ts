import { ManagedRuntime } from "effect";
import { get_args } from "./args";
export declare const build_runtime: (args: Awaited<ReturnType<typeof get_args>>) => ManagedRuntime.ManagedRuntime<import("./config").Config, never>;
