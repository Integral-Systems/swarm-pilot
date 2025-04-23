import { Effect, Schema } from "effect";
import { Config } from "./config.js";
import { exec as execCallback } from "child_process";
import { AppError, ScaleError } from "./error.js";
import { prometheus_response_schema, docker_node_list_schema } from "./schemas/index.js";
import { current_state_from_string, desired_state_from_string, parse_error } from "./helpers.js";
import axios from "axios";
import { docker_serviceSchema } from "./schemas/service.js";
import { promisify } from 'util';
import { docker_node_schema } from "./schemas/node.js";
import { default_docker_retry } from "./policy.js";
import { notify } from "./notify.js";
const exec = promisify(execCallback);
export const get_services = () => Effect.gen(function* () {
    const format = "{{.ID}}\\t{{.Name}}\\t{{.Mode}}\\t{{.Replicas}}\\t{{.Image}}\\t{{.Ports}}";
    const command = `docker service ls --format "${format}"`;
    const res = yield* Effect.retry(Effect.tryPromise({
        try: () => exec(command, { encoding: 'utf8' }),
        catch: (error) => new AppError({ cause: parse_error(error), message: "Error getting services" })
    }), default_docker_retry);
    if (res.stderr) {
        yield* Effect.logError(`Command "${command}" produced stderr: ${res.stderr}`);
    }
    const services = res.stdout
        .trim()
        .split('\n') // Split into lines
        .filter(line => {
        if (!line)
            return false;
        const partCount = line.split('\t').length;
        if (partCount !== 6) {
            Effect.logWarning(`Skipping malformed line (expected 6 parts, got ${partCount}): ${line}`);
            return false;
        }
        return true;
    })
        .map(line => {
        const parts = line.split('\t');
        const replicas = parts[3].split('/'); // Split replicas by '/'
        return {
            id: parts[0] || '',
            name: parts[1] || '',
            mode: parts[2] === 'replicated' ? 'replicated' : 'global',
            replicas_running: parseInt(replicas[0]) || 0,
            replicas_target: parseInt(replicas[1]) || 0,
            image: parts[4] || '',
            ports: parts[5] || '',
        };
    });
    yield* Effect.forEach(services, (s, index) => Effect.logDebug(`Service ${index}: ${s.id} - ${s.name} - ${s.mode} - ${s.replicas_running} - ${s.replicas_target} - ${s.image} - ${s.ports}`));
    return services;
});
export const get_service_tasks = (serviceIdOrName) => Effect.gen(function* () {
    const format = "{{.ID}}\\t{{.Name}}\\t{{.Image}}\\t{{.Node}}\\t{{.DesiredState}}\\t{{.CurrentState}}\\t{{.Error}}";
    const command = `docker service ps --format "${format}" --no-trunc "${serviceIdOrName}"`;
    // Execute the command
    const res = yield* Effect.tryPromise({
        try: () => exec(command, { encoding: 'utf8' }),
        catch: (error) => new AppError({ cause: parse_error(error), message: `Failed to execute docker ps for service "${serviceIdOrName}"` }),
    });
    if (res.stderr) {
        yield* Effect.logError(`Command "${command}" produced stderr: ${res.stderr}`);
    }
    // Process the output
    const lines = res.stdout.trim().split('\n');
    const tasks = [];
    for (const [index, line] of lines.entries()) {
        if (!line) {
            yield* Effect.logDebug(`Skipping empty line ${index + 1} for service ${serviceIdOrName}.`);
            continue;
        }
        const parts = line.split('\t');
        const current_state = parts[5].split(' ', 1);
        const current_state_since = current_state.length > 1 ? parts[5].substring(current_state[0].length + 1) : ""; // Need substring because split limit doesn't give the rest automatically in JS like Python
        const taskData = {
            id: parts[0] || '',
            name: parts[1] || '',
            image: parts[2] || '',
            node: parts[3] || '',
            desired_state: desired_state_from_string(parts[4]),
            current_state: current_state_from_string(current_state[0]),
            current_state_since: current_state_since || '',
            error: parts[6],
        };
        tasks.push(taskData);
    }
    // Optional: Detailed logging for each parsed task
    yield* Effect.forEach(tasks, (t, index) => Effect.logDebug(`Parsed Task ${index}: ${t.id} - ${t.name} on ${t.node} - Desired State: ${t.desired_state} - State: ${t.current_state} since: ${t.current_state_since} - ${t.error ? `(Error: ${t.error})` : ''}`)); // Added concurrency option as example
    return tasks;
});
export const get_metrics = (time) => {
    return Effect.gen(function* () {
        const config = yield* Config;
        const { prom_host, prom_user, prom_pass, prom_schema, prom_path } = config.config;
        const cpu_query = `sum(rate(container_cpu_usage_seconds_total{container_label_com_docker_swarm_task_name=~'.+'}[${time}s]))BY(container_label_com_docker_swarm_service_name,id,container_label_com_docker_swarm_task_id,instance)*100`;
        const memory_query = `sum(avg_over_time(container_memory_working_set_bytes{container_label_com_docker_swarm_task_name=~'.+'}[${time}s])) BY (container_label_com_docker_swarm_service_name,id,container_label_com_docker_swarm_task_id,instance)`;
        const client = axios.create({
            baseURL: `${prom_schema}://${prom_host}`,
            headers: {
                'Content-Type': 'application/json',
            },
            auth: {
                username: prom_user,
                password: prom_pass,
            },
        });
        const cpu_response = yield* Effect.tryPromise({
            try: () => client.get(`/api/v1/query?query=${encodeURIComponent(cpu_query)}`),
            catch: (error) => new AppError({ cause: parse_error(error), message: "Error getting CPU metrics" })
        });
        const memory_response = yield* Effect.tryPromise({
            try: () => client.get(`/api/v1/query?query=${encodeURIComponent(memory_query)}`),
            catch: (error) => new AppError({ cause: parse_error(error), message: "Error getting Memory metrics" })
        });
        const cpu_usage = yield* Schema.decodeUnknown(prometheus_response_schema)(cpu_response.data);
        const memory_usage = yield* Schema.decodeUnknown(prometheus_response_schema)(memory_response.data);
        yield* Effect.logDebug(`CPU Response: ${JSON.stringify(cpu_usage, null, 2)}`);
        yield* Effect.logDebug(`Memory Response: ${JSON.stringify(memory_usage, null, 2)}`);
        const usages = cpu_usage.data.result.map((cpu_m) => {
            const service = cpu_m.metric.container_label_com_docker_swarm_service_name;
            const cu = cpu_m.value[1];
            const mu = memory_usage.data.result.find((mem_m) => {
                return mem_m.metric.container_label_com_docker_swarm_service_name === service;
            })?.value[1] || 0;
            const usage = {
                service_name: service,
                cpu_usage: Number(cu),
                memory_usage: Number(mu),
                task_id: cpu_m.metric.container_label_com_docker_swarm_task_id,
                instance: cpu_m.metric.instance,
            };
            return usage;
        });
        yield* Effect.logInfo(`Successfully parsed ${usages.length} metrics.`);
        yield* Effect.forEach(usages, (u, index) => Effect.logDebug(`Metric ${index}: ${u.service_name} - CPU Usage: ${u.cpu_usage} - Memory Usage: ${u.memory_usage}`));
        if (usages.length === 0)
            return yield* Effect.fail(new AppError({ message: "No metrics found", cause: new Error("The usage array is empty!") }));
        return usages;
    });
};
export const inspect_service = (serviceNameOrID) => {
    return Effect.gen(function* () {
        const format = "{{json .}}";
        const command = `docker service inspect --format "${format}" "${serviceNameOrID}"`;
        const res = yield* Effect.retry(Effect.tryPromise({
            try: () => exec(command, { encoding: 'utf8' }),
            catch: (error) => new AppError({ cause: parse_error(error), message: `Failed to execute docker inspect for service "${serviceNameOrID}"` })
        }), default_docker_retry);
        if (res.stderr) {
            yield* Effect.logError(`Command "${command}" produced stderr: ${res.stderr}`);
        }
        const info = yield* Schema.decodeUnknown(docker_serviceSchema)(JSON.parse(res.stdout));
        yield* Effect.logDebug(`Service ${serviceNameOrID} details: ${JSON.stringify(info.Spec?.TaskTemplate?.Resources, null, 2)}`);
        return info;
    });
};
export const get_nodes = () => Effect.gen(function* () {
    yield* Effect.logInfo("Fetching list of Docker Swarm nodes.");
    // Define the format string for docker node ls
    // Using tab separation. Includes {{.Self}} to check if it's the current node.
    const format = "{{.Self}}\\t{{.ID}}\\t{{.Hostname}}\\t{{.Status}}\\t{{.Availability}}\\t{{.ManagerStatus}}\\t{{.EngineVersion}}";
    const numberOfFields = 7; // Number of fields in the format string
    const command = `docker node ls --format "${format}"`;
    // Execute the command asynchronously
    const res = yield* Effect.tryPromise({
        try: () => exec(command, { encoding: 'utf8' }),
        catch: (error) => new AppError({ cause: parse_error(error), message: "Failed to execute docker node ls" })
    });
    if (res.stderr) {
        yield* Effect.logError(`Command "${command}" produced stderr: ${res.stderr}`);
    }
    // Process the output
    const lines = res.stdout.trim().split('\n');
    const nodes = [];
    yield* Effect.logDebug(`Raw output lines from docker node ls: ${lines.length}`);
    for (const [index, line] of lines.entries()) {
        // Skip empty lines
        if (!line) {
            yield* Effect.logDebug(`Skipping empty line ${index + 1}.`);
            continue;
        }
        const parts = line.split('\t');
        if (parts.length !== numberOfFields) {
            yield* Effect.logWarning(`Skipping malformed line ${index + 1} (expected ${numberOfFields} parts, got ${parts.length}): "${line}"`);
            continue; // Skip this line
        }
        // --- Data Mapping and Transformation ---
        const rawIsSelf = parts[0]; // "true" or "false"
        const rawId = parts[1];
        const rawHostname = parts[2];
        const rawStatus = parts[3]; // e.g., "Ready"
        const rawAvailability = parts[4]; // e.g., "Active"
        const rawManagerStatus = parts[5]; // e.g., "Leader", "Reachable", "" (empty for worker)
        const rawEngineVersion = parts[6];
        // Map raw manager status to enum value
        let mappedManagerStatus;
        switch (rawManagerStatus) {
            case 'Leader':
                mappedManagerStatus = 'leader';
                break;
            case 'Reachable':
                mappedManagerStatus = 'reachable';
                break;
            case 'Unreachable':
                mappedManagerStatus = 'unavailable';
                break;
            case '':
                mappedManagerStatus = 'worker';
                break;
            default:
                // Log unexpected status but treat as worker for safety
                yield* Effect.logWarning(`Unexpected Manager Status encountered: "${rawManagerStatus}" in line: "${line}". Treating as 'worker'.`);
                mappedManagerStatus = 'worker';
                break;
        }
        // Prepare raw data object for schema decoding
        const rawNodeData = {
            is_self: rawIsSelf === 'true', // Convert string "true" to boolean
            id: rawId,
            hostname: rawHostname,
            status: rawStatus.toLowerCase(), // Convert to lower case to match enum
            availability: rawAvailability.toLowerCase(), // Convert to lower case to match enum
            manager_status: mappedManagerStatus, // Use the mapped enum value
            engine_version: rawEngineVersion,
        };
        // Decode (and validate) the raw data using the schema
        nodes.push(yield* Schema.decodeUnknown(docker_node_list_schema)(rawNodeData));
    }
    yield* Effect.logInfo(`Successfully parsed and validated ${nodes.length} nodes.`);
    // Optional: Detailed logging for each parsed node
    yield* Effect.forEach(nodes, (n, index) => Effect.logDebug(`Node ${index}: ${n.id} - ${n.hostname} (${n.status}) - Manager: ${n.manager_status} ${n.is_self ? '(Self)' : ''}`), { concurrency: "inherit" });
    return nodes;
});
export const inspect_node = (nodeNameOrID) => {
    return Effect.gen(function* () {
        const format = "{{json .}}";
        const command = `docker node inspect --format "${format}" "${nodeNameOrID}"`;
        const stdout = yield* Effect.tryPromise({
            try: () => exec(command, { encoding: 'utf8' }),
            catch: (error) => new AppError({ cause: parse_error(error), message: `Failed to execute docker inspect for node "${nodeNameOrID}"` })
        });
        const info = yield* Schema.decodeUnknown(docker_node_schema)(JSON.parse(stdout.stdout));
        yield* Effect.logInfo(`Successfully parsed node ${nodeNameOrID} details.`);
        yield* Effect.logDebug(`Node ${nodeNameOrID} details: ${JSON.stringify(info, null, 2)}`);
        return info;
    });
};
export const scale_service = (scaling) => {
    return Effect.gen(function* () {
        const scale_type = scaling.from > scaling.to ? 'down' : 'up';
        yield* Effect.logInfo(`Scaling service ${scaling.service_name} from ${scaling.from} to ${scaling.to} replicas.`);
        const command = `docker service scale ${scaling.service_name}=${scaling.to}`;
        const res = yield* Effect.retry(Effect.tryPromise({
            try: () => exec(command, { encoding: 'utf8' }),
            catch: (error) => new ScaleError({ cause: parse_error(error), message: `❌ Failed to scale service "${scaling.service_name}"` })
        }), default_docker_retry);
        Effect.logError('Command error: ', res.stderr);
        yield* notify(`✅ Successfully scaled service ${scaling.service_name} from ${scaling.from} to ${scaling.to} replicas.`);
        yield* Effect.logInfo(`Successfully scaled service ${scaling.service_name} from ${scaling.from} to ${scaling.to} replicas.`);
    });
};
export const rebalance_cluster = () => {
    return Effect.gen(function* () {
        const command = `docker node update --availability drain $(docker node ls -q) && docker node update --availability active $(docker node ls -q)`;
        const res = yield* Effect.tryPromise({
            try: () => exec(command, { encoding: 'utf8' }),
            catch: (error) => new AppError({ cause: parse_error(error), message: "Failed to rebalance cluster" })
        });
        Effect.logError('Command error: ', res.stderr);
        yield* Effect.logInfo(`Successfully rebalanced cluster.`);
    });
};
