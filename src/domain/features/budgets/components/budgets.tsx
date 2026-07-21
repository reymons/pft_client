"use client";
import { useBudgetsAPI } from "@/domain/api/hooks";
import { BudgetCard, BudgetCardSkeleton } from "./budget-card";

export const Budgets = () => {
    const budgetsAPI = useBudgetsAPI();
    const [budgets, { isLoading }] = budgetsAPI.useCurrentBudgets();

    return (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {isLoading ? (
                <>
                    {Array.from({ length: 6 }, (_, i) => (
                        <BudgetCardSkeleton key={i} />
                    ))}
                </>
            ) : !budgets?.length ? (
                <p>No budgets at the moment</p>
            ) : (
                <>
                    {budgets.map((budget) => (
                        <BudgetCard key={budget.id} budget={budget} />
                    ))}
                </>
            )}
        </div>
    );
};
