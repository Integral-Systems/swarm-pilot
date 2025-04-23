import { Effect } from "effect";
import { Config } from "./config.js";
import { AppError, ScaleError } from "./error.js";
import { Scaling } from "./schemas/index.js";
export declare const get_services: () => Effect.Effect<readonly {
    id: string;
    name: string;
    mode: "replicated" | "global";
    replicas_running: number;
    replicas_target: number;
    image: string;
    ports?: string | undefined;
}[], AppError, never>;
export declare const get_service_tasks: (serviceIdOrName: string) => Effect.Effect<{
    readonly id: string;
    readonly name: string;
    readonly image: string;
    readonly ports?: string | undefined;
    readonly node: string;
    readonly desired_state: "Running" | "Shutdown" | "Unknown";
    readonly current_state: "Running" | "Shutdown" | "Unknown" | "Failed" | "Rejected" | "Complete" | "Orphaned" | "Paused" | "Pending" | "Preparing" | "Starting" | "Removing" | "Accepted" | "New" | "Allocated" | "Assigned" | "Ready";
    readonly current_state_since: string;
    readonly error?: string | undefined;
}[], AppError, never>;
export declare const get_metrics: (time: number) => Effect.Effect<{
    readonly service_name: string;
    readonly cpu_usage: number;
    readonly memory_usage: number;
    readonly task_id: string;
    readonly instance: string;
}[], AppError | import("effect/ParseResult").ParseError, Config>;
export declare const inspect_service: (serviceNameOrID: string) => Effect.Effect<{
    readonly ID: string;
    readonly Version: {
        readonly Index: number;
    };
    readonly CreatedAt: string;
    readonly UpdatedAt: string;
    readonly Spec?: {
        readonly Name?: string | undefined;
        readonly Labels: {
            readonly [x: string]: string;
        };
        readonly TaskTemplate?: {
            readonly ContainerSpec?: {
                readonly Labels: {
                    readonly [x: string]: string;
                };
                readonly Image: string;
                readonly Args?: readonly string[] | undefined;
                readonly Privileges?: {
                    readonly CredentialSpec?: string | null | undefined;
                    readonly SELinuxContext?: string | null | undefined;
                    readonly NoNewPrivileges?: boolean | undefined;
                } | undefined;
                readonly Mounts?: readonly {
                    readonly Type?: string | undefined;
                    readonly Source?: string | undefined;
                    readonly Target?: string | undefined;
                }[] | undefined;
                readonly StopGracePeriod?: number | undefined;
                readonly DNSConfig?: any;
                readonly Isolation?: string | undefined;
            } | undefined;
            readonly Resources?: {
                readonly Limits?: {
                    readonly NanoCPUs?: number | undefined;
                    readonly MemoryBytes?: number | undefined;
                } | undefined;
                readonly Reservations?: {
                    readonly NanoCPUs?: number | undefined;
                    readonly MemoryBytes?: number | undefined;
                } | undefined;
            } | undefined;
            readonly RestartPolicy?: {
                readonly Condition?: string | undefined;
                readonly Delay?: number | undefined;
                readonly MaxAttempts?: number | undefined;
            } | undefined;
            readonly Placement?: {
                readonly Constraints?: readonly string[] | undefined;
                readonly Preferences?: readonly any[] | undefined;
                readonly Platforms?: readonly any[] | undefined;
            } | undefined;
            readonly Networks?: readonly {
                readonly Target: string;
                readonly Aliases?: readonly string[] | undefined;
            }[] | undefined;
            readonly ForceUpdate?: number | undefined;
            readonly Runtime?: string | undefined;
        } | undefined;
        readonly Networks?: readonly {
            readonly Target: string;
            readonly Aliases?: readonly string[] | undefined;
        }[] | undefined;
        readonly Mode: {
            readonly Global: {};
        } | {
            readonly Replicated: {
                readonly Replicas: number;
            };
        };
        readonly UpdateConfig?: {
            readonly Parallelism?: number | undefined;
            readonly FailureAction?: string | undefined;
            readonly Monitor?: number | undefined;
            readonly MaxFailureRatio?: number | undefined;
            readonly Order?: string | undefined;
        } | undefined;
        readonly RollbackConfig?: {
            readonly Parallelism?: number | undefined;
            readonly FailureAction?: string | undefined;
            readonly Monitor?: number | undefined;
            readonly MaxFailureRatio?: number | undefined;
            readonly Order?: string | undefined;
        } | undefined;
        readonly EndpointSpec?: {
            readonly Mode?: string | undefined;
            readonly Ports?: readonly {
                readonly Name?: string | undefined;
                readonly Protocol?: string | undefined;
                readonly TargetPort: number;
                readonly PublishedPort?: number | undefined;
                readonly PublishMode?: string | undefined;
            }[] | undefined;
        } | undefined;
    } | undefined;
    readonly PreviousSpec?: {
        readonly Name?: string | undefined;
        readonly Labels: {
            readonly [x: string]: string;
        };
        readonly TaskTemplate?: {
            readonly ContainerSpec?: {
                readonly Labels: {
                    readonly [x: string]: string;
                };
                readonly Image: string;
                readonly Args?: readonly string[] | undefined;
                readonly Privileges?: {
                    readonly CredentialSpec?: string | null | undefined;
                    readonly SELinuxContext?: string | null | undefined;
                    readonly NoNewPrivileges?: boolean | undefined;
                } | undefined;
                readonly Mounts?: readonly {
                    readonly Type?: string | undefined;
                    readonly Source?: string | undefined;
                    readonly Target?: string | undefined;
                }[] | undefined;
                readonly StopGracePeriod?: number | undefined;
                readonly DNSConfig?: any;
                readonly Isolation?: string | undefined;
            } | undefined;
            readonly Resources?: {
                readonly Limits?: {
                    readonly NanoCPUs?: number | undefined;
                    readonly MemoryBytes?: number | undefined;
                } | undefined;
                readonly Reservations?: {
                    readonly NanoCPUs?: number | undefined;
                    readonly MemoryBytes?: number | undefined;
                } | undefined;
            } | undefined;
            readonly RestartPolicy?: {
                readonly Condition?: string | undefined;
                readonly Delay?: number | undefined;
                readonly MaxAttempts?: number | undefined;
            } | undefined;
            readonly Placement?: {
                readonly Constraints?: readonly string[] | undefined;
                readonly Preferences?: readonly any[] | undefined;
                readonly Platforms?: readonly any[] | undefined;
            } | undefined;
            readonly Networks?: readonly {
                readonly Target: string;
                readonly Aliases?: readonly string[] | undefined;
            }[] | undefined;
            readonly ForceUpdate?: number | undefined;
            readonly Runtime?: string | undefined;
        } | undefined;
        readonly Networks?: readonly {
            readonly Target: string;
            readonly Aliases?: readonly string[] | undefined;
        }[] | undefined;
        readonly Mode: {
            readonly Global: {};
        } | {
            readonly Replicated: {
                readonly Replicas: number;
            };
        };
        readonly UpdateConfig?: {
            readonly Parallelism?: number | undefined;
            readonly FailureAction?: string | undefined;
            readonly Monitor?: number | undefined;
            readonly MaxFailureRatio?: number | undefined;
            readonly Order?: string | undefined;
        } | undefined;
        readonly RollbackConfig?: {
            readonly Parallelism?: number | undefined;
            readonly FailureAction?: string | undefined;
            readonly Monitor?: number | undefined;
            readonly MaxFailureRatio?: number | undefined;
            readonly Order?: string | undefined;
        } | undefined;
        readonly EndpointSpec?: {
            readonly Mode?: string | undefined;
            readonly Ports?: readonly {
                readonly Name?: string | undefined;
                readonly Protocol?: string | undefined;
                readonly TargetPort: number;
                readonly PublishedPort?: number | undefined;
                readonly PublishMode?: string | undefined;
            }[] | undefined;
        } | undefined;
    } | undefined;
    readonly Endpoint?: {
        readonly Spec?: {
            readonly Mode?: string | undefined;
            readonly Ports?: readonly {
                readonly Name?: string | undefined;
                readonly Protocol?: string | undefined;
                readonly TargetPort: number;
                readonly PublishedPort?: number | undefined;
                readonly PublishMode?: string | undefined;
            }[] | undefined;
        } | undefined;
        readonly Ports?: readonly {
            readonly Name?: string | undefined;
            readonly Protocol?: string | undefined;
            readonly TargetPort: number;
            readonly PublishedPort?: number | undefined;
            readonly PublishMode?: string | undefined;
        }[] | undefined;
        readonly VirtualIPs?: readonly {
            readonly NetworkID: string;
            readonly Addr: string;
        }[] | undefined;
    } | undefined;
    readonly UpdateStatus?: {
        readonly State?: string | undefined;
        readonly StartedAt?: string | undefined;
        readonly CompletedAt?: string | undefined;
        readonly Message?: string | undefined;
    } | undefined;
}, AppError | import("effect/ParseResult").ParseError, never>;
export declare const get_nodes: () => Effect.Effect<{
    readonly id: string;
    readonly status: "ready" | "down" | "unknown" | "disconnected";
    readonly is_self: boolean;
    readonly hostname: string;
    readonly availability: "pause" | "active" | "drain";
    readonly manager_status: "leader" | "reachable" | "unavailable" | "worker";
    readonly engine_version: string;
}[], AppError | import("effect/ParseResult").ParseError, never>;
export declare const inspect_node: (nodeNameOrID: string) => Effect.Effect<{
    readonly ID: string;
    readonly Version: {
        readonly Index: number;
    };
    readonly CreatedAt: string;
    readonly UpdatedAt: string;
    readonly Spec?: {
        readonly Labels: {
            readonly [x: string]: string;
        };
        readonly Role?: string | undefined;
        readonly Availability?: string | undefined;
    } | undefined;
    readonly Description?: {
        readonly Resources?: {
            readonly NanoCPUs?: number | undefined;
            readonly MemoryBytes?: number | undefined;
        } | undefined;
        readonly Hostname?: string | undefined;
        readonly Platform?: {
            readonly Architecture?: string | undefined;
            readonly OS?: string | undefined;
        } | undefined;
        readonly Engine?: {
            readonly Labels?: {
                readonly [x: string]: string;
            } | undefined;
            readonly EngineVersion?: string | undefined;
            readonly Plugins: readonly {
                readonly Type?: string | undefined;
                readonly Name?: string | undefined;
            }[];
        } | undefined;
        readonly TLSInfo?: {
            readonly TrustRoot?: string | undefined;
            readonly CertIssuerSubject?: string | undefined;
            readonly CertIssuerPublicKey?: string | undefined;
        } | undefined;
        readonly CSIInfo: readonly {
            readonly PluginName?: string | undefined;
            readonly NodeID?: string | undefined;
        }[];
    } | undefined;
    readonly Status?: {
        readonly Addr?: string | undefined;
        readonly State?: string | undefined;
        readonly Message?: string | undefined;
    } | undefined;
    readonly ManagerStatus?: {
        readonly Addr?: string | undefined;
        readonly Leader?: boolean | undefined;
        readonly Reachability?: string | undefined;
    } | undefined;
}, AppError | import("effect/ParseResult").ParseError, never>;
export declare const scale_service: (scaling: Scaling) => Effect.Effect<void, ScaleError | null, Config>;
export declare const rebalance_cluster: () => Effect.Effect<void, AppError, never>;
