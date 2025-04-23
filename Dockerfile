FROM rockylinux/rockylinux:9.5

ENV NODE_ENV=production

RUN echo "----> Installing system dependencies..." && \
    dnf -y install dnf-plugins-core && \
    dnf config-manager --add-repo https://download.docker.com/linux/rhel/docker-ce.repo -y && \
    dnf install -y docker-ce docker-ce-cli && \
    dnf module install nodejs:22/common -y && \
    # Clean up dnf cache within the same layer to reduce size
    dnf clean all && \
    rm -rf /var/cache/dnf

ARG SWARM_PILOT_VERSION=latest

RUN echo "----> Installing swarm-pilot version: ${SWARM_PILOT_VERSION}" && \
    npm i -g swarm-pilot@${SWARM_PILOT_VERSION} && \
    npm cache clean --force

ENTRYPOINT ["swarm-pilot"]