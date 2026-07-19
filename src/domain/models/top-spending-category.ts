import { CategoryModel } from "./category";

export enum TopSpendingCategoryPeriod {
    Weekly = "weekly",
    Monthly = "monthly",
    Yearly = "yearly",
}

export const topSpendingCategoryPeriodName: Record<TopSpendingCategoryPeriod, string> = {
    [TopSpendingCategoryPeriod.Weekly]: "This week",
    [TopSpendingCategoryPeriod.Monthly]: "This month",
    [TopSpendingCategoryPeriod.Yearly]: "This year",
};

export class TopSpendingCategoryModel {
    category: CategoryModel;
    amount: number;

    constructor(category: CategoryModel, amount: number) {
        this.category = category;
        this.amount = amount;
    }
}
