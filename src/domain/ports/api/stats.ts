import { TopSpendingCategoryModel, TopSpendingCategoryPeriod } from "@/domain/models/top-spending-category";
import { SummaryModel } from "@/domain/models/summary";
import { APIHookReturn } from "./common";

export type UseTopSpendingCategoriesQuery = {
    period?: TopSpendingCategoryPeriod;
    limit?: number;
};

export interface IStatsAPI {
    useTopSpendingCategories(query: UseTopSpendingCategoriesQuery): APIHookReturn<TopSpendingCategoryModel[]>;

    useSummary(): APIHookReturn<SummaryModel>;
}
