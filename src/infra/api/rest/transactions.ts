import { TransactionModel } from "@/domain/models/transaction";
import { APIHookPaginatedReturn } from "@/domain/ports/api/common";
import { ITransactionsAPI, UseCurrentTrxQuery } from "@/domain/ports/api/transactions";
import { mapTrxEntityToModel, TransactionEntity } from "./entity/transaction";
import { Paginated } from "./entity/common";
import { API } from "./api";

export class TransactionsAPI extends API implements ITransactionsAPI {
    async save(trx: TransactionModel): Promise<void> {
        const ent = await this.fetcher.client.post<TransactionEntity>("/transactions", {
            type: trx.type,
            name: trx.name,
            amount: trx.amount,
            description: trx.description || null,
            recurringPeriod: trx.recurringPeriod,
            categoryId: trx.category.id,
            addedAt: trx.addedAt,
        });
        trx = mapTrxEntityToModel(ent);
    }

    useCurrent(query?: UseCurrentTrxQuery): APIHookPaginatedReturn<TransactionModel> {
        return this.fetcher.useData({
            route: { path: "/transactions", query },
            fetcher: async (route, client) => {
                const res = await client.get<Paginated<TransactionEntity>>(route);
                return { data: res.data.map(mapTrxEntityToModel), total: res.total };
            },
            keepPreviousData: true,
            paginated: true,
        });
    }
}
