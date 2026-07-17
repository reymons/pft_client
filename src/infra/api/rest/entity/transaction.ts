import { TransactionModel, TransactionType, TrxRecurringPeriod } from "@/domain/models/transaction";
import { CategoryEntity, mapCategoryEntityToModel } from "./category";

export type TransactionEntity = {
    id: number;
    type: TransactionType;
    name: string;
    description: string;
    amount: number;
    category: CategoryEntity;
    recurringPeriod: TrxRecurringPeriod | null;
    createdAt: string;
};

export function mapTrxEntityToModel(ent: TransactionEntity): TransactionModel {
    return new TransactionModel(
        ent.id,
        ent.type,
        ent.name,
        ent.description,
        ent.amount,
        new Date(ent.createdAt),
        ent.recurringPeriod,
        mapCategoryEntityToModel(ent.category),
    );
}
