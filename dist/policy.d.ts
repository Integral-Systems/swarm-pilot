import { Schedule } from "effect";
export declare const default_docker_retry: Schedule.Schedule<import("effect/Duration").Duration, unknown, never>;
export declare function autoscale_policy(seconds: number): Schedule.Schedule<number, unknown, never>;
