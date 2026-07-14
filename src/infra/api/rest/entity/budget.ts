import { BudgetPeriod } from "@/domain/models/budget";

export type BudgetEntity = {
    id: number;
    userId: number;
    amount: number;
    period: BudgetPeriod;
};
