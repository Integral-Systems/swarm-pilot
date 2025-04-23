import { Schema } from "effect";
export declare const DockerVersionSchema: Schema.Struct<{
    Index: typeof Schema.Number;
}>;
export declare const PrivilegesSchema: Schema.Struct<{
    CredentialSpec: Schema.optional<Schema.Union<[typeof Schema.Null, typeof Schema.String]>>;
    SELinuxContext: Schema.optional<Schema.Union<[typeof Schema.Null, typeof Schema.String]>>;
    NoNewPrivileges: Schema.optional<typeof Schema.Boolean>;
}>;
export declare const MountSchema: Schema.Struct<{
    Type: Schema.optional<typeof Schema.String>;
    Source: Schema.optional<typeof Schema.String>;
    Target: Schema.optional<typeof Schema.String>;
}>;
export declare const ContainerSpecSchema: Schema.Struct<{
    Image: typeof Schema.String;
    Labels: Schema.optional<Schema.Record$<typeof Schema.String, typeof Schema.String>>;
    Args: Schema.optional<Schema.Array$<typeof Schema.String>>;
    Privileges: Schema.optional<Schema.Struct<{
        CredentialSpec: Schema.optional<Schema.Union<[typeof Schema.Null, typeof Schema.String]>>;
        SELinuxContext: Schema.optional<Schema.Union<[typeof Schema.Null, typeof Schema.String]>>;
        NoNewPrivileges: Schema.optional<typeof Schema.Boolean>;
    }>>;
    Mounts: Schema.optional<Schema.Array$<Schema.Struct<{
        Type: Schema.optional<typeof Schema.String>;
        Source: Schema.optional<typeof Schema.String>;
        Target: Schema.optional<typeof Schema.String>;
    }>>>;
    StopGracePeriod: Schema.optional<typeof Schema.Number>;
    DNSConfig: Schema.optional<typeof Schema.Any>;
    Isolation: Schema.optional<typeof Schema.String>;
}>;
export declare const RestartPolicySchema: Schema.Struct<{
    Condition: Schema.optional<Schema.Enums<{
        none: string;
        onFailure: string;
        any: string;
    }>>;
    Delay: Schema.optional<typeof Schema.Number>;
    MaxAttempts: Schema.optional<typeof Schema.Number>;
}>;
export declare const NetworkAttachmentConfigSchema: Schema.Struct<{
    Target: typeof Schema.String;
    Aliases: Schema.optional<Schema.Array$<typeof Schema.String>>;
}>;
export declare const TaskTemplateSchema: Schema.Struct<{
    ContainerSpec: Schema.optional<Schema.Struct<{
        Image: typeof Schema.String;
        Labels: Schema.optional<Schema.Record$<typeof Schema.String, typeof Schema.String>>;
        Args: Schema.optional<Schema.Array$<typeof Schema.String>>;
        Privileges: Schema.optional<Schema.Struct<{
            CredentialSpec: Schema.optional<Schema.Union<[typeof Schema.Null, typeof Schema.String]>>;
            SELinuxContext: Schema.optional<Schema.Union<[typeof Schema.Null, typeof Schema.String]>>;
            NoNewPrivileges: Schema.optional<typeof Schema.Boolean>;
        }>>;
        Mounts: Schema.optional<Schema.Array$<Schema.Struct<{
            Type: Schema.optional<typeof Schema.String>;
            Source: Schema.optional<typeof Schema.String>;
            Target: Schema.optional<typeof Schema.String>;
        }>>>;
        StopGracePeriod: Schema.optional<typeof Schema.Number>;
        DNSConfig: Schema.optional<typeof Schema.Any>;
        Isolation: Schema.optional<typeof Schema.String>;
    }>>;
    Resources: Schema.optional<Schema.Struct<{
        Limits: Schema.optional<Schema.Struct<{
            NanoCPUs: Schema.optional<typeof Schema.Number>;
            MemoryBytes: Schema.optional<typeof Schema.Number>;
        }>>;
        Reservations: Schema.optional<Schema.Struct<{
            NanoCPUs: Schema.optional<typeof Schema.Number>;
            MemoryBytes: Schema.optional<typeof Schema.Number>;
        }>>;
    }>>;
    RestartPolicy: Schema.optional<Schema.Struct<{
        Condition: Schema.optional<Schema.Enums<{
            none: string;
            onFailure: string;
            any: string;
        }>>;
        Delay: Schema.optional<typeof Schema.Number>;
        MaxAttempts: Schema.optional<typeof Schema.Number>;
    }>>;
    Placement: Schema.optional<Schema.Struct<{
        Constraints: Schema.optional<Schema.Array$<typeof Schema.String>>;
        Preferences: Schema.optional<Schema.Array$<typeof Schema.Any>>;
        Platforms: Schema.optional<Schema.Array$<typeof Schema.Any>>;
    }>>;
    Networks: Schema.optional<Schema.Array$<Schema.Struct<{
        Target: typeof Schema.String;
        Aliases: Schema.optional<Schema.Array$<typeof Schema.String>>;
    }>>>;
    ForceUpdate: Schema.optional<typeof Schema.Number>;
    Runtime: Schema.optional<typeof Schema.String>;
}>;
export declare const ServiceModeSchema: Schema.Union<[Schema.Struct<{
    Global: Schema.Struct<{}>;
}>, Schema.Struct<{
    Replicated: Schema.Struct<{
        Replicas: Schema.optional<typeof Schema.Number>;
    }>;
}>]>;
export declare const EndpointPortConfigSchema: Schema.Struct<{
    Name: Schema.optional<typeof Schema.String>;
    Protocol: Schema.optional<Schema.Enums<{
        tcp: string;
        udp: string;
        sctp: string;
    }>>;
    TargetPort: typeof Schema.Number;
    PublishedPort: Schema.optional<typeof Schema.Number>;
    PublishMode: Schema.optional<Schema.Enums<{
        ingress: string;
        host: string;
    }>>;
}>;
export declare const EndpointSpecSchema: Schema.Struct<{
    Mode: Schema.optional<Schema.Enums<{
        vip: string;
        dnsrr: string;
    }>>;
    Ports: Schema.optional<Schema.Array$<Schema.Struct<{
        Name: Schema.optional<typeof Schema.String>;
        Protocol: Schema.optional<Schema.Enums<{
            tcp: string;
            udp: string;
            sctp: string;
        }>>;
        TargetPort: typeof Schema.Number;
        PublishedPort: Schema.optional<typeof Schema.Number>;
        PublishMode: Schema.optional<Schema.Enums<{
            ingress: string;
            host: string;
        }>>;
    }>>>;
}>;
export declare const ServiceSpecSchema: Schema.Struct<{
    Name: Schema.optional<typeof Schema.String>;
    Labels: Schema.optional<Schema.Record$<typeof Schema.String, typeof Schema.String>>;
    TaskTemplate: Schema.optional<Schema.Struct<{
        ContainerSpec: Schema.optional<Schema.Struct<{
            Image: typeof Schema.String;
            Labels: Schema.optional<Schema.Record$<typeof Schema.String, typeof Schema.String>>;
            Args: Schema.optional<Schema.Array$<typeof Schema.String>>;
            Privileges: Schema.optional<Schema.Struct<{
                CredentialSpec: Schema.optional<Schema.Union<[typeof Schema.Null, typeof Schema.String]>>;
                SELinuxContext: Schema.optional<Schema.Union<[typeof Schema.Null, typeof Schema.String]>>;
                NoNewPrivileges: Schema.optional<typeof Schema.Boolean>;
            }>>;
            Mounts: Schema.optional<Schema.Array$<Schema.Struct<{
                Type: Schema.optional<typeof Schema.String>;
                Source: Schema.optional<typeof Schema.String>;
                Target: Schema.optional<typeof Schema.String>;
            }>>>;
            StopGracePeriod: Schema.optional<typeof Schema.Number>;
            DNSConfig: Schema.optional<typeof Schema.Any>;
            Isolation: Schema.optional<typeof Schema.String>;
        }>>;
        Resources: Schema.optional<Schema.Struct<{
            Limits: Schema.optional<Schema.Struct<{
                NanoCPUs: Schema.optional<typeof Schema.Number>;
                MemoryBytes: Schema.optional<typeof Schema.Number>;
            }>>;
            Reservations: Schema.optional<Schema.Struct<{
                NanoCPUs: Schema.optional<typeof Schema.Number>;
                MemoryBytes: Schema.optional<typeof Schema.Number>;
            }>>;
        }>>;
        RestartPolicy: Schema.optional<Schema.Struct<{
            Condition: Schema.optional<Schema.Enums<{
                none: string;
                onFailure: string;
                any: string;
            }>>;
            Delay: Schema.optional<typeof Schema.Number>;
            MaxAttempts: Schema.optional<typeof Schema.Number>;
        }>>;
        Placement: Schema.optional<Schema.Struct<{
            Constraints: Schema.optional<Schema.Array$<typeof Schema.String>>;
            Preferences: Schema.optional<Schema.Array$<typeof Schema.Any>>;
            Platforms: Schema.optional<Schema.Array$<typeof Schema.Any>>;
        }>>;
        Networks: Schema.optional<Schema.Array$<Schema.Struct<{
            Target: typeof Schema.String;
            Aliases: Schema.optional<Schema.Array$<typeof Schema.String>>;
        }>>>;
        ForceUpdate: Schema.optional<typeof Schema.Number>;
        Runtime: Schema.optional<typeof Schema.String>;
    }>>;
    Mode: Schema.Union<[Schema.Struct<{
        Global: Schema.Struct<{}>;
    }>, Schema.Struct<{
        Replicated: Schema.Struct<{
            Replicas: Schema.optional<typeof Schema.Number>;
        }>;
    }>]>;
    UpdateConfig: Schema.optional<Schema.Struct<{
        Parallelism: Schema.optional<typeof Schema.Number>;
        FailureAction: Schema.optional<Schema.Enums<{
            pause: string;
            continue: string;
            rollback: string;
        }>>;
        Monitor: Schema.optional<typeof Schema.Number>;
        MaxFailureRatio: Schema.optional<typeof Schema.Number>;
        Order: Schema.optional<Schema.Enums<{
            stopFirst: string;
            startFirst: string;
        }>>;
    }>>;
    RollbackConfig: Schema.optional<Schema.Struct<{
        Parallelism: Schema.optional<typeof Schema.Number>;
        FailureAction: Schema.optional<Schema.Enums<{
            pause: string;
            continue: string;
            rollback: string;
        }>>;
        Monitor: Schema.optional<typeof Schema.Number>;
        MaxFailureRatio: Schema.optional<typeof Schema.Number>;
        Order: Schema.optional<Schema.Enums<{
            stopFirst: string;
            startFirst: string;
        }>>;
    }>>;
    EndpointSpec: Schema.optional<Schema.Struct<{
        Mode: Schema.optional<Schema.Enums<{
            vip: string;
            dnsrr: string;
        }>>;
        Ports: Schema.optional<Schema.Array$<Schema.Struct<{
            Name: Schema.optional<typeof Schema.String>;
            Protocol: Schema.optional<Schema.Enums<{
                tcp: string;
                udp: string;
                sctp: string;
            }>>;
            TargetPort: typeof Schema.Number;
            PublishedPort: Schema.optional<typeof Schema.Number>;
            PublishMode: Schema.optional<Schema.Enums<{
                ingress: string;
                host: string;
            }>>;
        }>>>;
    }>>;
}>;
export declare const VirtualIPSchema: Schema.Struct<{
    NetworkID: typeof Schema.String;
    Addr: typeof Schema.String;
}>;
export declare const EndpointSchema: Schema.Struct<{
    Spec: Schema.optional<Schema.Struct<{
        Mode: Schema.optional<Schema.Enums<{
            vip: string;
            dnsrr: string;
        }>>;
        Ports: Schema.optional<Schema.Array$<Schema.Struct<{
            Name: Schema.optional<typeof Schema.String>;
            Protocol: Schema.optional<Schema.Enums<{
                tcp: string;
                udp: string;
                sctp: string;
            }>>;
            TargetPort: typeof Schema.Number;
            PublishedPort: Schema.optional<typeof Schema.Number>;
            PublishMode: Schema.optional<Schema.Enums<{
                ingress: string;
                host: string;
            }>>;
        }>>>;
    }>>;
    Ports: Schema.optional<Schema.Array$<Schema.Struct<{
        Name: Schema.optional<typeof Schema.String>;
        Protocol: Schema.optional<Schema.Enums<{
            tcp: string;
            udp: string;
            sctp: string;
        }>>;
        TargetPort: typeof Schema.Number;
        PublishedPort: Schema.optional<typeof Schema.Number>;
        PublishMode: Schema.optional<Schema.Enums<{
            ingress: string;
            host: string;
        }>>;
    }>>>;
    VirtualIPs: Schema.optional<Schema.Array$<Schema.Struct<{
        NetworkID: typeof Schema.String;
        Addr: typeof Schema.String;
    }>>>;
}>;
export declare const UpdateStatusSchema: Schema.Struct<{
    State: Schema.optional<Schema.Enums<{
        updating: string;
        paused: string;
        completed: string;
        rollbackStarted: string;
        rollbackPaused: string;
        rollbackCompleted: string;
    }>>;
    StartedAt: Schema.optional<typeof Schema.String>;
    CompletedAt: Schema.optional<typeof Schema.String>;
    Message: Schema.optional<typeof Schema.String>;
}>;
export type DockerService = typeof DockerServiceSchema.Type;
export declare const DockerServiceSchema: Schema.Struct<{
    ID: typeof Schema.String;
    Version: Schema.Struct<{
        Index: typeof Schema.Number;
    }>;
    CreatedAt: typeof Schema.String;
    UpdatedAt: typeof Schema.String;
    Spec: Schema.optional<Schema.Struct<{
        Name: Schema.optional<typeof Schema.String>;
        Labels: Schema.optional<Schema.Record$<typeof Schema.String, typeof Schema.String>>;
        TaskTemplate: Schema.optional<Schema.Struct<{
            ContainerSpec: Schema.optional<Schema.Struct<{
                Image: typeof Schema.String;
                Labels: Schema.optional<Schema.Record$<typeof Schema.String, typeof Schema.String>>;
                Args: Schema.optional<Schema.Array$<typeof Schema.String>>;
                Privileges: Schema.optional<Schema.Struct<{
                    CredentialSpec: Schema.optional<Schema.Union<[typeof Schema.Null, typeof Schema.String]>>;
                    SELinuxContext: Schema.optional<Schema.Union<[typeof Schema.Null, typeof Schema.String]>>;
                    NoNewPrivileges: Schema.optional<typeof Schema.Boolean>;
                }>>;
                Mounts: Schema.optional<Schema.Array$<Schema.Struct<{
                    Type: Schema.optional<typeof Schema.String>;
                    Source: Schema.optional<typeof Schema.String>;
                    Target: Schema.optional<typeof Schema.String>;
                }>>>;
                StopGracePeriod: Schema.optional<typeof Schema.Number>;
                DNSConfig: Schema.optional<typeof Schema.Any>;
                Isolation: Schema.optional<typeof Schema.String>;
            }>>;
            Resources: Schema.optional<Schema.Struct<{
                Limits: Schema.optional<Schema.Struct<{
                    NanoCPUs: Schema.optional<typeof Schema.Number>;
                    MemoryBytes: Schema.optional<typeof Schema.Number>;
                }>>;
                Reservations: Schema.optional<Schema.Struct<{
                    NanoCPUs: Schema.optional<typeof Schema.Number>;
                    MemoryBytes: Schema.optional<typeof Schema.Number>;
                }>>;
            }>>;
            RestartPolicy: Schema.optional<Schema.Struct<{
                Condition: Schema.optional<Schema.Enums<{
                    none: string;
                    onFailure: string;
                    any: string;
                }>>;
                Delay: Schema.optional<typeof Schema.Number>;
                MaxAttempts: Schema.optional<typeof Schema.Number>;
            }>>;
            Placement: Schema.optional<Schema.Struct<{
                Constraints: Schema.optional<Schema.Array$<typeof Schema.String>>;
                Preferences: Schema.optional<Schema.Array$<typeof Schema.Any>>;
                Platforms: Schema.optional<Schema.Array$<typeof Schema.Any>>;
            }>>;
            Networks: Schema.optional<Schema.Array$<Schema.Struct<{
                Target: typeof Schema.String;
                Aliases: Schema.optional<Schema.Array$<typeof Schema.String>>;
            }>>>;
            ForceUpdate: Schema.optional<typeof Schema.Number>;
            Runtime: Schema.optional<typeof Schema.String>;
        }>>;
        Mode: Schema.Union<[Schema.Struct<{
            Global: Schema.Struct<{}>;
        }>, Schema.Struct<{
            Replicated: Schema.Struct<{
                Replicas: Schema.optional<typeof Schema.Number>;
            }>;
        }>]>;
        UpdateConfig: Schema.optional<Schema.Struct<{
            Parallelism: Schema.optional<typeof Schema.Number>;
            FailureAction: Schema.optional<Schema.Enums<{
                pause: string;
                continue: string;
                rollback: string;
            }>>;
            Monitor: Schema.optional<typeof Schema.Number>;
            MaxFailureRatio: Schema.optional<typeof Schema.Number>;
            Order: Schema.optional<Schema.Enums<{
                stopFirst: string;
                startFirst: string;
            }>>;
        }>>;
        RollbackConfig: Schema.optional<Schema.Struct<{
            Parallelism: Schema.optional<typeof Schema.Number>;
            FailureAction: Schema.optional<Schema.Enums<{
                pause: string;
                continue: string;
                rollback: string;
            }>>;
            Monitor: Schema.optional<typeof Schema.Number>;
            MaxFailureRatio: Schema.optional<typeof Schema.Number>;
            Order: Schema.optional<Schema.Enums<{
                stopFirst: string;
                startFirst: string;
            }>>;
        }>>;
        EndpointSpec: Schema.optional<Schema.Struct<{
            Mode: Schema.optional<Schema.Enums<{
                vip: string;
                dnsrr: string;
            }>>;
            Ports: Schema.optional<Schema.Array$<Schema.Struct<{
                Name: Schema.optional<typeof Schema.String>;
                Protocol: Schema.optional<Schema.Enums<{
                    tcp: string;
                    udp: string;
                    sctp: string;
                }>>;
                TargetPort: typeof Schema.Number;
                PublishedPort: Schema.optional<typeof Schema.Number>;
                PublishMode: Schema.optional<Schema.Enums<{
                    ingress: string;
                    host: string;
                }>>;
            }>>>;
        }>>;
    }>>;
    PreviousSpec: Schema.optional<Schema.Struct<{
        Name: Schema.optional<typeof Schema.String>;
        Labels: Schema.optional<Schema.Record$<typeof Schema.String, typeof Schema.String>>;
        TaskTemplate: Schema.optional<Schema.Struct<{
            ContainerSpec: Schema.optional<Schema.Struct<{
                Image: typeof Schema.String;
                Labels: Schema.optional<Schema.Record$<typeof Schema.String, typeof Schema.String>>;
                Args: Schema.optional<Schema.Array$<typeof Schema.String>>;
                Privileges: Schema.optional<Schema.Struct<{
                    CredentialSpec: Schema.optional<Schema.Union<[typeof Schema.Null, typeof Schema.String]>>;
                    SELinuxContext: Schema.optional<Schema.Union<[typeof Schema.Null, typeof Schema.String]>>;
                    NoNewPrivileges: Schema.optional<typeof Schema.Boolean>;
                }>>;
                Mounts: Schema.optional<Schema.Array$<Schema.Struct<{
                    Type: Schema.optional<typeof Schema.String>;
                    Source: Schema.optional<typeof Schema.String>;
                    Target: Schema.optional<typeof Schema.String>;
                }>>>;
                StopGracePeriod: Schema.optional<typeof Schema.Number>;
                DNSConfig: Schema.optional<typeof Schema.Any>;
                Isolation: Schema.optional<typeof Schema.String>;
            }>>;
            Resources: Schema.optional<Schema.Struct<{
                Limits: Schema.optional<Schema.Struct<{
                    NanoCPUs: Schema.optional<typeof Schema.Number>;
                    MemoryBytes: Schema.optional<typeof Schema.Number>;
                }>>;
                Reservations: Schema.optional<Schema.Struct<{
                    NanoCPUs: Schema.optional<typeof Schema.Number>;
                    MemoryBytes: Schema.optional<typeof Schema.Number>;
                }>>;
            }>>;
            RestartPolicy: Schema.optional<Schema.Struct<{
                Condition: Schema.optional<Schema.Enums<{
                    none: string;
                    onFailure: string;
                    any: string;
                }>>;
                Delay: Schema.optional<typeof Schema.Number>;
                MaxAttempts: Schema.optional<typeof Schema.Number>;
            }>>;
            Placement: Schema.optional<Schema.Struct<{
                Constraints: Schema.optional<Schema.Array$<typeof Schema.String>>;
                Preferences: Schema.optional<Schema.Array$<typeof Schema.Any>>;
                Platforms: Schema.optional<Schema.Array$<typeof Schema.Any>>;
            }>>;
            Networks: Schema.optional<Schema.Array$<Schema.Struct<{
                Target: typeof Schema.String;
                Aliases: Schema.optional<Schema.Array$<typeof Schema.String>>;
            }>>>;
            ForceUpdate: Schema.optional<typeof Schema.Number>;
            Runtime: Schema.optional<typeof Schema.String>;
        }>>;
        Mode: Schema.Union<[Schema.Struct<{
            Global: Schema.Struct<{}>;
        }>, Schema.Struct<{
            Replicated: Schema.Struct<{
                Replicas: Schema.optional<typeof Schema.Number>;
            }>;
        }>]>;
        UpdateConfig: Schema.optional<Schema.Struct<{
            Parallelism: Schema.optional<typeof Schema.Number>;
            FailureAction: Schema.optional<Schema.Enums<{
                pause: string;
                continue: string;
                rollback: string;
            }>>;
            Monitor: Schema.optional<typeof Schema.Number>;
            MaxFailureRatio: Schema.optional<typeof Schema.Number>;
            Order: Schema.optional<Schema.Enums<{
                stopFirst: string;
                startFirst: string;
            }>>;
        }>>;
        RollbackConfig: Schema.optional<Schema.Struct<{
            Parallelism: Schema.optional<typeof Schema.Number>;
            FailureAction: Schema.optional<Schema.Enums<{
                pause: string;
                continue: string;
                rollback: string;
            }>>;
            Monitor: Schema.optional<typeof Schema.Number>;
            MaxFailureRatio: Schema.optional<typeof Schema.Number>;
            Order: Schema.optional<Schema.Enums<{
                stopFirst: string;
                startFirst: string;
            }>>;
        }>>;
        EndpointSpec: Schema.optional<Schema.Struct<{
            Mode: Schema.optional<Schema.Enums<{
                vip: string;
                dnsrr: string;
            }>>;
            Ports: Schema.optional<Schema.Array$<Schema.Struct<{
                Name: Schema.optional<typeof Schema.String>;
                Protocol: Schema.optional<Schema.Enums<{
                    tcp: string;
                    udp: string;
                    sctp: string;
                }>>;
                TargetPort: typeof Schema.Number;
                PublishedPort: Schema.optional<typeof Schema.Number>;
                PublishMode: Schema.optional<Schema.Enums<{
                    ingress: string;
                    host: string;
                }>>;
            }>>>;
        }>>;
    }>>;
    Endpoint: Schema.optional<Schema.Struct<{
        Spec: Schema.optional<Schema.Struct<{
            Mode: Schema.optional<Schema.Enums<{
                vip: string;
                dnsrr: string;
            }>>;
            Ports: Schema.optional<Schema.Array$<Schema.Struct<{
                Name: Schema.optional<typeof Schema.String>;
                Protocol: Schema.optional<Schema.Enums<{
                    tcp: string;
                    udp: string;
                    sctp: string;
                }>>;
                TargetPort: typeof Schema.Number;
                PublishedPort: Schema.optional<typeof Schema.Number>;
                PublishMode: Schema.optional<Schema.Enums<{
                    ingress: string;
                    host: string;
                }>>;
            }>>>;
        }>>;
        Ports: Schema.optional<Schema.Array$<Schema.Struct<{
            Name: Schema.optional<typeof Schema.String>;
            Protocol: Schema.optional<Schema.Enums<{
                tcp: string;
                udp: string;
                sctp: string;
            }>>;
            TargetPort: typeof Schema.Number;
            PublishedPort: Schema.optional<typeof Schema.Number>;
            PublishMode: Schema.optional<Schema.Enums<{
                ingress: string;
                host: string;
            }>>;
        }>>>;
        VirtualIPs: Schema.optional<Schema.Array$<Schema.Struct<{
            NetworkID: typeof Schema.String;
            Addr: typeof Schema.String;
        }>>>;
    }>>;
    UpdateStatus: Schema.optional<Schema.Struct<{
        State: Schema.optional<Schema.Enums<{
            updating: string;
            paused: string;
            completed: string;
            rollbackStarted: string;
            rollbackPaused: string;
            rollbackCompleted: string;
        }>>;
        StartedAt: Schema.optional<typeof Schema.String>;
        CompletedAt: Schema.optional<typeof Schema.String>;
        Message: Schema.optional<typeof Schema.String>;
    }>>;
}>;
export declare const DockerServiceInspectSchema: Schema.Array$<Schema.Struct<{
    ID: typeof Schema.String;
    Version: Schema.Struct<{
        Index: typeof Schema.Number;
    }>;
    CreatedAt: typeof Schema.String;
    UpdatedAt: typeof Schema.String;
    Spec: Schema.optional<Schema.Struct<{
        Name: Schema.optional<typeof Schema.String>;
        Labels: Schema.optional<Schema.Record$<typeof Schema.String, typeof Schema.String>>;
        TaskTemplate: Schema.optional<Schema.Struct<{
            ContainerSpec: Schema.optional<Schema.Struct<{
                Image: typeof Schema.String;
                Labels: Schema.optional<Schema.Record$<typeof Schema.String, typeof Schema.String>>;
                Args: Schema.optional<Schema.Array$<typeof Schema.String>>;
                Privileges: Schema.optional<Schema.Struct<{
                    CredentialSpec: Schema.optional<Schema.Union<[typeof Schema.Null, typeof Schema.String]>>;
                    SELinuxContext: Schema.optional<Schema.Union<[typeof Schema.Null, typeof Schema.String]>>;
                    NoNewPrivileges: Schema.optional<typeof Schema.Boolean>;
                }>>;
                Mounts: Schema.optional<Schema.Array$<Schema.Struct<{
                    Type: Schema.optional<typeof Schema.String>;
                    Source: Schema.optional<typeof Schema.String>;
                    Target: Schema.optional<typeof Schema.String>;
                }>>>;
                StopGracePeriod: Schema.optional<typeof Schema.Number>;
                DNSConfig: Schema.optional<typeof Schema.Any>;
                Isolation: Schema.optional<typeof Schema.String>;
            }>>;
            Resources: Schema.optional<Schema.Struct<{
                Limits: Schema.optional<Schema.Struct<{
                    NanoCPUs: Schema.optional<typeof Schema.Number>;
                    MemoryBytes: Schema.optional<typeof Schema.Number>;
                }>>;
                Reservations: Schema.optional<Schema.Struct<{
                    NanoCPUs: Schema.optional<typeof Schema.Number>;
                    MemoryBytes: Schema.optional<typeof Schema.Number>;
                }>>;
            }>>;
            RestartPolicy: Schema.optional<Schema.Struct<{
                Condition: Schema.optional<Schema.Enums<{
                    none: string;
                    onFailure: string;
                    any: string;
                }>>;
                Delay: Schema.optional<typeof Schema.Number>;
                MaxAttempts: Schema.optional<typeof Schema.Number>;
            }>>;
            Placement: Schema.optional<Schema.Struct<{
                Constraints: Schema.optional<Schema.Array$<typeof Schema.String>>;
                Preferences: Schema.optional<Schema.Array$<typeof Schema.Any>>;
                Platforms: Schema.optional<Schema.Array$<typeof Schema.Any>>;
            }>>;
            Networks: Schema.optional<Schema.Array$<Schema.Struct<{
                Target: typeof Schema.String;
                Aliases: Schema.optional<Schema.Array$<typeof Schema.String>>;
            }>>>;
            ForceUpdate: Schema.optional<typeof Schema.Number>;
            Runtime: Schema.optional<typeof Schema.String>;
        }>>;
        Mode: Schema.Union<[Schema.Struct<{
            Global: Schema.Struct<{}>;
        }>, Schema.Struct<{
            Replicated: Schema.Struct<{
                Replicas: Schema.optional<typeof Schema.Number>;
            }>;
        }>]>;
        UpdateConfig: Schema.optional<Schema.Struct<{
            Parallelism: Schema.optional<typeof Schema.Number>;
            FailureAction: Schema.optional<Schema.Enums<{
                pause: string;
                continue: string;
                rollback: string;
            }>>;
            Monitor: Schema.optional<typeof Schema.Number>;
            MaxFailureRatio: Schema.optional<typeof Schema.Number>;
            Order: Schema.optional<Schema.Enums<{
                stopFirst: string;
                startFirst: string;
            }>>;
        }>>;
        RollbackConfig: Schema.optional<Schema.Struct<{
            Parallelism: Schema.optional<typeof Schema.Number>;
            FailureAction: Schema.optional<Schema.Enums<{
                pause: string;
                continue: string;
                rollback: string;
            }>>;
            Monitor: Schema.optional<typeof Schema.Number>;
            MaxFailureRatio: Schema.optional<typeof Schema.Number>;
            Order: Schema.optional<Schema.Enums<{
                stopFirst: string;
                startFirst: string;
            }>>;
        }>>;
        EndpointSpec: Schema.optional<Schema.Struct<{
            Mode: Schema.optional<Schema.Enums<{
                vip: string;
                dnsrr: string;
            }>>;
            Ports: Schema.optional<Schema.Array$<Schema.Struct<{
                Name: Schema.optional<typeof Schema.String>;
                Protocol: Schema.optional<Schema.Enums<{
                    tcp: string;
                    udp: string;
                    sctp: string;
                }>>;
                TargetPort: typeof Schema.Number;
                PublishedPort: Schema.optional<typeof Schema.Number>;
                PublishMode: Schema.optional<Schema.Enums<{
                    ingress: string;
                    host: string;
                }>>;
            }>>>;
        }>>;
    }>>;
    PreviousSpec: Schema.optional<Schema.Struct<{
        Name: Schema.optional<typeof Schema.String>;
        Labels: Schema.optional<Schema.Record$<typeof Schema.String, typeof Schema.String>>;
        TaskTemplate: Schema.optional<Schema.Struct<{
            ContainerSpec: Schema.optional<Schema.Struct<{
                Image: typeof Schema.String;
                Labels: Schema.optional<Schema.Record$<typeof Schema.String, typeof Schema.String>>;
                Args: Schema.optional<Schema.Array$<typeof Schema.String>>;
                Privileges: Schema.optional<Schema.Struct<{
                    CredentialSpec: Schema.optional<Schema.Union<[typeof Schema.Null, typeof Schema.String]>>;
                    SELinuxContext: Schema.optional<Schema.Union<[typeof Schema.Null, typeof Schema.String]>>;
                    NoNewPrivileges: Schema.optional<typeof Schema.Boolean>;
                }>>;
                Mounts: Schema.optional<Schema.Array$<Schema.Struct<{
                    Type: Schema.optional<typeof Schema.String>;
                    Source: Schema.optional<typeof Schema.String>;
                    Target: Schema.optional<typeof Schema.String>;
                }>>>;
                StopGracePeriod: Schema.optional<typeof Schema.Number>;
                DNSConfig: Schema.optional<typeof Schema.Any>;
                Isolation: Schema.optional<typeof Schema.String>;
            }>>;
            Resources: Schema.optional<Schema.Struct<{
                Limits: Schema.optional<Schema.Struct<{
                    NanoCPUs: Schema.optional<typeof Schema.Number>;
                    MemoryBytes: Schema.optional<typeof Schema.Number>;
                }>>;
                Reservations: Schema.optional<Schema.Struct<{
                    NanoCPUs: Schema.optional<typeof Schema.Number>;
                    MemoryBytes: Schema.optional<typeof Schema.Number>;
                }>>;
            }>>;
            RestartPolicy: Schema.optional<Schema.Struct<{
                Condition: Schema.optional<Schema.Enums<{
                    none: string;
                    onFailure: string;
                    any: string;
                }>>;
                Delay: Schema.optional<typeof Schema.Number>;
                MaxAttempts: Schema.optional<typeof Schema.Number>;
            }>>;
            Placement: Schema.optional<Schema.Struct<{
                Constraints: Schema.optional<Schema.Array$<typeof Schema.String>>;
                Preferences: Schema.optional<Schema.Array$<typeof Schema.Any>>;
                Platforms: Schema.optional<Schema.Array$<typeof Schema.Any>>;
            }>>;
            Networks: Schema.optional<Schema.Array$<Schema.Struct<{
                Target: typeof Schema.String;
                Aliases: Schema.optional<Schema.Array$<typeof Schema.String>>;
            }>>>;
            ForceUpdate: Schema.optional<typeof Schema.Number>;
            Runtime: Schema.optional<typeof Schema.String>;
        }>>;
        Mode: Schema.Union<[Schema.Struct<{
            Global: Schema.Struct<{}>;
        }>, Schema.Struct<{
            Replicated: Schema.Struct<{
                Replicas: Schema.optional<typeof Schema.Number>;
            }>;
        }>]>;
        UpdateConfig: Schema.optional<Schema.Struct<{
            Parallelism: Schema.optional<typeof Schema.Number>;
            FailureAction: Schema.optional<Schema.Enums<{
                pause: string;
                continue: string;
                rollback: string;
            }>>;
            Monitor: Schema.optional<typeof Schema.Number>;
            MaxFailureRatio: Schema.optional<typeof Schema.Number>;
            Order: Schema.optional<Schema.Enums<{
                stopFirst: string;
                startFirst: string;
            }>>;
        }>>;
        RollbackConfig: Schema.optional<Schema.Struct<{
            Parallelism: Schema.optional<typeof Schema.Number>;
            FailureAction: Schema.optional<Schema.Enums<{
                pause: string;
                continue: string;
                rollback: string;
            }>>;
            Monitor: Schema.optional<typeof Schema.Number>;
            MaxFailureRatio: Schema.optional<typeof Schema.Number>;
            Order: Schema.optional<Schema.Enums<{
                stopFirst: string;
                startFirst: string;
            }>>;
        }>>;
        EndpointSpec: Schema.optional<Schema.Struct<{
            Mode: Schema.optional<Schema.Enums<{
                vip: string;
                dnsrr: string;
            }>>;
            Ports: Schema.optional<Schema.Array$<Schema.Struct<{
                Name: Schema.optional<typeof Schema.String>;
                Protocol: Schema.optional<Schema.Enums<{
                    tcp: string;
                    udp: string;
                    sctp: string;
                }>>;
                TargetPort: typeof Schema.Number;
                PublishedPort: Schema.optional<typeof Schema.Number>;
                PublishMode: Schema.optional<Schema.Enums<{
                    ingress: string;
                    host: string;
                }>>;
            }>>>;
        }>>;
    }>>;
    Endpoint: Schema.optional<Schema.Struct<{
        Spec: Schema.optional<Schema.Struct<{
            Mode: Schema.optional<Schema.Enums<{
                vip: string;
                dnsrr: string;
            }>>;
            Ports: Schema.optional<Schema.Array$<Schema.Struct<{
                Name: Schema.optional<typeof Schema.String>;
                Protocol: Schema.optional<Schema.Enums<{
                    tcp: string;
                    udp: string;
                    sctp: string;
                }>>;
                TargetPort: typeof Schema.Number;
                PublishedPort: Schema.optional<typeof Schema.Number>;
                PublishMode: Schema.optional<Schema.Enums<{
                    ingress: string;
                    host: string;
                }>>;
            }>>>;
        }>>;
        Ports: Schema.optional<Schema.Array$<Schema.Struct<{
            Name: Schema.optional<typeof Schema.String>;
            Protocol: Schema.optional<Schema.Enums<{
                tcp: string;
                udp: string;
                sctp: string;
            }>>;
            TargetPort: typeof Schema.Number;
            PublishedPort: Schema.optional<typeof Schema.Number>;
            PublishMode: Schema.optional<Schema.Enums<{
                ingress: string;
                host: string;
            }>>;
        }>>>;
        VirtualIPs: Schema.optional<Schema.Array$<Schema.Struct<{
            NetworkID: typeof Schema.String;
            Addr: typeof Schema.String;
        }>>>;
    }>>;
    UpdateStatus: Schema.optional<Schema.Struct<{
        State: Schema.optional<Schema.Enums<{
            updating: string;
            paused: string;
            completed: string;
            rollbackStarted: string;
            rollbackPaused: string;
            rollbackCompleted: string;
        }>>;
        StartedAt: Schema.optional<typeof Schema.String>;
        CompletedAt: Schema.optional<typeof Schema.String>;
        Message: Schema.optional<typeof Schema.String>;
    }>>;
}>>;
