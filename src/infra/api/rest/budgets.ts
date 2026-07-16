import swr, { ScopedMutator } from "swr";
import { BudgetModel } from "@/domain/models/budget";
import { IBudgetsAPI } from "@/domain/ports/api/budgets";
import { BudgetEntity, mapBudgetEntityToModel } from "./entity/budget";
import { APIHookReturn } from "@/domain/ports/api/common";
import { RESTClient } from "@/infra/client/rest";
import { CategoryModel } from "@/domain/models/category";

export class BudgetsAPI implements IBudgetsAPI {
    constructor(
        private readonly client: RESTClient,
        private readonly mutate: ScopedMutator,
    ) {}

    useCurrentBudgets(): APIHookReturn<BudgetModel[]> {
        const { data, isLoading, error } = swr<BudgetModel[]>("/budgets", {
            fetcher: async () => {
                const ents = await this.client.get<BudgetEntity[]>("/budgets");
                return ents.map(mapBudgetEntityToModel);
            },
        });
        return [data ?? null, { isLoading, error }];
    }

    async save(budget: BudgetModel, newCategories: CategoryModel[]): Promise<void> {
        const ent = await this.client.post<BudgetEntity>("/budgets", {
            name: budget.name,
            amount: budget.amount,
            period: budget.period,
            categoryIds: budget.categories.map((c) => c.id),
            newCategories: newCategories.map((c) => c.name),
        });
        await this.mutate<BudgetModel[]>("/budgets", (budgets) => {
            if (budgets) return [...budgets, mapBudgetEntityToModel(ent)];
            return undefined;
        });
    }

    async deleteById(id: number): Promise<void> {
        await this.client.delete(`/budgets/${id}`);
        await this.mutate<BudgetModel[]>(
            "/budgets",
            (budgets) => {
                if (budgets) return budgets.filter((b) => b.id !== id);
                return undefined;
            },
            { revalidate: false },
        );
    }
}
