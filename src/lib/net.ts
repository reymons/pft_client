export function routeWithQuery(route: string, query: Record<string, unknown> | undefined | null): string {
    if (!query) return route;
    const params = new URLSearchParams();
    for (const key in query) {
        const value = query[key];
        if (value !== undefined && value !== null) {
            let res: string;
            if (Array.isArray(value)) {
                if (!value.length) continue;
                res = value.join(",");
            } else {
                res = String(value);
            }
            params.append(key, res);
        }
    }
    const s = params.toString();
    return s ? `${route}?${s}` : route;
}
