# syntax=docker/dockerfile:1

FROM --platform=$BUILDPLATFORM oven/bun:1 AS builder
WORKDIR /build

# Install step — cache this layer separately from source
COPY package.json bun.lock tsconfig.json ./
COPY packages/client/package.json packages/client/
COPY packages/shared/package.json packages/shared/
COPY packages/mage-dev/package.json packages/mage-dev/
RUN bun install

# Source
COPY packages/client/ packages/client/
COPY packages/shared/ packages/shared/
COPY packages/mage-dev/ packages/mage-dev/
COPY scripts/ scripts/

ARG VITE_ASSETS_BASE_URL=/assets
ARG VITE_RUST_SERVER_URL
ENV VITE_ASSETS_BASE_URL=$VITE_ASSETS_BASE_URL
ENV VITE_RUST_SERVER_URL=$VITE_RUST_SERVER_URL

RUN bun run --filter @mage-knight/shared build && \
    bun run --filter @mage-knight/client build

FROM caddy:2-alpine
COPY --from=builder /build/packages/client/dist /srv
COPY packages/client/Caddyfile /etc/caddy/Caddyfile
COPY packages/client/Caddyfile.synology /etc/caddy/Caddyfile.synology
EXPOSE 80 443
