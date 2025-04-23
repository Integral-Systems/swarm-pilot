import { Schema } from "effect";

export type Service = typeof service_schema.Type
export const service_schema = Schema.mutable(Schema.Struct({
    id: Schema.String,
    name: Schema.String,
    mode: Schema.Union(Schema.Literal("replicated"), Schema.Literal("global")),
    replicas_running: Schema.Number,
    replicas_target: Schema.Number,
    image: Schema.String,
    ports: Schema.optional(Schema.String),
}));

export type ServiceList = typeof service_list_schema.Type
export const service_list_schema = Schema.Array(service_schema);

export type NodeStatus = typeof node_status_schema.Type
const node_status_schema = Schema.Union(
    Schema.Literal("ready"),
    Schema.Literal("down"),
    Schema.Literal("unknown"),
    Schema.Literal("disconnected")
);

// Enum for Node Availability
export type NodeAvailability = typeof node_availability_schema.Type
const node_availability_schema = Schema.Union(
    Schema.Literal("active"),
    Schema.Literal("pause"),
    Schema.Literal("drain")
);

// Enum for Manager Status (derived from the command output)
export type ManagerStatus = typeof manager_status_schema.Type
const manager_status_schema = Schema.Union(
    Schema.Literal("leader"),
    Schema.Literal("reachable"),
    Schema.Literal("unavailable"), 
    Schema.Literal("worker") 
);

export type DockerNodeList = typeof docker_node_list_schema.Type
export const docker_node_list_schema = Schema.Struct({
    is_self: Schema.Boolean, 
    id: Schema.String,     
    hostname: Schema.String, 
    status: node_status_schema,  
    availability: node_availability_schema, 
    manager_status: manager_status_schema,
    engine_version: Schema.String 
});


export type DesiredState = typeof desired_state_schema.Type
export const desired_state_schema = Schema.Union(
    Schema.Literal("Running"),
    Schema.Literal("Shutdown"),
    Schema.Literal("Unknown"),
);

export type CurrentState = typeof current_state_schema.Type
export const current_state_schema = Schema.Union(
    Schema.Literal("Running"),
    Schema.Literal("Shutdown"),
    Schema.Literal("Failed"),
    Schema.Literal("Rejected"),
    Schema.Literal("Complete"),
    Schema.Literal("Orphaned"),
    Schema.Literal("Paused"),
    Schema.Literal("Pending"),
    Schema.Literal("Preparing"),
    Schema.Literal("Starting"),
    Schema.Literal("Removing"),
    Schema.Literal("Accepted"),
    Schema.Literal("New"),
    Schema.Literal("Allocated"),
    Schema.Literal("Assigned"),
    Schema.Literal("Ready"),
    Schema.Literal("Unknown"),
);

export type ServicePS = typeof Service_ps_schema.Type
export const Service_ps_schema = Schema.Struct({
    id: Schema.String,
    name: Schema.String,
    image: Schema.String,
    node: Schema.String,
    desired_state: desired_state_schema,
    current_state: current_state_schema,
    current_state_since: Schema.String,
    error: Schema.optional(Schema.String),
    ports: Schema.optional(Schema.String),
});

export type Service_ps_list = typeof service_ps_list_schema.Type
export const service_ps_list_schema = Schema.mutable(Schema.Array(Service_ps_schema));

export type ServiceUsage = typeof service_usage_schema.Type
export const service_usage_schema = Schema.Struct({
    id: Schema.String,
    name: Schema.String,
    cpu: Schema.Number,
    mem: Schema.Number,
});

export type ServiceUsageList = typeof service_usage_list_schema.Type
export const service_usage_list_schema = Schema.mutable(Schema.Array(service_usage_schema));

export type Metrics = typeof metrics_schema.Type
export const metrics_schema = Schema.Struct({
    metric: Schema.Struct({
        container_label_com_docker_swarm_service_name: Schema.String,
        container_label_com_docker_swarm_task_id: Schema.String,
        instance: Schema.String,
    }),
    value: Schema.Tuple(
        Schema.Number, // The timestamp
        Schema.String  // The value, parsed and kept as a string
    ),
})

export const prometheus_response_schema = Schema.Struct({
    status: Schema.String,
    data: Schema.Struct({
        resultType: Schema.String,
        result: Schema.Array(metrics_schema),
    }),
});

export type Usage = typeof usage_schema.Type
export const usage_schema = Schema.Struct({
    service_name: Schema.String,
    cpu_usage: Schema.Number,
    memory_usage: Schema.Number,
    task_id: Schema.String,
    instance: Schema.String,
})

export type LabelConfig = typeof label_config_schema.Type
export const label_config_schema = Schema.Struct({
    autoscaler_enable: Schema.Boolean,
    autoscaler_minimum_cpu: Schema.Number,
    autoscaler_maximum_cpu: Schema.Number,
    autoscaler_minimum_mem: Schema.Number,
    autoscaler_maximum_mem: Schema.Number,
    autoscaler_min_replicas: Schema.Number,
    autoscaler_max_replicas: Schema.Number,
});
export type Scaling = {
    service_name: string;
    from: number;
    to: number;
};
