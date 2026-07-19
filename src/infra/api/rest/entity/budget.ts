import { BudgetModel, BudgetPeriod } from "@/domain/models/budget";
import { CategoryEntity, mapCategoryEntityToModel } from "./category";

export type BudgetEntity = {
    id: number;
    name: string;
    amount: number;
    totalSpent: number;
    period: BudgetPeriod;
    categories: CategoryEntity[];
};

export function mapBudgetEntityToModel(ent: BudgetEntity): BudgetModel {
    return new BudgetModel(ent.id, ent.name, ent.amount, ent.totalSpent, ent.period, ent.categories.map(mapCategoryEntityToModel));
}
