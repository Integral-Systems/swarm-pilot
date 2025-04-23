import { Schema } from "effect";
export type Service = typeof service_schema.Type;
export declare const service_schema: Schema.mutable<Schema.Struct<{
    id: typeof Schema.String;
    name: typeof Schema.String;
    mode: Schema.Union<[Schema.Literal<["replicated"]>, Schema.Literal<["global"]>]>;
    replicas_running: typeof Schema.Number;
    replicas_target: typeof Schema.Number;
    image: typeof Schema.String;
    ports: Schema.optional<typeof Schema.String>;
}>>;
export type ServiceList = typeof service_list_schema.Type;
export declare const service_list_schema: Schema.Array$<Schema.mutable<Schema.Struct<{
    id: typeof Schema.String;
    name: typeof Schema.String;
    mode: Schema.Union<[Schema.Literal<["replicated"]>, Schema.Literal<["global"]>]>;
    replicas_running: typeof Schema.Number;
    replicas_target: typeof Schema.Number;
    image: typeof Schema.String;
    ports: Schema.optional<typeof Schema.String>;
}>>>;
export type DesiredState = typeof desired_state_schema.Type;
export declare const desired_state_schema: Schema.Union<[Schema.Literal<["Running"]>, Schema.Literal<["Shutdown"]>, Schema.Literal<["Unknown"]>]>;
export type CurrentState = typeof current_state_schema.Type;
export declare const current_state_schema: Schema.Union<[Schema.Literal<["Running"]>, Schema.Literal<["Shutdown"]>, Schema.Literal<["Failed"]>, Schema.Literal<["Rejected"]>, Schema.Literal<["Complete"]>, Schema.Literal<["Orphaned"]>, Schema.Literal<["Paused"]>, Schema.Literal<["Pending"]>, Schema.Literal<["Preparing"]>, Schema.Literal<["Starting"]>, Schema.Literal<["Removing"]>, Schema.Literal<["Accepted"]>, Schema.Literal<["New"]>, Schema.Literal<["Allocated"]>, Schema.Literal<["Assigned"]>, Schema.Literal<["Ready"]>, Schema.Literal<["Unknown"]>]>;
export type ServicePS = typeof Service_ps_schema.Type;
export declare const Service_ps_schema: Schema.Struct<{
    id: typeof Schema.String;
    name: typeof Schema.String;
    image: typeof Schema.String;
    node: typeof Schema.String;
    desired_state: Schema.Union<[Schema.Literal<["Running"]>, Schema.Literal<["Shutdown"]>, Schema.Literal<["Unknown"]>]>;
    current_state: Schema.Union<[Schema.Literal<["Running"]>, Schema.Literal<["Shutdown"]>, Schema.Literal<["Failed"]>, Schema.Literal<["Rejected"]>, Schema.Literal<["Complete"]>, Schema.Literal<["Orphaned"]>, Schema.Literal<["Paused"]>, Schema.Literal<["Pending"]>, Schema.Literal<["Preparing"]>, Schema.Literal<["Starting"]>, Schema.Literal<["Removing"]>, Schema.Literal<["Accepted"]>, Schema.Literal<["New"]>, Schema.Literal<["Allocated"]>, Schema.Literal<["Assigned"]>, Schema.Literal<["Ready"]>, Schema.Literal<["Unknown"]>]>;
    current_state_since: typeof Schema.String;
    error: Schema.optional<typeof Schema.String>;
    ports: Schema.optional<typeof Schema.String>;
}>;
export type Service_ps_list = typeof service_ps_list_schema.Type;
export declare const service_ps_list_schema: Schema.mutable<Schema.Array$<Schema.Struct<{
    id: typeof Schema.String;
    name: typeof Schema.String;
    image: typeof Schema.String;
    node: typeof Schema.String;
    desired_state: Schema.Union<[Schema.Literal<["Running"]>, Schema.Literal<["Shutdown"]>, Schema.Literal<["Unknown"]>]>;
    current_state: Schema.Union<[Schema.Literal<["Running"]>, Schema.Literal<["Shutdown"]>, Schema.Literal<["Failed"]>, Schema.Literal<["Rejected"]>, Schema.Literal<["Complete"]>, Schema.Literal<["Orphaned"]>, Schema.Literal<["Paused"]>, Schema.Literal<["Pending"]>, Schema.Literal<["Preparing"]>, Schema.Literal<["Starting"]>, Schema.Literal<["Removing"]>, Schema.Literal<["Accepted"]>, Schema.Literal<["New"]>, Schema.Literal<["Allocated"]>, Schema.Literal<["Assigned"]>, Schema.Literal<["Ready"]>, Schema.Literal<["Unknown"]>]>;
    current_state_since: typeof Schema.String;
    error: Schema.optional<typeof Schema.String>;
    ports: Schema.optional<typeof Schema.String>;
}>>>;
export type ServiceUsage = typeof service_usage_schema.Type;
export declare const service_usage_schema: Schema.Struct<{
    id: typeof Schema.String;
    name: typeof Schema.String;
    cpu: typeof Schema.Number;
    mem: typeof Schema.Number;
}>;
export type ServiceUsageList = typeof service_usage_list_schema.Type;
export declare const service_usage_list_schema: Schema.mutable<Schema.Array$<Schema.Struct<{
    id: typeof Schema.String;
    name: typeof Schema.String;
    cpu: typeof Schema.Number;
    mem: typeof Schema.Number;
}>>>;
export type Metrics = typeof metrics_schema.Type;
export declare const metrics_schema: Schema.Struct<{
    metric: Schema.Struct<{
        container_label_com_docker_swarm_service_name: typeof Schema.String;
        instance: typeof Schema.String;
    }>;
    value: Schema.Tuple2<typeof Schema.Number, typeof Schema.String>;
}>;
export declare const prometheus_response_schema: Schema.Struct<{
    status: typeof Schema.String;
    data: Schema.Struct<{
        resultType: typeof Schema.String;
        result: Schema.Array$<Schema.Struct<{
            metric: Schema.Struct<{
                container_label_com_docker_swarm_service_name: typeof Schema.String;
                instance: typeof Schema.String;
            }>;
            value: Schema.Tuple2<typeof Schema.Number, typeof Schema.String>;
        }>>;
    }>;
}>;
export type Usage = typeof usage_schema.Type;
export declare const usage_schema: Schema.Struct<{
    service_name: typeof Schema.String;
    cpu_usage: typeof Schema.Number;
    memory_usage: typeof Schema.Number;
}>;
export type LabelConfig = typeof label_config_schema.Type;
export declare const label_config_schema: Schema.Struct<{
    autoscaler_enable: typeof Schema.Boolean;
    autoscaler_minimum_cpu: typeof Schema.Number;
    autoscaler_maximum_cpu: typeof Schema.Number;
    autoscaler_minimum_mem: typeof Schema.Number;
    autoscaler_maximum_mem: typeof Schema.Number;
    autoscaler_min_replicas: typeof Schema.Number;
    autoscaler_max_replicas: typeof Schema.Number;
}>;
