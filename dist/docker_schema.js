import { Schema } from "effect";
// Basic Types & Reusable Schemas
const LabelsSchema = Schema.Record({
    key: Schema.String,
    value: Schema.String
});
const DNSConfigSchema = Schema.optional(Schema.Any);
const ResourcesSchema = Schema.optional(Schema.Struct({
    Limits: Schema.optional(Schema.Struct({
        NanoCPUs: Schema.optional(Schema.Number),
        MemoryBytes: Schema.optional(Schema.Number)
    })),
    Reservations: Schema.optional(Schema.Struct({
        NanoCPUs: Schema.optional(Schema.Number),
        MemoryBytes: Schema.optional(Schema.Number)
    })),
}));
const PlacementSchema = Schema.optional(Schema.Struct({
    Constraints: Schema.optional(Schema.Array(Schema.String)),
    Preferences: Schema.optional(Schema.Array(Schema.Any)), // Placeholder for placement preferences
    Platforms: Schema.optional(Schema.Array(Schema.Any)) // Placeholder for platform constraints
}));
// Version Info
export const DockerVersionSchema = Schema.Struct({
    Index: Schema.Number
});
// Privileges
export const PrivilegesSchema = Schema.Struct({
    CredentialSpec: Schema.optional(Schema.Union(Schema.Null, Schema.String)),
    SELinuxContext: Schema.optional(Schema.Union(Schema.Null, Schema.String)),
    NoNewPrivileges: Schema.optional(Schema.Boolean)
});
// Mounts
export const MountSchema = Schema.Struct({
    Type: Schema.optional(Schema.String), // e.g., "bind", "volume", "tmpfs"
    Source: Schema.optional(Schema.String),
    Target: Schema.optional(Schema.String),
    // Add other Mount options if needed (ReadOnly, VolumeOptions, BindOptions, etc.)
});
// Container Spec (within Task Template)
export const ContainerSpecSchema = Schema.Struct({
    Image: Schema.String,
    Labels: Schema.optional(LabelsSchema),
    Args: Schema.optional(Schema.Array(Schema.String)),
    Privileges: Schema.optional(PrivilegesSchema),
    Mounts: Schema.optional(Schema.Array(MountSchema)),
    StopGracePeriod: Schema.optional(Schema.Number),
    DNSConfig: DNSConfigSchema,
    Isolation: Schema.optional(Schema.String), // e.g., "default", "process", "hyperv"
    // Add other ContainerSpec fields if needed (Env, Dirs, User, etc.)
});
// Restart Policy
export const RestartPolicySchema = Schema.Struct({
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
export const NetworkAttachmentConfigSchema = Schema.Struct({
    Target: Schema.String,
    Aliases: Schema.optional(Schema.Array(Schema.String)),
    // DriverOpts: Schema.optional(Schema.Record(Schema.String, Schema.String)) // Optional field
});
// Task Template
export const TaskTemplateSchema = Schema.Struct({
    ContainerSpec: Schema.optional(ContainerSpecSchema),
    Resources: ResourcesSchema,
    RestartPolicy: Schema.optional(RestartPolicySchema),
    Placement: PlacementSchema,
    Networks: Schema.optional(Schema.Array(NetworkAttachmentConfigSchema)),
    ForceUpdate: Schema.optional(Schema.Number),
    Runtime: Schema.optional(Schema.String), // e.g., "container"
    // Add other TaskTemplate fields if needed (LogDriver, etc.)
});
// Service Mode (Replicated or Global)
export const ServiceModeSchema = Schema.Union(Schema.Struct({ Global: Schema.Struct({}) }), Schema.Struct({ Replicated: Schema.Struct({ Replicas: Schema.optional(Schema.Number) }) }));
// Update/Rollback Config
const UpdateRollbackConfigSchema = Schema.Struct({
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
export const EndpointPortConfigSchema = Schema.Struct({
    Name: Schema.optional(Schema.String),
    Protocol: Schema.optional(Schema.Enums({ tcp: "tcp", udp: "udp", sctp: "sctp" })),
    TargetPort: Schema.Number, // Internal port
    PublishedPort: Schema.optional(Schema.Number), // External port
    PublishMode: Schema.optional(Schema.Enums({ ingress: "ingress", host: "host" }))
});
// Endpoint Spec
export const EndpointSpecSchema = Schema.Struct({
    Mode: Schema.optional(Schema.Enums({ vip: "vip", dnsrr: "dnsrr" })),
    Ports: Schema.optional(Schema.Array(EndpointPortConfigSchema))
});
// Service Spec (Current or Previous)
export const ServiceSpecSchema = Schema.Struct({
    Name: Schema.optional(Schema.String),
    Labels: Schema.optional(LabelsSchema),
    TaskTemplate: Schema.optional(TaskTemplateSchema),
    Mode: ServiceModeSchema,
    UpdateConfig: Schema.optional(UpdateRollbackConfigSchema),
    RollbackConfig: Schema.optional(UpdateRollbackConfigSchema),
    EndpointSpec: Schema.optional(EndpointSpecSchema),
    // Networks: Schema.optional(Schema.Array(NetworkAttachmentConfigSchema)) // Networks can also be defined at Spec level
});
// Endpoint Virtual IP
export const VirtualIPSchema = Schema.Struct({
    NetworkID: Schema.String,
    Addr: Schema.String
});
// Service Endpoint Info
export const EndpointSchema = Schema.Struct({
    Spec: Schema.optional(EndpointSpecSchema), // Reuses EndpointSpec definition
    Ports: Schema.optional(Schema.Array(EndpointPortConfigSchema)), // Exposed ports info
    VirtualIPs: Schema.optional(Schema.Array(VirtualIPSchema))
});
// Service Update Status
export const UpdateStatusSchema = Schema.Struct({
    State: Schema.optional(Schema.Enums({
        updating: "updating",
        paused: "paused",
        completed: "completed",
        rollbackStarted: "rollback_started", // Note: Actual value might be slightly different
        rollbackPaused: "rollback_paused", // Note: Actual value might be slightly different
        rollbackCompleted: "rollback_completed" // Note: Actual value might be slightly different
    })),
    StartedAt: Schema.optional(Schema.String), // Consider Schema.DateFromString if needed
    CompletedAt: Schema.optional(Schema.String), // Consider Schema.DateFromString if needed
    Message: Schema.optional(Schema.String)
});
export const DockerServiceSchema = Schema.Struct({
    ID: Schema.String,
    Version: DockerVersionSchema,
    CreatedAt: Schema.String, // Consider Schema.DateFromString if needed
    UpdatedAt: Schema.String, // Consider Schema.DateFromString if needed
    Spec: Schema.optional(ServiceSpecSchema),
    PreviousSpec: Schema.optional(ServiceSpecSchema), // Previous spec, often present during updates
    Endpoint: Schema.optional(EndpointSchema),
    UpdateStatus: Schema.optional(UpdateStatusSchema)
});
export const DockerServiceInspectSchema = Schema.Array(DockerServiceSchema);
