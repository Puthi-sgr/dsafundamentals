export type RouteId = "browser-history" | "infinite-carousel";

const DEFAULT_ROUTE: RouteId = "browser-history";

export function getRouteFromHash(hash: string): RouteId {
  const normalized = hash.replace(/^#\/?/, "");
  if (normalized === "browser-history") return "browser-history";
  if (normalized === "infinite-carousel") return "infinite-carousel";
  return DEFAULT_ROUTE;
}

export function setRoute(route: RouteId) {
  window.location.hash = `#/${route}`;
}

