import { BudgetModel, BudgetPeriod } from "@/domain/models/budget";
import { APIHookReturn } from "./common";

export type SaveBudgetBody = {
    period: BudgetPeriod;
    amount: number;
    newCategories?: string[];
    categoryIds?: number[];
};

export interface IBudgetsAPI {
    useCurrentBudgets(): APIHookReturn<BudgetModel[]>;

    save(body: SaveBudgetBody): Promise<void>;
}
