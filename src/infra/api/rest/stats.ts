import swr from "swr";
import { TopSpendingCategoryModel } from "@/domain/models/top-spending-category";
import { APIHookReturn } from "@/domain/ports/api/common";
import { IStatsAPI, UseTopSpendingCategoriesQuery } from "@/domain/ports/api/stats";
import { RESTClient } from "@/infra/client/rest";
import { routeWithQuery } from "@/lib/net";
import { mapTopSpendingCategoryEntityToModel, TopSpendingCategoryEntity } from "./entity/top-spending-category";

export class StatsAPI implements IStatsAPI {
    constructor(private readonly client: RESTClient) {}

    useTopSpendingCategories(query: UseTopSpendingCategoriesQuery): APIHookReturn<TopSpendingCategoryModel[]> {
        const route = routeWithQuery("/stats/top-spending-categories", query);
        const { data, isLoading, error } = swr<TopSpendingCategoryModel[]>(route, {
            fetcher: async (route) => {
                const ents = await this.client.get<TopSpendingCategoryEntity[]>(route);
                return ents.map(mapTopSpendingCategoryEntityToModel);
            },
            keepPreviousData: true,
        });
        return [data ?? null, { isLoading, error }];
    }
}
