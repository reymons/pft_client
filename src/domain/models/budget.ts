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
    readonly categories: CategoryModel[];

    constructor(id: ModelId, name: string, amount: number, period: BudgetPeriod, categories: CategoryModel[]) {
        super(id);
        this.name = name;
        this.amount = amount;
        this.period = period;
        this.categories = categories;
    }

    get label() {
        return budgetPeriod[this.period];
    }

    get spent() {
        return 0;
    }
}
