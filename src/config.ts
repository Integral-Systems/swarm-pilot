import { Effect, Context, Layer, ManagedRuntime, Ref, pipe, Data, Schema, Schedule } from "effect"
import { get_args } from "./args.js";

export class Config extends Context.Tag("Config")<
    Config,
    {
        readonly config: {
            readonly prom_host: string;
            readonly prom_port: number;
            readonly prom_user: string;
            readonly prom_pass: string;
            readonly prom_path: string;
            readonly prom_schema: string;
            readonly telegram_bot_token: string;
            readonly telegram_chat_id: string;
            readonly batch_size: number;
            readonly autoscaler_interval: number;
            readonly enable_autoscaler_label: string;
            readonly autoscaler_minimum_cpu_label: string;
            readonly autoscaler_minimum_cpu_default: number
            readonly autoscaler_maximum_cpu_label: string;
            readonly autoscaler_maximum_cpu_default: number
            readonly autoscaler_minimum_mem_label: string;
            readonly autoscaler_minimum_mem_default: number
            readonly autoscaler_maximum_mem_label: string;
            readonly autoscaler_maximum_mem_default: number
            readonly autoscaler_min_replicas_label: string;
            readonly autoscaler_min_replicas_default: number
            readonly autoscaler_max_replicas_default: number
            readonly autoscaler_max_replicas_label: string;
        }
    }
>() {}

export const ConfigLayer = (args: Awaited<ReturnType<typeof get_args>>) => {
    return Layer.succeed(
        Config,
        Config.of({
            config: {
                prom_host: process.env.PROM_HOST ||"localhost",
                prom_pass: process.env.PROM_PASS || "",
                prom_user: process.env.PROM_USER || "",
                prom_port: Number(process.env.PROM_PORT) || 9090,
                prom_path: process.env.PROM_PATH || "api/v1/query",
                prom_schema: process.env.PROM_SCHEMA || "http",
                telegram_bot_token: process.env.TELEGRAM_BOT_TOKEN || "",
                telegram_chat_id: process.env.TELEGRAM_CHAT_ID || "",
                batch_size: Number(process.env.BATCH_SIZE) || 5,
                autoscaler_interval: Number(process.env.AUTOSCALER_INTERVAL) || 60,
                enable_autoscaler_label: process.env.ENABLE_AUTOSCALER_LABEL || "swarm.autoscaler",
                autoscaler_minimum_cpu_label: process.env.AUTOSCALER_MINIMUM_CPU_LABEL || "swarm.autoscaler.minimum_cpu",
                autoscaler_minimum_cpu_default: Number(process.env.AUTOSCALER_CPU_MINIMUM_DEFAULT) || 25,
                autoscaler_maximum_cpu_label: process.env.AUTOSCALER_MAXIMUM_CPU_LABEL || "swarm.autoscaler.maximum_cpu",
                autoscaler_maximum_cpu_default: Number(process.env.AUTOSCALER_MAXIMUM_CPU_DEFAULT) || 85,
                autoscaler_minimum_mem_label: process.env.AUTOSCALER_MINIMUM_MEM_LABEL || "swarm.autoscaler.minimum_mem",
                autoscaler_minimum_mem_default: Number(process.env.AUTOSCALER_MEM_MINIMUM_DEFAULT) || 25,
                autoscaler_maximum_mem_label: process.env.AUTOSCALER_MAXIMUM_MEM_LABEL || "swarm.autoscaler.maximum_mem",
                autoscaler_maximum_mem_default: Number(process.env.AUTOSCALER_MAXIMUM_MEM_DEFAULT) || 85,
                autoscaler_min_replicas_label: process.env.AUTOSCALER_MIN_REPLICAS_LABEL || "swarm.autoscaler.min_replicas",
                autoscaler_min_replicas_default: Number(process.env.AUTOSCALER_MIN_REPLICAS_DEFAULT) || 1,
                autoscaler_max_replicas_default: Number(process.env.AUTOSCALER_MAX_REPLICAS_DEFAULT) || 0,
                autoscaler_max_replicas_label: process.env.AUTOSCALER_MAX_REPLICAS_LABEL || "swarm.autoscaler.max_replicas",
            }
        })
    );
}
