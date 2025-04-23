import { Schema } from "effect";
export declare const docker_version_schema: Schema.Struct<{
    Index: typeof Schema.Number;
}>;
export declare const node_spec_schema: Schema.Struct<{
    Labels: Schema.optionalWith<Schema.Record$<typeof Schema.String, typeof Schema.String>, {
        default: () => {};
    }>;
    Role: Schema.optional<Schema.Enums<{
        worker: string;
        manager: string;
    }>>;
    Availability: Schema.optional<Schema.Enums<{
        active: string;
        pause: string;
        drain: string;
    }>>;
}>;
export declare const platform_schema: Schema.Struct<{
    Architecture: Schema.optional<typeof Schema.String>;
    OS: Schema.optional<typeof Schema.String>;
}>;
export declare const node_resources_schema: Schema.Struct<{
    NanoCPUs: Schema.optional<typeof Schema.Number>;
    MemoryBytes: Schema.optional<typeof Schema.Number>;
}>;
export declare const engine_plugin_schema: Schema.Struct<{
    Type: Schema.optional<typeof Schema.String>;
    Name: Schema.optional<typeof Schema.String>;
}>;
export declare const engine_schema: Schema.Struct<{
    EngineVersion: Schema.optional<typeof Schema.String>;
    Labels: Schema.optional<Schema.Record$<typeof Schema.String, typeof Schema.String>>;
    Plugins: Schema.optionalWith<Schema.Array$<Schema.Struct<{
        Type: Schema.optional<typeof Schema.String>;
        Name: Schema.optional<typeof Schema.String>;
    }>>, {
        default: () => never[];
    }>;
}>;
export declare const tls_info_schema: Schema.Struct<{
    TrustRoot: Schema.optional<typeof Schema.String>;
    CertIssuerSubject: Schema.optional<Schema.Union<[typeof Schema.String, typeof Schema.String]>>;
    CertIssuerPublicKey: Schema.optional<Schema.Union<[typeof Schema.String, typeof Schema.String]>>;
}>;
export declare const cis_info_schema: Schema.Struct<{
    PluginName: Schema.optional<typeof Schema.String>;
    NodeID: Schema.optional<typeof Schema.String>;
}>;
export declare const node_description_schema: Schema.Struct<{
    Hostname: Schema.optional<typeof Schema.String>;
    Platform: Schema.optional<Schema.Struct<{
        Architecture: Schema.optional<typeof Schema.String>;
        OS: Schema.optional<typeof Schema.String>;
    }>>;
    Resources: Schema.optional<Schema.Struct<{
        NanoCPUs: Schema.optional<typeof Schema.Number>;
        MemoryBytes: Schema.optional<typeof Schema.Number>;
    }>>;
    Engine: Schema.optional<Schema.Struct<{
        EngineVersion: Schema.optional<typeof Schema.String>;
        Labels: Schema.optional<Schema.Record$<typeof Schema.String, typeof Schema.String>>;
        Plugins: Schema.optionalWith<Schema.Array$<Schema.Struct<{
            Type: Schema.optional<typeof Schema.String>;
            Name: Schema.optional<typeof Schema.String>;
        }>>, {
            default: () => never[];
        }>;
    }>>;
    TLSInfo: Schema.optional<Schema.Struct<{
        TrustRoot: Schema.optional<typeof Schema.String>;
        CertIssuerSubject: Schema.optional<Schema.Union<[typeof Schema.String, typeof Schema.String]>>;
        CertIssuerPublicKey: Schema.optional<Schema.Union<[typeof Schema.String, typeof Schema.String]>>;
    }>>;
    CSIInfo: Schema.optionalWith<Schema.Array$<Schema.Struct<{
        PluginName: Schema.optional<typeof Schema.String>;
        NodeID: Schema.optional<typeof Schema.String>;
    }>>, {
        default: () => never[];
    }>;
}>;
export declare const node_status_schema: Schema.Struct<{
    State: Schema.optional<Schema.Enums<{
        unknown: string;
        down: string;
        ready: string;
        disconnected: string;
    }>>;
    Message: Schema.optional<typeof Schema.String>;
    Addr: Schema.optional<typeof Schema.String>;
}>;
export declare const manager_status_schema: Schema.Struct<{
    Leader: Schema.optional<typeof Schema.Boolean>;
    Reachability: Schema.optional<Schema.Enums<{
        unknown: string;
        unreachable: string;
        reachable: string;
    }>>;
    Addr: Schema.optional<typeof Schema.String>;
}>;
export declare const docker_node_schema: Schema.Struct<{
    ID: typeof Schema.String;
    Version: Schema.Struct<{
        Index: typeof Schema.Number;
    }>;
    CreatedAt: typeof Schema.String;
    UpdatedAt: typeof Schema.String;
    Spec: Schema.optional<Schema.Struct<{
        Labels: Schema.optionalWith<Schema.Record$<typeof Schema.String, typeof Schema.String>, {
            default: () => {};
        }>;
        Role: Schema.optional<Schema.Enums<{
            worker: string;
            manager: string;
        }>>;
        Availability: Schema.optional<Schema.Enums<{
            active: string;
            pause: string;
            drain: string;
        }>>;
    }>>;
    Description: Schema.optional<Schema.Struct<{
        Hostname: Schema.optional<typeof Schema.String>;
        Platform: Schema.optional<Schema.Struct<{
            Architecture: Schema.optional<typeof Schema.String>;
            OS: Schema.optional<typeof Schema.String>;
        }>>;
        Resources: Schema.optional<Schema.Struct<{
            NanoCPUs: Schema.optional<typeof Schema.Number>;
            MemoryBytes: Schema.optional<typeof Schema.Number>;
        }>>;
        Engine: Schema.optional<Schema.Struct<{
            EngineVersion: Schema.optional<typeof Schema.String>;
            Labels: Schema.optional<Schema.Record$<typeof Schema.String, typeof Schema.String>>;
            Plugins: Schema.optionalWith<Schema.Array$<Schema.Struct<{
                Type: Schema.optional<typeof Schema.String>;
                Name: Schema.optional<typeof Schema.String>;
            }>>, {
                default: () => never[];
            }>;
        }>>;
        TLSInfo: Schema.optional<Schema.Struct<{
            TrustRoot: Schema.optional<typeof Schema.String>;
            CertIssuerSubject: Schema.optional<Schema.Union<[typeof Schema.String, typeof Schema.String]>>;
            CertIssuerPublicKey: Schema.optional<Schema.Union<[typeof Schema.String, typeof Schema.String]>>;
        }>>;
        CSIInfo: Schema.optionalWith<Schema.Array$<Schema.Struct<{
            PluginName: Schema.optional<typeof Schema.String>;
            NodeID: Schema.optional<typeof Schema.String>;
        }>>, {
            default: () => never[];
        }>;
    }>>;
    Status: Schema.optional<Schema.Struct<{
        State: Schema.optional<Schema.Enums<{
            unknown: string;
            down: string;
            ready: string;
            disconnected: string;
        }>>;
        Message: Schema.optional<typeof Schema.String>;
        Addr: Schema.optional<typeof Schema.String>;
    }>>;
    ManagerStatus: Schema.optional<Schema.Struct<{
        Leader: Schema.optional<typeof Schema.Boolean>;
        Reachability: Schema.optional<Schema.Enums<{
            unknown: string;
            unreachable: string;
            reachable: string;
        }>>;
        Addr: Schema.optional<typeof Schema.String>;
    }>>;
}>;
export declare const docker_node_inspect_schema: Schema.Array$<Schema.Struct<{
    ID: typeof Schema.String;
    Version: Schema.Struct<{
        Index: typeof Schema.Number;
    }>;
    CreatedAt: typeof Schema.String;
    UpdatedAt: typeof Schema.String;
    Spec: Schema.optional<Schema.Struct<{
        Labels: Schema.optionalWith<Schema.Record$<typeof Schema.String, typeof Schema.String>, {
            default: () => {};
        }>;
        Role: Schema.optional<Schema.Enums<{
            worker: string;
            manager: string;
        }>>;
        Availability: Schema.optional<Schema.Enums<{
            active: string;
            pause: string;
            drain: string;
        }>>;
    }>>;
    Description: Schema.optional<Schema.Struct<{
        Hostname: Schema.optional<typeof Schema.String>;
        Platform: Schema.optional<Schema.Struct<{
            Architecture: Schema.optional<typeof Schema.String>;
            OS: Schema.optional<typeof Schema.String>;
        }>>;
        Resources: Schema.optional<Schema.Struct<{
            NanoCPUs: Schema.optional<typeof Schema.Number>;
            MemoryBytes: Schema.optional<typeof Schema.Number>;
        }>>;
        Engine: Schema.optional<Schema.Struct<{
            EngineVersion: Schema.optional<typeof Schema.String>;
            Labels: Schema.optional<Schema.Record$<typeof Schema.String, typeof Schema.String>>;
            Plugins: Schema.optionalWith<Schema.Array$<Schema.Struct<{
                Type: Schema.optional<typeof Schema.String>;
                Name: Schema.optional<typeof Schema.String>;
            }>>, {
                default: () => never[];
            }>;
        }>>;
        TLSInfo: Schema.optional<Schema.Struct<{
            TrustRoot: Schema.optional<typeof Schema.String>;
            CertIssuerSubject: Schema.optional<Schema.Union<[typeof Schema.String, typeof Schema.String]>>;
            CertIssuerPublicKey: Schema.optional<Schema.Union<[typeof Schema.String, typeof Schema.String]>>;
        }>>;
        CSIInfo: Schema.optionalWith<Schema.Array$<Schema.Struct<{
            PluginName: Schema.optional<typeof Schema.String>;
            NodeID: Schema.optional<typeof Schema.String>;
        }>>, {
            default: () => never[];
        }>;
    }>>;
    Status: Schema.optional<Schema.Struct<{
        State: Schema.optional<Schema.Enums<{
            unknown: string;
            down: string;
            ready: string;
            disconnected: string;
        }>>;
        Message: Schema.optional<typeof Schema.String>;
        Addr: Schema.optional<typeof Schema.String>;
    }>>;
    ManagerStatus: Schema.optional<Schema.Struct<{
        Leader: Schema.optional<typeof Schema.Boolean>;
        Reachability: Schema.optional<Schema.Enums<{
            unknown: string;
            unreachable: string;
            reachable: string;
        }>>;
        Addr: Schema.optional<typeof Schema.String>;
    }>>;
}>>;
