import { BudgetModel, BudgetPeriod } from "@/domain/models/budget";
import { CategoryEntity, mapCategoryEntityToModel } from "./category";

export type BudgetEntity = {
    id: number;
    userId: number;
    name: string;
    amount: number;
    period: BudgetPeriod;
    categories: CategoryEntity[];
};

export function mapBudgetEntityToModel(ent: BudgetEntity): BudgetModel {
    return new BudgetModel(ent.id, ent.name, ent.amount, ent.period, ent.categories.map(mapCategoryEntityToModel));
}
