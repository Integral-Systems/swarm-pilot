![Swarm Manager Logo](swarm-manager.webp)

# Swarm Manager

Swarm Manager is a Docker Swarm cluster management tool designed to simplify and automate the scaling of services based on resource usage. It monitors CPU and memory usage across your services and dynamically adjusts the number of replicas to ensure optimal performance and resource utilization.

## **Features**
- **Autoscaling**: Automatically scales services up or down based on CPU and memory usage.
- **Service-Level Configuration**: Customize scaling behavior using service-specific labels.
- **Lightweight and Efficient**: Runs as a Docker container within your Swarm cluster.

## Getting Started

### Prerequisites
- A running Docker Swarm cluster.
- Docker version 20.10 or later.

### Installation
To deploy Swarm Manager, use the following command:

```bash
docker run -d \
    --name swarm-manager \
        --env DEBUG=false \
                    --env PROM_HOST=prometheus.int.integral-systems.ch \
                    --env PROM_USER=<username> \
                    --env PROM_PASS=<password> \
                    --env PROM_PORT=443 \
                    --env PROM_SCHEMA=https \
                    --env TELEGRAM_BOT_TOKEN=<TOKEN> \
                    --env TELEGRAM_CHAT_ID="-933647200" \
                    --env BATCH_SIZE=5 \
                    --env AUTOSCALER_INTERVAL=60 \
                    --env ENABLE_AUTOSCALER_LABEL=swarm.autoscaler \
                    --env AUTOSCALER_MINIMUM_CPU_LABEL=swarm.autoscaler.minimum_cpu \
                    --env AUTOSCALER_CPU_MINIMUM_DEFAULT=25 \
                    --env AUTOSCALER_MAXIMUM_CPU_LABEL=swarm.autoscaler.maximum_cpu \
                    --env AUTOSCALER_MAXIMUM_CPU_DEFAULT=85 \
                    --env AUTOSCALER_MINIMUM_MEM_LABEL=swarm.autoscaler.minimum_mem \
                    --env AUTOSCALER_MEM_MINIMUM_DEFAULT=25 \
                    --env AUTOSCALER_MAXIMUM_MEM_LABEL=swarm.autoscaler.maximum_mem \
                    --env AUTOSCALER_MAXIMUM_MEM_DEFAULT=85 \
                    --env AUTOSCALER_MIN_REPLICAS_LABEL=swarm.autoscaler.min_replicas \
                    --env AUTOSCALER_MIN_REPLICAS_DEFAULT=1 \
                    --env AUTOSCALER_MAX_REPLICAS_LABEL=swarm.autoscaler.max_replicas \
                    --env AUTOSCALER_MAX_REPLICAS_DEFAULT=10 \
                    -v /var/run/docker.sock:/var/run/docker.sock

### Planned Features
    - **Node Rebalancing**: Automatically redistribute services across nodes to ensure even resource utilization and reduce bottlenecks.
    - **Node Scaling/Provisioning/Decommissioning (Hetzner)**: Dynamically add or remove nodes in the cluster based on workload demands, leveraging Hetzner's infrastructure.

