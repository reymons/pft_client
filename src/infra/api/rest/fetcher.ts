import swr, { type SWRConfiguration, type ScopedMutator } from "swr";
import swrImmutable from "swr/immutable";
import { DomainError } from "@/domain/error";
import { routeWithQuery } from "@/lib/net";
import { APIHookPaginatedReturn, APIHookReturn, APIHookReturnState } from "@/domain/ports/api/common";
import { Paginated } from "./entity/common";
import { RESTClient } from "@/infra/client/rest";

type RouteConfig = {
    path: string;
    query?: Record<string, unknown>;
};

type FetcherConfig<T, P extends boolean | undefined> = Omit<SWRConfiguration<T, DomainError>, "fetcher"> & {
    route: RouteConfig;
    paginated?: P;
    fetcher: (route: string, client: RESTClient) => Promise<P extends true ? Paginated<T> : T>;
    immutable?: boolean;
};

export class Fetcher {
    constructor(
        public readonly client: RESTClient,
        public readonly mutate: ScopedMutator,
    ) {}

    useData<T>(conf: FetcherConfig<T, false | undefined>): APIHookReturn<T>;
    useData<T>(conf: FetcherConfig<T, true>): APIHookPaginatedReturn<T>;
    useData<T, P extends boolean | undefined>(conf: FetcherConfig<T, P>): APIHookReturn<T> | APIHookPaginatedReturn<T> {
        const { immutable, route, paginated, fetcher, ...rest } = conf;
        const { path, query } = route;
        const routeArg = routeWithQuery(path, query);
        const { data, isLoading, isValidating, error } = (immutable ? swrImmutable : swr)(routeArg, {
            ...rest,
            fetcher: () => fetcher?.(routeArg, this.client),
        });
        const state: APIHookReturnState = { isLoading, isValidating, error };
        if (paginated) return [data?.data ?? [], data?.total ?? 0, state];
        else return [data ?? null, state];
    }
}
