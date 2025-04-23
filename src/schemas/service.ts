import { Schema } from "effect";
import { LabelsSchema } from "./shared.js";

// Basic Types & Reusable Schemas
const dns_config_schema = Schema.optional(Schema.Any); 
const resources_schema = Schema.optional(Schema.Struct({
    Limits: Schema.optional(Schema.Struct({
        NanoCPUs: Schema.optional(Schema.Number),
        MemoryBytes: Schema.optional(Schema.Number)
    })),
    Reservations: Schema.optional(Schema.Struct({
        NanoCPUs: Schema.optional(Schema.Number),
        MemoryBytes: Schema.optional(Schema.Number)
    })),
})); 
const placement_schema = Schema.optional(
    Schema.Struct({
        Constraints: Schema.optional(Schema.Array(Schema.String)),
        Preferences: Schema.optional(Schema.Array(Schema.Any)), // Placeholder for placement preferences
        Platforms: Schema.optional(Schema.Array(Schema.Any)) // Placeholder for platform constraints
    })
);

// Version Info
export const docker_version_schema = Schema.Struct({
    Index: Schema.Number
});

// Privileges
export const privileges_schema = Schema.Struct({
    CredentialSpec: Schema.optional(Schema.Union(Schema.Null, Schema.String)),
    SELinuxContext: Schema.optional(Schema.Union(Schema.Null, Schema.String)),
    NoNewPrivileges: Schema.optional(Schema.Boolean)
});

// Mounts
export const mount_schema = Schema.Struct({
    Type: Schema.optional(Schema.String), // e.g., "bind", "volume", "tmpfs"
    Source: Schema.optional(Schema.String),
    Target: Schema.optional(Schema.String),
    // Add other Mount options if needed (ReadOnly, VolumeOptions, BindOptions, etc.)
});

// Container Spec (within Task Template)
export const container_spec_schema = Schema.Struct({
    Image: Schema.String,
    Labels: Schema.optionalWith(LabelsSchema, {
        default: () => ({})
    }),
    Args: Schema.optional(Schema.Array(Schema.String)),
    Privileges: Schema.optional(privileges_schema),
    Mounts: Schema.optional(Schema.Array(mount_schema)),
    StopGracePeriod: Schema.optional(Schema.Number),
    DNSConfig: dns_config_schema,
    Isolation: Schema.optional(Schema.String), // e.g., "default", "process", "hyperv"
    // Add other ContainerSpec fields if needed (Env, Dirs, User, etc.)
});

// Restart Policy
export const restart_policy_schema = Schema.Struct({
    Condition: Schema.optional(Schema.Enums({
        none: "none",
        onFailure: "on-failure",
        any: "any"
    })),
    Delay: Schema.optional(Schema.Number),
    MaxAttempts: Schema.optional(Schema.Number),
    // Window: Schema.optional(Schema.Number) // Optional field
});

// Network Attachment Config
export const network_attachment_config_schema = Schema.Struct({
    Target: Schema.String,
    Aliases: Schema.optional(Schema.Array(Schema.String)),
    // DriverOpts: Schema.optional(Schema.Record(Schema.String, Schema.String)) // Optional field
});

// Task Template
export const task_template_schema = Schema.Struct({
    ContainerSpec: Schema.optional(container_spec_schema),
    Resources: resources_schema,
    RestartPolicy: Schema.optional(restart_policy_schema),
    Placement: placement_schema,
    Networks: Schema.optional(Schema.Array(network_attachment_config_schema)),
    ForceUpdate: Schema.optional(Schema.Number),
    Runtime: Schema.optional(Schema.String), // e.g., "container"
    // Add other TaskTemplate fields if needed (LogDriver, etc.)
});

// Service Mode (Replicated or Global)
export const service_mode_schema = Schema.Union(
    Schema.Struct({ Global: Schema.Struct({}) }),
    Schema.Struct({ Replicated: Schema.Struct({ Replicas: Schema.Number }) })
);
// Update/Rollback Config
const update_rollback_config_schema = Schema.Struct({
    Parallelism: Schema.optional(Schema.Number),
    FailureAction: Schema.optional(Schema.Enums({
        pause: "pause",
        continue: "continue",
        rollback: "rollback"
    })),
    Monitor: Schema.optional(Schema.Number),
    MaxFailureRatio: Schema.optional(Schema.Number),
    Order: Schema.optional(Schema.Enums({
        stopFirst: "stop-first",
        startFirst: "start-first"
    }))
});

// Endpoint Port Config
export const endpoint_port_config_schema = Schema.Struct({
    Name: Schema.optional(Schema.String),
    Protocol: Schema.optional(Schema.Enums({ tcp: "tcp", udp: "udp", sctp: "sctp"})),
    TargetPort: Schema.Number, // Internal port
    PublishedPort: Schema.optional(Schema.Number), // External port
    PublishMode: Schema.optional(Schema.Enums({ ingress: "ingress", host: "host" }))
});

// Endpoint Spec
export const endpoint_spec_schema = Schema.Struct({
    Mode: Schema.optional(Schema.Enums({ vip: "vip", dnsrr: "dnsrr" })),
    Ports: Schema.optional(Schema.Array(endpoint_port_config_schema))
});

// Service Spec (Current or Previous)
export const service_spec_schema = Schema.Struct({
    Name: Schema.optional(Schema.String),
    Labels: Schema.optionalWith(LabelsSchema, {
        default: () => ({})
    }),
    TaskTemplate: Schema.optional(task_template_schema),
    Mode: service_mode_schema,
    UpdateConfig: Schema.optional(update_rollback_config_schema),
    RollbackConfig: Schema.optional(update_rollback_config_schema),
    EndpointSpec: Schema.optional(endpoint_spec_schema),
    Networks: Schema.optional(Schema.Array(network_attachment_config_schema))
});

// Endpoint Virtual IP
export const virtual_ip_Schema = Schema.Struct({
    NetworkID: Schema.String,
    Addr: Schema.String
});

// Service Endpoint Info
export const endpoint_schema = Schema.Struct({
    Spec: Schema.optional(endpoint_spec_schema), // Reuses EndpointSpec definition
    Ports: Schema.optional(Schema.Array(endpoint_port_config_schema)), // Exposed ports info
    VirtualIPs: Schema.optional(Schema.Array(virtual_ip_Schema))
});

// Service Update Status
export const update_status_schema = Schema.Struct({
    State: Schema.optional(Schema.Enums({
        updating: "updating",
        paused: "paused",
        completed: "completed",
        rollbackStarted: "rollback_started", // Note: Actual value might be slightly different
        rollbackPaused: "rollback_paused",   // Note: Actual value might be slightly different
        rollbackCompleted: "rollback_completed" // Note: Actual value might be slightly different
    })),
    StartedAt: Schema.optional(Schema.String), // Consider Schema.DateFromString if needed
    CompletedAt: Schema.optional(Schema.String), // Consider Schema.DateFromString if needed
    Message: Schema.optional(Schema.String)
});

// Main Service Schema
export type DockerService = typeof docker_serviceSchema.Type;
export const docker_serviceSchema = Schema.Struct({
    ID: Schema.String,
    Version: docker_version_schema,
    CreatedAt: Schema.String, // Consider Schema.DateFromString if needed
    UpdatedAt: Schema.String, // Consider Schema.DateFromString if needed
    Spec: Schema.optional(service_spec_schema),
    PreviousSpec: Schema.optional(service_spec_schema), // Previous spec, often present during updates
    Endpoint: Schema.optional(endpoint_schema),
    UpdateStatus: Schema.optional(update_status_schema)
});

export const docker_serviceInspect_schema = Schema.Array(docker_serviceSchema);
