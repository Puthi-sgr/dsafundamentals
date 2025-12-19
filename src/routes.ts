export type RouteId = "browser-history" | "infinite-carousel" | "lru-cache";

const DEFAULT_ROUTE: RouteId = "browser-history";

export function getRouteFromHash(hash: string): RouteId {
  const normalized = hash.replace(/^#\/?/, "");
  if (normalized === "browser-history") return "browser-history";
  if (normalized === "infinite-carousel") return "infinite-carousel";
  if (normalized === "lru-cache") return "lru-cache";
  return DEFAULT_ROUTE;
}

export function setRoute(route: RouteId) {
  window.location.hash = `#/${route}`;
}

