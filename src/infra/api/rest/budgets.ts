import { BudgetModel } from "@/domain/models/budget";
import { IBudgetsAPI } from "@/domain/ports/api/budgets";
import { BudgetEntity, mapBudgetEntityToModel } from "./entity/budget";
import { API } from "./api";

export class BudgetsAPI extends API implements IBudgetsAPI {
    useCurrentBudgets() {
        return this.fetcher.useData({
            route: { path: "/budgets" },
            fetcher: async (route, client) => {
                const ents = await client.get<BudgetEntity[]>(route);
                return ents.map(mapBudgetEntityToModel);
            },
        });
    }

    async save(budget: BudgetModel): Promise<void> {
        const ent = await this.fetcher.client.post<BudgetEntity>("/budgets", {
            name: budget.name,
            amount: budget.amount,
            period: budget.period,
            categoryIds: budget.categories.map((c) => c.id),
            startsAt: budget.startsAt,
        });
        await this.fetcher.mutate<BudgetModel[]>(
            "/budgets",
            (budgets) => {
                const budget = mapBudgetEntityToModel(ent);
                if (budgets) return [...budgets, budget];
                return [budget];
            },
            false,
        );
    }

    async edit(budget: BudgetModel): Promise<void> {
        const ent = await this.fetcher.client.patch<BudgetEntity>(`/budgets/${budget.id}`, {
            name: budget.name,
            amount: budget.amount,
            period: budget.period,
            categoryIds: budget.categories.map((c) => c.id),
            startsAt: budget.startsAt,
        });
        await this.fetcher.mutate<BudgetModel[]>(
            "/budgets",
            (budgets) => {
                const budget = mapBudgetEntityToModel(ent);
                if (budgets) return budgets.map((b) => (b.id === budget.id ? budget : b));
                return [budget];
            },
            false,
        );
    }

    async deleteById(id: number): Promise<void> {
        await this.fetcher.client.delete(`/budgets/${id}`);
        await this.fetcher.mutate<BudgetModel[]>(
            "/budgets",
            (budgets) => (budgets ?? []).filter((b) => b.id !== id),
            false,
        );
    }
}
