FROM jenkins/jenkins:lts

USER root

# Install Docker CLI
RUN apt-get update && \
    apt-get install -y \
    ca-certificates \
    curl \
    gnupg \
    lsb-release && \
    mkdir -p /etc/apt/keyrings && \
    curl -fsSL https://download.docker.com/linux/debian/gpg | gpg --dearmor -o /etc/apt/keyrings/docker.gpg && \
    echo \
    "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] \
    https://download.docker.com/linux/debian \
    $(lsb_release -cs) stable" | tee /etc/apt/sources.list.d/docker.list > /dev/null && \
    apt-get update && \
    apt-get install -y docker-ce docker-ce-cli containerd.io docker-compose-plugin

# Enable docker-compose as a command
RUN ln -s /usr/libexec/docker/cli-plugins/docker-compose /usr/local/bin/docker-compose || true

# Optional: install Fly.io CLI
RUN curl -L https://fly.io/install.sh | sh && \
    mv /root/.fly/bin/flyctl /usr/local/bin/

# Add Jenkins to docker group (optional)
RUN usermod -aG docker jenkins

USER jenkins
