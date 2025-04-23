import { CurrentState, DesiredState, Usage } from './schemas';
import { DockerService } from './schemas/service.js';
import { Effect } from 'effect';
import { Config } from './config.js';
export declare function current_state_from_string(state: string): CurrentState;
export declare function desired_state_from_string(state: string): DesiredState;
export declare function parse_error(error: unknown): Error;
export declare const get_label_config_from_spec: (service_spec: DockerService) => Effect.Effect<{
    readonly autoscaler_enable: boolean;
    readonly autoscaler_minimum_cpu: number;
    readonly autoscaler_maximum_cpu: number;
    readonly autoscaler_minimum_mem: number;
    readonly autoscaler_maximum_mem: number;
    readonly autoscaler_min_replicas: number;
    readonly autoscaler_max_replicas: number;
}, never, Config>;
export declare function calculate_scaling(data: {
    usage: Usage;
    service_spec: DockerService;
}[]): Effect.Effect<void, never, Config>;
