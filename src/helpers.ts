import { CurrentState, DesiredState, LabelConfig, Scaling, Usage } from './schemas';
import { DockerService } from './schemas/service.js';
import { Effect } from 'effect';
import { Config } from './config.js';

export function current_state_from_string(state: string): CurrentState {
    switch (state) {
        case 'Running':
            return 'Running'
        case 'Shutdown':
            return 'Shutdown';
        case 'Failed':
            return 'Failed';
        case 'Rejected':
            return 'Failed';
        case 'Complete':
            return 'Failed';
        case 'Orphaned':
            return 'Orphaned';
        case 'Paused':
            return 'Paused';
        case 'Pending':
            return 'Pending';      
        case 'Preparing':
            return 'Preparing';  
        case 'Starting':
            return 'Starting';    
        case 'Removing':
            return 'Removing';    
        case 'Accepted':
            return 'Accepted';    
        case 'New':
            return 'New';              
        case 'Allocated':
            return 'Allocated';  
        case 'Assigned':
            return 'Assigned';    
        case 'Ready':
            return 'Ready';          
        default:
            return 'Unknown';
    }
}

export function desired_state_from_string(state: string): DesiredState {
    switch (state) {
        case 'Running':
            return 'Running';
        case 'Shutdown':
            return 'Shutdown';
        default:
            return 'Unknown';
    }
}

export function parse_error(error: unknown): Error {
    if (error instanceof Error) {
        return error;
    } else if (typeof error === 'string') {
        return new Error(error);
    } else {
        return new Error('Unknown error');
    }
}

export const get_label_config_from_spec = (service_spec: DockerService) => {
    return Effect.gen(function* () {
        const config = yield* Config;
        const labels = service_spec?.Spec?.Labels || {};

        const label_config: LabelConfig = {
            autoscaler_enable: Boolean(labels[config.config.enable_autoscaler_label] || false),
            autoscaler_minimum_cpu: Number(labels[config.config.autoscaler_minimum_cpu_label] || config.config.autoscaler_minimum_cpu_default),
            autoscaler_maximum_cpu: Number(labels[config.config.autoscaler_maximum_cpu_label] || config.config.autoscaler_maximum_cpu_default),
            autoscaler_minimum_mem: Number(labels[config.config.autoscaler_minimum_mem_label] || config.config.autoscaler_minimum_mem_default),
            autoscaler_maximum_mem: Number(labels[config.config.autoscaler_maximum_mem_label] || config.config.autoscaler_maximum_mem_default),
            autoscaler_min_replicas: Number(labels[config.config.autoscaler_min_replicas_label] || config.config.autoscaler_min_replicas_default),
            autoscaler_max_replicas: Number(labels[config.config.autoscaler_max_replicas_label] || config.config.autoscaler_max_replicas_default),
        }
        return label_config;
    })
}

interface Accumulator {
    cpuSum: number;
    memSum: number;
    count: number;
    task_id: string;
    instance: string;
}

export function aggregateUsageByService(usageData: Usage[]): Usage[] {
    // 1. Use reduce to create a Map accumulating sums and counts
    const accumulatorMap = usageData.reduce(
        (acc, usage) => {
            const { service_name, cpu_usage, memory_usage } = usage;
            const current = acc.get(service_name);
            if (current) {
                // Update existing entry
                current.cpuSum += cpu_usage;
                current.memSum += memory_usage;
                current.count += 1;
            } else {
            acc.set(service_name, {
                cpuSum: cpu_usage,
                memSum: memory_usage,
                task_id: usage.task_id,
                instance: usage.instance,
                count: 1,
            });
        }
        return acc; 
        },
        new Map<string, Accumulator>()
    );

    const aggregatedResult: Usage[] = [];
    for (const [service_name, accumulator] of accumulatorMap.entries()) {
        const avgCpu = accumulator.count > 0 ? accumulator.cpuSum / accumulator.count : 0;
        const avgMem = accumulator.count > 0 ? accumulator.memSum / accumulator.count : 0;

        aggregatedResult.push({
            service_name: service_name,
            cpu_usage: avgCpu,
            memory_usage: avgMem,
            task_id: accumulator.task_id,
            instance: accumulator.instance,
        });
    }

    return aggregatedResult;
}

export function calculate_scaling(data: { usage: Usage, service_spec: DockerService}[]) {
    return Effect.gen(function* () {
        yield* Effect.logInfo(`Calculating scaling for ${data.length} services.`);
        const config = yield* Config;
        const divider = 10000000;

        let scale_services: Scaling[] = [];
        for (const d of data) {
            if(d?.service_spec?.Spec?.Mode) {
                const mode = d?.service_spec?.Spec?.Mode;
                if ('Replicated' in mode) {
                    const label_config = yield* get_label_config_from_spec(d.service_spec);
                    if(!label_config.autoscaler_enable) {
                        yield* Effect.logDebug(`Autoscaler is disabled for service ${d.usage.service_name}`);
                        continue;
                    };

                    const current_scaling = mode.Replicated.Replicas;
                    const cpuUsage = d.usage.cpu_usage;
                    const memoryUsage = d.usage.memory_usage/1048576;
                    const cpuLimit = d.service_spec.Spec?.TaskTemplate?.Resources?.Limits?.NanoCPUs ? d.service_spec.Spec?.TaskTemplate?.Resources?.Limits?.NanoCPUs/divider : 0;
                    const memoryLimit = d.service_spec.Spec?.TaskTemplate?.Resources?.Limits?.MemoryBytes ? d.service_spec.Spec?.TaskTemplate?.Resources?.Limits?.MemoryBytes/1048576 : 0;
                    const cpu_percent = Math.round((cpuUsage / cpuLimit) * 100);
                    const memory_percent = Math.round((memoryUsage / (memoryLimit)) * 100);

                    let scale_cpu = 0;
                    let scale_mem = 0;

                    if(cpuLimit !== 0) {
                        yield* Effect.logDebug(`CPU Limit is set for service ${d.usage.service_name}`);

                        if(cpu_percent < label_config.autoscaler_minimum_cpu) {
                            if(current_scaling - 1 < label_config.autoscaler_min_replicas) {
                                yield* Effect.logInfo(`Service ${d.usage.service_name} is already at min scaling`);
                            } else {
                                scale_cpu = current_scaling - 1;
                            }
                        } 
                        if(cpu_percent > label_config.autoscaler_maximum_cpu) {
                            if(label_config.autoscaler_max_replicas === 0) scale_cpu = current_scaling + 1;
                            if(current_scaling + 1 > label_config.autoscaler_max_replicas) {
                                yield* Effect.logInfo(`Service ${d.usage.service_name} is already at max scaling`);
                            } else {
                                scale_cpu = current_scaling + 1;
                            }
                        }
                    }

                    if(memoryLimit !== 0) {
                        yield* Effect.logDebug(`Memory Limit is set for service ${d.usage.service_name}`);
                        if(memory_percent < label_config.autoscaler_minimum_mem) {
                            if(current_scaling - 1 < label_config.autoscaler_min_replicas) {
                                yield* Effect.logInfo(`Service ${d.usage.service_name} is already at min scaling`);
                            } else {
                                scale_mem = current_scaling - 1;
                            }
                        }
                        if(memory_percent > label_config.autoscaler_maximum_mem) {
                            if(label_config.autoscaler_max_replicas === 0) scale_mem = current_scaling + 1;
                            if(current_scaling <= label_config.autoscaler_max_replicas) {
                                yield* Effect.logInfo(`Service ${d.usage.service_name} is already at max scaling`);
                            } else {
                                scale_mem = current_scaling + 1;
                            }
                        }
                    }
                    const scale = Math.max(scale_cpu, scale_mem);
                    if (scale !== 0) {
                        scale_services.push({
                            service_name: d.usage.service_name,
                            from: current_scaling,
                            to: scale,
                        });
                        yield* Effect.logInfo(`Service ${d.usage.service_name} needs scaling from ${current_scaling} to ${scale} replicas.`);
                    } else {
                        yield* Effect.logDebug(`No scaling needed for service ${d.usage.service_name}`);
                    }
                }
            }
        }
        return scale_services;
    })
}