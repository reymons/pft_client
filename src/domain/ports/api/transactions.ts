import { TransactionModel, TransactionType } from "@/domain/models/transaction";
import { APIHookPaginatedReturn, PaginationWithSortQuery } from "./common";

type SortBy = "date" | "name" | "description";

export type UseCurrentTrxQuery = PaginationWithSortQuery<SortBy> & {
    name?: string;
    description?: string;
    type?: TransactionType;
    categoryIds?: number[];
};

export interface ITransactionsAPI {
    save(trx: TransactionModel): Promise<void>;

    useCurrent(query?: UseCurrentTrxQuery): APIHookPaginatedReturn<TransactionModel>;
}
