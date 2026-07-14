import swr, { ScopedMutator } from "swr";
import { BudgetModel } from "@/domain/models/budget";
import { IBudgetsAPI, SaveBudgetBody } from "@/domain/ports/api/budgets";
import { BudgetEntity } from "./entity/budget";
import { APIHookReturn } from "@/domain/ports/api/common";
import { RESTClient } from "@/infra/client/rest";

export class BudgetsAPI implements IBudgetsAPI {
    constructor(
        private readonly client: RESTClient,
        private readonly mutate: ScopedMutator,
    ) {}

    private toModel(ent: BudgetEntity): BudgetModel {
        const m = new BudgetModel();
        m.id = ent.id;
        m.userId = ent.userId;
        m.amount = ent.amount;
        m.period = ent.period;
        return m;
    }

    useCurrentBudgets(): APIHookReturn<BudgetEntity[]> {
        const { data, isLoading, error } = swr<BudgetModel[]>("/budgets", {
            fetcher: async () => {
                const ents = await this.client.get<BudgetEntity[]>("/budgets");
                return ents.map((ent) => this.toModel(ent));
            },
        });
        return [data ?? null, { isLoading, error }];
    }

    async save(body: SaveBudgetBody): Promise<void> {
        const ent = await this.client.post<BudgetEntity>("/budgets", body);
        await this.mutate<BudgetModel[]>("/budgets", (budgets) => {
            if (budgets) return [...budgets, this.toModel(ent)];
            return undefined;
        });
    }
}
