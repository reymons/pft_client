import { BudgetModel, BudgetPeriod } from "@/domain/models/budget";
import { CategoryModel } from "@/domain/models/category";
import { APIHookReturn } from "./common";

export type SaveBudgetBody = {
    period: BudgetPeriod;
    amount: number;
    newCategories?: string[];
    categoryIds?: number[];
};

export interface IBudgetsAPI {
    useCurrentBudgets(): APIHookReturn<BudgetModel[]>;

    save(budget: BudgetModel, newCategories: CategoryModel[]): Promise<void>;

    edit(budget: BudgetModel, newCategories: CategoryModel[]): Promise<void>;

    deleteById(id: number): Promise<void>;
}
