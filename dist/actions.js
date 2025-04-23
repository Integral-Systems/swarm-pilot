import { Effect, pipe } from "effect";
import { get_metrics, get_services, inspect_service, scale_service } from "./commands.js";
import { aggregateUsageByService, calculate_scaling } from "./helpers.js";
import { Config } from "./config.js";
export const check_usage_and_scale = pipe(get_services(), Effect.flatMap((services) => {
    return Effect.gen(function* () {
        const config = yield* Config;
        yield* Effect.logInfo(`Got ${services.length} services.`);
        const usages = aggregateUsageByService(yield* get_metrics(config.config.autoscaler_interval));
        const services_usage = yield* Effect.all(services.map((service) => {
            return Effect.gen(function* () {
                const service_spec = yield* inspect_service(service.id);
                const usage = usages.find((usage) => usage.service_name === service.name) ?? { service_name: service.name, cpu_usage: 0, memory_usage: 0, task_id: '', instance: '' };
                return { service_spec, usage };
            });
        }), {
            concurrency: config.config.batch_size,
        });
        return services_usage;
    });
}), Effect.flatMap((services_usage) => {
    return calculate_scaling(services_usage);
}), Effect.flatMap((scaling) => {
    return Effect.gen(function* () {
        const config = yield* Config;
        if (scaling.length === 0)
            yield* Effect.logInfo("No scaling needed.");
        yield* Effect.all(scaling.map((scale) => {
            return scale_service(scale);
        }), {
            concurrency: config.config.batch_size,
        });
    });
}));
