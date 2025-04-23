import { Schedule } from "effect";

export const default_docker_retry = Schedule.fromDelays(1000, 1000, 1000, 1000);
export function autoscale_policy(seconds: number) {
    return Schedule.spaced(`${seconds} second`)
}