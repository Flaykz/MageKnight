type RuntimeImportMeta = ImportMeta & {
  env?: {
    VITE_RUST_SERVER_URL?: string;
  };
};

function isLocalHostname(hostname: string): boolean {
  return hostname === "localhost" || hostname === "127.0.0.1" || hostname === "::1";
}

function getDefaultRustServerUrl(location: Location): string {
  // The production Docker image is served by Caddy on port 8080 and proxies
  // `/ws` to the private server container. Keep the direct :3030 URL for the
  // Vite/local development server, where the Rust process runs on the host.
  if (isLocalHostname(location.hostname) && location.port !== "8080") {
    return `ws://${location.hostname}:3030/ws`;
  }

  const websocketProtocol = location.protocol === "https:" ? "wss:" : "ws:";
  const apiHostname = location.hostname.startsWith("play.")
    ? `api.${location.hostname.slice("play.".length)}`
    : location.hostname;
  const authority = location.port ? `${apiHostname}:${location.port}` : apiHostname;

  return `${websocketProtocol}//${authority}/ws`;
}

export function getRuntimeRustServerUrl(searchParams: URLSearchParams, location: Location = window.location): string {
  const queryOverride = searchParams.get("serverUrl");
  if (queryOverride) return queryOverride;

  const envOverride = (import.meta as RuntimeImportMeta).env?.VITE_RUST_SERVER_URL?.trim();
  if (envOverride) return envOverride;

  return getDefaultRustServerUrl(location);
}
