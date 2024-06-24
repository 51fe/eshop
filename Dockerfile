FROM ghcr.io/codesandbox/devcontainers/typescript-node:latest

RUN apt update && apt install -y postgresql-client