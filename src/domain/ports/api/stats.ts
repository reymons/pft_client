import { TopSpendingCategoryModel, TopSpendingCategoryPeriod } from "@/domain/models/top-spending-category";
import { APIHookReturn } from "./common";

export type UseTopSpendingCategoriesQuery = {
    period?: TopSpendingCategoryPeriod;
    limit?: number;
};

export interface IStatsAPI {
    useTopSpendingCategories(query: UseTopSpendingCategoriesQuery): APIHookReturn<TopSpendingCategoryModel[]>;
}
