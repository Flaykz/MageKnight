FROM rust:1-slim-bookworm AS builder
WORKDIR /build
COPY . .
RUN cargo build --release -p mk-server

FROM debian:bookworm-slim
RUN apt-get update \
    && apt-get install -y --no-install-recommends ca-certificates curl \
    && rm -rf /var/lib/apt/lists/* \
    && useradd --system --no-create-home --shell /usr/sbin/nologin mk-server
COPY --from=builder /build/target/release/mk-server /usr/local/bin/mk-server
ENV PORT=3030
EXPOSE 3030
USER mk-server
HEALTHCHECK --interval=30s --timeout=3s --start-period=10s --retries=3 \
    CMD curl --fail --silent http://127.0.0.1:3030/health >/dev/null || exit 1
CMD ["mk-server"]
