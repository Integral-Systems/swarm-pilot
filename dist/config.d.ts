import { Context, Layer } from "effect";
import { get_args } from "./args.js";
declare const Config_base: Context.TagClass<Config, "Config", {
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
        readonly autoscaler_minimum_cpu_default: number;
        readonly autoscaler_maximum_cpu_label: string;
        readonly autoscaler_maximum_cpu_default: number;
        readonly autoscaler_minimum_mem_label: string;
        readonly autoscaler_minimum_mem_default: number;
        readonly autoscaler_maximum_mem_label: string;
        readonly autoscaler_maximum_mem_default: number;
        readonly autoscaler_min_replicas_label: string;
        readonly autoscaler_min_replicas_default: number;
        readonly autoscaler_max_replicas_default: number;
        readonly autoscaler_max_replicas_label: string;
    };
}>;
export declare class Config extends Config_base {
}
export declare const ConfigLayer: (args: Awaited<ReturnType<typeof get_args>>) => Layer.Layer<Config, never, never>;
export {};
