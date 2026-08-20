export const getRouteEndpoints = (route: string[]): string =>
  `${route[0]} → ${route[route.length - 1]}`;
