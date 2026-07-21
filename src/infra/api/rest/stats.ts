import { TopSpendingCategoryModel } from "@/domain/models/top-spending-category";
import { APIHookReturn } from "@/domain/ports/api/common";
import { IStatsAPI, UseTopSpendingCategoriesQuery } from "@/domain/ports/api/stats";
import { mapTopSpendingCategoryEntityToModel, TopSpendingCategoryEntity } from "./entity/top-spending-category";
import { SummaryModel } from "@/domain/models/summary";
import { SummaryEntity } from "./entity/summary";
import { Fetcher } from "./fetcher";

export class StatsAPI implements IStatsAPI {
    constructor(private readonly fetcher: Fetcher) {}

    useTopSpendingCategories(query: UseTopSpendingCategoriesQuery): APIHookReturn<TopSpendingCategoryModel[]> {
        return this.fetcher.useData({
            route: { path: "/stats/top-spending-categories", query },
            keepPreviousData: true,
            fetcher: async (route, client) => {
                const ents = await client.get<TopSpendingCategoryEntity[]>(route);
                return ents.map(mapTopSpendingCategoryEntityToModel);
            },
        });
    }

    useSummary() {
        return this.fetcher.useData({
            route: { path: "/stats/summary" },
            fetcher: async (route, client) => {
                const ent = await client.get<SummaryEntity>(route);
                return new SummaryModel(
                    ent.budgets,
                    ent.transactions,
                    ent.transactionsPrevMonth,
                    ent.transactionsThisMonth,
                    ent.balance,
                );
            },
        });
    }
}
