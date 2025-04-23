import { Effect } from 'effect';
import { Config } from './config.js';
export function current_state_from_string(state) {
    switch (state) {
        case 'Running':
            return 'Running';
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
export function desired_state_from_string(state) {
    switch (state) {
        case 'Running':
            return 'Running';
        case 'Shutdown':
            return 'Shutdown';
        default:
            return 'Unknown';
    }
}
export function parse_error(error) {
    if (error instanceof Error) {
        return error;
    }
    else if (typeof error === 'string') {
        return new Error(error);
    }
    else {
        return new Error('Unknown error');
    }
}
export const get_label_config_from_spec = (service_spec) => {
    return Effect.gen(function* () {
        const config = yield* Config;
        const labels = service_spec?.Spec?.Labels || {};
        const label_config = {
            autoscaler_enable: Boolean(labels[config.config.enable_autoscaler_label] || false),
            autoscaler_minimum_cpu: Number(labels[config.config.autoscaler_minimum_cpu_label] || config.config.autoscaler_minimum_cpu_default),
            autoscaler_maximum_cpu: Number(labels[config.config.autoscaler_maximum_cpu_label] || config.config.autoscaler_maximum_cpu_default),
            autoscaler_minimum_mem: Number(labels[config.config.autoscaler_minimum_mem_label] || config.config.autoscaler_minimum_mem_default),
            autoscaler_maximum_mem: Number(labels[config.config.autoscaler_maximum_mem_label] || config.config.autoscaler_maximum_mem_default),
            autoscaler_min_replicas: Number(labels[config.config.autoscaler_min_replicas_label] || config.config.autoscaler_min_replicas_default),
            autoscaler_max_replicas: Number(labels[config.config.autoscaler_max_replicas_label] || config.config.autoscaler_max_replicas_default),
        };
        return label_config;
    });
};
export function calculate_scaling(data) {
    return Effect.gen(function* () {
        yield* Effect.logInfo(`Calculating scaling for ${data.length} services.`);
        const divider = 10000000;
        const lower_cpu_limit = 25;
        const upper_cpu_limit = 75;
        const lower_mem_limit = 25;
        const upper_mem_limit = 75;
        let scale_services = [];
        for (const d of data) {
            if (d?.service_spec?.Spec?.Mode) {
                const mode = d?.service_spec?.Spec?.Mode;
                if ('Replicated' in mode) {
                    const label_config = yield* get_label_config_from_spec(d.service_spec);
                    if (!label_config.autoscaler_enable) {
                        yield* Effect.logInfo(`Autoscaler is disabled for service ${d.usage.service_name}`);
                        continue;
                    }
                    ;
                    const current_scaling = mode.Replicated.Replicas ?? 0;
                    const cpuUsage = d.usage.cpu_usage;
                    const memoryUsage = d.usage.memory_usage / 1048576;
                    const cpuLimit = d.service_spec.Spec?.TaskTemplate?.Resources?.Limits?.NanoCPUs ? d.service_spec.Spec?.TaskTemplate?.Resources?.Limits?.NanoCPUs / divider : 0;
                    const memoryLimit = d.service_spec.Spec?.TaskTemplate?.Resources?.Limits?.MemoryBytes ? d.service_spec.Spec?.TaskTemplate?.Resources?.Limits?.MemoryBytes / 1048576 : 0;
                    const cpu_percent = Math.round((cpuUsage / cpuLimit) * 100);
                    const memory_percent = Math.round((memoryUsage / (memoryLimit)) * 100);
                    yield* Effect.logDebug(`Current scaling: ${d.usage.service_name} => ${current_scaling} - Memory Usage: ${memoryUsage}/${memoryLimit} (${memory_percent})`);
                    // if (cpuUsage > desiredCpu) {
                    //     return 'down';
                    // } else if (cpuUsage < desiredCpu) {
                    //     return 'up';
                    // }
                }
            }
        }
    });
}
