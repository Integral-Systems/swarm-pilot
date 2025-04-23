![Swarm Manager Logo](swarm-manager.webp)

# Swarm Pilot

Swarm Pilot is a Docker Swarm cluster management tool designed to simplify and automate the scaling of services based on resource usage. It monitors CPU and memory usage across your services and dynamically adjusts the number of replicas to ensure optimal performance and resource utilization.

## **Features**
- **Autoscaling**: Automatically scales services up or down based on CPU and memory usage.
- **Service-Level Configuration**: Customize scaling behavior using service-specific labels.
- **Lightweight and Efficient**: Runs as a Docker container within your Swarm cluster.

## Getting Started

### Prerequisites
- A running Docker Swarm cluster.
- Docker version 20.10 or later.
- Prometheus with cadvisor needed for service metrics.
### Example Deployment

Below is an example deployment configuration for Swarm Pilot using a `docker-compose.yml` file:

```yaml
version: '3.8'

services:
    swarm-manager:
        image: registry.integral-systems.ch/integral-systems/swarm-pilot:${SERVICE_TAG:-latest}
        volumes:
            - /var/run/docker.sock:/var/run/docker.sock:ro
        environment:
            - DEBUG=false
            - PROM_HOST=prometheus.int.integral-systems.ch
            - PROM_USER=${PROM_USER}
            - PROM_PASS=${PROM_PASS}
            - PROM_PORT=443
            - PROM_SCHEMA=https
            - TELEGRAM_BOT_TOKEN=${TELEGRAM_BOT_TOKEN}
            - TELEGRAM_CHAT_ID=${TELEGRAM_CHAT_ID}
            - BATCH_SIZE=5
            - AUTOSCALER_INTERVAL=${AUTOSCALER_INTERVAL:-5}
            - ENABLE_AUTOSCALER_LABEL=swarm.autoscaler
            - AUTOSCALER_MINIMUM_CPU_LABEL=swarm.autoscaler.minimum_cpu
            - AUTOSCALER_CPU_MINIMUM_DEFAULT=${AUTOSCALER_CPU_MINIMUM:-25}
            - AUTOSCALER_MAXIMUM_CPU_LABEL=swarm.autoscaler.maximum_cpu
            - AUTOSCALER_MAXIMUM_CPU_DEFAULT=${AUTOSCALER_CPU_MAXIMUM:-85}
            - AUTOSCALER_MINIMUM_MEM_LABEL=swarm.autoscaler.minimum_mem
            - AUTOSCALER_MEM_MINIMUM_DEFAULT=${AUTOSCALER_MEM_MINIMUM:-25}
            - AUTOSCALER_MAXIMUM_MEM_LABEL=swarm.autoscaler.maximum_mem
            - AUTOSCALER_MAXIMUM_MEM_DEFAULT=${AUTOSCALER_MEM_MAXIMUM:-85}
            - AUTOSCALER_MIN_REPLICAS_LABEL=swarm.autoscaler.min_replicas
            - AUTOSCALER_MIN_REPLICAS_DEFAULT=1
            - AUTOSCALER_MAX_REPLICAS_LABEL=swarm.autoscaler.max_replicas
            - AUTOSCALER_MAX_REPLICAS_DEFAULT=10
        networks:
            - default
        deploy:
            mode: replicated
            replicas: 1
            placement:
                constraints:
                    - node.role == manager
            resources:
                limits:
                    cpus: '0.10'
                    memory: 128M
                reservations:
                    cpus: '0.10'
                    memory: 64M
```

To deploy this configuration, save it to a file named `docker-compose.yml` and run:

```bash
docker stack deploy -c docker-compose.yml swarm-manager
```
### Planned Features
    - **Node Rebalancing**: Automatically redistribute services across nodes to ensure even resource utilization and reduce bottlenecks.
    - **Node Scaling/Provisioning/Decommissioning (Hetzner)**: Dynamically add or remove nodes in the cluster based on workload demands, leveraging Hetzner's infrastructure.

