FROM rockylinux/rockylinux:9.5

# Declare the build argument received from the build command
# Sets a default value in case the build argument is not passed
ARG SWARM_PILOT_VERSION=latest

ENV NODE_ENV=production

# Combine RUN commands to reduce layer count and improve caching
RUN dnf -y install dnf-plugins-core && \
    dnf config-manager --add-repo https://download.docker.com/linux/rhel/docker-ce.repo -y && \
    dnf install -y docker-ce docker-ce-cli && \
    dnf module install nodejs:22/common -y && \
    # Output the version being installed (good for build logs)
    echo "----> Installing swarm-pilot version: ${SWARM_PILOT_VERSION}" && \
    # Use the build argument to install the specific version
    npm i -g --force swarm-pilot@${SWARM_PILOT_VERSION} && \
    # Clean up dnf cache to reduce image size
    dnf clean all && \
    rm -rf /var/cache/dnf


ENTRYPOINT ["swarm-pilot"]