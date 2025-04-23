import { Schema } from "effect";
import { LabelsSchema } from "./shared.js";

// --- Version Info ---
export const docker_version_schema = Schema.Struct({
    Index: Schema.Number
});

// --- Node Specification ---
export const node_spec_schema = Schema.Struct({
    Labels: Schema.optionalWith(LabelsSchema, {
        default: () => ({})
    }), // Default to empty object if missing
    Role: Schema.optional(Schema.Enums({
        worker: "worker",
        manager: "manager"
    })),
    Availability: Schema.optional(Schema.Enums({
        active: "active",
        pause: "pause",
        drain: "drain"
    }))
});

// --- Platform Description ---
export const platform_schema = Schema.Struct({
    Architecture: Schema.optional(Schema.String),
    OS: Schema.optional(Schema.String)
});

// --- Node Resources ---
export const node_resources_schema = Schema.Struct({
    NanoCPUs: Schema.optional(Schema.Number),
    MemoryBytes: Schema.optional(Schema.Number),
    // GenericResources: Schema.optional(Schema.Array(...)) // Add if needed
});

// --- Engine Plugin ---
export const engine_plugin_schema = Schema.Struct({
    Type: Schema.optional(Schema.String),
    Name: Schema.optional(Schema.String)
});

// --- Engine Description ---
export const engine_schema = Schema.Struct({
    EngineVersion: Schema.optional(Schema.String),
    Labels: Schema.optional(LabelsSchema), // Engine labels might exist
    Plugins: Schema.optionalWith(Schema.Array(engine_plugin_schema), { default: () => [] }), // Default to empty array
    // Add other Engine fields if needed (e.g., Runtime, Commit)
});

// --- TLS Information ---
export const tls_info_schema = Schema.Struct({
    TrustRoot: Schema.optional(Schema.String),
    CertIssuerSubject: Schema.optional(Schema.Union(Schema.String, Schema.String)), // Can be Buffer or base64 String
    CertIssuerPublicKey: Schema.optional(Schema.Union(Schema.String, Schema.String)) // Can be Buffer or base64 String
});

// --- CSI (Container Storage Interface) Info ---
export const cis_info_schema = Schema.Struct({
    PluginName: Schema.optional(Schema.String),
    NodeID: Schema.optional(Schema.String),
    // MaxVolumesPerNode: Schema.optional(Schema.Number), // Optional field
    // AccessibleTopology: Schema.optional(...) // Optional field
});

// --- Node Description ---
export const node_description_schema = Schema.Struct({
    Hostname: Schema.optional(Schema.String),
    Platform: Schema.optional(platform_schema),
    Resources: Schema.optional(node_resources_schema),
    Engine: Schema.optional(engine_schema),
    TLSInfo: Schema.optional(tls_info_schema),
    CSIInfo: Schema.optionalWith(Schema.Array(cis_info_schema), {
        default: () => []
    }) // Default to empty array
});

// --- Node Status ---
export const node_status_schema = Schema.Struct({
    State: Schema.optional(Schema.Enums({
        unknown: "unknown",
        down: "down",
        ready: "ready",
        disconnected: "disconnected"
    })),
    Message: Schema.optional(Schema.String), // Optional message, e.g., for 'down' state
    Addr: Schema.optional(Schema.String) // IP Address
});

// --- Manager Status (Only relevant for manager nodes) ---
export const manager_status_schema = Schema.Struct({
        Leader: Schema.optional(Schema.Boolean),
        Reachability: Schema.optional(Schema.Enums({
            unknown: "unknown",
            unreachable: "unreachable",
            reachable: "reachable"
        })),
     Addr: Schema.optional(Schema.String) // Manager address
});


// --- Main Node Schema ---
export const docker_node_schema = Schema.Struct({
    ID: Schema.String,
    Version: docker_version_schema,
    CreatedAt: Schema.String, // Consider Schema.DateFromString if needed
    UpdatedAt: Schema.String, // Consider Schema.DateFromString if needed
    Spec: Schema.optional(node_spec_schema),
    Description: Schema.optional(node_description_schema),
    Status: Schema.optional(node_status_schema),
    ManagerStatus: Schema.optional(manager_status_schema) // Will be null/undefined for worker nodes
});

// --- Top-Level Schema (docker node inspect returns an array) ---
export const docker_node_inspect_schema = Schema.Array(docker_node_schema);
