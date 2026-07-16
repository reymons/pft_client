"use client";
import { useBudgetsAPI } from "@/domain/api/hooks";
import { BudgetCard } from "@/domain/features/budgets";

export const Budgets = () => {
    const budgetsAPI = useBudgetsAPI();
    const [budgets, budgetsState] = budgetsAPI.useCurrentBudgets();

    if (budgetsState.isLoading) return <p>Loading...</p>;
    if (!budgets) return <p>No budgets at the moment</p>;

    return (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {budgets.map((budget) => (
                <BudgetCard key={budget.id} budget={budget} />
            ))}
        </div>
    );
};
