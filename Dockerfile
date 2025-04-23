FROM rockylinux/rockylinux:9.5
ENV NODE_ENV=production
RUN dnf -y install dnf-plugins-core
RUN dnf config-manager --add-repo https://download.docker.com/linux/rhel/docker-ce.repo -y
RUN dnf install -y docker-ce docker-ce-cli
RUN dnf module install nodejs:22/common -y
RUN npm i -g swarm-pilot
ENTRYPOINT ["swarm-pilot"]