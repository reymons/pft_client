import swr from "swr";
import { TransactionModel } from "@/domain/models/transaction";
import { APIHookPaginatedReturn } from "@/domain/ports/api/common";
import { ITransactionsAPI, UseCurrentTrxQuery } from "@/domain/ports/api/transactions";
import { RESTClient } from "@/infra/client/rest";
import { mapTrxEntityToModel, TransactionEntity } from "./entity/transaction";
import { routeWithQuery } from "@/lib/net";
import { Paginated } from "./entity/common";

export class TransactionsAPI implements ITransactionsAPI {
    constructor(private readonly client: RESTClient) {}

    async save(trx: TransactionModel): Promise<void> {
        const ent = await this.client.post<TransactionEntity>("/transactions", {
            type: trx.type,
            name: trx.name,
            amount: trx.amount,
            description: trx.description || null,
            recurringPeriod: trx.recurringPeriod,
            categoryId: trx.category.id,
        });
        trx = mapTrxEntityToModel(ent);
    }

    useCurrent(query?: UseCurrentTrxQuery): APIHookPaginatedReturn<TransactionModel> {
        const { data, isLoading, error } = swr(routeWithQuery("/transactions", query), {
            fetcher: async (route) => {
                const res = await this.client.get<Paginated<TransactionEntity>>(route);
                return { data: res.data.map(mapTrxEntityToModel), total: res.total };
            },
            keepPreviousData: true,
        });
        return [data?.data ?? [], data?.total ?? 0, { isLoading, error }];
    }
}
