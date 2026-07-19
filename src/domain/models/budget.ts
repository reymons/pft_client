import { CategoryModel } from "./category";
import { Model, ModelId } from "./model";

export enum BudgetPeriod {
    Weekly = "weekly",
    Monthly = "monthly",
    Yearly = "yearly",
}

export const budgetPeriod: Record<BudgetPeriod, string> = {
    [BudgetPeriod.Weekly]: "Weekly",
    [BudgetPeriod.Monthly]: "Monthly",
    [BudgetPeriod.Yearly]: "Yearly",
};

export class BudgetModel extends Model {
    readonly name: string;
    readonly amount: number;
    readonly period: BudgetPeriod;
    readonly totalSpent: number;
    readonly categories: CategoryModel[];

    constructor(id: ModelId, name: string, amount: number, totalSpent: number, period: BudgetPeriod, categories: CategoryModel[]) {
        super(id);
        this.name = name;
        this.amount = amount;
        this.totalSpent = totalSpent;
        this.period = period;
        this.categories = categories;
    }

    get label() {
        return budgetPeriod[this.period];
    }
}
